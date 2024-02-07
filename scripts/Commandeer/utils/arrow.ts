import { MolangVariableMap, Vector3, world } from "@minecraft/server";
import { Vector3Add, vector3 } from "./vectorUtils";
import { PARTICLES, spawnParticle } from "./particleUtils";

let arrowTemplate: Vector3[] = [
  vector3(0, 0, 0),

  vector3(1, 1, 0),
  vector3(-1, 1, 0),

  vector3(1.5, 2, 0),
  vector3(-1.5, 2, 0),

  vector3(2, 3, 0),
  vector3(-2, 3, 0),

  vector3(0, 1, 0),
  vector3(0, 2, 0),
  vector3(0, 3, 0),
  vector3(0, 4, 0),
  vector3(0, 5, 0),
];

let offset: Vector3 = vector3(0, 0, 0);

let angleOffset = 0;
let heightBobbing = 0;
let tickCounter = 0;

function rotate(pos: Vector3, angle: number) {
  let x = pos.x;
  let z = pos.z;

  let newX = x * Math.cos(angle) - z * Math.sin(angle);
  let newZ = x * Math.sin(angle) + z * Math.cos(angle);

  return vector3(newX, pos.y, newZ);
}

const particleData = new MolangVariableMap().setColorRGB("variable.color", {
  red: 1,
  green: 1,
  blue: 1,
  alpha: 1,
});

function drawArrow(offsetPos: Vector3) {
  tickCounter++;
  if (tickCounter % 2 == 0) {
    angleOffset += 0.1;
    heightBobbing += 0.3;
    offset = vector3(46.5, 75, 220.5);
    arrowTemplate.forEach((pos) => {
      let rotatedPos = rotate(pos, angleOffset);
      let finalPos = Vector3Add(offsetPos, rotatedPos);
      finalPos.y += Math.sin(heightBobbing) / 2;
      spawnParticle(finalPos, PARTICLES.point, particleData);
    });
  }
}

export { drawArrow };
