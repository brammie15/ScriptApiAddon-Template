import { world, system } from "@minecraft/server";

system.runInterval(() => {
  world.sendMessage("Hello, Minecraft!");
});
