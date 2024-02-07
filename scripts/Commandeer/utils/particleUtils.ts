import { MolangVariableMap, Vector3, world } from "@minecraft/server";
import { Vector3Add, vector3 } from "./vectorUtils";

const bedrockParticles = [
  "minecraft:mobspell_emitter",
  "minecraft:villager_angry",
  "minecraft:bleach",
  "minecraft:breaking_item_icon",
  "minecraft:blockdust",
  "minecraft:bubble_column_up_particle",
  "minecraft:compfire_smoke_particle",
  "minecraft:campfire_tall_smoke_particle",
  "minecraft:cherry_leaves_particle",
  "minecraft:crop_growth_emitter",
  "minecraft:conduit_particle",
  "minecraft:critical_hit_emitter",
  "minecraft:bubble_column_down_particle",
  "minecraft:dolphin_move_particle",
  "minecraft:dragon_breath_trail",
  "minecraft:dragon_breath_lingering",
  "minecraft:lava_drip_particle",
  "minecraft:water_drip_particle",
  "minecraft:redstone_wire_dust_particle",
  "minecraft:sculk_sensor_redstone_particle",
  "minecraft:splash_spell_emitter",
  "minecraft:electric_spark__particle",
  "minecraft:enchanting_table_particle",
  "minecraft:endrod",
  "minecraft:balloon_gas_particle",
  "minecraft:evoker_spell",
  "minecraft:huge_explosion_emitter",
  "minecraft:falling_dust_red_sand_particle",
  "minecraft:falling_dust_sand_particle",
  "minecraft:falling_dust_gravel_particle",
  "minecraft:falling_dust_top_snow_particle",
  "minecraft:falling_dust_dragon_egg_particle",
  "minecraft:falling_dust_concrete_particle",
  "minecraft:falling_dust_scaffolding_particle",
  "minecraft:honey_drip_particle",
  "minecraft:nectar_drip_particle",
  "minecraft:obsidian_tear_particle",
  "minecraft:spore_blossom_shower_particle",
  "minecraft:water_splash_particle",
  "minecraft:sparkler_emitter",
  "minecraft:water_wake_particle",
  "minecraft:basic_flame_particle",
  "minecraft:flash",
  "minecraft:glow_particle",
  "minecraft:villager_happy",
  "minecraft:heart_particle",
  "minecraft:water_evaporation_actor_emitter",
  "minecraft:lava_particle",
  "minecraft:mobflame_emitter",
  "minecraft:mobflame_single",
  "minecraft:mycelium_dust_particle",
  "minecraft:note_particle",
  "minecraft:explode",
  "minecraft:mob_portal",
  "minecraft:rainsplash",
  "minecraft:basic_smoke_particle",
  "minecraft:snowflake_particle",
  "minecraft:soul_particle",
  "minecraft:blue_flame_particle",
  "minecraft:spore_blossom_ambient_particle",
  "minecraft:watersplash",
  "minecraft:terrain",
  "minecraft:totem_particle",
  "minecraft:tracking_emitter",
  "minecraft:vibration_signal",
  "minecraft:wax_particle",
  "minecraft:witchspell",
];

const PARTICLES = {
  mobspell_emitter: "minecraft:mobspell_emitter",
  villager_angry: "minecraft:villager_angry",
  bleach: "minecraft:bleach",
  breaking_item_icon: "minecraft:breaking_item_icon",
  blockdust: "minecraft:blockdust",
  bubble_column_up_particle: "minecraft:bubble_column_up_particle",
  compfire_smoke_particle: "minecraft:compfire_smoke_particle",
  campfire_tall_smoke_particle: "minecraft:campfire_tall_smoke_particle",
  cherry_leaves_particle: "minecraft:cherry_leaves_particle",
  crop_growth_emitter: "minecraft:crop_growth_emitter",
  conduit_particle: "minecraft:conduit_particle",
  critical_hit_emitter: "minecraft:critical_hit_emitter",
  bubble_column_down_particle: "minecraft:bubble_column_down_particle",
  dolphin_move_particle: "minecraft:dolphin_move_particle",
  dragon_breath_trail: "minecraft:dragon_breath_trail",
  dragon_breath_lingering: "minecraft:dragon_breath_lingering",
  lava_drip_particle: "minecraft:lava_drip_particle",
  water_drip_particle: "minecraft:water_drip_particle",
  redstone_wire_dust_particle: "minecraft:redstone_wire_dust_particle",
  sculk_sensor_redstone_particle: "minecraft:sculk_sensor_redstone_particle",
  splash_spell_emitter: "minecraft:splash_spell_emitter",
  electric_spark__particle: "minecraft:electric_spark__particle",
  enchanting_table_particle: "minecraft:enchanting_table_particle",
  endrod: "minecraft:endrod",
  balloon_gas_particle: "minecraft:balloon_gas_particle",
  evoker_spell: "minecraft:evoker_spell",
  huge_explosion_emitter: "minecraft:huge_explosion_emitter",
  falling_dust_red_sand_particle: "minecraft:falling_dust_red_sand_particle",
  falling_dust_sand_particle: "minecraft:falling_dust_sand_particle",
  falling_dust_gravel_particle: "minecraft:falling_dust_gravel_particle",
  falling_dust_top_snow_particle: "minecraft:falling_dust_top_snow_particle",
  falling_dust_dragon_egg_particle: "minecraft:falling_dust_dragon_egg_particle",
  falling_dust_concrete_particle: "minecraft:falling_dust_concrete_particle",
  falling_dust_scaffolding_particle: "minecraft:falling_dust_scaffolding_particle",
  honey_drip_particle: "minecraft:honey_drip_particle",
  nectar_drip_particle: "minecraft:nectar_drip_particle",
  obsidian_tear_particle: "minecraft:obsidian_tear_particle",
  spore_blossom_shower_particle: "minecraft:spore_blossom_shower_particle",
  water_splash_particle: "minecraft:water_splash_particle",
  sparkler_emitter: "minecraft:sparkler_emitter",
  water_wake_particle: "minecraft:water_wake_particle",
  basic_flame_particle: "minecraft:basic_flame_particle",
  flash: "minecraft:flash",
  glow_particle: "minecraft:glow_particle",
  villager_happy: "minecraft:villager_happy",
  heart_particle: "minecraft:heart_particle",
  water_evaporation_actor_emitter: "minecraft:water_evaporation_actor_emitter",
  lava_particle: "minecraft:lava_particle",
  mobflame_emitter: "minecraft:mobflame_emitter",
  mobflame_single: "minecraft:mobflame_single",
  mycelium_dust_particle: "minecraft:mycelium_dust_particle",
  note_particle: "minecraft:note_particle",
  explode: "minecraft:explode",
  mob_portal: "minecraft:mob_portal",
  rainsplash: "minecraft:rainsplash",
  basic_smoke_particle: "minecraft:basic_smoke_particle",
  snowflake_particle: "minecraft:snowflake_particle",
  soul_particle: "minecraft:soul_particle",
  blue_flame_particle: "minecraft:blue_flame_particle",
  spore_blossom_ambient_particle: "minecraft:spore_blossom_ambient_particle",
  watersplash: "minecraft:watersplash",
  terrain: "minecraft:terrain",
  totem_particle: "minecraft:totem_particle",
  tracking_emitter: "minecraft:tracking_emitter",
  vibration_signal: "minecraft:vibration_signal",
  wax_particle: "minecraft:wax_particle",
  witchspell: "minecraft:witchspell",
  point: "codecosmos:point",
};

class ParticleColumn {
  pos: Vector3;
  radius: number;
  pointsPerLayer: number;
  layerCount: number;
  particle: string;
  points: Vector3[] = [];
  speed: number;
  anglePerLayer: number[] = [];
  tickCounter: number = 0;

  constructor(
    pos: Vector3,
    radius: number,
    pointsPerLayer: number,
    layerCount: number,
    speed: number,
    particle: string
  ) {
    this.pos = pos;
    this.radius = radius;
    this.particle = particle;
    this.pointsPerLayer = pointsPerLayer;
    this.layerCount = layerCount;
    this.speed = speed;
    this.generatePoints();
  }

  generatePoints() {
    for (let layer = 0; layer < this.layerCount; layer++) {
      let layerRadius = this.radius - layer;
      for (let point = 0; point < this.pointsPerLayer; point++) {
        let angle = (point / this.pointsPerLayer) * (Math.PI * 2);
        this.anglePerLayer.push(angle);
        let x = Math.cos(angle) * layerRadius;
        let z = Math.sin(angle) * layerRadius;
        let y = layer;
        this.points.push(Vector3Add(this.pos, vector3(x, y, z)));
      }
    }
  }

  update() {
    //update each point by increasing the angle by the speed
    let layerCount = 0;
    let pointCount = 0;
    this.tickCounter++;
    if (this.tickCounter % 2 == 0) {
      this.points.forEach((point, index) => {
        let layer = Math.floor(index / this.pointsPerLayer);
        let angle = this.anglePerLayer[index];
        angle += this.speed * (layer / 5);
        this.anglePerLayer[index] = angle;
        let layerRadius = this.radius - Math.floor(index / this.pointsPerLayer);
        let calcAngle = angle;
        let x = Math.cos(calcAngle) * this.radius;
        let z = Math.sin(calcAngle) * this.radius;
        let y = Math.floor(index / this.pointsPerLayer) + (this.tickCounter % 2);
        this.points[index] = Vector3Add(this.pos, vector3(x, y, z));
      });
    }
  }
  draw() {
    this.points.forEach((point) => {
      spawnParticle(point);
    });
  }
}

function spawnParticle(
  position: Vector3,
  particle: string = PARTICLES.balloon_gas_particle,
  map: MolangVariableMap = new MolangVariableMap()
) {
  //check if the chunk is loaded
  const chunk = world.getDimension("overworld").getBlock(position);
  if (!chunk?.isValid) {
    return;
  }

  world.getDimension("overworld").getPlayers()[0].dimension.spawnParticle(particle, position, map);
}

export { PARTICLES, bedrockParticles, ParticleColumn, spawnParticle };
