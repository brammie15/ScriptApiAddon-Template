import { system } from "@minecraft/server";

export function delayedRun(callback: Function, delay: number) {
  let timer = system.runTimeout(() => {
    callback();
    system.clearRun(timer);
  }, delay);
}
