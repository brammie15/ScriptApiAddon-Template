import { MinecraftBlockTypes, Vector3, world } from "@minecraft/server";
import Level from "../Commandeer/level/level";
import { leverOn } from "../Commandeer/level/levelTypes";
import { teleportAgent, isAgentAt } from "../Commandeer/utils/agentUtils";
import { startLevel } from "../Commandeer/utils/levelUtils";
import { Vector3Add, vector3 } from "../Commandeer/utils/vectorUtils";
import { levelIntroConditions } from "../levelConditions/levelIntro";
import { CURRENT_LEVEL, mindKeeper, pupeteer } from "../main";
import { level3Conditions } from "../levelConditions/level3";
import * as agentUtils from "../Commandeer/utils/agentUtils";

const Level3CommandBlockPos: Vector3 = vector3(58, 66, 279);
const level3StartPosition: Vector3 = vector3(56, 69, 235);
const Level3EndPosition: Vector3 = vector3(72, 70, 235);
const level3ResetCommandBlockPos: Vector3 = vector3(54, 68, 242);
const level3: Level = new Level(
  () => {
    world.sendMessage("%message.level3.started");
    pupeteer.setTitleTimed("%message.level3.title", 2.5);
    startLevel(Level3CommandBlockPos);
    teleportAgent(level3StartPosition);
  },
  () => {
    pupeteer.setActionBar("%message.level3.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.level3.complete");
    pupeteer.setTitleTimed("%message.level3.complete", 2.5);

    mindKeeper.increment(CURRENT_LEVEL);
  },
  () => {
    let isComplete = true;
    let isOutOfBounds = false;

    let agentLocation = agentUtils.getAgentLocation();
    let blockUnderAgent = world.getDimension("overworld").getBlock(Vector3Add(agentLocation, vector3(0, -1, 0)));
    if (blockUnderAgent?.type == MinecraftBlockTypes.water) {
      isOutOfBounds = true;
    }
    let count = 0;
    level3Conditions.conditions.forEach((condition) => {
      if (condition.block != world.getDimension("Overworld").getBlock(condition.position)?.type) {
        isComplete = false;
        count++;
      }
    });

    world.sendMessage(`%message.level3.incorrect ${count}`);
    if (isComplete && !isOutOfBounds) {
      return true;
    }

    if (isOutOfBounds) {
      teleportAgent(level3StartPosition);
      pupeteer.setTitleTimed("%message.level.outofbounds", 2.5);
      pupeteer.updateSubtitle("%message.level.outofbounds.subtext");
      return false;
    }

    //level is done, but wrong
    if (isAgentAt(Level3EndPosition)) {
      teleportAgent(level3StartPosition);
      pupeteer.setTitleTimed("%message.level.incorrect", 2.5);
      pupeteer.updateSubtitle("%message.level.incorrect.subtext");
      world
        .getDimension("overworld")
        .fillBlocks(level3ResetCommandBlockPos, level3ResetCommandBlockPos, MinecraftBlockTypes.redstoneBlock);
    }
  }
);

export default level3;
