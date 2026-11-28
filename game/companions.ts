import * as T from 'three';
import { Forms, group } from './art';

// Profiles are traced from the hem upward and revolved into cloth with an open front.
function garment(profile: number[][], opening = 0) {
  return new T.LatheGeometry(
    profile.map(([r, y]) => new T.Vector2(r, y)),
    32,
    opening,
    Math.PI * 2 - 2 * opening,
  );
}
const skirt = garment([
  [0.25, 0.55],
  [0.3, 0.57],
  [0.317, 0.605],
  [0.283, 0.76],
  [0.21, 0.99],
  [0.16, 1.02],
]);
const overcoat = garment(
  [
    [0.33, 0.64],
    [0.345, 0.655],
    [0.338, 0.7],
    [0.272, 0.99],
    [0.24, 1.13],
    [0.274, 1.31],
    [0.181, 1.375],
  ],
  0.62,
);
const skirtStripe = garment([
  [1, 0],
  [1, 1],
]);
// Elliptical sections on a curve give the hair a side part and taper into loose ends.
function hairLock(f: Forms, c: number, points: number[][], width: number, depth: number) {
  const curve = new T.CatmullRomCurve3(points.map(([x, y, z]) => new T.Vector3(x, y, z)));
  const vertices: number[] = [],
    indices: number[] = [],
    rings = 10,
    sides = 9;
  for (let i = 0; i <= rings; i++) {
    const t = i / rings,
      mid = curve.getPoint(t),
      tangent = curve.getTangent(t);
    const right = new T.Vector3().crossVectors(tangent, new T.Vector3(0, 0, 1)).normalize();
    const forward = new T.Vector3().crossVectors(right, tangent).normalize();
    const radius = (0.08 + 0.92 * Math.sin(Math.PI * (0.04 + t * 0.94)) ** 0.55) * (1 - 0.25 * t);
    for (let j = 0; j <= sides; j++) {
      const a = (j / sides) * Math.PI * 2;
      const v = mid
        .clone()
        .addScaledVector(right, width * radius * Math.cos(a))
        .addScaledVector(forward, depth * radius * Math.sin(a));
      vertices.push(v.x, v.y, v.z);
      if (i < rings && j < sides) {
        const k = i * (sides + 1) + j;
        indices.push(k, k + sides + 1, k + 1, k + 1, k + sides + 1, k + sides + 2);
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(vertices, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  f.mesh(g, c, [0, 0, 0], [1, 1, 1]);
}

export function makeGaellry(parent: T.Object3D) {
  const root = group(parent),
    body = group(root),
    f = new Forms();
  const cream = 0xe6d8bd,
    coat = 0xac815a,
    trim = 0x79543d,
    scarf = 0x71383a;
  const skin = 0xf0c6ae,
    hair = 0xd4c4ab;
  const legs = [-1, 1].map((side) => {
    const leg = group(body, side * 0.114, 0.71, 0),
      l = new Forms();
    l.oval(0x473d38, [0, -0.22, 0.01], [0.087, 0.24, 0.079]);
    l.oval(0x604333, [0, -0.52, 0], [0.1, 0.19, 0.105]);
    l.oval(0x544034, [0, -0.639, 0.063], [0.114, 0.074, 0.17]);
    l.box(0x332a27, [0, -0.698, 0.057], [0.2, 0.035, 0.263]);
    l.oval(trim, [0, -0.41, 0], [0.105, 0.045, 0.109]);
    l.finish(leg);
    return leg;
  });
  // The plaid skirt shows between the two open fronts of the autumn coat.
  f.mesh(skirt, 0x5c4941, [0, 0, 0.018], [1, 1, 0.72]);
  for (const [y, r] of [
    [0.609, 0.318],
    [0.63, 0.313],
    [0.74, 0.291],
    [0.763, 0.286],
  ]) {
    f.mesh(skirtStripe, 0x997e69, [0, y, 0.018], [r, 0.01, r * 0.72]);
  }
  for (const x of [-0.15, -0.11, 0.06, 0.1]) f.rod(0xb19a81, [x, 0.58, 0.19], [x, 0.95, 0.207], 0.007);
  f.oval(cream, [0, 1.17, 0.025], [0.24, 0.31, 0.186]);
  f.mesh(overcoat, coat, [0, 0, -0.016], [1, 1, 0.82]);
  for (const s of [-1, 1]) {
    f.rod(trim, [s * 0.202, 0.66, 0.215], [s * 0.163, 1.25, 0.16], 0.012);
    f.oval(0xc6a07a, [s * 0.141, 1.225, 0.198], [0.072, 0.157, 0.027], [0, 0, -s * 0.34]);
    for (const y of [0.82, 0.99]) f.oval(trim, [s * 0.18, y, 0.215], [0.018, 0.018, 0.011]);
  }
  const arms = [-1, 1].map((s) => {
    const arm = group(body, s * 0.275, 1.32, 0),
      a = new Forms();
    a.oval(coat, [s * 0.038, -0.18, 0.01], [0.102, 0.236, 0.112], [0, 0, s * 0.12]);
    a.oval(cream, [s * 0.059, -0.368, 0.022], [0.081, 0.077, 0.09]);
    a.oval(skin, [s * 0.062, -0.435, 0.037], [0.074, 0.091, 0.065]);
    a.finish(arm);
    return arm;
  });
  f.rod(trim, [0.25, 1.365, 0.145], [-0.27, 0.825, 0.197], 0.027);
  f.box(0x694938, [-0.322, 0.792, 0.062], [0.155, 0.26, 0.277], [0, 0, -0.08]);
  f.box(0x896447, [-0.33, 0.858, 0.078], [0.167, 0.08, 0.279]);
  f.oval(0xbb9960, [-0.335, 0.807, 0.21], [0.027, 0.029, 0.012]);
  f.oval(scarf, [0, 1.386, 0.018], [0.215, 0.099, 0.2], [0, 0, -0.07]);
  f.oval(0x864448, [0.147, 1.17, 0.236], [0.069, 0.209, 0.036], [0, 0, 0.16]);
  for (const y of [1.04, 1.085]) f.box(0xb78576, [0.17, y, 0.268], [0.103, 0.013, 0.009], [0, 0, 0.14]);
  // Face, swept fringe and long half-up hair have distinct profiles at gameplay scale.
  f.oval(skin, [0, 1.66, 0.019], [0.232, 0.279, 0.201]);
  f.oval(0xeab79b, [0, 1.624, 0.211], [0.032, 0.045, 0.036]);
  f.oval(0xac6f68, [0, 1.556, 0.203], [0.044, 0.009, 0.009]);
  f.oval(hair, [0, 1.788, -0.02], [0.244, 0.192, 0.215]);
  f.oval(0xb4a48d, [0, 1.438, -0.148], [0.257, 0.496, 0.134]);
  for (let i = -5; i <= 5; i++) {
    const t = i / 5,
      z = -0.279 + 0.109 * t * t;
    hairLock(
      f,
      i % 2 === 0 ? hair : 0xc6b49b,
      [
        [t * 0.105, 1.91, z + 0.087],
        [t * 0.204, 1.71, z],
        [t * 0.208, 1.48, z + 0.012],
        [t * 0.253, 1.23, z - 0.051],
        [t * 0.245, 1.01 + 0.12 * t * t, z - 0.074],
      ],
      0.068,
      0.045,
    );
  }
  for (const s of [-1, 1]) {
    f.oval(0xf3e5d8, [s * 0.087, 1.684, 0.197], [0.05, 0.027, 0.012]);
    f.oval(0x756e64, [s * 0.088, 1.683, 0.209], [0.023, 0.025, 0.01]);
    f.oval(0x3b3533, [s * 0.089, 1.686, 0.217], [0.013, 0.017, 0.006]);
    f.oval(0xfff8ef, [s * 0.089 - 0.005, 1.695, 0.222], [0.006, 0.006, 0.004]);
    f.oval(0x776353, [s * 0.086, 1.709, 0.194], [0.051, 0.008, 0.01], [0, 0, -s * 0.1]);
    f.oval(0xb09a81, [s * 0.09, 1.744, 0.183], [0.05, 0.009, 0.013], [0, 0, -s * 0.1]);
    hairLock(
      f,
      hair,
      [
        [0.031, 1.956, 0.076],
        [s * 0.082, 1.894, 0.156],
        [s * 0.156, 1.831, 0.166],
        [s * 0.213, 1.714, 0.105],
        [s * 0.216, 1.603, 0.08],
      ],
      0.071,
      0.025,
    );
    hairLock(
      f,
      0xd2c1a8,
      [
        [s * 0.156, 1.841, 0.11],
        [s * 0.215, 1.733, 0.09],
        [s * 0.193, 1.535, 0.12],
        [s * 0.205, 1.434, 0.105],
        [s * 0.183, 1.358, 0.145],
      ],
      0.039,
      0.031,
    );
    f.oval(0xb99867, [s * 0.227, 1.537, 0.015], [0.018, 0.025, 0.013]);
  }
  f.finish(body);
  return { root, body, legs, arms };
}

export function makeGroot(parent: T.Object3D) {
  const root = group(parent),
    head = group(root, 0, 0.766, 0.36),
    tail = group(root, 0, 0.6, -0.402);
  const f = new Forms(),
    h = new Forms(),
    t = new Forms(),
    gold = 0xc1975c,
    light = 0xe1bd83,
    dark = 0xa37649;
  f.oval(gold, [0, 0.5, -0.02], [0.228, 0.243, 0.466]);
  f.oval(light, [0, 0.554, 0.241], [0.221, 0.28, 0.217], [-0.18, 0, 0]);
  for (const s of [-1, 1]) {
    for (const z of [-0.271, 0.255]) {
      f.oval(gold, [s * 0.146, 0.329, z], [0.087, 0.215, 0.097], [z < 0 ? -0.202 : 0.03, 0, 0]);
      f.oval(light, [s * 0.146, 0.166, z + 0.014], [0.061, 0.151, 0.061]);
      f.oval(0xdab783, [s * 0.146, 0.06, z + 0.06], [0.083, 0.057, 0.118]);
    }
    for (let i = 0; i < 3; i++)
      f.oval(
        light,
        [s * (0.112 + 0.031 * i), 0.55 + i * 0.032, 0.326 - i * 0.063],
        [0.043, 0.135, 0.053],
        [0.09, 0, s * 0.28],
      );
  }
  f.oval(0x584738, [0, 0.714, 0.296], [0.163, 0.043, 0.146], [-0.39, 0, 0]);
  f.oval(0xc09e57, [0, 0.675, 0.427], [0.032, 0.044, 0.014]);
  h.oval(gold, [0, 0.038, 0.012], [0.186, 0.193, 0.193]);
  h.oval(0x674b3b, [0, -0.071, 0.174], [0.119, 0.048, 0.153]);
  h.oval(light, [0, -0.025, 0.175], [0.13, 0.081, 0.164]);
  h.oval(0x393130, [0, 0.001, 0.319], [0.08, 0.049, 0.042]);
  for (const s of [-1, 1]) {
    h.oval(dark, [s * 0.175, -0.045, -0.03], [0.064, 0.146, 0.107], [-0.24, 0, s * 0.15]);
    h.oval(0xb28757, [s * 0.207, -0.07, -0.024], [0.038, 0.106, 0.073], [-0.23, 0, s * 0.16]);
    for (let i = 0; i < 4; i++)
      f.oval(
        light,
        [s * (0.127 + 0.016 * i), 0.499 + 0.044 * i, 0.35 - 0.038 * i],
        [0.034, 0.123, 0.049],
        [-0.2, 0, s * 0.29],
      );
    h.oval(0x3e332a, [s * 0.105, 0.077, 0.16], [0.032, 0.03, 0.023]);
    h.oval(0xffefcb, [s * 0.104 - 0.006, 0.085, 0.179], [0.009, 0.008, 0.006]);
    h.oval(light, [s * 0.103, 0.113, 0.142], [0.043, 0.019, 0.034]);
  }
  t.oval(gold, [0, 0.113, -0.101], [0.08, 0.18, 0.083], [-0.66, 0, 0]);
  t.oval(light, [0, 0.298, -0.202], [0.097, 0.196, 0.102], [-0.24, 0, 0]);
  for (let i = 0; i < 6; i++) {
    const a = i / 5;
    t.oval(
      i % 2 ? light : 0xd8b47f,
      [0.022 * Math.sin(i * 2), 0.125 + 0.258 * a, -0.128 - 0.12 * a],
      [0.06 - 0.027 * a, 0.135 - 0.02 * a, 0.052],
      [-0.88 + 0.46 * a, 0, 0.07 * Math.cos(i)],
    );
  }
  t.oval(0xe4c28e, [0, 0.416, -0.213], [0.055, 0.095, 0.061], [0.16, 0, 0]);
  f.finish(root);
  h.finish(head);
  t.finish(tail);
  return { root, head, tail };
}
