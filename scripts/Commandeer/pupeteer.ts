import { RawText, TicksPerSecond, TitleDisplayOptions, Vector3, World, system } from "@minecraft/server";
import { delayedRun } from "./utils/waitUtil";

class Pupeteer {
  world: World;

  constructor(world: World) {
    this.world = world;
  }

  private getActualString(message: string): string | RawText {
    if (message.startsWith("%")) {
      const key = message.substring(1);
      return { rawtext: [{ translate: key }] };
    }
    return message;
  }

  setActionBarTimed(message: string, duration: number): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setActionBar(this.getActualString(message));
    });
    delayedRun(() => {
      this.clearActionBar();
    }, duration * TicksPerSecond);
  }

  setActionBar(message: string): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setActionBar(this.getActualString(message));
    });
  }

  setTitleTimed(message: string, duration: number): void {
    this.world.getPlayers().forEach((player) => {
      let options: TitleDisplayOptions = {
        fadeInDuration: 20,
        fadeOutDuration: 20,
        stayDuration: duration * TicksPerSecond,
      };
      player.onScreenDisplay.setTitle(this.getActualString(message), options);
    });
  }

  setTitle(message: string): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setTitle(message);
    });
  }

  updateSubtitle(message: string): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.updateSubtitle(this.getActualString(message));
    });
  }

  clearTitle(): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setTitle("");
    });
  }

  clearSubtitle(): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.updateSubtitle("");
    });
  }

  clearActionBar(): void {
    this.world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setActionBar("");
    });
  }

  testForLocation(location: Vector3, radius: number): boolean {
    let isPlayerInArea = false;
    this.world.getPlayers().forEach((player) => {
      let dx = location.x - player.location.x;
      let dy = location.y - player.location.y;
      let dz = location.z - player.location.z;

      let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (distance < radius) {
        isPlayerInArea = true;
      }
    });
    return isPlayerInArea;
  }

  setNpcText(npcTag: string, sceneName: string) {
    this.world.getDimension("overworld").runCommand(`/dialogue change @e[tag=${npcTag}] ${sceneName} @a`);
  }
}

export default Pupeteer;
