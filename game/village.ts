import * as T from 'three';
import { Forms, random } from './art';

const rng = random(9135);
const between = (a: number, b: number) => a + (b - a) * rng();
const pick = (colors: number[]) => colors[Math.floor(rng() * colors.length)];
const wood = 0x634634,
  plaster = 0xe4cba5,
  stone = [0xa99e87, 0x928d7b, 0xb9ae99, 0x827d6f];
const grass = [0x778853, 0x697d4e, 0x9ba568, 0xb1ad73],
  leaves = [0xca792f, 0xb86332, 0xcd9135, 0xe9a73b, 0xa7582d, 0xe9b44e];
function windowFrame(f: Forms, x: number, y: number, z: number, w: number, h: number) {
  f.box(wood, [x, y, z], [w + 0.15, h + 0.15, 0.115]);
  f.box(0xedcc94, [x, y, z + 0.07], [w, h, 0.035]);
  // A cool upper pane catches daylight above the warmer curtains.
  f.box(0xb6c3b9, [x, y + h * 0.246, z + 0.097], [w * 0.935, h * 0.425, 0.012]);
  for (const s of [-1, 1])
    f.box(0xf2d4a8, [x + s * w * 0.376, y - 0.035, z + 0.097], [w * 0.152, h * 0.85, 0.014]);
  f.box(wood, [x, y, z + 0.099], [0.052, h, 0.052]);
  f.box(wood, [x, y + 0.045, z + 0.1], [w, 0.052, 0.052]);
  f.box(0x88664b, [x, y - h / 2 - 0.07, z + 0.07], [w + 0.26, 0.095, 0.285]);
}
function cottage(f: Forms) {
  const x = -2.65,
    z = -3.92,
    front = -2.35,
    eaves = 2.82,
    ridge = 4.27,
    half = 2.18;
  f.box(plaster, [x, 1.43, z], [4.03, 2.78, 3.14]);
  for (let row = 0; row < 3; row++)
    for (let j = 0; j < 11; j++) {
      f.box(pick(stone), [x - 1.85 + j * 0.37, 0.095 + row * 0.145, front + 0.024], [0.347, 0.128, 0.077]);
    }
  for (const dx of [-1.95, -1.45, 0, 1.45, 1.95]) f.box(wood, [x + dx, 1.6, front + 0.027], [0.1, 2.42, 0.1]);
  for (const y of [0.48, 2.53, 2.8]) f.box(wood, [x, y, front + 0.05], [4.08, 0.117, 0.128]);
  const slope = Math.atan((ridge - eaves) / half);
  // Gable is filled by timber-backed plaster. Overlapping slate courses follow both pitches.
  for (let i = -20; i <= 20; i++) {
    const dx = i * 0.1,
      h = Math.max(0.025, ridge - eaves - Math.abs(dx) * Math.tan(slope));
    f.box(plaster, [x + dx, eaves + h / 2, z], [0.104, h, 3.13]);
  }
  for (const s of [-1, 1]) {
    const pitch = (ridge - eaves) / half;
    f.box(
      0x62574a,
      [x + (s * half) / 2, (ridge + eaves) / 2, z],
      [Math.hypot(half, ridge - eaves) + 0.31, 0.15, 3.76],
      [0, 0, -s * slope],
    );
    for (let row = 0; row < 8; row++)
      for (let j = 0; j < 13; j++) {
        const dx = (row + 0.48) * 0.285;
        f.box(
          pick([0x736b59, 0x83775f, 0x6a665a, 0x948570, 0x786d5e]),
          [x + s * dx, ridge - dx * pitch + 0.083, z - 1.77 + j * 0.287 + (row % 2) * 0.043],
          [0.406, 0.088, 0.277],
          [0, 0, -s * slope],
        );
      }
    f.rod(wood, [x, 4.3, front + 0.314], [x + s * 2.31, 2.74, front + 0.314], 0.093);
    f.rod(wood, [x + s * 1.84, 2.7, front + 0.093], [x + s * 0.52, 3.78, front + 0.093], 0.053);
  }
  f.box(wood, [x, 3.49, front + 0.07], [0.111, 1.45, 0.13]);
  windowFrame(f, x, 3.29, front + 0.128, 0.48, 0.55);
  for (const dx of [-1.32, 1.32]) {
    windowFrame(f, x + dx, 1.54, front + 0.08, 0.71, 0.88);
    f.box(0x79573d, [x + dx, 0.99, front + 0.17], [0.89, 0.184, 0.315]);
    for (let i = 0; i < 13; i++) {
      const xx = x + dx + between(-0.39, 0.39),
        yy = between(1.09, 1.21);
      f.oval(0x617443, [xx, yy, front + 0.2], [0.07, 0.087, 0.095]);
      if (i % 2) f.oval(0xc87865, [xx, yy + 0.043, front + 0.25], [0.044, 0.035, 0.045]);
    }
  }
  f.box(wood, [x, 0.96, front + 0.086], [0.95, 1.93, 0.17]);
  for (let i = 0; i < 7; i++)
    f.box(i % 2 ? 0x99704a : 0x916948, [x - 0.347 + i * 0.116, 0.925, front + 0.187], [0.109, 1.78, 0.065]);
  // Three planks make a braced door, with a recessed fanlight and a brass handle.
  for (const y of [0.39, 1.33]) f.box(0x78563a, [x, y, front + 0.226], [0.77, 0.063, 0.042]);
  f.oval(wood, [x, 1.57, front + 0.224], [0.222, 0.206, 0.031]);
  f.oval(0xabb8a3, [x, 1.57, front + 0.25], [0.168, 0.153, 0.015]);
  f.box(wood, [x, 1.57, front + 0.271], [0.026, 0.309, 0.019]);
  f.box(wood, [x, 1.57, front + 0.271], [0.325, 0.024, 0.019]);
  f.oval(0xb79b61, [x + 0.278, 0.93, front + 0.247], [0.052, 0.052, 0.033]);
  for (let i = 0; i < 2; i++)
    f.box(pick(stone), [x, 0.058 + i * 0.09, front + 0.524 - i * 0.19], [1.22 - i * 0.12, 0.125, 0.46]);
  f.box(wood, [x + 0.69, 1.86, front + 0.17], [0.071, 0.34, 0.12]);
  f.box(0x594738, [x + 0.69, 1.75, front + 0.284], [0.222, 0.31, 0.197]);
  f.box(0xffcd78, [x + 0.69, 1.746, front + 0.303], [0.164, 0.218, 0.186]);
  f.box(0x54463e, [x + 0.69, 1.928, front + 0.289], [0.267, 0.075, 0.244]);
  // The side elevation remains visible as the camera follows the player.
  for (const dz of [-1.49, 0, 1.49]) f.box(wood, [x + 2.034, 1.51, z + dz], [0.12, 2.65, 0.12]);
  for (const y of [0.47, 2.54]) f.box(wood, [x + 2.04, y, z], [0.12, 0.12, 3.16]);
  f.box(wood, [x + 2.07, 1.56, z + 0.21], [0.13, 0.86, 0.77]);
  f.box(0xe8b66f, [x + 2.145, 1.56, z + 0.21], [0.035, 0.68, 0.57]);
  f.box(wood, [x + 2.17, 1.56, z + 0.21], [0.045, 0.72, 0.048]);
  f.box(wood, [x + 2.17, 1.56, z + 0.21], [0.045, 0.045, 0.6]);
  // Climbing foliage breaks up the timber join beside the kitchen window.
  for (let vine = 0; vine < 3; vine++)
    for (let i = 0; i < 17; i++) {
      const y = 0.3 + i * 0.156,
        xx = x + 1.83 + 0.11 * Math.sin(i * 0.51 + vine * 1.6) - Math.max(0, y - 2.18) * 0.68;
      f.speck(
        pick([0x46664b, 0x758c5b, 0x9d9c62, 0x626a3e]),
        [xx + (vine - 1) * 0.088, y, front + 0.167],
        [0.074, 0.085, 0.033],
        [0.18, 0, 0.58 * Math.cos(i)],
      );
    }
  for (let row = 0; row < 8; row++)
    for (let i = 0; i < 2; i++) {
      f.box(pick(stone), [x - 1.26 + i * 0.252, 3.48 + row * 0.156, z - 0.7], [0.244, 0.15, 0.49]);
    }
  f.box(0x787260, [x - 1.135, 4.69, z - 0.7], [0.635, 0.132, 0.61]);
}
function tree(f: Forms, x: number, z: number, height: number) {
  const base = height * 0.47;
  f.rod(wood, [x, 0, z], [x + 0.14, base + 0.1, z], height * 0.038);
  for (let i = 0; i < 10; i++) {
    const a = i * 2.4,
      spread = height * between(0.13, 0.265);
    const bx = x + Math.cos(a) * spread,
      bz = z + Math.sin(a) * spread,
      by = height * between(0.65, 0.95);
    f.rod(i % 2 ? wood : 0x75523c, [x + 0.08, base * 0.85, z], [bx, by - 0.17, bz], height * 0.019);
    const r = height * between(0.135, 0.225);
    f.speck(pick(leaves), [bx, by, bz], [r, r * 0.8, r], [0.2, a, 0.2]);
    for (let j = 0; j < 44; j++) {
      const angle = between(0, 6.28),
        t = between(-1, 1),
        d = Math.sqrt(1 - t * t),
        l = height * between(0.019, 0.053);
      f.speck(
        pick(leaves),
        [bx + r * d * Math.cos(angle), by + r * 0.77 * t, bz + r * d * Math.sin(angle)],
        [l, l * 0.44, l * 0.76],
        [t, angle, angle * 0.3],
      );
    }
  }
}
function camellias(f: Forms, x: number, z: number, r: number) {
  for (let i = 0; i < 28; i++) {
    const a = between(0, 6.28),
      d = r * Math.sqrt(rng()),
      xx = x + Math.cos(a) * d,
      zz = z + Math.sin(a) * d;
    const y = 0.17 + 0.31 * (1 - d / r) + between(0, 0.13);
    f.speck(pick([0x445d42, 0x526c45, 0x647e4f]), [xx, y, zz], [0.12, 0.124, 0.133]);
    for (let k = 0; k < 6; k++) {
      const b = k * 1.047 + i;
      f.speck(
        pick([0x3c5d41, 0x556f46, 0x77884d]),
        [xx + 0.09 * Math.cos(b), y + 0.078, zz + 0.09 * Math.sin(b)],
        [0.038, 0.024, 0.081],
        [0.44, b, -0.16],
      );
    }
    if (i % 3) continue;
    for (let p = 0; p < 5; p++) {
      const b = p * 1.2566;
      f.oval(
        i % 2 ? 0xc76c68 : 0xe19c91,
        [xx + Math.cos(b) * 0.041, y + 0.11, zz + Math.sin(b) * 0.041],
        [0.046, 0.043, 0.046],
      );
    }
    f.oval(0xd9b476, [xx, y + 0.141, zz], [0.022, 0.018, 0.022]);
  }
}
function whiteSpray(f: Forms, x: number, z: number) {
  for (let i = 0; i < 9; i++) {
    const xx = x + between(-0.21, 0.21),
      zz = z + between(-0.17, 0.17),
      y = between(0.24, 0.49);
    f.rod(0x718052, [x, 0.043, z], [xx, y, zz], 0.008);
    for (let j = 0; j < 3; j++)
      f.speck(
        0xfff4dc,
        [xx + between(-0.045, 0.045), y + between(-0.02, 0.035), zz + between(-0.035, 0.035)],
        [0.032, 0.025, 0.031],
      );
  }
}
const pathZ = (x: number) => 1.67 + 0.36 * Math.sin(x * 0.53);
export function buildVillage(scene: T.Scene) {
  const f = new Forms();
  f.box(0x96a971, [0, -0.165, 0], [115, 0.3, 115]);
  for (let i = 0; i < 1800; i++) {
    const x = between(-18, 18),
      z = between(-15, 10);
    if (Math.abs(z - pathZ(x)) < 1.02 || (Math.abs(x + 2.65) < 0.77 && z < 1.7)) continue;
    // Slender blades gather in tufts beside the flagstones.
    const tuft = between(0.47, 1.13);
    for (let j = 0; j < 4; j++)
      f.speck(
        pick(grass),
        [x + j * 0.016, 0.038 * tuft, z + j * 0.004],
        [0.01, between(0.029, 0.079) * tuft, 0.011],
        [between(-0.22, 0.22), 0, j * 0.26 - 0.39],
      );
    if (i % 12 === 0) {
      f.rod(0x768451, [x, 0.02, z], [x + 0.013, 0.145, z], 0.007);
      f.speck(0xf3e8d0, [x + 0.013, 0.15, z], [0.029, 0.018, 0.028]);
    }
  }
  // Broken flagstones keep the path readable as it turns toward the front door.
  function paver(x: number, z: number, w: number, d: number) {
    f.mesh(
      paving,
      pick([0xb8a98c, 0xbeb19a, 0xd3c3a4, 0xc6b79a, 0xb0a58d]),
      [x, 0.017 + between(0, 0.012), z],
      [w, 0.068, d],
      [0, between(-0.15, 0.15), 0],
    );
  }
  for (let row = -2; row <= 2; row++)
    for (let i = -29; i <= 29; i++) {
      const x = i * 0.49 + (row % 2) * 0.235 + between(-0.045, 0.045);
      paver(x, pathZ(x) + row * 0.346 + between(-0.045, 0.045), between(0.27, 0.315), between(0.199, 0.231));
    }
  for (let i = 0; i < 10; i++)
    for (let j = -1; j <= 1; j++) paver(-2.65 + j * 0.45 + (i % 2) * 0.065, -2.04 + i * 0.299, 0.245, 0.183);
  cottage(f);
  for (let i = 0; i <= 10; i++) {
    const x = 0.25 + i * 0.6;
    if (i % 2 === 0) f.box(wood, [x, 0.43, -2.22], [0.12, 0.85, 0.13]);
    if (i < 10) for (const y of [0.26, 0.6]) f.box(0xa2845e, [x + 0.3, y, -2.22], [0.6, 0.082, 0.08]);
    camellias(f, x, -1.77, 0.39);
    whiteSpray(f, x + 0.19, -1.31 + between(-0.08, 0.08));
  }
  for (const x of [-4.48, -3.99, -1.27, -0.78]) camellias(f, x, -2.02, 0.33);
  for (const [x, z, h] of [
    [-6.4, -3.2, 4.7],
    [4.7, -4.9, 5],
    [-0.6, -8, 4.1],
    [-8, -10, 6.3],
    [9, -7, 5.7],
    [-12, -4, 5],
    [12, -1, 4.8],
    [2.4, -11, 6.2],
    [-5, -12, 5.9],
  ])
    tree(f, x, z, h);
  // A low dry-stone wall marks the distant field and grounds the line of autumn trees.
  for (let i = -26; i < 27; i++) {
    const x = i * 0.65,
      z = -7.68 + 0.42 * Math.sin(x * 0.46);
    for (let row = 0; row < 3; row++)
      f.speck(
        pick(stone),
        [x + (row % 2) * 0.28, 0.077 + row * 0.122, z],
        [0.42, 0.128, 0.208],
        [0, between(-0.18, 0.18), 0],
      );
    if (i % 5 === 0) camellias(f, x, -7.09, 0.4);
  }
  for (let i = -10; i <= 10; i++) {
    const x = i * 3.83,
      y = between(1.2, 4.6);
    f.oval(
      pick([0x7e9576, 0x8ba382, 0x95a88b]),
      [x, -0.9, -16 - between(0, 4)],
      [between(4, 7), y + 1.7, between(3, 5)],
    );
    f.speck(pick([0x8d9ba0, 0x99a6a6, 0xa9b0a7]), [x * 1.65, -1, -34], [between(6, 11), between(6, 10), 6]);
  }
  for (let i = 0; i < 180; i++) {
    const x = between(-8, 8),
      z = between(-4, 6);
    f.speck(pick(leaves), [x, 0.085, z], [between(0.042, 0.085), 0.009, 0.031], [0, between(0, 6.28), 0]);
  }
  f.finish(scene, true);
}
const paving = new T.CylinderGeometry(1, 1, 1, 7);
