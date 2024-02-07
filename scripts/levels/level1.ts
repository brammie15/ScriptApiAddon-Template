import { MinecraftBlockTypes, Vector3, world } from "@minecraft/server";
import Level from "../Commandeer/level/level";
import { leverOn } from "../Commandeer/level/levelTypes";
import { teleportAgent, isAgentAt } from "../Commandeer/utils/agentUtils";
import { startLevel } from "../Commandeer/utils/levelUtils";
import { vector3 } from "../Commandeer/utils/vectorUtils";
import { levelIntroConditions } from "../levelConditions/levelIntro";
import { CURRENT_LEVEL, mindKeeper, pupeteer } from "../main";
import { level1Conditions, level1NoGoZones } from "../levelConditions/level1";

const Level1CommandBlockPos: Vector3 = vector3(58, 66, 277);
const level1StartPosition: Vector3 = vector3(54, 70, 216);
const Level1EndPosition: Vector3 = vector3(75, 70, 216);
const level1ResetCommandBlockPos: Vector3 = vector3(56, 68, 211);
const level1: Level = new Level(
  () => {
    world.sendMessage("%message.level1.started");
    pupeteer.setTitleTimed("%message.level1.title", 2.5);
    startLevel(Level1CommandBlockPos);
    teleportAgent(level1StartPosition);
  },
  () => {
    pupeteer.setActionBar("%message.level1.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.level1.complete");
    pupeteer.setTitleTimed("%message.level1.complete", 2.5);

    mindKeeper.increment(CURRENT_LEVEL);
  },
  () => {
    let isComplete = true;
    let isOutOfBounds = false;

    level1Conditions.conditions.forEach((condition) => {
      if (condition.block != world.getDimension("Overworld").getBlock(condition.position)?.type) {
        isComplete = false;
      }
    });
    if (isComplete && !isOutOfBounds) {
      return true;
    }

    if (isOutOfBounds) {
      teleportAgent(level1StartPosition);
      pupeteer.setTitleTimed("%message.level.outofbounds", 2.5);
      pupeteer.updateSubtitle("%message.level.outofbounds.subtext");
      return false;
    }

    //level is done, but wrong
    if (isAgentAt(Level1EndPosition)) {
      teleportAgent(level1StartPosition);
      pupeteer.setTitleTimed("%message.level.incorrect", 2.5);
      pupeteer.updateSubtitle("%message.level.incorrect.subtext");
      world
        .getDimension("overworld")
        .fillBlocks(level1ResetCommandBlockPos, level1ResetCommandBlockPos, MinecraftBlockTypes.redstoneBlock);
    }
  }
);

export default level1;
