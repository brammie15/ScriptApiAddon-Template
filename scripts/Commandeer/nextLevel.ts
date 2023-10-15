class NextLevel {
  currentState = 0;
  states: Array<Function> = [];

  constructor(states: Array<Function>) {
    this.states = states;
  }

  update() {
    this.states[this.currentState]();
  }

  next() {
    this.currentState++;
  }
}
