import { Vector3 } from "@minecraft/server";

type TrailPointType = {
  index: number;
  position: Vector3;
};

type TrailType = {
  name: string;
  points: TrailPointType[];
};

export { TrailPointType, TrailType };
