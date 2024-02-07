import { BlockType, MinecraftBlockTypes, Vector3, world } from "@minecraft/server";

type Wall = {
  startPos: Vector3;
  endPos: Vector3;
};

function clearWall(wall: Wall) {
  world.getDimension("overworld").fillBlocks(wall.startPos, wall.endPos, MinecraftBlockTypes.air);
}

function fillWall(wall: Wall, block: BlockType) {
  world.getDimension("overworld").fillBlocks(wall.startPos, wall.endPos, block);
}

function startLevel(commandBlockPos: Vector3) {
  world.getDimension("overworld").fillBlocks(commandBlockPos, commandBlockPos, MinecraftBlockTypes.redstoneBlock);
}

export { Wall, clearWall, fillWall, startLevel };
