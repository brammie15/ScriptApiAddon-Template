import { LevelLeverCondition } from "../Commandeer/level/levelTypes";
import { vector3 } from "../Commandeer/utils/vectorUtils";

let levelIntroConditions: LevelLeverCondition = {
  conditions: [
    {
      position: vector3(28, 70, 268),
      state: true,
    },
    {
      position: vector3(29, 70, 268),
      state: false,
    },
    {
      position: vector3(30, 70, 268),
      state: false,
    },
    {
      position: vector3(31, 70, 268),
      state: true,
    },
    {
      position: vector3(32, 70, 268),
      state: false,
    },
    {
      position: vector3(33, 70, 268),
      state: true,
    },
    {
      position: vector3(34, 70, 268),
      state: false,
    },
    {
      position: vector3(35, 70, 268),
      state: true,
    },
    {
      position: vector3(36, 70, 268),
      state: false,
    },
    {
      position: vector3(37, 70, 268),
      state: false,
    },
    {
      position: vector3(38, 70, 268),
      state: true,
    },
  ],
};

export { levelIntroConditions };
