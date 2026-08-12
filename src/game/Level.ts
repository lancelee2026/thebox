import * as THREE from 'three';
import { Group, Tween, Easing } from '@tweenjs/tween.js';
import type { BlockState } from './blockLogic';
import { animDuration } from './motion';
import type { LevelDef } from './levelTypes';
import {
  isDeath as rulesIsDeath,
  isWin as rulesIsWin,
  parseLevel,
  type ParsedLevel,
} from './rules';

type TileKind = 'x' | 'o' | 'z' | 'f' | 'b' | 's' | 'S' | 'p' | 'u' | 't' | 'c';

export class LevelView {
  readonly layer = new THREE.Group();
  startCol = 0;
  startRow = 0;
  offsetX = 0;
  offsetZ = 0;
  def: LevelDef | null = null;
  parsed: ParsedLevel | null = null;
  private tweens: Group;
  private geo = new THREE.BoxGeometry(1, 0.25, 1);
  private mats: Record<TileKind, THREE.MeshStandardMaterial> = {
    x: new THREE.MeshStandardMaterial({
      color: 0xf3f5f7,
      metalness: 0,
      roughness: 0.82,
    }),
    o: new THREE.MeshStandardMaterial({
      color: 0x1f9b58,
      emissive: 0x0a4d2c,
      emissiveIntensity: 0.16,
      metalness: 0,
      roughness: 0.72,
    }),
    z: new THREE.MeshStandardMaterial({
      color: 0xd6453a,
      metalness: 0,
      roughness: 0.78,
    }),
    f: new THREE.MeshStandardMaterial({
      color: 0xe8a317,
      metalness: 0,
      roughness: 0.8,
    }),
    b: new THREE.MeshStandardMaterial({
      color: 0x9ec9e8,
      metalness: 0,
      roughness: 0.78,
    }),
    s: new THREE.MeshStandardMaterial({
      color: 0xf0d56a,
      metalness: 0,
      roughness: 0.75,
    }),
    S: new THREE.MeshStandardMaterial({
      color: 0xd9782a,
      metalness: 0,
      roughness: 0.75,
    }),
    p: new THREE.MeshStandardMaterial({
      color: 0xa78bc0,
      metalness: 0,
      roughness: 0.78,
    }),
    u: new THREE.MeshStandardMaterial({
      color: 0x4fa8d8,
      metalness: 0,
      roughness: 0.78,
    }),
    t: new THREE.MeshStandardMaterial({
      color: 0x2ec8c0,
      emissive: 0x0f6f6a,
      emissiveIntensity: 0.28,
      metalness: 0.05,
      roughness: 0.62,
    }),
    c: new THREE.MeshStandardMaterial({
      color: 0x9aa3ad,
      metalness: 0,
      roughness: 0.92,
    }),
  };
  private ringGeo = new THREE.TorusGeometry(0.28, 0.045, 8, 20);
  private ringMat = new THREE.MeshStandardMaterial({
    color: 0xd8fffb,
    emissive: 0x5eead4,
    emissiveIntensity: 0.45,
    metalness: 0.1,
    roughness: 0.4,
  });
  /** key col,row -> mesh for bridges */
  private bridgeMeshes = new Map<string, THREE.Mesh>();
  /** key col,row -> mesh for crumble tiles */
  private crumbleMeshes = new Map<string, THREE.Mesh>();

  constructor(scene: THREE.Scene, tweens: Group) {
    this.tweens = tweens;
    scene.add(this.layer);
  }

  load(
    def: LevelDef,
    layer = 0,
    bridges: Record<string, boolean> = {},
    collapsed: Record<string, boolean> = {},
  ): void {
    this.clearImmediate();
    this.bridgeMeshes.clear();
    this.crumbleMeshes.clear();
    this.def = def;
    this.parsed = parseLevel(def, layer);
    this.startCol = this.parsed.startCol;
    this.startRow = this.parsed.startRow;
    this.offsetX = -this.parsed.cols / 2 + 0.5;
    this.offsetZ = -this.parsed.rows / 2 + 0.5;
    this.layer.position.set(this.offsetX, 0, this.offsetZ);

    for (let r = 0; r < this.parsed.rows; r++) {
      for (let c = 0; c < this.parsed.cols; c++) {
        const ch = this.parsed.grid[r][c];
        if (ch === '.' ) continue;
        if (ch === 'b') {
          const mesh = this.createTile(this.mats.b, c, r);
          mesh.visible = !!bridges[this.parsed.cellToBridge.get(`${c},${r}`) ?? ''];
          this.bridgeMeshes.set(`${c},${r}`, mesh);
          continue;
        }
        const kind = (ch === '@' ? 'x' : ch) as TileKind;
        if (this.mats[kind]) {
          const mesh = this.createTile(this.mats[kind], c, r);
          if (ch === 't') this.addTeleportRing(mesh);
          if (ch === 'c') {
            const key = `${c},${r}`;
            this.crumbleMeshes.set(key, mesh);
            if (collapsed[key]) {
              mesh.visible = false;
              mesh.scale.set(0.05, 1, 0.05);
            }
          }
        }
      }
    }
  }

  setLayer(
    layer: number,
    bridges: Record<string, boolean>,
    collapsed: Record<string, boolean> = {},
  ): void {
    if (!this.def) return;
    this.load(this.def, layer, bridges, collapsed);
  }

  syncBridges(bridges: Record<string, boolean>): void {
    if (!this.parsed) return;
    for (const [key, mesh] of this.bridgeMeshes) {
      const id = this.parsed.cellToBridge.get(key);
      const open = !!(id && bridges[id]);
      if (mesh.visible === open) continue;
      mesh.visible = true;
      const s = { v: open ? 0.2 : 1 };
      new Tween(s, this.tweens)
        .to({ v: open ? 1 : 0.05 }, animDuration(220))
        .onUpdate(() => mesh.scale.set(s.v, 1, s.v))
        .onComplete(() => {
          mesh.visible = open;
          if (open) mesh.scale.set(1, 1, 1);
        })
        .start();
    }
  }

  syncCollapsed(collapsed: Record<string, boolean>): void {
    for (const [key, mesh] of this.crumbleMeshes) {
      const down = !!collapsed[key];
      if (!down) {
        mesh.visible = true;
        mesh.scale.set(1, 1, 1);
        mesh.position.y = -0.125;
        continue;
      }
      if (!mesh.visible && mesh.scale.x < 0.1) continue;
      mesh.visible = true;
      const s = { v: 1, y: -0.125 };
      new Tween(s, this.tweens)
        .to({ v: 0.05, y: -0.55 }, animDuration(260))
        .easing(Easing.Quadratic.In)
        .onUpdate(() => {
          mesh.scale.set(s.v, 1, s.v);
          mesh.position.y = s.y;
        })
        .onComplete(() => {
          mesh.visible = false;
        })
        .start();
    }
  }

  private createTile(mat: THREE.Material, c: number, r: number): THREE.Mesh {
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.position.set(c, -0.125, r);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.layer.add(mesh);
    const s = { v: 0.72 };
    mesh.scale.set(s.v, 1, s.v);
    new Tween(s, this.tweens)
      .delay((c + r) * 16)
      .to({ v: 1 }, animDuration(260))
      .easing(Easing.Cubic.Out)
      .onUpdate(() => mesh.scale.set(s.v, 1, s.v))
      .start();
    return mesh;
  }

  private addTeleportRing(tile: THREE.Mesh): void {
    const ring = new THREE.Mesh(this.ringGeo, this.ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.18;
    ring.castShadow = false;
    ring.receiveShadow = false;
    tile.add(ring);
  }

  isDeath(
    state: BlockState,
    bridges: Record<string, boolean>,
    collapsed: Record<string, boolean> = {},
  ): boolean {
    if (!this.parsed) return true;
    return rulesIsDeath(this.parsed, state, bridges, collapsed);
  }

  isWin(
    state: BlockState,
    bridges: Record<string, boolean>,
    collapsed: Record<string, boolean> = {},
  ): boolean {
    if (!this.parsed) return false;
    return rulesIsWin(this.parsed, state, bridges, collapsed);
  }

  toWorld(gridX: number, gridZ: number): { x: number; z: number } {
    return { x: this.offsetX + gridX, z: this.offsetZ + gridZ };
  }

  shake(): void {
    const base: Array<{ mesh: THREE.Mesh; x: number; y: number; z: number }> = [];
    for (const e of this.layer.children) {
      const mesh = e as THREE.Mesh;
      base.push({ mesh, x: mesh.position.x, y: mesh.position.y, z: mesh.position.z });
    }
    for (const b of base) {
      const amp = 0.12;
      new Tween(b.mesh.position, this.tweens)
        .to(
          {
            x: b.x + (Math.random() - 0.5) * amp,
            y: b.y + (Math.random() - 0.5) * amp * 0.6,
            z: b.z + (Math.random() - 0.5) * amp,
          },
          animDuration(90),
        )
        .easing(Easing.Quadratic.Out)
        .yoyo(true)
        .repeat(3)
        .onComplete(() => {
          b.mesh.position.set(b.x, b.y, b.z);
          b.mesh.rotation.set(0, 0, 0);
        })
        .start();
    }
  }

  remove(onDone: () => void): void {
    for (const e of this.layer.children) {
      const mesh = e as THREE.Mesh;
      const s = { v: 1 };
      new Tween(s, this.tweens)
        .to({ v: 0 }, animDuration(280))
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => mesh.scale.setScalar(s.v))
        .start();
    }
    new Tween({ t: 0 }, this.tweens)
      .to({ t: 1 }, animDuration(420))
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
