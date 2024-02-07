import { BlockType, MinecraftBlockTypes, Vector3, World } from "@minecraft/server";

export type blockCondition = {
  block: BlockType;
  position: Vector3;
};

/**
 * Checks if there is a lever at the specified position in the world.
 *
 * @param world - The world object.
 * @param position - The position of the lever.
 * @returns Returns true if there is a lever at the specified position and it has a redstone power of 15, otherwise returns false.
 * @throws Throws an error if there is no lever at the specified position.
 */
export function leverOn(world: World, position: Vector3): boolean {
  let lever = world.getDimension("overworld").getBlock(position);
  if (!(lever?.typeId == "minecraft:lever")) {
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

export type AgentNoGoZone = {
  //Reason for needing to use is because the Agent can't be queried for its location in minecraft
  position: Vector3;
};

export type LevelNoGoZone = {
  zones: AgentNoGoZone[];
};
