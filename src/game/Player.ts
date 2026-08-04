import * as THREE from 'three';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import type { BlockState, Dir } from './blockLogic';
import { blockSize, cloneState, nextState, worldCenter } from './blockLogic';
import { animDuration } from './motion';
import type { LevelView } from './Level';

type PivotAxis = 'x' | 'z';

interface FlipPlan {
  pivotWorld: { x: number; y: number; z: number };
  axis: PivotAxis;
  angle: number;
  next: BlockState;
}

export class Player {
  readonly pivot = new THREE.Group();
  readonly mesh: THREE.Mesh;
  state: BlockState = { col: 0, row: 0, ori: 'standing' };
  canMove = true;
  private tweens: Group;
  private level: LevelView;
  private activeTween: Tween | null = null;

  constructor(scene: THREE.Scene, level: LevelView, tweens: Group) {
    this.level = level;
    this.tweens = tweens;
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0x555555 }),
    );
    this.mesh.castShadow = true;
    this.pivot.add(this.mesh);
    scene.add(this.pivot);
  }

  place(state: BlockState, scaleMul = 1): void {
    this.state = cloneState(state);
    const local = worldCenter(state);
    const size = blockSize(state);
    const { x, z } = this.level.toWorld(local.x, local.z);
    this.pivot.rotation.set(0, 0, 0);
    this.mesh.position.set(0, 0, 0);
    this.mesh.rotation.set(0, 0, 0);
    this.mesh.scale.set(size.sx * scaleMul, size.sy * scaleMul, size.sz * scaleMul);
    this.pivot.position.set(x, local.y, z);
  }

  reset(state: BlockState, onDone?: () => void): void {
    this.stopTween();
    this.canMove = false;
    this.place(state, 1);
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

  tryMove(dir: Dir, onSettled: (state: BlockState) => void): boolean {
    if (!this.canMove) return false;
    const plan = this.planFlip(dir);
    this.canMove = false;
    this.animateFlip(plan, () => {
      this.place(plan.next);
      this.canMove = true;
      onSettled(plan.next);
    });
    return true;
  }

  private planFlip(dir: Dir): FlipPlan {
    const cur = this.state;
    const next = nextState(cur, dir);
    const c = worldCenter(cur);

    let pivotLocal = { x: c.x, y: 0, z: c.z };
    let axis: PivotAxis = 'z';
    let angle = 0;

    if (dir === 'left') {
      axis = 'z';
      angle = Math.PI / 2;
      if (cur.ori === 'standing') pivotLocal = { x: c.x - 0.5, y: 0, z: c.z };
      else if (cur.ori === 'flatX') pivotLocal = { x: c.x - 1, y: 0, z: c.z };
      else pivotLocal = { x: c.x - 0.5, y: 0, z: c.z };
    } else if (dir === 'right') {
      axis = 'z';
      angle = -Math.PI / 2;
      if (cur.ori === 'standing') pivotLocal = { x: c.x + 0.5, y: 0, z: c.z };
      else if (cur.ori === 'flatX') pivotLocal = { x: c.x + 1, y: 0, z: c.z };
      else pivotLocal = { x: c.x + 0.5, y: 0, z: c.z };
    } else if (dir === 'up') {
      axis = 'x';
      angle = -Math.PI / 2;
      if (cur.ori === 'standing') pivotLocal = { x: c.x, y: 0, z: c.z - 0.5 };
      else if (cur.ori === 'flatZ') pivotLocal = { x: c.x, y: 0, z: c.z - 1 };
      else pivotLocal = { x: c.x, y: 0, z: c.z - 0.5 };
    } else {
      axis = 'x';
      angle = Math.PI / 2;
      if (cur.ori === 'standing') pivotLocal = { x: c.x, y: 0, z: c.z + 0.5 };
      else if (cur.ori === 'flatZ') pivotLocal = { x: c.x, y: 0, z: c.z + 1 };
      else pivotLocal = { x: c.x, y: 0, z: c.z + 0.5 };
    }

    const pw = this.level.toWorld(pivotLocal.x, pivotLocal.z);
    return {
      pivotWorld: { x: pw.x, y: 0, z: pw.z },
      axis,
      angle,
      next,
    };
  }

  private animateFlip(plan: FlipPlan, onDone: () => void): void {
    const size = blockSize(this.state);
    const c = worldCenter(this.state);
    const cw = this.level.toWorld(c.x, c.z);

    this.pivot.position.set(plan.pivotWorld.x, plan.pivotWorld.y, plan.pivotWorld.z);
    this.pivot.rotation.set(0, 0, 0);
    this.mesh.position.set(
      cw.x - plan.pivotWorld.x,
      c.y - plan.pivotWorld.y,
      cw.z - plan.pivotWorld.z,
    );
    this.mesh.scale.set(size.sx, size.sy, size.sz);

    const rot = { x: 0, y: 0, z: 0 };
    const target = plan.axis === 'z' ? { z: plan.angle } : { x: plan.angle };

    this.activeTween = new Tween(rot, this.tweens)
      .to(target, animDuration(280))
      .easing(Easing.Quadratic.In)
      .onUpdate(() => {
        this.pivot.rotation.set(rot.x, rot.y, rot.z);
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
    const sx = this.mesh.scale.x;
    const sy = this.mesh.scale.y;
    const sz = this.mesh.scale.z;
    new Tween(s, this.tweens)
      .to({ v: 0 }, animDuration(300))
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => this.mesh.scale.set(sx * s.v, sy * s.v, sz * s.v))
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
