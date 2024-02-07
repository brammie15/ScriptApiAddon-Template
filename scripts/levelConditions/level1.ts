import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelBlockCondition, LevelNoGoZone } from "../Commandeer/level/levelTypes";
import { vector3 } from "../Commandeer/utils/vectorUtils";

let level1Conditions: LevelBlockCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.air,
      position: vector3(55, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(56, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(57, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(58, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(59, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(60, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(61, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(62, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(63, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(64, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(65, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(66, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(67, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(68, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(69, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(70, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(71, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(72, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(73, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(74, 70, 216),
    },
    {
      block: MinecraftBlockTypes.air,
      position: vector3(74, 70, 216),
    },
  ],
};

let level1NoGoZones: LevelNoGoZone = {
  zones: [
    { position: vector3(55, 70, 215) },
    { position: vector3(56, 70, 215) },
    { position: vector3(57, 70, 215) },
    { position: vector3(58, 70, 215) },
    { position: vector3(59, 70, 215) },
    { position: vector3(60, 70, 215) },
    { position: vector3(61, 70, 215) },
    { position: vector3(62, 70, 215) },
    { position: vector3(63, 70, 215) },
    { position: vector3(64, 70, 215) },
    { position: vector3(65, 70, 215) },
    { position: vector3(66, 70, 215) },
    { position: vector3(67, 70, 215) },
    { position: vector3(68, 70, 215) },
    { position: vector3(69, 70, 215) },
    { position: vector3(70, 70, 215) },
    { position: vector3(71, 70, 215) },
    { position: vector3(72, 70, 215) },
    { position: vector3(73, 70, 215) },
    { position: vector3(74, 70, 215) },

    { position: vector3(55, 70, 217) },
    { position: vector3(56, 70, 217) },
    { position: vector3(57, 70, 217) },
    { position: vector3(58, 70, 217) },
    { position: vector3(59, 70, 217) },
    { position: vector3(60, 70, 217) },
    { position: vector3(61, 70, 217) },
    { position: vector3(62, 70, 217) },
    { position: vector3(63, 70, 217) },
    { position: vector3(64, 70, 217) },
    { position: vector3(65, 70, 217) },
    { position: vector3(66, 70, 217) },
    { position: vector3(67, 70, 217) },
    { position: vector3(68, 70, 217) },
    { position: vector3(69, 70, 217) },
    { position: vector3(70, 70, 217) },
    { position: vector3(71, 70, 217) },
    { position: vector3(72, 70, 217) },
    { position: vector3(73, 70, 217) },
    { position: vector3(74, 70, 217) },
  ],
};

export { level1Conditions, level1NoGoZones };
