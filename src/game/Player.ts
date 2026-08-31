import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import type { BlockState, Dir } from './blockLogic';
import {
  blockSize,
  cloneState,
  nextCubeState,
  nextState,
  worldCenter,
} from './blockLogic';
import { animDuration } from './motion';
import type { LevelView } from './Level';

type PivotAxis = 'x' | 'z';
type PlayerMood = 'idle' | 'focus' | 'surprised' | 'happy';

interface FlipPlan {
  pivotWorld: { x: number; y: number; z: number };
  axis: PivotAxis;
  angle: number;
  next: BlockState;
  target: 'a' | 'b';
  asCube: boolean;
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function createFaceMaterial(mood: PlayerMood): THREE.MeshBasicMaterial {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.MeshBasicMaterial({ transparent: true });

  const ink = '#123b58';
  const white = '#f8fdff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (mood === 'happy') {
    ctx.strokeStyle = white;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(83, 62, 24, Math.PI * 0.12, Math.PI * 0.88);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(173, 62, 24, Math.PI * 0.12, Math.PI * 0.88);
    ctx.stroke();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(128, 81, 25, Math.PI * 0.12, Math.PI * 0.88);
    ctx.stroke();
  } else {
    for (const x of [78, 178]) {
      drawRoundRect(ctx, x - 31, 28, 62, mood === 'surprised' ? 68 : 58, 27);
      ctx.fillStyle = white;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + (mood === 'focus' ? 6 : 0), 58, mood === 'surprised' ? 13 : 15, 0, Math.PI * 2);
      ctx.fillStyle = ink;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 5, 52, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = white;
      ctx.fill();
    }

    ctx.strokeStyle = ink;
    ctx.lineWidth = 8;
    if (mood === 'focus') {
      ctx.beginPath();
      ctx.moveTo(51, 27);
      ctx.quadraticCurveTo(77, 19, 101, 29);
      ctx.moveTo(155, 29);
      ctx.quadraticCurveTo(179, 19, 205, 27);
      ctx.stroke();
    }

    ctx.beginPath();
    if (mood === 'surprised') {
      ctx.arc(128, 96, 10, 0, Math.PI * 2);
    } else {
      ctx.arc(128, 78, 18, Math.PI * 0.16, Math.PI * 0.84);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.08,
    depthWrite: false,
    toneMapped: false,
  });
}

export class Player {
  readonly pivot = new THREE.Group();
  readonly mesh: THREE.Mesh;
  readonly pivotB = new THREE.Group();
  readonly meshB: THREE.Mesh;
  state: BlockState = { col: 0, row: 0, ori: 'standing' };
  stateB: BlockState | null = null;
  active: 0 | 1 = 0;
  canMove = true;
  private tweens: Group;
  private level: LevelView;
  private activeTween: Tween | null = null;
  private matA = new THREE.MeshStandardMaterial({
    color: 0x16afc7,
    emissive: 0x06394a,
    emissiveIntensity: 0.07,
    metalness: 0.04,
    roughness: 0.5,
  });
  private matB = new THREE.MeshStandardMaterial({
    color: 0x72c8d7,
    emissive: 0x0c3d49,
    emissiveIntensity: 0.05,
    metalness: 0.03,
    roughness: 0.56,
  });
  private matActive = new THREE.MeshStandardMaterial({
    color: 0x0d88a4,
    emissive: 0x073e53,
    emissiveIntensity: 0.11,
    metalness: 0.04,
    roughness: 0.46,
  });
  private faceMaterials: Record<PlayerMood, THREE.MeshBasicMaterial> = {
    idle: createFaceMaterial('idle'),
    focus: createFaceMaterial('focus'),
    surprised: createFaceMaterial('surprised'),
    happy: createFaceMaterial('happy'),
  };
  private faceA: THREE.Mesh;
  private faceB: THREE.Mesh;

  constructor(scene: THREE.Scene, level: LevelView, tweens: Group) {
    this.level = level;
    this.tweens = tweens;
    const bodyGeo = new RoundedBoxGeometry(1.12, 1.12, 1.12, 4, 0.14);
    const faceGeo = new THREE.PlaneGeometry(0.94, 0.48);

    this.mesh = new THREE.Mesh(bodyGeo, this.matA);
    this.mesh.castShadow = true;
    this.pivot.add(this.mesh);
    this.faceA = new THREE.Mesh(faceGeo, this.faceMaterials.idle);
    this.faceA.renderOrder = 3;
    this.pivot.add(this.faceA);
    scene.add(this.pivot);

    this.meshB = new THREE.Mesh(bodyGeo, this.matB);
    this.meshB.castShadow = true;
    this.pivotB.add(this.meshB);
    this.faceB = new THREE.Mesh(faceGeo, this.faceMaterials.idle);
    this.faceB.renderOrder = 3;
    this.pivotB.add(this.faceB);
    this.pivotB.visible = false;
    scene.add(this.pivotB);
  }

  get isSplit(): boolean {
    return this.stateB !== null;
  }

  private sizeOf(state: BlockState, asCube: boolean) {
    if (asCube) return { sx: 1, sy: 1, sz: 1 };
    return blockSize(state);
  }

  private centerOf(state: BlockState, asCube: boolean) {
    if (asCube) return { x: state.col, y: 0.5, z: state.row };
    return worldCenter(state);
  }

  placeEntity(
    which: 'a' | 'b',
    state: BlockState,
    asCube: boolean,
    scaleMul = 1,
  ): void {
    const local = this.centerOf(state, asCube);
    const size = this.sizeOf(state, asCube);
    const { x, z } = this.level.toWorld(local.x, local.z);
    const pivot = which === 'a' ? this.pivot : this.pivotB;
    const mesh = which === 'a' ? this.mesh : this.meshB;
    pivot.visible = true;
    pivot.rotation.set(0, 0, 0);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(size.sx * scaleMul, size.sy * scaleMul, size.sz * scaleMul);
    this.positionFace(which, size, mesh.position);
    const face = which === 'a' ? this.faceA : this.faceB;
    face.scale.setScalar(scaleMul);
    pivot.position.set(x, local.y, z);
  }

  private positionFace(
    which: 'a' | 'b',
    size: { sx: number; sy: number; sz: number },
    center: THREE.Vector3,
  ): void {
    const face = which === 'a' ? this.faceA : this.faceB;
    const lift = size.sy > 1.4 ? 0.27 : 0.1;
    // 角色体积略大于逻辑格；脸要贴在实际树脂外壳之外，避免被深度缓冲吞掉。
    face.position.set(center.x, center.y + lift, center.z + size.sz * 0.56 + 0.025);
    face.rotation.set(0, 0, 0);
  }

  setMood(mood: PlayerMood): void {
    this.faceA.material = this.faceMaterials[mood];
    this.faceB.material = this.faceMaterials[mood];
  }

  placeMerged(state: BlockState, scaleMul = 1): void {
    this.state = cloneState(state);
    this.stateB = null;
    this.active = 0;
    this.pivotB.visible = false;
    this.placeEntity('a', state, false, scaleMul);
    this.refreshMaterials();
  }

  placeSplit(a: BlockState, b: BlockState, active: 0 | 1 = 0): void {
    this.state = cloneState(a);
    this.stateB = cloneState(b);
    this.active = active;
    this.placeEntity('a', a, true);
    this.placeEntity('b', b, true);
    this.refreshMaterials();
  }

  /** 在紫台原位裂成两半，再滑到 dest。逻辑状态立刻分裂。 */
  animateSplit(a: BlockState, b: BlockState, onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const from = cloneState(this.state);
    const [originA, originB] = this.splitStartCenters(from, a, b);

    this.state = cloneState(a);
    this.stateB = cloneState(b);
    this.active = 0;

    const startAW = this.level.toWorld(originA.x, originA.z);
    const startBW = this.level.toWorld(originB.x, originB.z);
    const endAW = this.level.toWorld(a.col, a.row);
    const endBW = this.level.toWorld(b.col, b.row);

    this.pivot.visible = true;
    this.pivotB.visible = true;
    this.pivot.rotation.set(0, 0, 0);
    this.pivotB.rotation.set(0, 0, 0);
    this.mesh.position.set(0, 0, 0);
    this.meshB.position.set(0, 0, 0);
    this.mesh.rotation.set(0, 0, 0);
    this.meshB.rotation.set(0, 0, 0);
    this.mesh.scale.set(1, 1, 1);
    this.meshB.scale.set(1, 1, 1);
    this.positionFace('a', { sx: 1, sy: 1, sz: 1 }, this.mesh.position);
    this.positionFace('b', { sx: 1, sy: 1, sz: 1 }, this.meshB.position);
    this.faceA.scale.setScalar(1);
    this.faceB.scale.setScalar(1);
    this.pivot.position.set(startAW.x, originA.y, startAW.z);
    this.pivotB.position.set(startBW.x, originB.y, startBW.z);
    this.refreshMaterials();

    const dist = Math.max(
      Math.hypot(endAW.x - startAW.x, endAW.z - startAW.z),
      Math.hypot(endBW.x - startBW.x, endBW.z - startBW.z),
    );
    const ms = animDuration(Math.min(460, 280 + dist * 50));
    const t = { u: 0 };
    this.activeTween = new Tween(t, this.tweens)
      .to({ u: 1 }, ms)
      .easing(Easing.Cubic.Out)
      .onUpdate(() => {
        const u = t.u;
        const arc = Math.sin(Math.PI * u) * 0.28;
        this.pivot.position.set(
          startAW.x + (endAW.x - startAW.x) * u,
          originA.y + (0.5 - originA.y) * u + arc,
          startAW.z + (endAW.z - startAW.z) * u,
        );
        this.pivotB.position.set(
          startBW.x + (endBW.x - startBW.x) * u,
          originB.y + (0.5 - originB.y) * u + arc,
          startBW.z + (endBW.z - startBW.z) * u,
        );
      })
      .onComplete(() => {
        this.activeTween = null;
        this.placeEntity('a', a, true);
        this.placeEntity('b', b, true);
        this.canMove = true;
        onDone();
      })
      .start();
  }

  /** 整砖收起，再在 dest 长出来。逻辑状态立刻改到 dest。 */
  animateTeleport(dest: BlockState, onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const from = cloneState(this.state);
    this.state = cloneState(dest);
    this.stateB = null;
    this.active = 0;
    this.pivotB.visible = false;

    const startC = this.centerOf(from, false);
    const endC = this.centerOf(dest, false);
    const startW = this.level.toWorld(startC.x, startC.z);
    const endW = this.level.toWorld(endC.x, endC.z);
    const size = this.sizeOf(from, false);

    this.placeEntity('a', from, false);
    this.refreshMaterials();

    const t = { u: 0 };
    const ms = animDuration(420);
    this.activeTween = new Tween(t, this.tweens)
      .to({ u: 1 }, ms)
      .easing(Easing.Cubic.InOut)
      .onUpdate(() => {
        const u = t.u;
        const squeeze = u < 0.45 ? 1 - (u / 0.45) * 0.88 : ((u - 0.45) / 0.55) * 0.88 + 0.12;
        const travel = u < 0.45 ? 0 : (u - 0.45) / 0.55;
        const x = startW.x + (endW.x - startW.x) * travel;
        const z = startW.z + (endW.z - startW.z) * travel;
        const y = startC.y + (endC.y - startC.y) * travel + Math.sin(Math.PI * travel) * 0.55;
        this.mesh.scale.set(size.sx * squeeze, size.sy * squeeze, size.sz * squeeze);
        this.faceA.scale.setScalar(squeeze);
        this.pivot.position.set(x, y, z);
      })
      .onComplete(() => {
        this.activeTween = null;
        this.placeEntity('a', dest, false);
        this.canMove = true;
        onDone();
      })
      .start();
  }

  private splitStartCenters(
    from: BlockState,
    destA: BlockState,
    destB: BlockState,
  ): [{ x: number; y: number; z: number }, { x: number; y: number; z: number }] {
    const pair =
      from.ori === 'standing'
        ? [
            { x: from.col, y: 0.5, z: from.row },
            { x: from.col, y: 1.5, z: from.row },
          ]
        : from.ori === 'flatX'
          ? [
              { x: from.col, y: 0.5, z: from.row },
              { x: from.col + 1, y: 0.5, z: from.row },
            ]
          : [
              { x: from.col, y: 0.5, z: from.row },
              { x: from.col, y: 0.5, z: from.row + 1 },
            ];

    const score = (
      origin: { x: number; y: number; z: number },
      dest: BlockState,
    ) => (origin.x - dest.col) ** 2 + (origin.z - dest.row) ** 2;

    const straight = score(pair[0], destA) + score(pair[1], destB);
    const crossed = score(pair[0], destB) + score(pair[1], destA);
    if (crossed < straight) return [pair[1], pair[0]];
    return [pair[0], pair[1]];
  }

  refreshMaterials(): void {
    if (!this.isSplit) {
      this.mesh.material = this.matA;
      return;
    }
    this.mesh.material = this.active === 0 ? this.matActive : this.matA;
    this.meshB.material = this.active === 1 ? this.matActive : this.matB;
  }

  toggleActive(): void {
    if (!this.isSplit) return;
    this.active = this.active === 0 ? 1 : 0;
    this.refreshMaterials();
  }

  reset(state: BlockState, onDone?: () => void): void {
    this.stopTween();
    this.canMove = false;
    this.placeMerged(state, 1);
    this.setMood('idle');
    const size = blockSize(state);
    const s = { v: 0.75 };
    this.mesh.scale.set(size.sx * s.v, size.sy * s.v, size.sz * s.v);
    this.faceA.scale.setScalar(s.v);
    new Tween(s, this.tweens)
      .to({ v: 1 }, animDuration(250))
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        this.mesh.scale.set(size.sx * s.v, size.sy * s.v, size.sz * s.v);
        this.faceA.scale.setScalar(s.v);
      })
      .onComplete(() => {
        this.canMove = true;
        onDone?.();
      })
      .start();
  }

  tryMove(dir: Dir, onSettled: () => void, onLand?: () => void): boolean {
    if (!this.canMove) return false;
    const asCube = this.isSplit;
    const which: 'a' | 'b' = !asCube || this.active === 0 ? 'a' : 'b';
    const cur = which === 'a' ? this.state : this.stateB!;
    const next = asCube ? nextCubeState(cur, dir) : nextState(cur, dir);
    const plan = this.planFlip(cur, next, dir, which, asCube);
    this.canMove = false;
    this.setMood('focus');
    this.animateFlip(
      plan,
      () => {
        if (which === 'a') this.state = cloneState(next);
        else this.stateB = cloneState(next);
        this.placeEntity(which, next, asCube);
        this.setMood('idle');
        this.canMove = true;
        onSettled();
      },
      onLand,
    );
    return true;
  }

  private planFlip(
    cur: BlockState,
    next: BlockState,
    dir: Dir,
    target: 'a' | 'b',
    asCube: boolean,
  ): FlipPlan {
    const c = this.centerOf(cur, asCube);
    let pivotLocal = { x: c.x, y: 0, z: c.z };
    let axis: PivotAxis = 'z';
    let angle = 0;
    const half = asCube ? 0.5 : 0.5;

    if (dir === 'left') {
      axis = 'z';
      angle = Math.PI / 2;
      if (asCube || cur.ori === 'standing') pivotLocal = { x: c.x - half, y: 0, z: c.z };
      else if (cur.ori === 'flatX') pivotLocal = { x: c.x - 1, y: 0, z: c.z };
      else pivotLocal = { x: c.x - half, y: 0, z: c.z };
    } else if (dir === 'right') {
      axis = 'z';
      angle = -Math.PI / 2;
      if (asCube || cur.ori === 'standing') pivotLocal = { x: c.x + half, y: 0, z: c.z };
      else if (cur.ori === 'flatX') pivotLocal = { x: c.x + 1, y: 0, z: c.z };
      else pivotLocal = { x: c.x + half, y: 0, z: c.z };
    } else if (dir === 'up') {
      axis = 'x';
      angle = -Math.PI / 2;
      if (asCube || cur.ori === 'standing') pivotLocal = { x: c.x, y: 0, z: c.z - half };
      else if (cur.ori === 'flatZ') pivotLocal = { x: c.x, y: 0, z: c.z - 1 };
      else pivotLocal = { x: c.x, y: 0, z: c.z - half };
    } else {
      axis = 'x';
      angle = Math.PI / 2;
      if (asCube || cur.ori === 'standing') pivotLocal = { x: c.x, y: 0, z: c.z + half };
      else if (cur.ori === 'flatZ') pivotLocal = { x: c.x, y: 0, z: c.z + 1 };
      else pivotLocal = { x: c.x, y: 0, z: c.z + half };
    }

    const pw = this.level.toWorld(pivotLocal.x, pivotLocal.z);
    return {
      pivotWorld: { x: pw.x, y: 0, z: pw.z },
      axis,
      angle,
      next,
      target,
      asCube,
    };
  }

  private animateFlip(plan: FlipPlan, onDone: () => void, onLand?: () => void): void {
    const cur = plan.target === 'a' ? this.state : this.stateB!;
    const size = this.sizeOf(cur, plan.asCube);
    const c = this.centerOf(cur, plan.asCube);
    const cw = this.level.toWorld(c.x, c.z);
    const pivot = plan.target === 'a' ? this.pivot : this.pivotB;
    const mesh = plan.target === 'a' ? this.mesh : this.meshB;

    pivot.position.set(plan.pivotWorld.x, plan.pivotWorld.y, plan.pivotWorld.z);
    pivot.rotation.set(0, 0, 0);
    mesh.position.set(
      cw.x - plan.pivotWorld.x,
      c.y - plan.pivotWorld.y,
      cw.z - plan.pivotWorld.z,
    );
    mesh.scale.set(size.sx, size.sy, size.sz);
    this.positionFace(plan.target, size, mesh.position);

    const rot = { x: 0, y: 0, z: 0 };
    const target = plan.axis === 'z' ? { z: plan.angle } : { x: plan.angle };

    this.activeTween = new Tween(rot, this.tweens)
      .to(target, animDuration(230))
      .easing(Easing.Cubic.In)
      .onUpdate(() => {
        pivot.rotation.set(rot.x, rot.y, rot.z);
      })
      .onComplete(() => {
        this.activeTween = null;
        onLand?.();
        onDone();
      })
      .start();
  }

  fall(onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const s = { v: 1, y: 0 };
    const targets = [this.mesh, ...(this.pivotB.visible ? [this.meshB] : [])];
    const pivots = [this.pivot, ...(this.pivotB.visible ? [this.pivotB] : [])];
    const faces = [this.faceA, ...(this.pivotB.visible ? [this.faceB] : [])];
    const scales = targets.map((m) => ({ x: m.scale.x, y: m.scale.y, z: m.scale.z }));
    const baseY = pivots.map((p) => p.position.y);
    new Tween(s, this.tweens)
      .to({ v: 0, y: -1.2 }, animDuration(340))
      .easing(Easing.Quadratic.In)
      .onUpdate(() => {
        targets.forEach((m, i) =>
          m.scale.set(scales[i].x * s.v, scales[i].y * s.v, scales[i].z * s.v),
        );
        faces.forEach((face) => face.scale.setScalar(s.v));
        pivots.forEach((p, i) => {
          p.position.y = baseY[i] + s.y;
        });
      })
      .onComplete(onDone)
      .start();
  }

  win(onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const baseY = this.pivot.position.y;
    const lift = { y: baseY, spin: 0 };
    const sx = this.mesh.scale.x;
    const sy = this.mesh.scale.y;
    const sz = this.mesh.scale.z;
    this.setMood('happy');

    const riseSpin = new Tween(lift, this.tweens)
      .to({ y: baseY + 0.85, spin: Math.PI * 2 }, animDuration(520))
      .easing(Easing.Cubic.Out)
      .onUpdate(() => {
        this.pivot.position.y = lift.y;
        this.pivot.rotation.y = lift.spin;
      });

    const s = { v: 1 };
    const shrink = new Tween(s, this.tweens)
      .to({ v: 0 }, animDuration(300))
      .easing(Easing.Quadratic.In)
      .onUpdate(() => {
        this.mesh.scale.set(sx * s.v, sy * s.v, sz * s.v);
        this.faceA.scale.setScalar(s.v);
      })
      .onComplete(onDone);

    riseSpin.chain(shrink).start();
  }

  private stopTween(): void {
    if (this.activeTween) {
      this.activeTween.stop();
      this.activeTween = null;
    }
  }
}
