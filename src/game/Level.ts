import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
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
  private geo = new RoundedBoxGeometry(0.96, 0.25, 0.96, 3, 0.075);
  private goalInsetGeo = new RoundedBoxGeometry(0.67, 0.055, 0.67, 3, 0.08);
  private goalDockGeo = new RoundedBoxGeometry(0.82, 0.08, 0.82, 4, 0.1);
  private goalDockMat = new THREE.MeshStandardMaterial({
    color: 0xb9ffe1,
    emissive: 0x36d99b,
    emissiveIntensity: 0.28,
    metalness: 0.01,
    roughness: 0.38,
  });
  private goalInsetMat = new THREE.MeshStandardMaterial({
    color: 0x91f3c8,
    emissive: 0x2bd893,
    emissiveIntensity: 0.48,
    metalness: 0.02,
    roughness: 0.42,
  });
  private trayBaseMat = new THREE.MeshStandardMaterial({
    color: 0x72bfe4,
    metalness: 0.02,
    roughness: 0.46,
  });
  private trayRimMat = new THREE.MeshStandardMaterial({
    color: 0xd7f2fc,
    metalness: 0.01,
    roughness: 0.4,
  });
  private trayInsetMat = new THREE.MeshStandardMaterial({
    color: 0x3f96c3,
    metalness: 0,
    roughness: 0.64,
  });
  private trayMeshes: THREE.Mesh[] = [];
  private trayTweens: Tween<{ y: number; scale: number }>[] = [];
  private highAltitude = false;
  private mats: Record<TileKind, THREE.MeshStandardMaterial> = {
    x: new THREE.MeshStandardMaterial({
      color: 0xf7fbff,
      metalness: 0,
      roughness: 0.62,
    }),
    o: new THREE.MeshStandardMaterial({
      color: 0x38d69b,
      emissive: 0x0b6847,
      emissiveIntensity: 0.2,
      metalness: 0,
      roughness: 0.52,
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
    this.addTray(this.parsed.cols, this.parsed.rows);

    for (let r = 0; r < this.parsed.rows; r++) {
      for (let c = 0; c < this.parsed.cols; c++) {
        const ch = this.parsed.grid[r][c];
        if (ch === '.' ) continue;
        if (ch === 'b') {
          const mesh = this.createTile(this.mats.b, c, r, 'b');
          mesh.visible = !!bridges[this.parsed.cellToBridge.get(`${c},${r}`) ?? ''];
          this.bridgeMeshes.set(`${c},${r}`, mesh);
          continue;
        }
        const kind = (ch === '@' ? 'x' : ch) as TileKind;
        if (this.mats[kind]) {
          const mesh = this.createTile(this.mats[kind], c, r, kind);
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

  /** 给每关铺一只软质树脂托盘，让路径像被摆进一个明确的玩具舞台。 */
  private addTray(cols: number, rows: number): void {
    const width = cols + 1.34;
    const depth = Math.max(rows + 1.34, 4.3);
    const centerX = (cols - 1) / 2;
    const centerZ = (rows - 1) / 2;
    const baseGeo = new RoundedBoxGeometry(width, 0.58, depth, 6, 0.24);
    const rimGeo = new RoundedBoxGeometry(width - 0.2, 0.22, depth - 0.2, 6, 0.2);
    const insetGeo = new RoundedBoxGeometry(width - 0.46, 0.12, depth - 0.46, 5, 0.18);
    const base = new THREE.Mesh(baseGeo, this.trayBaseMat);
    base.position.set(centerX, -0.59, centerZ);
    base.castShadow = true;
    base.receiveShadow = true;
    base.userData.trayGeometry = baseGeo;
    base.userData.trayBaseY = base.position.y;
    this.layer.add(base);

    const rim = new THREE.Mesh(rimGeo, this.trayRimMat);
    rim.position.set(centerX, -0.36, centerZ);
    rim.castShadow = true;
    rim.receiveShadow = true;
    rim.userData.trayGeometry = rimGeo;
    rim.userData.trayBaseY = rim.position.y;
    this.layer.add(rim);

    const inset = new THREE.Mesh(insetGeo, this.trayInsetMat);
    inset.position.set(centerX, -0.225, centerZ);
    inset.castShadow = false;
    inset.receiveShadow = true;
    inset.userData.trayGeometry = insetGeo;
    inset.userData.trayBaseY = inset.position.y;
    this.layer.add(inset);
    this.trayMeshes.push(base, rim, inset);
    for (const mesh of this.trayMeshes) mesh.visible = !this.highAltitude;
  }

  /** 高空模式下让树脂托盘下沉退场，只留下仍带侧面与阴影的路径砖。 */
  setHighAltitude(enabled: boolean): void {
    if (this.highAltitude === enabled && this.trayMeshes.every((mesh) => mesh.visible !== enabled)) {
      return;
    }
    this.highAltitude = enabled;
    for (const tween of this.trayTweens) tween.stop();
    this.trayTweens.length = 0;

    for (const mesh of this.trayMeshes) {
      const baseY = mesh.userData.trayBaseY as number;
      if (!enabled) {
        mesh.visible = true;
        mesh.position.y = baseY - 0.28;
        mesh.scale.set(0.96, 1, 0.96);
      }
      const state = { y: mesh.position.y, scale: mesh.scale.x };
      const tween = new Tween(state, this.tweens)
        .to(
          enabled ? { y: baseY - 0.32, scale: 0.96 } : { y: baseY, scale: 1 },
          animDuration(enabled ? 240 : 320),
        )
        .easing(enabled ? Easing.Quadratic.In : Easing.Cubic.Out)
        .onUpdate(() => {
          mesh.position.y = state.y;
          mesh.scale.set(state.scale, 1, state.scale);
        })
        .onComplete(() => {
          mesh.visible = !enabled;
          mesh.position.y = baseY;
          mesh.scale.set(1, 1, 1);
        })
        .start();
      this.trayTweens.push(tween);
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

  private createTile(mat: THREE.Material, c: number, r: number, kind: TileKind): THREE.Mesh {
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.position.set(c, -0.125, r);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.layer.add(mesh);
    if (kind === 'o') {
      const dock = new THREE.Mesh(this.goalDockGeo, this.goalDockMat);
      dock.position.y = 0.17;
      dock.castShadow = false;
      dock.receiveShadow = false;
      mesh.add(dock);
      const inset = new THREE.Mesh(this.goalInsetGeo, this.goalInsetMat);
      inset.position.y = 0.23;
      inset.castShadow = false;
      inset.receiveShadow = false;
      mesh.add(inset);
    }
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
      if (this.trayMeshes.includes(mesh)) continue;
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
      if (this.trayMeshes.includes(mesh)) continue;
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
    for (const tween of this.trayTweens) tween.stop();
    this.trayTweens.length = 0;
    while (this.layer.children.length) {
      const child = this.layer.children[0] as THREE.Mesh;
      const trayGeometry = child.userData.trayGeometry as THREE.BufferGeometry | undefined;
      trayGeometry?.dispose();
      this.layer.remove(child);
    }
    this.trayMeshes.length = 0;
  }
}
