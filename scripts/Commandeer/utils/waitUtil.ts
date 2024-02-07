import { system } from "@minecraft/server";

function delayedRun(callback: Function, delay: number) {
  let timer = system.runTimeout(() => {
    callback();
    system.clearRun(timer);
  }, delay);
}

function delay(t: number) {
  return new Promise((r: any) => {
    system.runTimeout(r, t);
  });
}

export { delayedRun, delay };
