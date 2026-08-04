import { Group } from '@tweenjs/tween.js';
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
  initialSnapshot,
  type WorldSnapshot,
} from './levelTypes';
import { applySwitches, effectiveCell, rawCell } from './rules';
import { Input } from '../input/Input';
import { Sfx } from '../audio/Sfx';
import { Hud, LevelSelect } from '../ui/hud';
import { loadProgress, saveProgress, type Progress } from './progress';

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
      layer: this.world.layer,
    };
  }

  private applySnapshot(snap: WorldSnapshot): void {
    this.world = {
      block: cloneState(snap.block),
      blockB: snap.blockB ? cloneState(snap.blockB) : null,
      active: snap.active,
      bridges: { ...snap.bridges },
      layer: snap.layer,
    };
    if (snap.blockB) {
      this.player.placeSplit(snap.block, snap.blockB, snap.active);
    } else {
      this.player.placeMerged(snap.block);
    }
    this.level.syncBridges(snap.bridges);
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
    this.level.load(def, 0, bridges);
    this.world = initialSnapshot(def, this.level.startCol, this.level.startRow);
    this.world.bridges = bridges;
    this.player.reset(this.world.block);
    this.hud.setLevel(level1Based);
    this.hud.setMoves(0);
    const coach =
      def.hint ??
      (level1Based === 1 ? '站立翻滚，卧倒后两格都进绿格才算过关。' : '');
    this.hud.setHint(coach);
    this.hud.setSwapVisible(false);
    this.input.setEnabled(true);
  }

  private handleDir(dir: Dir): void {
    this.sfx.unlock();
    if (this.busy || !this.player.canMove) return;
    const before = this.snapshot();
    const ok = this.player.tryMove(dir, () => this.afterMove(before));
    if (ok) this.sfx.move();
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

    const moving = this.player.isSplit
      ? this.player.active === 0
        ? this.player.state
        : this.player.stateB!
      : this.player.state;
    bridges = applySwitches(parsed, moving, bridges, this.player.isSplit);
    this.world.bridges = bridges;
    this.level.syncBridges(bridges);

    // split pad
    if (!this.player.isSplit && def.splitPads?.length) {
      const cells = occupiedCells(this.player.state);
      for (const pad of def.splitPads) {
        if (cells.some((c) => c.col === pad.col && c.row === pad.row)) {
          this.player.placeSplit(
            { col: pad.destA[0], row: pad.destA[1], ori: 'standing' },
            { col: pad.destB[0], row: pad.destB[1], ori: 'standing' },
            0,
          );
          this.world.block = cloneState(this.player.state);
          this.world.blockB = cloneState(this.player.stateB!);
          this.world.active = 0;
          this.hud.setSwapVisible(true);
          this.sfx.beep(320, 80, 0.2);
          break;
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
          this.level.setLayer(nextLayer, this.world.bridges);
          // keep position; re-place
          this.player.placeMerged(this.player.state);
          this.sfx.beep(280, 70, 0.15);
        }
      }
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

    if (this.level.isDeath(this.player.state, bridges)) {
      this.onDeath();
      return;
    }
    if (this.level.isWin(this.player.state, bridges)) {
      this.onWin();
    }
  }

  private cubeDead(state: { col: number; row: number }): boolean {
    const t = effectiveCell(this.level.parsed!, state.col, state.row, this.world.bridges);
    return t === '.' || t === 'z';
  }

  private onDeath(): void {
    this.busy = true;
    this.input.setEnabled(false);
    this.sfx.fail();
    this.level.shake();
    this.hud.showStatus('掉落 · 本关已重开', 'fail', 1600);
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
    const clearedMoves = this.moves;
    this.hud.showStatus(`过关！本关 ${clearedMoves} 步`, 'win', 900);

    if (this.levelNo > this.progress.maxCleared) {
      this.progress.maxCleared = this.levelNo;
      saveProgress(this.progress);
    }

    this.player.win(() => {
      if (this.levelNo >= LEVEL_COUNT) {
        this.hud.clearStatus();
        this.select.showWin(this.totalMoves, this.progress);
        this.busy = false;
        return;
      }
      const advance = () => {
        this.level.remove(() => {
          this.loadLevel(this.levelNo + 1);
          this.busy = false;
        });
      };
      // 让过关 chip 露一小会儿再切关
      window.setTimeout(advance, 450);
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
      this.level.setLayer(prev.layer, prev.bridges);
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
