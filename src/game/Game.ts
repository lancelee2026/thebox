import { Group } from '@tweenjs/tween.js';
import { createScene } from './setup';
import { LevelView } from './Level';
import { Player } from './Player';
import { LEVELS, LEVEL_COUNT } from './levels';
import type { BlockState, Dir } from './blockLogic';
import { cloneState } from './blockLogic';
import { Input } from '../input/Input';
import { Sfx } from '../audio/Sfx';
import { Hud, LevelSelect } from '../ui/hud';
import {
  loadProgress,
  saveProgress,
  type Progress,
} from './progress';

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
  /** 当前关卡 1-based */
  private levelNo = 1;
  private moves = 0;
  private totalMoves = 0;
  private history: BlockState[] = [];
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

    window.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') this.restart();
      if (e.key === 'z' || e.key === 'Z' || e.key === 'Backspace') {
        e.preventDefault();
        this.undo();
      }
    });

    const start = Math.min(
      Math.max(1, this.progress.lastPlayed),
      this.progress.maxCleared + 1,
      LEVEL_COUNT,
    );
    this.loadLevel(start);
    this.loop(0);
  }

  private loadLevel(level1Based: number): void {
    this.busy = false;
    this.levelNo = level1Based;
    this.moves = 0;
    this.history = [];
    this.progress.lastPlayed = level1Based;
    saveProgress(this.progress);

    const map = LEVELS[level1Based - 1];
    this.level.load(map);
    const start: BlockState = {
      col: this.level.startCol,
      row: this.level.startRow,
      ori: 'standing',
    };
    this.player.reset(start);
    this.hud.setLevel(level1Based);
    this.hud.setMoves(0);
    this.input.setEnabled(true);
  }

  private handleDir(dir: Dir): void {
    this.sfx.unlock();
    if (this.busy || !this.player.canMove) return;

    const before = cloneState(this.player.state);
    const ok = this.player.tryMove(dir, (after) => this.afterMove(before, after));
    if (ok) this.sfx.move();
  }

  private afterMove(before: BlockState, after: BlockState): void {
    this.history.push(before);
    if (this.history.length > 50) this.history.shift();
    this.moves++;
    this.totalMoves++;
    this.hud.setMoves(this.moves);

    if (this.level.isDeath(after)) {
      this.onDeath();
      return;
    }
    if (this.level.isWin(after)) {
      this.onWin();
    }
  }

  private onDeath(): void {
    this.busy = true;
    this.input.setEnabled(false);
    this.sfx.fail();
    this.level.shake();
    this.player.fall(() => {
      const start: BlockState = {
        col: this.level.startCol,
        row: this.level.startRow,
        ori: 'standing',
      };
      this.history = [];
      this.moves = 0;
      this.hud.setMoves(0);
      this.player.reset(start, () => {
        this.busy = false;
        this.input.setEnabled(true);
      });
    });
  }

  private onWin(): void {
    this.busy = true;
    this.input.setEnabled(false);
    this.sfx.win();

    if (this.levelNo > this.progress.maxCleared) {
      this.progress.maxCleared = this.levelNo;
      saveProgress(this.progress);
    }

    this.player.win(() => {
      if (this.levelNo >= LEVEL_COUNT) {
        this.select.showWin(this.totalMoves, this.progress);
        this.busy = false;
        return;
      }
      this.level.remove(() => {
        this.loadLevel(this.levelNo + 1);
        this.busy = false;
      });
    });
  }

  private undo(): void {
    if (this.busy || !this.player.canMove) return;
    const prev = this.history.pop();
    if (!prev) return;
    this.moves = Math.max(0, this.moves - 1);
    this.hud.setMoves(this.moves);
    this.player.place(prev);
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
