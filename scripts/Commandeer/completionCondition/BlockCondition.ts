import { BlockType, Vector3, world } from "@minecraft/server";
import AbstractLevelCondition from "./AbstractCondition";
import { Vector3ToString } from "../utils/vectorUtils";

class BlockCondition extends AbstractLevelCondition {
  position: Vector3;
  blockType: BlockType;

  constructor(position: Vector3, blockType: BlockType) {
    super();
    this.position = position;
    this.blockType = blockType;
  }

  checkCondition(): boolean {
    const block = world.getDimension("overworld").getBlock(this.position);
    if (!block) {
      return false;
    }
    return block.typeId === this.blockType.id;
  }
}

export default BlockCondition;
