import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelBlockCondition } from "../Commandeer/level/levelTypes";

let levelExtra2Conditions: LevelBlockCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 8 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 6 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 5 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 3 },
    },

    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 1 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: -7 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: -8 },
    },

    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: 9 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: 4 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: 2 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: 0 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: -1 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: -2 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: -4 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: -5 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 234, y: 71, z: -6 },
    },
  ],
};

export { levelExtra2Conditions };
