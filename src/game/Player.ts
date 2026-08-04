import * as THREE from 'three';
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

interface FlipPlan {
  pivotWorld: { x: number; y: number; z: number };
  axis: PivotAxis;
  angle: number;
  next: BlockState;
  target: 'a' | 'b';
  asCube: boolean;
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
  private matA = new THREE.MeshLambertMaterial({ color: 0x555555 });
  private matB = new THREE.MeshLambertMaterial({ color: 0x7f8c8d });
  private matActive = new THREE.MeshLambertMaterial({ color: 0x2c3e50 });

  constructor(scene: THREE.Scene, level: LevelView, tweens: Group) {
    this.level = level;
    this.tweens = tweens;
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.matA);
    this.mesh.castShadow = true;
    this.pivot.add(this.mesh);
    scene.add(this.pivot);

    this.meshB = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.matB);
    this.meshB.castShadow = true;
    this.pivotB.add(this.meshB);
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
    pivot.position.set(x, local.y, z);
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
    const size = blockSize(state);
    const s = { v: 0.75 };
    this.mesh.scale.set(size.sx * s.v, size.sy * s.v, size.sz * s.v);
    new Tween(s, this.tweens)
      .to({ v: 1 }, animDuration(250))
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        this.mesh.scale.set(size.sx * s.v, size.sy * s.v, size.sz * s.v);
      })
      .onComplete(() => {
        this.canMove = true;
        onDone?.();
      })
      .start();
  }

  tryMove(dir: Dir, onSettled: () => void): boolean {
    if (!this.canMove) return false;
    const asCube = this.isSplit;
    const which: 'a' | 'b' = !asCube || this.active === 0 ? 'a' : 'b';
    const cur = which === 'a' ? this.state : this.stateB!;
    const next = asCube ? nextCubeState(cur, dir) : nextState(cur, dir);
    const plan = this.planFlip(cur, next, dir, which, asCube);
    this.canMove = false;
    this.animateFlip(plan, () => {
      if (which === 'a') this.state = cloneState(next);
      else this.stateB = cloneState(next);
      this.placeEntity(which, next, asCube);
      this.canMove = true;
      onSettled();
    });
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

  private animateFlip(plan: FlipPlan, onDone: () => void): void {
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

    const rot = { x: 0, y: 0, z: 0 };
    const target = plan.axis === 'z' ? { z: plan.angle } : { x: plan.angle };

    this.activeTween = new Tween(rot, this.tweens)
      .to(target, animDuration(260))
      .easing(Easing.Quadratic.In)
      .onUpdate(() => {
        pivot.rotation.set(rot.x, rot.y, rot.z);
      })
      .onComplete(() => {
        this.activeTween = null;
        onDone();
      })
      .start();
  }

  fall(onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const s = { v: 1 };
    const targets = [this.mesh, ...(this.pivotB.visible ? [this.meshB] : [])];
    const scales = targets.map((m) => ({ x: m.scale.x, y: m.scale.y, z: m.scale.z }));
    new Tween(s, this.tweens)
      .to({ v: 0 }, animDuration(300))
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        targets.forEach((m, i) =>
          m.scale.set(scales[i].x * s.v, scales[i].y * s.v, scales[i].z * s.v),
        );
      })
      .onComplete(onDone)
      .start();
  }

  win(onDone: () => void): void {
    this.canMove = false;
    this.stopTween();
    const rot = { y: this.pivot.rotation.y };
    const spin = new Tween(rot, this.tweens)
      .to({ y: rot.y + Math.PI }, animDuration(500))
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.pivot.rotation.y = rot.y;
      });
    const s = { v: 1 };
    const sx = this.mesh.scale.x;
    const sy = this.mesh.scale.y;
    const sz = this.mesh.scale.z;
    const shrink = new Tween(s, this.tweens)
      .to({ v: 0 }, animDuration(280))
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => this.mesh.scale.set(sx * s.v, sy * s.v, sz * s.v))
      .onComplete(onDone);
    spin.chain(shrink).start();
  }

  private stopTween(): void {
    if (this.activeTween) {
      this.activeTween.stop();
      this.activeTween = null;
    }
  }
}
