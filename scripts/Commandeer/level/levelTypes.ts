import { BlockType, Vector3, World } from "@minecraft/server";

export type blockCondition = {
  block: BlockType;
  position: Vector3;
};

export function leverOn(world: World, position: Vector3): boolean {
  let lever = world.getDimension("overworld").getBlock(position);
  if (!lever) {
    throw new Error(`No lever at ${position}`);
  }
  return lever.getRedstonePower() == 15;
}

export type LeverCondition = {
  position: Vector3;
  state: boolean;
};

export type LevelBlockCondition = {
  conditions: blockCondition[];
};

export type LevelLeverCondition = {
  conditions: LeverCondition[];
};
