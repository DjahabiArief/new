import * as T from 'three';

// Each rigid part shares one draw call per shape, including the stones, roof tiles and leaves.
const sphere = new T.SphereGeometry(1, 18, 14);
const landscapeOval = new T.SphereGeometry(1, 9, 6);
const cube = new T.BoxGeometry(1, 1, 1);
const cylinder = new T.CylinderGeometry(1, 1, 1, 12);
const leaf = new T.IcosahedronGeometry(1, 0);
const material = new T.MeshStandardMaterial({ roughness: 0.88 });
const pigment = paintedSurface();
const sceneryMaterial = material.clone();
sceneryMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.pigment = { value: pigment };
  shader.vertexShader =
    'varying vec3 surfacePos;\n' +
    shader.vertexShader.replace(
      '#include <project_vertex>',
      'surfacePos=(instanceMatrix * vec4(transformed,1.)).xyz;\n#include <project_vertex>',
    );
  shader.fragmentShader =
    'uniform sampler2D pigment; varying vec3 surfacePos;\n' +
    shader.fragmentShader.replace(
      '#include <color_fragment>',
      '#include <color_fragment>\n vec2 uvPaint=surfacePos.xz + surfacePos.y*vec2(.47,.81); diffuseColor.rgb *= .48+.67*texture2D(pigment,uvPaint*.97).r;',
    );
};
type Vec = [number, number, number];
export class Forms {
  private batches = new Map<T.BufferGeometry, { matrix: T.Matrix4; color: T.Color }[]>();
  mesh(geo: T.BufferGeometry, color: number, pos: Vec, scale: Vec, angles: Vec = [0, 0, 0]) {
    const obj = new T.Object3D();
    obj.position.set(...pos);
    obj.scale.set(...scale);
    obj.rotation.set(...angles);
    obj.updateMatrix();
    if (!this.batches.has(geo)) this.batches.set(geo, []);
    this.batches.get(geo)!.push({ matrix: obj.matrix, color: new T.Color(color) });
  }
  oval(c: number, p: Vec, s: Vec, a?: Vec) {
    this.mesh(sphere, c, p, s, a);
  }
  box(c: number, p: Vec, s: Vec, a?: Vec) {
    this.mesh(cube, c, p, s, a);
  }
  speck(c: number, p: Vec, s: Vec, a?: Vec) {
    this.mesh(leaf, c, p, s, a);
  }
  rod(c: number, from: Vec, to: Vec, r: number) {
    const a = new T.Vector3(...from),
      b = new T.Vector3(...to);
    const delta = b.clone().sub(a);
    const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), delta.clone().normalize());
    const e = new T.Euler().setFromQuaternion(q);
    this.mesh(cylinder, c, a.lerp(b, 0.5).toArray() as Vec, [r, delta.length(), r], [e.x, e.y, e.z]);
  }
  finish(parent: T.Object3D, scenery = false) {
    for (const [geo, items] of this.batches) {
      const mesh = new T.InstancedMesh(
        scenery && geo === sphere ? landscapeOval : geo,
        scenery ? sceneryMaterial : material,
        items.length,
      );
      items.forEach(({ matrix, color }, i) => {
        mesh.setMatrixAt(i, matrix);
        mesh.setColorAt(i, color);
      });
      mesh.castShadow = scenery;
      mesh.receiveShadow = true;
      parent.add(mesh);
    }
  }
}
export function group(parent: T.Object3D, x = 0, y = 0, z = 0) {
  const g = new T.Group();
  parent.add(g);
  g.position.set(x, y, z);
  return g;
}
export function random(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

// A seamless, seeded pigment wash gives plaster, wood and stone visible surface variation.
export function paintedSurface() {
  const size = 256,
    canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!,
    pixels = ctx.createImageData(size, size),
    noise = random(1167);
  const layers = [4, 12, 48, 128].map((n) => ({
    n,
    values: Float32Array.from({ length: n * n }, () => noise()),
  }));
  function sample(layer: (typeof layers)[number], x: number, y: number) {
    const { n, values } = layer,
      xx = (x * n) / size,
      yy = (y * n) / size,
      i = Math.floor(xx),
      j = Math.floor(yy);
    const fx = xx - i,
      fy = yy - j,
      at = (a: number, b: number) => values[(b % n) * n + (a % n)];
    return (
      (at(i, j) * (1 - fx) + at(i + 1, j) * fx) * (1 - fy) +
      (at(i, j + 1) * (1 - fx) + at(i + 1, j + 1) * fx) * fy
    );
  }
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const n = layers.reduce((sum, l, i) => sum + sample(l, x, y) * [0.42, 0.3, 0.18, 0.1][i], 0);
      const shade = Math.round(140 + n * 115 + noise() * 9),
        i = (y * size + x) * 4;
      pixels.data.set([shade, shade, shade, 255], i);
    }
  ctx.putImageData(pixels, 0, 0);
  const map = new T.CanvasTexture(canvas);
  map.wrapS = map.wrapT = T.RepeatWrapping;
  return map;
}
