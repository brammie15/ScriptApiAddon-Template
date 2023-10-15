import { Vector3 } from "@minecraft/server";
import { TrailType } from "../Commandeer/trail/trailTypes";

let startTrail: TrailType = {
  name: "startTrail",
  points: [
    { index: 1, vector3: { x: 213, y: 68, z: 173 } },
    { index: 2, vector3: { x: 213, y: 68, z: 172 } },
    { index: 3, vector3: { x: 213, y: 68, z: 171 } },
    { index: 4, vector3: { x: 213, y: 68, z: 170 } },
    { index: 5, vector3: { x: 213, y: 68, z: 169 } },
    { index: 6, vector3: { x: 213, y: 68, z: 168 } },
    { index: 7, vector3: { x: 213, y: 68, z: 167 } },
    { index: 8, vector3: { x: 213, y: 68, z: 166 } },
    { index: 9, vector3: { x: 213, y: 68, z: 165 } },
    { index: 10, vector3: { x: 213, y: 68, z: 164 } },
    { index: 11, vector3: { x: 213, y: 68, z: 163 } },
    { index: 12, vector3: { x: 213, y: 68, z: 162 } },
    { index: 13, vector3: { x: 213, y: 68, z: 161 } },
    { index: 14, vector3: { x: 213, y: 68, z: 160 } },
    { index: 15, vector3: { x: 213, y: 68, z: 159 } },
    { index: 16, vector3: { x: 213, y: 68, z: 158 } },
    { index: 17, vector3: { x: 213, y: 68, z: 157 } },
    { index: 18, vector3: { x: 213, y: 68, z: 156 } },
    { index: 19, vector3: { x: 213, y: 68, z: 155 } },
    { index: 20, vector3: { x: 213, y: 68, z: 154 } },
    { index: 21, vector3: { x: 213, y: 68, z: 153 } },
    { index: 22, vector3: { x: 213, y: 68, z: 152 } },
    { index: 23, vector3: { x: 213, y: 68, z: 151 } },
    { index: 24, vector3: { x: 213, y: 68, z: 150 } },
    { index: 25, vector3: { x: 213, y: 68, z: 149 } },
    { index: 26, vector3: { x: 213, y: 68, z: 148 } },
    { index: 27, vector3: { x: 213, y: 68, z: 147 } },
    { index: 28, vector3: { x: 213, y: 68, z: 146 } },
    { index: 29, vector3: { x: 213, y: 68, z: 145 } },

    { index: 30, vector3: { x: 213, y: 69, z: 145 } },

    { index: 31, vector3: { x: 213, y: 69, z: 144 } },
    { index: 32, vector3: { x: 213, y: 69, z: 143 } },
    { index: 33, vector3: { x: 213, y: 70, z: 143 } },

    { index: 34, vector3: { x: 213, y: 70, z: 142 } },
    { index: 35, vector3: { x: 213, y: 70, z: 141 } },
    { index: 36, vector3: { x: 213, y: 70, z: 140 } },
    { index: 37, vector3: { x: 213, y: 70, z: 139 } },
    { index: 38, vector3: { x: 213, y: 70, z: 138 } },
    { index: 39, vector3: { x: 213, y: 70, z: 137 } },
    { index: 40, vector3: { x: 213, y: 70, z: 136 } },
    { index: 1, vector3: { x: 213, y: 70, z: 135 } },
    { index: 2, vector3: { x: 213, y: 70, z: 134 } },
    { index: 3, vector3: { x: 213, y: 70, z: 133 } },
    { index: 4, vector3: { x: 213, y: 70, z: 132 } },
    { index: 5, vector3: { x: 213, y: 70, z: 131 } },
    { index: 6, vector3: { x: 213, y: 70, z: 130 } },
    { index: 7, vector3: { x: 213, y: 70, z: 129 } },
    { index: 8, vector3: { x: 213, y: 70, z: 128 } },
    { index: 9, vector3: { x: 213, y: 70, z: 127 } },
    { index: 10, vector3: { x: 213, y: 70, z: 126 } },
    { index: 11, vector3: { x: 213, y: 70, z: 125 } },
    { index: 12, vector3: { x: 213, y: 70, z: 124 } },
    { index: 13, vector3: { x: 213, y: 70, z: 123 } },
    { index: 14, vector3: { x: 213, y: 70, z: 122 } },
    { index: 15, vector3: { x: 213, y: 70, z: 121 } },
    { index: 16, vector3: { x: 213, y: 70, z: 120 } },
    { index: 17, vector3: { x: 213, y: 70, z: 119 } },
    { index: 18, vector3: { x: 213, y: 70, z: 118 } },
    { index: 19, vector3: { x: 213, y: 70, z: 117 } },
    { index: 20, vector3: { x: 213, y: 70, z: 116 } },
    { index: 21, vector3: { x: 213, y: 70, z: 115 } },
    { index: 22, vector3: { x: 213, y: 70, z: 114 } },
    { index: 23, vector3: { x: 213, y: 70, z: 113 } },
    { index: 24, vector3: { x: 213, y: 70, z: 112 } },
    { index: 25, vector3: { x: 213, y: 70, z: 111 } },

    { index: 26, vector3: { x: 214, y: 70, z: 110 } },

    { index: 27, vector3: { x: 215, y: 70, z: 109 } },
    { index: 28, vector3: { x: 216, y: 70, z: 109 } },
    { index: 29, vector3: { x: 217, y: 70, z: 109 } },
    { index: 30, vector3: { x: 218, y: 70, z: 109 } },
    { index: 31, vector3: { x: 219, y: 70, z: 109 } },
    { index: 32, vector3: { x: 220, y: 70, z: 109 } },
    { index: 33, vector3: { x: 221, y: 70, z: 109 } },

    { index: 34, vector3: { x: 222, y: 70, z: 108 } },
    { index: 35, vector3: { x: 223, y: 70, z: 107 } },
    { index: 36, vector3: { x: 224, y: 70, z: 106 } },
    { index: 37, vector3: { x: 225, y: 70, z: 105 } },

    { index: 38, vector3: { x: 225, y: 70, z: 104 } },
    { index: 39, vector3: { x: 225, y: 70, z: 103 } },
    { index: 40, vector3: { x: 225, y: 70, z: 102 } },
    { index: 1, vector3: { x: 225, y: 70, z: 101 } },
    { index: 2, vector3: { x: 225, y: 70, z: 100 } },
    { index: 3, vector3: { x: 225, y: 70, z: 99 } },
    { index: 4, vector3: { x: 225, y: 70, z: 98 } },
    { index: 5, vector3: { x: 225, y: 70, z: 97 } },
    { index: 6, vector3: { x: 225, y: 70, z: 96 } },
    { index: 7, vector3: { x: 225, y: 70, z: 95 } },
    { index: 8, vector3: { x: 225, y: 70, z: 94 } },
    { index: 9, vector3: { x: 225, y: 70, z: 93 } },
    { index: 10, vector3: { x: 225, y: 70, z: 92 } },
    { index: 11, vector3: { x: 225, y: 70, z: 91 } },
    { index: 12, vector3: { x: 225, y: 70, z: 90 } },
    { index: 13, vector3: { x: 225, y: 70, z: 89 } },
    { index: 14, vector3: { x: 225, y: 70, z: 88 } },
    { index: 15, vector3: { x: 225, y: 70, z: 87 } },
    { index: 16, vector3: { x: 225, y: 70, z: 86 } },
    { index: 17, vector3: { x: 225, y: 70, z: 85 } },
    { index: 18, vector3: { x: 225, y: 70, z: 84 } },
    { index: 19, vector3: { x: 225, y: 70, z: 83 } },
    { index: 20, vector3: { x: 225, y: 70, z: 82 } },
    { index: 21, vector3: { x: 225, y: 70, z: 81 } },
    { index: 22, vector3: { x: 225, y: 70, z: 80 } },
    { index: 23, vector3: { x: 225, y: 70, z: 79 } },
    { index: 24, vector3: { x: 225, y: 70, z: 78 } },
    { index: 25, vector3: { x: 225, y: 70, z: 77 } },
    { index: 26, vector3: { x: 225, y: 70, z: 76 } },
    { index: 27, vector3: { x: 225, y: 70, z: 75 } },
    { index: 28, vector3: { x: 225, y: 70, z: 74 } },
    { index: 29, vector3: { x: 225, y: 70, z: 73 } },
    { index: 30, vector3: { x: 225, y: 70, z: 72 } },
    { index: 31, vector3: { x: 225, y: 70, z: 71 } },
    { index: 32, vector3: { x: 225, y: 70, z: 70 } },
    { index: 33, vector3: { x: 225, y: 70, z: 69 } },
    { index: 34, vector3: { x: 225, y: 70, z: 68 } },
    { index: 35, vector3: { x: 225, y: 70, z: 67 } },
    { index: 36, vector3: { x: 225, y: 70, z: 66 } },
    { index: 37, vector3: { x: 225, y: 70, z: 65 } },
    { index: 38, vector3: { x: 225, y: 70, z: 64 } },
    { index: 39, vector3: { x: 225, y: 70, z: 63 } },
    { index: 40, vector3: { x: 225, y: 70, z: 62 } },
    { index: 41, vector3: { x: 225, y: 70, z: 61 } },
    { index: 42, vector3: { x: 225, y: 70, z: 60 } },
    { index: 43, vector3: { x: 225, y: 70, z: 59 } },
  ],
};

export { startTrail };
