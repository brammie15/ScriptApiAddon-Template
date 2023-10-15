import {
  world,
  system,
  MinecraftBlockTypes,
  Vector3,
  BlockType,
  ButtonPushAfterEvent,
  EntityQueryOptions,
  Vector,
  BlockPermutation,
} from "@minecraft/server";
import { Mindkeeper, Store, StoreType } from "./Commandeer/mindKeeper";
import Pupeteer from "./Commandeer/pupeteer";
import Level from "./Commandeer/level/level";
import { leverOn } from "./Commandeer/level/levelTypes";
import { levelIntroConditions } from "./levelConditions/levelIntro";

const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);
const CURRENT_LEVEL = "currentLevel";

type Wall = {
  startPos: Vector3;
  endPos: Vector3;
};

let vaultDoor: Wall = {
  startPos: { x: 40, y: 72, z: 271 },
  endPos: { x: 40, y: 70, z: 270 },
};
let vaultEntrancePos: Vector3 = { x: 39, y: 70, z: 271 };

function clearWall(wall: Wall) {
  world.getDimension("overworld").fillBlocks(wall.startPos, wall.endPos, MinecraftBlockTypes.air);
}

const levelIntro: Level = new Level(
  () => {
    world.sendMessage("%message.intro.started");
    pupeteer.setTitleTimed("%message.intro.title", 2.5);
    world.sendMessage("TODO: ADD ACTUAL CODE BUILDER");
  },
  () => {
    pupeteer.setActionBar("%message.intro.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.intro.done");
    pupeteer.setTitleTimed("%message.intro.done", 2.5);

    mindKeeper.increment(CURRENT_LEVEL);
  },
  () => {
    let isComplete = true;
    levelIntroConditions.conditions.forEach((condition) => {
      if (leverOn(world, condition.position) != condition.state) {
        isComplete = false;
      }
    });
    return isComplete;
  }
);

let testPos: Vector3 = { x: 46, y: 71, z: 267 };

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
        world.sendMessage("Ya did it!");
    }
  }
});

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore(CURRENT_LEVEL, StoreType.number);
  mindKeeper.registerToWorld(propertyRegistry);
});

world.afterEvents.chatSend.subscribe(({ message, sender }) => {
  const command = message.split(" ")[0];
  if (command === "!get") {
    const store = message.split(" ")[1];
    const value = mindKeeper.get(store);
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (command === "!set") {
    const store = message.split(" ")[1];
    const value = message.split(" ")[2];
    const type = message.split(" ")[3];
    if (type === "number") {
      mindKeeper.set(store, Number(value));
    } else {
      mindKeeper.set(store, value);
    }
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (command === "!reset") {
    world.sendMessage("Resetting");
    mindKeeper.set(CURRENT_LEVEL, 0);
    levelIntro.reset();
  }
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id == "cc:startIntro") {
    if (mindKeeper.get(CURRENT_LEVEL) == 0) {
      mindKeeper.increment("currentLevel");
    }
  }
});
