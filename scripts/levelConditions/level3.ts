import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelBlockCondition } from "../Commandeer/level/levelTypes";

let level3Conditions: LevelBlockCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 225, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 226, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 227, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 233, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 235, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 241, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 242, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 243, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 244, y: 74, z: 29 },
    },

    {
      block: MinecraftBlockTypes.air,
      position: { x: 228, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 229, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 231, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 232, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 236, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 237, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 239, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.air,
      position: { x: 240, y: 74, z: 29 },
    },
  ],
};

export { level3Conditions };
