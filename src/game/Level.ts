import * as THREE from 'three';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import type { LevelMap } from './levels';
import type { BlockState } from './blockLogic';
import { animDuration } from './motion';
import {
  isDeath as rulesIsDeath,
  isWin as rulesIsWin,
  parseLevel,
  type ParsedLevel,
} from './rules';

export class LevelView {
  readonly layer = new THREE.Group();
  startCol = 0;
  startRow = 0;
  offsetX = 0;
  offsetZ = 0;
  private parsed: ParsedLevel | null = null;
  private tweens: Group;
  private geo = new THREE.BoxGeometry(1, 0.25, 1);
  /** Cuboid 原作：白路径 / 翠绿目标 / 红砖 */
  private matX = new THREE.MeshLambertMaterial({ color: 0xffffff });
  private matO = new THREE.MeshLambertMaterial({ color: 0x27ae60 });
  private matZ = new THREE.MeshLambertMaterial({ color: 0xe74c3c });

  constructor(scene: THREE.Scene, tweens: Group) {
    this.tweens = tweens;
    scene.add(this.layer);
  }

  load(map: LevelMap): void {
    this.clearImmediate();
    this.parsed = parseLevel(map);
    this.startCol = this.parsed.startCol;
    this.startRow = this.parsed.startRow;
    this.offsetX = -this.parsed.cols / 2 + 0.5;
    this.offsetZ = -this.parsed.rows / 2 + 0.5;
    this.layer.position.set(this.offsetX, 0, this.offsetZ);

    for (let r = 0; r < this.parsed.rows; r++) {
      for (let c = 0; c < this.parsed.cols; c++) {
        const ch = this.parsed.grid[r][c];
        if (ch === '@' || ch === 'x') {
          this.createTile(this.matX, c, r);
        } else if (ch === 'o') {
          this.createTile(this.matO, c, r);
        } else if (ch === 'z') {
          this.createTile(this.matZ, c, r);
        }
      }
    }
  }

  private createTile(mat: THREE.Material, c: number, r: number): void {
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.position.set(c, -0.125, r);
    mesh.scale.set(1, 1, 1);
    mesh.receiveShadow = true;
    this.layer.add(mesh);

    const s = { v: 0.7 };
    mesh.scale.setScalar(s.v);
    new Tween(s, this.tweens)
      .delay((c + r) * 25)
      .to({ v: 1 }, animDuration(280))
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => mesh.scale.set(s.v, 1, s.v))
      .start();
  }

  isDeath(state: BlockState): boolean {
    if (!this.parsed) return true;
    return rulesIsDeath(this.parsed, state);
  }

  isWin(state: BlockState): boolean {
    if (!this.parsed) return false;
    return rulesIsWin(this.parsed, state);
  }

  toWorld(gridX: number, gridZ: number): { x: number; z: number } {
    return { x: this.offsetX + gridX, z: this.offsetZ + gridZ };
  }

  shake(): void {
    for (const e of this.layer.children) {
      const mesh = e as THREE.Mesh;
      new Tween(mesh.position, this.tweens)
        .to({ y: Math.random() / 2 - 0.25 }, animDuration(300))
        .easing(Easing.Quadratic.Out)
        .yoyo(true)
        .repeat(1)
        .start();
      new Tween(mesh.rotation, this.tweens)
        .to(
          {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5,
          },
          animDuration(300),
        )
        .easing(Easing.Quadratic.Out)
        .yoyo(true)
        .repeat(1)
        .start();
    }
  }

  remove(onDone: () => void): void {
    for (const e of this.layer.children) {
      const mesh = e as THREE.Mesh;
      const s = { v: 1 };
      new Tween(s, this.tweens)
        .to({ v: 0 }, animDuration(300))
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => mesh.scale.setScalar(s.v))
        .start();
    }
    new Tween({ t: 0 }, this.tweens)
      .to({ t: 1 }, animDuration(450))
      .onComplete(() => {
        this.clearImmediate();
        onDone();
      })
      .start();
  }

  clearImmediate(): void {
    while (this.layer.children.length) {
      this.layer.remove(this.layer.children[0]);
    }
  }
}
