import * as T from 'three';

const world = document.querySelector('#world')!;
const goal = document.querySelector('#goal')!;
const action = document.querySelector<HTMLButtonElement>('#action')!;
const pad = document.querySelector<HTMLElement>('#pad')!;
const knob = pad.querySelector('i')!;
const renderer = (() => {
  try { return new T.WebGLRenderer({antialias:true}); }
  catch { goal.textContent='Aktifkan WebGL untuk membuka halaman rumah.'; throw new Error('WebGL unavailable'); }
})();
world.append(renderer.domElement);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.shadowMap.enabled = true;
const scene = new T.Scene();
scene.background = new T.Color(0xe9ddc2);
scene.add(new T.HemisphereLight(0xffefd5, 0xb59674, 2.3));
const sun = new T.DirectionalLight(0xffe2ad, 2.5);
sun.position.set(-4,10,5); sun.castShadow=true;
Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10});
sun.shadow.camera.updateProjectionMatrix(); scene.add(sun);
function part(parent:T.Object3D, geometry:T.BufferGeometry, color:number, x:number,y:number,z:number){
  const m=new T.Mesh(geometry,new T.MeshStandardMaterial({color,flatShading:true}));
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function box(p:T.Object3D,c:number,x:number,y:number,z:number,w:number,h:number,d:number){
  return part(p,new T.BoxGeometry(w,h,d),c,x,y,z);
}
function oval(p:T.Object3D,c:number,x:number,y:number,z:number,w:number,h:number,d:number){
  const m=part(p,new T.IcosahedronGeometry(1,1),c,x,y,z); m.scale.set(w,h,d);return m;
}
box(scene,0x956e4a,0,-.52,0,14,.85,11);
box(scene,0x97a35f,0,-.09,0,14,.18,11);
box(scene,0xd8b78c,0,.016,1.7,13,.03,1.7);
box(scene,0xd8b78c,-2.1,.02,-.2,1.6,.04,3.8);
box(scene,0xe8cf98,-2.1,1,-3.45,3.5,2.0,2.7);
const roof=part(scene,new T.ConeGeometry(2.9,1.5,4),0xa75235,-2.1,2.65,-3.45);
roof.rotation.y=Math.PI/4;roof.scale.z=.87;
box(scene,0x754b36,-2.1,.65,-2.08,.75,1.3,.12);
for(const x of [-3.25,-.95]){box(scene,0x634d36,x,1.05,-2.06,.65,.76,.12);box(scene,0xffdc8e,x,1.06,-1.99,.49,.59,.04);}
for(const x of [-6,5.8,2.7]){box(scene,0x795638,x,.75,-4.2,.3,1.5,.32);oval(scene,0xbe633a,x,2.2,-4.2,1.15,1.5,1.06);oval(scene,0xdf9149,x+.5,2.6,-4.1,.8,.78,.8);}
box(scene,0x805c43,3.55,.06,-1.7,3.3,.12,1.45);
for(let i=0;i<24;i++){const x=2.1+(i%8)*.40,z=-2.15+Math.floor(i/8)*.43;
  oval(scene,0x596e41,x,.23,z,.17,.22,.16);oval(scene,i%3?0xfff3da:0xd66b6a,x,.43,z,.14,.12,.12);}
for(let i=0;i<6;i++)box(scene,0x886748,1.8+i*.7,.34,-2.7,.13,.68,.13);
box(scene,0xab865b,3.55,.42,-2.7,3.7,.11,.09);

const girl=new T.Group();scene.add(girl);girl.position.set(-1.4,0,2.45);
const legs=[-.135,.135].map(x=>box(girl,0x644632,x,.2,0,.18,.4,.23));
part(girl,new T.ConeGeometry(.43,.89,10),0x68765b,0,.78,0);
oval(girl,0xa85a43,0,1.01,0,.32,.20,.24);
oval(girl,0xe8b48a,0,1.4,0,.255,.29,.23);
oval(girl,0x513425,0,1.54,-.045,.275,.22,.25);
oval(girl,0x513425,0,1.26,-.18,.20,.33,.16);
for(const x of [-.31,.31])oval(girl,0xe5c699,x,.86,0,.10,.23,.12);
const dog=new T.Group();scene.add(dog);dog.position.set(1.1,0,1.45);
oval(dog,0xc5884d,0,.46,0,.23,.24,.43);
for(const x of [-.15,.15])for(const z of [-.23,.23])oval(dog,0xaf7441,x,.22,z,.078,.22,.08);
const head=new T.Group();dog.add(head);head.position.set(0,.73,.29);
oval(head,0xd79c65,0,0,0,.245,.24,.22);oval(head,0xe9c8a0,0,-.065,.19,.145,.11,.15);
oval(head,0x3d312c,0,-.032,.30,.071,.05,.05);
for(const x of [-1,1]){oval(head,0x895738,x*.22,-.035,-.026,.08,.20,.11);oval(head,0x392b24,x*.095,.03,.19,.029,.032,.025);}
const tail=oval(dog,0xc5884d,0,.61,-.38,.09,.24,.09);tail.rotation.x=-.63;
const camera=new T.OrthographicCamera(-6,6,5,-5,.1,80);
const focus=new T.Vector3(0,0,.1),offset=new T.Vector3(0,10,8.5);
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);const half=Math.max(4.1,3.5*h/w);camera.top=half;camera.bottom=-half;camera.left=-half*w/h;camera.right=half*w/h;camera.updateProjectionMatrix();}
addEventListener('resize',resize);resize();
const keys=new Set<string>(), stick=new T.Vector2();let pointer:number|null=null;
function reset(){keys.clear();stick.set(0,0);knob.style.transform='';pointer=null;}
function drag(e:PointerEvent){if(e.pointerId!==pointer)return;const r=pad.getBoundingClientRect();
  stick.set((e.clientX-r.left-r.width/2)/33,(e.clientY-r.top-r.height/2)/33).clampLength(0,1);
  knob.style.transform='translate('+stick.x*23+'px,'+stick.y*23+'px)';}
pad.onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;pad.setPointerCapture(pointer);drag(e);};
pad.onpointermove=drag;pad.onlostpointercapture=reset;pad.onpointercancel=reset;pad.onpointerup=reset;
onblur=reset;document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
let near=false,greeted=false,reaction=0;
function greet(){if(!near||reaction>0)return;reaction=1;greeted=true;goal.textContent='Groot menoleh menyambutmu';}
action.onclick=greet;action.textContent=matchMedia('(pointer:fine)').matches?'E · Sapa Groot':'Sapa Groot';
onkeydown=e=>{const k=e.key.toLowerCase();if(k.startsWith('arrow'))e.preventDefault();keys.add(k);if(k==='e'&&!e.repeat)greet();};
onkeyup=e=>keys.delete(e.key.toLowerCase());
const obstacles=[[-4.05,-.15,-5,-1.8],[1.64,5.5,-2.94,-.76]];
function free(x:number,z:number){return Math.abs(x)<6.6&&Math.abs(z)<5.1&&!obstacles.some(([l,r,b,t])=>x>l&&x<r&&z>b&&z<t)&&Math.hypot(x-dog.position.x,z-dog.position.z)>.48;}
let last=performance.now(),steps=0;
const movement=new T.Vector2();
renderer.setAnimationLoop((now:number)=>{
  const dt=Math.min((now-last)/1000,.05);last=now;
  const down=(...list:string[])=>Number(list.some(k=>keys.has(k)));
  movement.set(stick.x+down('d','arrowright')-down('a','arrowleft'),stick.y+down('s','arrowdown')-down('w','arrowup')).clampLength(0,1);
  if(movement.lengthSq()>.008){const p=girl.position,x=p.x+movement.x*2.8*dt,z=p.z+movement.y*2.8*dt;
    if(free(x,p.z))p.x=x;if(free(p.x,z))p.z=z;girl.rotation.y=Math.atan2(movement.x,movement.y);steps+=dt*12;
  }else steps=0;
  legs.forEach((leg,i)=>leg.rotation.x=Math.sin(steps)*.32*(i?1:-1));
  const gap=girl.position.distanceTo(dog.position);near=gap<(near?1.7:1.4);action.hidden=!near;
  if(reaction>0){reaction=Math.max(0,reaction-dt);dog.rotation.y=Math.atan2(girl.position.x-dog.position.x,girl.position.z-dog.position.z);head.rotation.z=.17*Math.sin(reaction*Math.PI);}
  if(greeted)tail.rotation.z=.36*Math.sin(now*.012);
  focus.x+=((girl.position.x*.57)-focus.x)*(1-Math.exp(-4*dt));focus.z+=((girl.position.z*.46)-focus.z)*(1-Math.exp(-4*dt));
  camera.position.copy(focus).add(offset);camera.lookAt(focus);renderer.render(scene,camera);
});
