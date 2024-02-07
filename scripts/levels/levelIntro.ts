import { Vector3, world } from "@minecraft/server";
import Level from "../Commandeer/level/level";
import { leverOn } from "../Commandeer/level/levelTypes";
import { teleportAgent, isAgentAt } from "../Commandeer/utils/agentUtils";
import { startLevel } from "../Commandeer/utils/levelUtils";
import { vector3 } from "../Commandeer/utils/vectorUtils";
import { levelIntroConditions } from "../levelConditions/levelIntro";
import { CURRENT_LEVEL, mindKeeper, pupeteer } from "../main";

const levelIntroCommandBlockPos: Vector3 = vector3(58, 66, 276);
const levelIntroStartPosition: Vector3 = vector3(28, 70, 269);
const levelIntroEndPosition: Vector3 = vector3(39, 70, 269);
const levelIntro: Level = new Level(
  () => {
    world.sendMessage("%message.intro.started");
    pupeteer.setTitleTimed("%message.intro.title", 2.5);
    startLevel(levelIntroCommandBlockPos);
    teleportAgent(levelIntroStartPosition);
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
    if (isComplete) {
      return true;
    }

    //level is done, but wrong
    if (isAgentAt(levelIntroEndPosition)) {
      teleportAgent(levelIntroStartPosition);
      pupeteer.setTitleTimed("%message.level.incorrect", 2.5);
      pupeteer.updateSubtitle("%message.level.incorrect.subtext");
    }
  }
);

export default levelIntro;
