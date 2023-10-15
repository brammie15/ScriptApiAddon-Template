import { World } from "@minecraft/server";

class Level {
  levelCompleteCallback: Function;
  levelCheckCallback: Function;
  levelSetupCallback: Function;
  levelUpdateCallback: Function;
  isCompleted: boolean = false;
  isSetup: boolean = false;

  constructor(
    levelSetupCallback: Function,
    levelUpdateCallback: Function,
    levelCompleteCallback: Function,
    levelCheckCallback: Function
  ) {
    this.levelSetupCallback = levelSetupCallback;
    this.levelCompleteCallback = levelCompleteCallback;
    this.levelCheckCallback = levelCheckCallback;
    this.levelUpdateCallback = levelUpdateCallback;
  }

  setup() {
    this.levelSetupCallback();
  }

  update() {
    if (!this.isSetup) {
      this.setup();
      this.isSetup = true;
    }
    this.levelUpdateCallback();
    if (this.levelCheckCallback() && !this.isCompleted) {
      this.levelCompleteCallback();
      this.isCompleted = true;
    }
  }

  reset() {
    this.isCompleted = false;
  }
}

//nextlevel
//mindkeeper
//pupeteer

export default Level;
