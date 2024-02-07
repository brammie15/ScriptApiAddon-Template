import { world, system, MinecraftBlockTypes, Vector3, MolangVariableMap } from "@minecraft/server";
import { Mindkeeper, Store, StoreType } from "./Commandeer/mindKeeper";
import Pupeteer from "./Commandeer/pupeteer";
import Level from "./Commandeer/level/level";
import { leverOn } from "./Commandeer/level/levelTypes";
import { levelIntroConditions } from "./levelConditions/levelIntro";
import { Vector3Abs, Vector3Add, Vector3Multiply, Vector3ToString, vector3 } from "./Commandeer/utils/vectorUtils";
import { delayedRun } from "./Commandeer/utils/waitUtil";
import { Wall, clearWall, fillWall, startLevel } from "./Commandeer/utils/levelUtils";
import { Trail } from "./Commandeer/trail/trailEngine";
import { startTrail } from "./trails/startTrail";
import { LeverDirection, clone, setLever } from "./Commandeer/utils/worldEditUtils";
import levelIntro from "./levels/levelIntro";
import level1 from "./levels/level1";
import { PARTICLES, ParticleColumn, bedrockParticles, spawnParticle } from "./Commandeer/utils/particleUtils";
import { drawArrow } from "./Commandeer/utils/arrow";
import * as agentUtils from "./Commandeer/utils/agentUtils";
import level2 from "./levels/level2";
import level3 from "./levels/level3";
import { level3Conditions } from "./levelConditions/level3";

const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);
const CURRENT_LEVEL = "currentLevel";
const AGENT_ID = "agentid";
export { pupeteer, mindKeeper, CURRENT_LEVEL };

let vaultDoor: Wall = {
  startPos: vector3(40, 72, 273),
  endPos: vector3(40, 70, 271),
};

let vaultEntrancePos: Vector3 = vector3(40, 69, 272);

const nullWall: Wall = {
  startPos: { x: -10, y: -10, z: -10 },
  endPos: { x: -10, y: -10, z: -10 },
};
//#region Door Animation
//setblock 46 70 266
const doorFrameDestination = vector3(46, 70, 266);

//fill 66 60 287 74 66 287
const doorFrame1: Wall = {
  startPos: vector3(66, 60, 287),
  endPos: vector3(74, 66, 287),
};

const doorAnimationDirection: Vector3 = vector3(0, 0, -2);
const doorAnimationSpeed: number = 0.5;
const doorAnimationFrames: number = 5;
const doorAnimationDelay: number = 10;

let currentFrame: number = 0;
function playDoorAnimation() {
  const currentWall = doorFrame1;
  const currentStartPos = Vector3Add(
    currentWall.startPos,
    Vector3Multiply(doorAnimationDirection, vector3(currentFrame, currentFrame, currentFrame))
  );
  const currentEndPos = Vector3Add(
    currentWall.endPos,
    Vector3Multiply(doorAnimationDirection, vector3(currentFrame, currentFrame, currentFrame))
  );

  clone(currentStartPos, currentEndPos, doorFrameDestination);
  currentFrame++;
  if (currentFrame < doorAnimationFrames) {
    delayedRun(playDoorAnimation, doorAnimationDelay);
  }
}

function resetDoorAnimation() {
  currentFrame = 0;
  doorOpen = false;
  clone(doorFrame1.startPos, doorFrame1.endPos, doorFrameDestination);
}
//#endregion

const noLevelCommandBlockPos: Vector3 = vector3(58, 66, 275);

function drawParticleCube(position: Vector3) {
  spawnParticle(position);
}

let doorOpen = false;

let firstTrail: Trail = new Trail("startTrail", 2);
firstTrail.fromTrail(startTrail);

let rotatorTimer = 0;

function rotateParticles(pos: Vector3) {
  //Rotate 2 particles around the center in the XY plane

  let x = 0.5 * Math.cos(rotatorTimer);
  let y = 0.5 * Math.sin(rotatorTimer);

  let pos1 = Vector3Add(pos, vector3(x, y, 0));
  let pos2 = Vector3Add(pos, vector3(-x, -y, 0));

  spawnParticle(pos1);
  spawnParticle(pos2);

  rotatorTimer += 0.1;
}

system.runInterval(() => {
  if (mindKeeper.initialised) {
    const currentLevel = mindKeeper.get(CURRENT_LEVEL);
    switch (currentLevel) {
      case 0:
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 1:
        //intro
        //open door
        //show goto vault
        pupeteer.setActionBar("%message.goto.vault");
        clearWall(vaultDoor);
      case 2:
        //wait for player to enter vault
        if (pupeteer.testForLocation(vaultEntrancePos, 2)) {
          mindKeeper.increment(CURRENT_LEVEL);
        }
        break;
      case 3:
        levelIntro.update();
        break;
      case 4:
        //Door opening
        pupeteer.setActionBar("OPEN THE DOOR");
        rotateParticles(vector3(46.5, 71.5, 267.2));

        //setblock 46 71 267
        if (leverOn(world, vector3(46, 71, 267))) {
          if (doorOpen == false) {
            playDoorAnimation();
            doorOpen = true;
            mindKeeper.increment(CURRENT_LEVEL);
          }
        }
        break;
      case 5:
        pupeteer.setActionBar("%message.goto.field.1");
        drawArrow(vector3(54.5, 74, 216.5));
        firstTrail.spawnNext();
        if (pupeteer.testForLocation(vector3(54, 70, 216), 2)) {
          mindKeeper.increment(CURRENT_LEVEL);
        }
        break;
      case 6:
        level1.update();
        //level 1 start
        break;
      case 7:
        pupeteer.setActionBar("%message.goto.field.2");
        drawArrow(vector3(46.5, 74, 220.5));
        if (pupeteer.testForLocation(vector3(46, 70, 220), 2)) {
          mindKeeper.increment(CURRENT_LEVEL);
        }
        break;
      case 8:
        level2.update();
        break;
      case 9:
        pupeteer.setActionBar("%message.goto.field.3");
        drawArrow(vector3(56.5, 74, 235.5));
        if (pupeteer.testForLocation(vector3(56, 70, 235), 2)) {
          mindKeeper.increment(CURRENT_LEVEL);
        }
        break;
      case 10:
        level3.update();
        break;
      case 11:
        pupeteer.setActionBar("%message.levels.completed");
    }
  }
});

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore(CURRENT_LEVEL, StoreType.number);
  mindKeeper.registerStore(AGENT_ID, StoreType.string);
  mindKeeper.registerToWorld(propertyRegistry);
});

world.afterEvents.chatSend.subscribe((event) => {
  const command = event.message.split(" ")[0];

  mindKeeper.chatCommands(event);

  if (command === "!reset") {
    world.sendMessage("Resetting");
    fillWall(vaultDoor, MinecraftBlockTypes.ironBars);
    mindKeeper.set(CURRENT_LEVEL, 0);
    levelIntro.reset();
    resetDoorAnimation();
    doorOpen = false;
    let origin = vector3(28, 70, 268);
    for (let i = 0; i < 11; i++) {
      let pos = Vector3Add(origin, vector3(i, 0, 0));
      setLever(pos, LeverDirection.South, false);
    }
    setLever(vector3(46, 71, 267), LeverDirection.South, false);

    levelIntro.reset();

    //reset level 1
    level1.reset();
    startLevel(vector3(56, 68, 211)); //Bit unortodox, but it works

    //reset level 2
    level2.reset();
    startLevel(vector3(44, 68, 216));

    //reset level 3
    level3.reset();
    startLevel(vector3(54, 68, 242));

    agentUtils.teleportAgent(vector3(28, 70, 269));

    startLevel(noLevelCommandBlockPos);
  }
  if (command == "!test") {
    world.sendMessage("Testing");
    levelIntroConditions.conditions.forEach((condition) => {
      let pos: Vector3 = Vector3Add(condition.position, vector3(0, 4, 0));
      if (condition.state) {
        world.getDimension("overworld").fillBlocks(pos, pos, MinecraftBlockTypes.greenWool);
      } else {
        world.getDimension("overworld").fillBlocks(pos, pos, MinecraftBlockTypes.redWool);
      }
    });
  }
  if (command == "!checkAgent") {
    let test = agentUtils.getAgentLocation();
    world.sendMessage(Vector3ToString(test));
    let pos = vector3(
      parseInt(command.split(" ")[1]),
      parseInt(command.split(" ")[2]),
      parseInt(command.split(" ")[3])
    );
    world.sendMessage(agentUtils.isAgentAt(pos).toString());
  }
  if (command == "!doorFrame") {
    playDoorAnimation();
  }
  if (command == "!resetDoorFrame") {
    resetDoorAnimation();
  }
  if (command == "!setLevers") {
    levelIntroConditions.conditions.forEach((condition) => {
      setLever(condition.position, LeverDirection.South, condition.state);
    });
  }
  if (command == "!dingus") {
    level3Conditions.conditions.forEach((condition) => {
      let pos: Vector3 = Vector3Add(condition.position, vector3(0, 4, 0));

      world.getDimension("overworld").fillBlocks(pos, pos, MinecraftBlockTypes.redWool);
    });
  }
});
system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id == "cc:startIntro") {
    if (mindKeeper.get(CURRENT_LEVEL) == 0) {
      mindKeeper.increment("currentLevel");
    }
  }

  if (event.id == "cc:getId") {
    let id = event.message;
    world.sendMessage("Script got the id " + id);
    mindKeeper.set(AGENT_ID, id);
  }
});
