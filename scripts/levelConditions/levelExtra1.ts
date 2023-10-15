import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelBlockCondition } from "../Commandeer/level/levelTypes";

let levelExtra1Conditions: LevelBlockCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 9 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 8 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 7 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 224, y: 71, z: 6 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 5 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 3 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 224, y: 71, z: 2 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: 1 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 224, y: 71, z: 0 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 224, y: 71, z: -1 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: -2 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: -4 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 224, y: 71, z: -5 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: -6 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: -7 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 224, y: 71, z: -8 },
    },
  ],
};

export { levelExtra1Conditions };
