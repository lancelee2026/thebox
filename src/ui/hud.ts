import { LEVELS, LEVEL_COUNT } from '../game/levels';
import { isLevelLocked, type Progress } from '../game/progress';

export class Hud {
  private levelLabel = document.getElementById('level-label')!;
  private movesLabel = document.getElementById('moves-label')!;
  private muteBtn = document.getElementById('btn-mute')!;
  private hintEl = document.getElementById('hint-mechanic');
  private swapBtn = document.getElementById('btn-swap');

  setLevel(level1Based: number): void {
    this.levelLabel.textContent = `第 ${level1Based} / ${LEVEL_COUNT} 关`;
  }

  setMoves(n: number): void {
    this.movesLabel.textContent = `步数 ${n}`;
  }

  setMuted(muted: boolean): void {
    this.muteBtn.textContent = muted ? '静音' : '声音';
    this.muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
  }

  setHint(text: string): void {
    if (!this.hintEl) return;
    if (text) {
      this.hintEl.textContent = text;
      this.hintEl.classList.remove('hidden');
    } else {
      this.hintEl.textContent = '';
      this.hintEl.classList.add('hidden');
    }
  }

  setSwapVisible(v: boolean): void {
    if (!this.swapBtn) return;
    this.swapBtn.classList.toggle('hidden', !v);
  }
}

export class LevelSelect {
  private overlay = document.getElementById('overlay')!;
  private panelSelect = document.getElementById('panel-select')!;
  private panelWin = document.getElementById('panel-win')!;
  private grid = document.getElementById('level-grid')!;
  private winText = document.getElementById('win-text')!;
  private onPick: ((level1Based: number) => void) | null = null;
  private current = 1;
  private progress: Progress = { maxCleared: 0, lastPlayed: 1, muted: false };

  constructor() {
    document.getElementById('btn-close-select')!.addEventListener('click', () => this.hide());
    document.getElementById('btn-win-select')!.addEventListener('click', () => {
      this.hideWin();
      this.show(this.current, this.progress);
    });
  }

  onSelect(cb: (level1Based: number) => void): void {
    this.onPick = cb;
  }

  show(currentLevel: number, progress: Progress): void {
    this.current = currentLevel;
    this.progress = progress;
    this.overlay.classList.remove('hidden');
    this.overlay.setAttribute('aria-hidden', 'false');
    this.panelSelect.classList.remove('hidden');
    this.panelWin.classList.add('hidden');
    this.render();
  }

  hide(): void {
    this.overlay.classList.add('hidden');
    this.overlay.setAttribute('aria-hidden', 'true');
    this.panelSelect.classList.add('hidden');
    this.panelWin.classList.add('hidden');
  }

  showWin(totalMoves: number, progress: Progress): void {
    this.progress = progress;
    this.overlay.classList.remove('hidden');
    this.overlay.setAttribute('aria-hidden', 'false');
    this.panelSelect.classList.add('hidden');
    this.panelWin.classList.remove('hidden');
    this.winText.textContent = `你一共走了 ${totalMoves} 步，太厉害了！`;
  }

  hideWin(): void {
    this.panelWin.classList.add('hidden');
  }

  private render(): void {
    const maxCleared = this.progress.maxCleared;
    this.grid.replaceChildren();
    let lastChapter = '';
    for (let i = 1; i <= LEVEL_COUNT; i++) {
      const chapter = LEVELS[i - 1].chapter ?? '';
      if (chapter && chapter !== lastChapter) {
        lastChapter = chapter;
        const label = document.createElement('div');
        label.className = 'chapter-label';
        label.textContent = chapter;
        this.grid.appendChild(label);
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'level-cell';
      const locked = isLevelLocked(i, maxCleared);
      if (locked) {
        btn.classList.add('locked');
        btn.textContent = '锁';
        btn.title = '先通关前面的关卡';
      } else if (i <= maxCleared) {
        btn.classList.add('cleared');
        btn.textContent = String(i);
      } else {
        btn.classList.add('next');
        btn.textContent = String(i);
      }
      if (i === this.current) btn.classList.add('current');
      btn.addEventListener('click', () => {
        if (locked) {
          btn.animate(
            [
              { transform: 'translateX(0)' },
              { transform: 'translateX(-4px)' },
              { transform: 'translateX(4px)' },
              { transform: 'translateX(0)' },
            ],
            { duration: 200 },
          );
          return;
        }
        this.hide();
        this.onPick?.(i);
      });
      this.grid.appendChild(btn);
    }
  }
}
