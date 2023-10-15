import { BlockType, Vector3, world } from "@minecraft/server";
import AbstractLevelCondition from "./AbstractCondition";

class ButtonPushCondition extends AbstractLevelCondition {
  position: Vector3;

  constructor(position: Vector3) {
    super();
    this.position = position;
  }

  checkCondition(): boolean {
    const button = world.getDimension("overworld").getBlock(this.position);
    if (!button || !button.getRedstonePower()) {
      return false;
    }
    return button.getRedstonePower()! > 0;
  }
}

export default ButtonPushCondition;
