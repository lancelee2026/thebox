import type { Dir } from '../game/blockLogic';

export type InputHandler = (dir: Dir) => void;

export class Input {
  private handler: InputHandler | null = null;
  private enabled = true;

  constructor() {
    window.addEventListener('keydown', this.onKey);
    for (const id of ['pad-up', 'pad-down', 'pad-left', 'pad-right'] as const) {
      const el = document.getElementById(id);
      el?.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const dir = (el as HTMLElement).dataset.dir as Dir;
        this.emit(dir);
      });
    }
  }

  onMove(handler: InputHandler): void {
    this.handler = handler;
  }

  setEnabled(v: boolean): void {
    this.enabled = v;
  }

  private emit(dir: Dir): void {
    if (!this.enabled || !this.handler) return;
    this.handler(dir);
  }

  private onKey = (e: KeyboardEvent): void => {
    if (!this.enabled) return;
    const map: Record<string, Dir> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
      a: 'left',
      A: 'left',
      d: 'right',
      D: 'right',
      w: 'up',
      W: 'up',
      s: 'down',
      S: 'down',
    };
    const dir = map[e.key];
    if (!dir) return;
    e.preventDefault();
    this.emit(dir);
  };
}
