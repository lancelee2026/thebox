import * as THREE from 'three';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import type { LevelMap } from './levels';
import type { BlockState } from './blockLogic';
import { occupiedCells } from './blockLogic';
import { animDuration } from './motion';

export class LevelView {
  readonly layer = new THREE.Group();
  startCol = 0;
  startRow = 0;
  offsetX = 0;
  offsetZ = 0;
  private grid: string[][] = [];
  private cols = 0;
  private rows = 0;
  private tweens: Group;
  private geo = new THREE.BoxGeometry(1, 0.25, 1);
  private matX = new THREE.MeshLambertMaterial({ color: 0xffffff });
  private matO = new THREE.MeshLambertMaterial({ color: 0x27ae60 });
  private matZ = new THREE.MeshLambertMaterial({ color: 0xe74c3c });

  constructor(scene: THREE.Scene, tweens: Group) {
    this.tweens = tweens;
    scene.add(this.layer);
  }

  load(map: LevelMap): void {
    this.clearImmediate();
    this.rows = map.length;
    this.cols = Math.max(...map.map((r) => r.length));
    this.grid = map.map((row) => {
      const cells = row.split('');
      while (cells.length < this.cols) cells.push('.');
      return cells;
    });

    this.offsetX = -this.cols / 2 + 0.5;
    this.offsetZ = -this.rows / 2 + 0.5;
    this.layer.position.set(this.offsetX, 0, this.offsetZ);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const ch = this.grid[r][c];
        if (ch === '@') {
          this.startCol = c;
          this.startRow = r;
          this.createTile(this.matX, c, r);
        } else if (ch === 'x') {
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
    mesh.scale.set(0, 1, 0);
    mesh.receiveShadow = true;
    this.layer.add(mesh);

    new Tween(mesh.scale, this.tweens)
      .delay((c + r) * 30)
      .to({ x: 1, z: 1 }, animDuration(300))
      .easing(Easing.Quadratic.InOut)
      .start();
  }

  getCell(col: number, row: number): string {
    if (col < 0 || row < 0 || col >= this.cols || row >= this.rows) return '.';
    return this.grid[row][col];
  }

  isDeath(state: BlockState): boolean {
    const cells = occupiedCells(state);
    if (cells.length === 1) {
      const t = this.getCell(cells[0].col, cells[0].row);
      return t === '.' || t === 'z';
    }
    const a = this.getCell(cells[0].col, cells[0].row);
    const b = this.getCell(cells[1].col, cells[1].row);
    if (a === 'z' || b === 'z') return true;
    return a === '.' && b === '.';
  }

  isWin(state: BlockState): boolean {
    const cells = occupiedCells(state);
    if (cells.length !== 2) return false;
    return (
      this.getCell(cells[0].col, cells[0].row) === 'o' &&
      this.getCell(cells[1].col, cells[1].row) === 'o'
    );
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
      new Tween(e.scale, this.tweens)
        .to({ x: 0, y: 0, z: 0 }, animDuration(300))
        .easing(Easing.Quadratic.InOut)
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
