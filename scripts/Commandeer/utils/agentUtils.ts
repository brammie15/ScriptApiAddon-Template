import { MinecraftEntityTypes, Vector3, world } from "@minecraft/server";
import { Vector3ToString, vector3 } from "./vectorUtils";
import { mindKeeper } from "../../main";
function teleportAgent(position: Vector3) {
  world
    .getDimension("overworld")
    .runCommand(`/execute as @a run tp @e[type=agent] ${position.x} ${position.y} ${position.z}`);
}

function isAgentAt(position: Vector3): boolean {
  let isAgentAt: boolean = false;
  world
    .getDimension("overworld")
    .getEntitiesAtBlockLocation(position)
    .forEach((entity) => {
      if (!entity.isValid()) {
        world.sendMessage("INVALID ENTITY");
        return;
      }
      if (entity.typeId == "minecraft:agent") {
        isAgentAt = true;
      }
    });
  return isAgentAt;
}

function getAgentLocation(): Vector3 {
  let agentLocation: Vector3 = vector3(0, 0, 0);
  let agent = world.getEntity(mindKeeper.get("agentid") as string);
  agentLocation = agent!.location;

  return agentLocation;
}

export { teleportAgent, isAgentAt, getAgentLocation };
