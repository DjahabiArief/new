import * as T from 'three';
import { buildVillage } from './village';
import { makeGaellry, makeGroot } from './companions';

const world = document.querySelector<HTMLElement>('#world')!;
const goal = document.querySelector('#goal')!;
const action = document.querySelector<HTMLButtonElement>('#action')!;
const label = action.querySelector('span')!;
const marker = document.querySelector<HTMLElement>('#marker')!;
const pad = document.querySelector<HTMLElement>('#pad')!;
const knob = pad.querySelector('i')!;
function createRenderer() {
  try {
    return new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch (error) {
    goal.textContent = 'Aktifkan WebGL untuk membuka halaman rumah.';
    throw error;
  }
}
const renderer = createRenderer();
world.append(renderer.domElement);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
renderer.shadowMap.type = T.PCFSoftShadowMap;
const scene = new T.Scene();
scene.background = new T.Color(0xdce7e0);
scene.fog = new T.FogExp2(0xdbe5db, 0.017);
scene.add(new T.HemisphereLight(0xf8f4eb, 0xb3b8aa, 1.55));
const sun = new T.DirectionalLight(0xffefce, 1.95);
sun.position.set(-7, 11, 6);
sun.castShadow = true;
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10 });
sun.shadow.camera.updateProjectionMatrix();
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.normalBias = 0.023;
sun.shadow.bias = -0.0003;
scene.add(sun);
buildVillage(scene);
const girl = makeGaellry(scene),
  dog = makeGroot(scene);
girl.root.position.set(-1.15, 0, 2.06);
girl.root.rotation.y = 0.66;
dog.root.position.set(0.9, 0, 1.55);
dog.root.rotation.y = -0.93;
// Static scenery shares a baked-on-first-frame shadow. Soft contact shadows travel with the two actors.
const shadeCanvas = document.createElement('canvas');
shadeCanvas.width = shadeCanvas.height = 64;
const brush = shadeCanvas.getContext('2d')!,
  gradient = brush.createRadialGradient(32, 32, 2, 32, 32, 32);
gradient.addColorStop(0, 'rgba(51,47,37,.53)');
gradient.addColorStop(0.55, 'rgba(53,50,38,.22)');
gradient.addColorStop(1, 'rgba(52,49,38,0)');
brush.fillStyle = gradient;
brush.fillRect(0, 0, 64, 64);
const shadowMaterial = new T.MeshBasicMaterial({
  map: new T.CanvasTexture(shadeCanvas),
  transparent: true,
  depthWrite: false,
});
for (const [actor, w, d] of [
  [girl.root, 0.98, 0.6],
  [dog.root, 0.8, 1.1],
] as const) {
  const contact = new T.Mesh(new T.PlaneGeometry(w, d), shadowMaterial);
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.069;
  actor.add(contact);
}
const camera = new T.OrthographicCamera(-6, 6, 3, -3, 0.1, 100);
const focus = new T.Vector3(-0.25, 1.89, 0.36),
  offset = new T.Vector3(3.15, 4.22, 12.2);
function resize() {
  const w = world.clientWidth,
    h = world.clientHeight;
  renderer.setSize(w, h);
  const half = Math.max(3.55, (1.96 * h) / w);
  Object.assign(camera, { top: half, bottom: -half, left: (-half * w) / h, right: (half * w) / h });
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();
const keys = new Set<string>(),
  stick = new T.Vector2(),
  movement = new T.Vector2();
let pointer: number | null = null;
function releaseStick() {
  stick.set(0, 0);
  knob.style.transform = '';
  pointer = null;
}
function reset() {
  keys.clear();
  releaseStick();
}
function drag(e: PointerEvent) {
  if (e.pointerId !== pointer) return;
  const r = pad.getBoundingClientRect(),
    radius = r.width * 0.37;
  stick
    .set((e.clientX - r.left - r.width / 2) / radius, (e.clientY - r.top - r.height / 2) / radius)
    .clampLength(0, 1);
  knob.style.transform = 'translate(' + stick.x * radius * 0.74 + 'px,' + stick.y * radius * 0.74 + 'px)';
}
pad.onpointerdown = (e) => {
  if (pointer !== null) return;
  pointer = e.pointerId;
  pad.setPointerCapture(pointer);
  drag(e);
};
pad.onpointermove = drag;
pad.onlostpointercapture =
  pad.onpointercancel =
  pad.onpointerup =
    (e) => {
      if (e.pointerId === pointer) releaseStick();
    };
addEventListener('blur', reset);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) reset();
});
let near = false,
  greeted = false,
  reaction = 0;
function showState() {
  goal.textContent = greeted ? 'Groot menyambutmu' : near ? 'Sapa Groot' : 'Hampiri Groot';
  action.hidden = !near;
  action.disabled = reaction > 0;
  label.textContent = reaction > 0 ? 'Groot menoleh…' : greeted ? 'Sapa lagi' : 'Sapa Groot';
}
function greet() {
  if (!near || reaction > 0) return;
  greeted = true;
  reaction = 1.25;
  showState();
}
action.onclick = greet;
addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k.startsWith('arrow')) e.preventDefault();
  keys.add(k);
  if (k === 'e' && !e.repeat) greet();
});
addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
const obstacles = [
  [-4.85, -0.4, -5.72, -1.97],
  [-0.03, 6.52, -2.5, -0.97],
  [-6.8, -6, -3.6, -2.8],
  [4.2, 5.2, -5.4, -4.4],
];
function free(x: number, z: number) {
  return (
    Math.abs(x) < 6.6 &&
    Math.abs(z) < 5.1 &&
    !obstacles.some(([l, r, b, t]) => x > l && x < r && z > b && z < t) &&
    Math.hypot(x - dog.root.position.x, z - dog.root.position.z) > 0.48
  );
}
const origin = new T.Vector2();
const cameraYaw = Math.atan2(offset.x, offset.z);
const projected = new T.Vector3();
let last = performance.now(),
  steps = 0;
const down = (...list: string[]) => Number(list.some((k) => keys.has(k)));
function turn(from: number, to: number, amount: number) {
  return from + Math.atan2(Math.sin(to - from), Math.cos(to - from)) * amount;
}
renderer.setAnimationLoop((now: number) => {
  const elapsed = Math.max(0, (now - last) / 1000),
    dt = Math.min(elapsed, 0.1);
  last = now;
  movement
    .set(
      stick.x + down('d', 'arrowright') - down('a', 'arrowleft'),
      stick.y + down('s', 'arrowdown') - down('w', 'arrowup'),
    )
    .clampLength(0, 1);
  movement.rotateAround(origin, -cameraYaw);
  const p = girl.root.position;
  if (movement.lengthSq() > 0.008) {
    const x = p.x + movement.x * 2.8 * dt,
      z = p.z + movement.y * 2.8 * dt;
    if (free(x, p.z)) p.x = x;
    if (free(p.x, z)) p.z = z;
    girl.root.rotation.y = turn(
      girl.root.rotation.y,
      Math.atan2(movement.x, movement.y),
      1 - Math.exp(-18 * dt),
    );
    steps += dt * 11;
  } else steps = 0;
  const stride = Math.sin(steps);
  girl.legs.forEach((leg, i) => (leg.rotation.x = stride * 0.42 * (i ? 1 : -1)));
  girl.arms.forEach((arm, i) => (arm.rotation.x = stride * 0.25 * (i ? -1 : 1)));
  girl.body.position.y = Math.abs(stride) * 0.027;
  const inRange = p.distanceTo(dog.root.position) < (near ? 1.7 : 1.4);
  if (inRange !== near) {
    near = inRange;
    showState();
  }
  if (reaction > 0) {
    reaction = Math.max(0, reaction - elapsed);
    dog.root.rotation.y = turn(
      dog.root.rotation.y,
      Math.atan2(p.x - dog.root.position.x, p.z - dog.root.position.z),
      1 - Math.exp(-6 * dt),
    );
    dog.head.rotation.z = 0.205 * Math.sin((reaction / 1.25) * Math.PI);
    if (reaction === 0) showState();
  }
  dog.tail.rotation.z = (greeted ? 0.45 : 0.1) * Math.sin(now * (greeted ? 0.012 : 0.003));
  const follow = 1 - Math.exp(-4 * dt);
  focus.x += (T.MathUtils.clamp(p.x * 0.65 + 0.5, -3.7, 4) - focus.x) * follow;
  focus.z += (T.MathUtils.clamp(p.z * 0.66 - 0.99, -3.25, 2.5) - focus.z) * follow;
  camera.position.copy(focus).add(offset);
  camera.lookAt(focus);
  camera.updateMatrixWorld();
  projected.copy(dog.root.position);
  projected.y = 1.2;
  projected.project(camera);
  marker.hidden = Math.abs(projected.x) > 0.93 || Math.abs(projected.y) > 0.9;
  marker.classList.toggle('near', near);
  marker.style.transform =
    'translate(' +
    (projected.x * 0.5 + 0.5) * world.clientWidth +
    'px,' +
    (0.5 - projected.y * 0.5) * world.clientHeight +
    'px) translate(-50%,-100%)';
  renderer.render(scene, camera);
});
