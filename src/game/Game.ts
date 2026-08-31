import { Group, Tween, Easing } from '@tweenjs/tween.js';
import { createScene } from './setup';
import { LevelView } from './Level';
import { Player } from './Player';
import { LEVELS, LEVEL_COUNT, getLevel } from './levels';
import type { Dir } from './blockLogic';
import {
  canMerge,
  cloneState,
  mergeBlocks,
  occupiedCells,
} from './blockLogic';
import {
  emptyBridges,
  emptyCollapsed,
  initialSnapshot,
  type WorldSnapshot,
} from './levelTypes';
import { applyCollapse, applySwitches, applyTeleport, effectiveCell, rawCell } from './rules';
import { animDuration } from './motion';
import { Input } from '../input/Input';
import { Sfx } from '../audio/Sfx';
import { Hud, LevelSelect } from '../ui/hud';
import { loadProgress, recordStars, saveProgress, type Progress } from './progress';
import { starsForMoves } from './stars';

export class Game {
  private tweens = new Group();
  private sceneSetup: ReturnType<typeof createScene>;
  private level: LevelView;
  private player: Player;
  private input = new Input();
  private sfx = new Sfx();
  private hud = new Hud();
  private select = new LevelSelect();
  private progress: Progress;
  private levelNo = 1;
  private moves = 0;
  private totalMoves = 0;
  private history: WorldSnapshot[] = [];
  private world: WorldSnapshot = initialSnapshot(LEVELS[0], 0, 0);
  private busy = false;

  constructor() {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.sceneSetup = createScene(canvas);
    this.level = new LevelView(this.sceneSetup.scene, this.tweens);
    this.player = new Player(this.sceneSetup.scene, this.level, this.tweens);
    this.progress = loadProgress();
    this.sfx.setMuted(this.progress.muted);
    this.hud.setMuted(this.progress.muted);

    this.input.onMove((dir) => this.handleDir(dir));
    this.select.onSelect((n) => this.loadLevel(n));

    document.getElementById('btn-select')!.addEventListener('click', () => {
      this.select.show(this.levelNo, this.progress);
    });
    document.getElementById('btn-undo')!.addEventListener('click', () => this.undo());
    document.getElementById('btn-restart')!.addEventListener('click', () => this.restart());
    document.getElementById('btn-mute')!.addEventListener('click', () => this.toggleMute());
    document.getElementById('btn-swap')?.addEventListener('click', () => this.swapEntity());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') this.restart();
      if (e.key === 'z' || e.key === 'Z' || e.key === 'Backspace') {
        e.preventDefault();
        this.undo();
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        this.swapEntity();
      }
    });

    const start = Math.min(
      Math.max(1, this.progress.lastPlayed),
      this.progress.maxCleared + 1,
      LEVEL_COUNT,
    );
    this.loadLevel(start);
    requestAnimationFrame(this.loop);
  }

  private snapshot(): WorldSnapshot {
    return {
      block: cloneState(this.player.state),
      blockB: this.player.stateB ? cloneState(this.player.stateB) : null,
      active: this.player.active,
      bridges: { ...this.world.bridges },
      collapsed: { ...this.world.collapsed },
      layer: this.world.layer,
    };
  }

  private applySnapshot(snap: WorldSnapshot): void {
    this.world = {
      block: cloneState(snap.block),
      blockB: snap.blockB ? cloneState(snap.blockB) : null,
      active: snap.active,
      bridges: { ...snap.bridges },
      collapsed: { ...snap.collapsed },
      layer: snap.layer,
    };
    if (snap.blockB) {
      this.player.placeSplit(snap.block, snap.blockB, snap.active);
    } else {
      this.player.placeMerged(snap.block);
    }
    this.level.syncBridges(snap.bridges);
    this.level.syncCollapsed(snap.collapsed);
  }

  private loadLevel(level1Based: number): void {
    this.busy = false;
    this.levelNo = level1Based;
    this.moves = 0;
    this.history = [];
    this.progress.lastPlayed = level1Based;
    saveProgress(this.progress);

    const def = getLevel(level1Based - 1);
    const bridges = emptyBridges(def);
    const collapsed = emptyCollapsed();
    this.level.load(def, 0, bridges, collapsed);
    if (this.level.parsed) {
      this.sceneSetup.frameBoard(this.level.parsed.cols, this.level.parsed.rows);
    }
    this.world = initialSnapshot(def, this.level.startCol, this.level.startRow);
    this.world.bridges = bridges;
    this.world.collapsed = collapsed;
    this.player.reset(this.world.block);
    this.hud.setLevel(level1Based);
    this.hud.setMoves(0);
    const coach =
      def.hint ??
      (level1Based === 1 ? '把小方块送回家。' : '');
    this.hud.setHint(coach);
    this.hud.hideClear();
    this.hud.setSwapVisible(false);
    this.input.setEnabled(true);
  }

  private handleDir(dir: Dir): void {
    this.sfx.unlock();
    if (this.busy || !this.player.canMove) return;
    const before = this.snapshot();
    const ok = this.player.tryMove(
      dir,
      () => this.afterMove(before),
      () => this.sfx.land(),
    );
    if (ok) this.sfx.move();
  }

  /** 过关瞬间镜头轻抬一下 */
  private punchCamera(): void {
    const pivot = this.sceneSetup.cameraPivot;
    const base = pivot.position.y;
    const t = { y: base };
    new Tween(t, this.tweens)
      .to({ y: base + 0.18 }, animDuration(140))
      .easing(Easing.Quadratic.Out)
      .yoyo(true)
      .repeat(1)
      .onUpdate(() => {
        pivot.position.y = t.y;
      })
      .onComplete(() => {
        pivot.position.y = base;
      })
      .start();
  }

  private swapEntity(): void {
    if (this.busy || !this.player.isSplit) return;
    this.player.toggleActive();
    this.world.active = this.player.active;
    this.sfx.beep(240, 40, 0.12);
  }

  private afterMove(before: WorldSnapshot): void {
    this.history.push(before);
    if (this.history.length > 50) this.history.shift();
    this.moves++;
    this.totalMoves++;
    this.hud.setMoves(this.moves);

    const def = getLevel(this.levelNo - 1);
    const parsed = this.level.parsed!;
    let bridges = { ...this.world.bridges };
    let collapsed = { ...this.world.collapsed };

    const prevMoving = before.blockB
      ? before.active === 0
        ? before.block
        : before.blockB
      : before.block;
    const prevCells = occupiedCells(prevMoving);

    const moving = this.player.isSplit
      ? this.player.active === 0
        ? this.player.state
        : this.player.stateB!
      : this.player.state;
    bridges = applySwitches(parsed, moving, bridges, this.player.isSplit);
    this.world.bridges = bridges;
    this.level.syncBridges(bridges);

    const warped = applyTeleport(parsed, this.player.state, this.player.isSplit);
    if (warped) {
      const stay = occupiedCells(warped);
      collapsed = applyCollapse(parsed, prevCells, stay, collapsed);
      this.world.collapsed = collapsed;
      this.level.syncCollapsed(collapsed);
      this.busy = true;
      this.input.setEnabled(false);
      this.sfx.beep(560, 70, 0.16, 'sine');
      this.player.animateTeleport(warped, () => {
        this.world.block = cloneState(this.player.state);
        this.world.blockB = null;
        this.world.active = 0;
        this.busy = false;
        this.input.setEnabled(true);
        if (this.level.isDeath(this.player.state, bridges, collapsed)) {
          this.onDeath();
          return;
        }
        if (this.level.isWin(this.player.state, bridges, collapsed)) {
          this.onWin();
        }
      });
      this.world.block = cloneState(warped);
      return;
    }

    // split pad
    if (!this.player.isSplit && parsed.splitPads.length) {
      const cells = occupiedCells(this.player.state);
      for (const pad of parsed.splitPads) {
        if (cells.some((c) => c.col === pad.col && c.row === pad.row)) {
          const destA = { col: pad.destA[0], row: pad.destA[1], ori: 'standing' as const };
          const destB = { col: pad.destB[0], row: pad.destB[1], ori: 'standing' as const };
          const stay = [...occupiedCells(destA), ...occupiedCells(destB)];
          collapsed = applyCollapse(parsed, prevCells, stay, collapsed);
          this.world.collapsed = collapsed;
          this.level.syncCollapsed(collapsed);
          this.busy = true;
          this.input.setEnabled(false);
          this.sfx.beep(320, 80, 0.2);
          this.player.animateSplit(destA, destB, () => {
            this.world.block = cloneState(this.player.state);
            this.world.blockB = this.player.stateB ? cloneState(this.player.stateB) : null;
            this.world.active = this.player.active;
            this.hud.setSwapVisible(true);
            this.busy = false;
            this.input.setEnabled(true);
            if (
              this.cubeDead(this.player.state) ||
              (this.player.stateB && this.cubeDead(this.player.stateB))
            ) {
              this.onDeath();
            }
          });
          this.world.block = cloneState(destA);
          this.world.blockB = cloneState(destB);
          this.world.active = 0;
          return;
        }
      }
    }

    // merge
    if (this.player.isSplit && this.player.stateB && canMerge(this.player.state, this.player.stateB)) {
      const merged = mergeBlocks(this.player.state, this.player.stateB);
      this.player.placeMerged(merged);
      this.world.block = cloneState(merged);
      this.world.blockB = null;
      this.hud.setSwapVisible(false);
      this.sfx.beep(400, 60, 0.18);
    }

    // stair / layer
    if (def.layers && def.layers.length > 1 && !this.player.isSplit) {
      const cells = occupiedCells(this.player.state);
      const onStair = cells.some((c) => rawCell(parsed, c.col, c.row) === 'u');
      if (onStair && this.player.state.ori === 'standing') {
        const nextLayer = (this.world.layer + 1) % def.layers.length;
        if (nextLayer !== this.world.layer) {
          this.world.layer = nextLayer;
          this.level.setLayer(nextLayer, this.world.bridges, collapsed);
          // keep position; re-place
          this.player.placeMerged(this.player.state);
          this.sfx.beep(280, 70, 0.15);
        }
      }
    }

    const stay = this.player.stateB
      ? [...occupiedCells(this.player.state), ...occupiedCells(this.player.stateB)]
      : occupiedCells(this.player.state);
    const prevCollapsed = this.world.collapsed;
    collapsed = applyCollapse(parsed, prevCells, stay, prevCollapsed);
    if (collapsed !== prevCollapsed) {
      this.world.collapsed = collapsed;
      this.level.syncCollapsed(collapsed);
      this.sfx.beep(150, 50, 0.12, 'triangle');
    }

    this.world.block = cloneState(this.player.state);
    this.world.blockB = this.player.stateB ? cloneState(this.player.stateB) : null;
    this.world.active = this.player.active;

    if (this.player.isSplit) {
      const deadA = this.cubeDead(this.player.state);
      const deadB = this.cubeDead(this.player.stateB!);
      if (deadA || deadB) {
        this.onDeath();
        return;
      }
      return;
    }

    if (this.level.isDeath(this.player.state, bridges, collapsed)) {
      this.onDeath();
      return;
    }
    if (this.level.isWin(this.player.state, bridges, collapsed)) {
      this.onWin();
    }
  }

  private cubeDead(state: { col: number; row: number }): boolean {
    const t = effectiveCell(
      this.level.parsed!,
      state.col,
      state.row,
      this.world.bridges,
      this.world.collapsed,
    );
    return t === '.' || t === 'z';
  }

  private onDeath(): void {
    this.busy = true;
    this.input.setEnabled(false);
    this.sfx.fail();
    this.player.setMood('surprised');
    this.level.shake();
    this.player.fall(() => {
      this.history = [];
      this.moves = 0;
      this.hud.setMoves(0);
      this.loadLevel(this.levelNo);
      this.busy = false;
    });
  }

  private onWin(): void {
    this.busy = true;
    this.input.setEnabled(false);
    this.sfx.win();
    this.punchCamera();
    const clearedMoves = this.moves;
    const earned = starsForMoves(clearedMoves, this.levelNo);
    this.progress = recordStars(this.progress, this.levelNo, earned);
    if (this.levelNo > this.progress.maxCleared) {
      this.progress.maxCleared = this.levelNo;
    }
    saveProgress(this.progress);
    this.hud.showClear(earned, clearedMoves);

    this.player.win(() => {
      if (this.levelNo >= LEVEL_COUNT) {
        this.hud.hideClear();
        this.select.showWin(this.totalMoves, this.progress);
        this.busy = false;
        return;
      }
      this.sfx.clearLevel();
      window.setTimeout(() => {
        this.hud.hideClear();
        this.level.remove(() => {
          this.loadLevel(this.levelNo + 1);
          this.busy = false;
        });
      }, 800);
    });
  }

  private undo(): void {
    if (this.busy || !this.player.canMove) return;
    const prev = this.history.pop();
    if (!prev) return;
    this.moves = Math.max(0, this.moves - 1);
    this.hud.setMoves(this.moves);
    const def = getLevel(this.levelNo - 1);
    if (def.layers && prev.layer !== this.world.layer) {
      this.level.setLayer(prev.layer, prev.bridges, prev.collapsed);
    }
    this.applySnapshot(prev);
    this.hud.setSwapVisible(!!prev.blockB);
    this.sfx.beep(160, 40, 0.15);
  }

  private restart(): void {
    if (this.busy) return;
    this.loadLevel(this.levelNo);
  }

  private toggleMute(): void {
    this.progress.muted = !this.progress.muted;
    this.sfx.setMuted(this.progress.muted);
    this.hud.setMuted(this.progress.muted);
    saveProgress(this.progress);
  }

  private loop = (time: number): void => {
    requestAnimationFrame(this.loop);
    this.tweens.update(time);
    this.sceneSetup.renderer.render(this.sceneSetup.scene, this.sceneSetup.camera);
  };
}
