import { Vector3, world } from "@minecraft/server";

function clone(startPos: Vector3, endPos: Vector3, destination: Vector3) {
  world
    .getDimension("overworld")
    .runCommand(
      `clone ${startPos.x} ${startPos.y} ${startPos.z} ${endPos.x} ${endPos.y} ${endPos.z} ${destination.x} ${destination.y} ${destination.z} replace normal`
    );
}

enum LeverDirection {
  DownEastWest = "down_east_west",
  DownNorthSouth = "down_north_south",
  East = "east",
  North = "north",
  South = "south",
  UpEastWest = "up_east_west",
  UpNorthSouth = "up_north_south",
  West = "west",
}

function setLever(pos: Vector3, direction: LeverDirection, isOpen: boolean) {
  world
    .getDimension("overworld")
    .runCommandAsync(
      `/setblock ${pos.x} ${pos.y} ${pos.z} lever["lever_direction":"${direction}","open_bit":${
        isOpen ? "true" : "false"
      }]`
    );

  ///setblock 53 70 216 lever["lever_direction"="down_east_west","open_bit"=false]
}

export { clone, LeverDirection, setLever };
