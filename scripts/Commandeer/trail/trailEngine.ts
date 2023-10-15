import { MolangVariableMap, Vector3, world } from "@minecraft/server";
import { Vector3Add } from "../utils/vectorUtils";
import { TrailType } from "./trailTypes";

class TrailPoint {
  postion: Vector3;
  index: number;

  constructor(position: Vector3, index: number) {
    this.postion = position;
    this.index = index;
  }

  spawn() {
    let spawnPosition: Vector3 = Vector3Add(this.postion, { x: 0.5, y: 0.5, z: 0.5 });
    try {
      world
        .getDimension("overworld")
        .spawnParticle("minecraft:balloon_gas_particle", spawnPosition, new MolangVariableMap());
    } catch (e) {}
  }
}

class Trail {
  id: string;
  points: TrailPoint[] = [];
  currentPoint: number = 0;
  nextParticleTimer: number = 0;
  currentParticleCounter: number = 0;

  calculatedLength: number = 0;
  constructor(id: string, nextParticleTimer: number = 5) {
    this.id = id;
    this.nextParticleTimer = nextParticleTimer;
  }

  addPoint(point: TrailPoint) {
    this.points.push(point);

    //this could be a one liner,
    let maxlength: number = 0;
    this.points.forEach((point) => {
      if (point.index > maxlength) {
        maxlength = point.index;
      }
    });
    this.calculatedLength = maxlength;
  }

  fromTrail(trail: TrailType) {
    trail.points.forEach((point) => {
      this.addPoint(new TrailPoint(point.vector3, point.index));
    });
  }

  spawnNext() {
    if (this.currentParticleCounter >= this.nextParticleTimer) {
      this.currentParticleCounter = 0;

      this.points
        .filter((point) => {
          return point.index === this.currentPoint;
        })
        .forEach((point) => {
          point.spawn();
        });

      this.currentPoint++;
      if (this.currentPoint >= this.calculatedLength) {
        this.currentPoint = 0;
      }
    } else {
      this.currentParticleCounter++;
    }
  }
}

export { Trail, TrailPoint };
