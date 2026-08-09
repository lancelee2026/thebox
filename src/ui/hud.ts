import { LEVELS, LEVEL_COUNT } from '../game/levels';
import { isLevelLocked, type Progress } from '../game/progress';
import { STAR_CAP, totalStars } from '../game/stars';

const NS = 'http://www.w3.org/2000/svg';

const ICON_PATHS: Record<string, string> = {
  'icon-lock':
    '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  'icon-grid':
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  'icon-undo':
    '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 1 1 0 11H12"/>',
  'icon-restart':
    '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  'icon-swap':
    '<path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3 14 10"/><path d="m3 21 7-7"/><rect x="8.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="12.5" width="3" height="3" rx="0.5"/>',
  'icon-sound':
    '<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  'icon-mute':
    '<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
  'icon-star':
    '<path d="M12 3.2 14.4 9l6.1.5-4.7 3.9 1.5 5.9L12 15.8 6.7 19.3l1.5-5.9L3.5 9.5 9.6 9z"/>',
  'icon-check': '<path d="M5 13.5 9.5 18 19 7"/>',
};

/** Build icon via createElementNS — no SVG innerHTML (Trusted Types / older WebKit) */
export function iconEl(id: string, className = 'icon'): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const stroke = '2';
  const raw = ICON_PATHS[id] ?? '';
  // Parse as XML fragment under svg root
  const parsed = new DOMParser().parseFromString(
    `<svg xmlns="${NS}">${raw}</svg>`,
    'image/svg+xml',
  );
  const root = parsed.documentElement;
  if (root.querySelector('parsererror')) {
    return svg;
  }
  for (const child of Array.from(root.childNodes)) {
    const imported = document.importNode(child, true);
    if (imported.nodeType === Node.ELEMENT_NODE) {
      const el = imported as Element;
      el.setAttribute('stroke', 'currentColor');
      el.setAttribute('stroke-width', stroke);
      el.setAttribute('stroke-linecap', 'round');
      el.setAttribute('stroke-linejoin', 'round');
      el.setAttribute('fill', id === 'icon-star' ? 'currentColor' : 'none');
    }
    svg.appendChild(imported);
  }
  return svg;
}

function mustEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`缺少页面元素 #${id}，请强制刷新后重试`);
  return el as T;
}

function fillSelectStat(
  el: HTMLElement | null,
  iconId: string,
  label: string,
  value: number,
  cap: number,
): void {
  if (!el) return;
  const nums = document.createElement('span');
  nums.className = 'select-stat-nums';
  const strong = document.createElement('strong');
  strong.textContent = String(value);
  const sep = document.createElement('span');
  sep.className = 'select-stat-sep';
  sep.textContent = '/';
  const total = document.createElement('span');
  total.className = 'select-stat-cap';
  total.textContent = String(cap);
  nums.append(strong, sep, total);

  const meta = document.createElement('span');
  meta.className = 'select-stat-meta';
  const lab = document.createElement('span');
  lab.className = 'select-stat-label';
  lab.textContent = label;
  meta.append(lab, nums);

  el.replaceChildren(iconEl(iconId, 'select-stat-icon'), meta);
  el.setAttribute('aria-label', `${label} ${value} / ${cap}`);
}

function starRow(litCount: number, className: string): HTMLSpanElement {
  const row = document.createElement('span');
  row.className = className;
  for (let i = 0; i < 3; i++) {
    const star = iconEl('icon-star', i < litCount ? 'cell-star lit' : 'cell-star');
    row.append(star);
  }
  return row;
}

function setBtnIcon(btn: HTMLElement, iconId: string, label: string): void {
  btn.replaceChildren();
  btn.append(iconEl(iconId));
  btn.classList.add('btn-icon');
  btn.setAttribute('aria-label', label);
  btn.title = label;
}

function chapterRanges(): Array<{ name: string; start: number; end: number }> {
  const out: Array<{ name: string; start: number; end: number }> = [];
  let name = '';
  let start = 1;
  for (let i = 0; i < LEVEL_COUNT; i++) {
    const ch = LEVELS[i].chapter ?? '关卡';
    if (ch !== name) {
      if (name) out.push({ name, start, end: i });
      name = ch;
      start = i + 1;
    }
  }
  if (name) out.push({ name, start, end: LEVEL_COUNT });
  return out;
}

export class Hud {
  private levelLabel = mustEl('level-label');
  private movesLabel = mustEl('moves-label');
  private muteBtn = mustEl<HTMLButtonElement>('btn-mute');
  private hintEl = document.getElementById('hint-mechanic');
  private fanfareEl = document.getElementById('clear-fanfare');
  private fanfareStars = document.getElementById('clear-stars');
  private fanfareCaption = document.getElementById('clear-caption');
  private swapBtn = document.getElementById('btn-swap');

  constructor() {
    setBtnIcon(mustEl('btn-select'), 'icon-grid', '选关');
    setBtnIcon(mustEl('btn-undo'), 'icon-undo', '撤销');
    setBtnIcon(mustEl('btn-restart'), 'icon-restart', '重来');
    if (this.swapBtn) setBtnIcon(this.swapBtn, 'icon-swap', '切换');
  }

  setLevel(level1Based: number): void {
    this.levelLabel.textContent = `第 ${level1Based} / ${LEVEL_COUNT} 关`;
  }

  setMoves(n: number): void {
    this.movesLabel.textContent = `步数 ${n}`;
  }

  setMuted(muted: boolean): void {
    setBtnIcon(this.muteBtn, muted ? 'icon-mute' : 'icon-sound', '声音');
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

  showClear(stars: number, moves: number): void {
    if (!this.fanfareEl || !this.fanfareStars || !this.fanfareCaption) return;
    this.fanfareStars.replaceChildren();
    for (let i = 0; i < 3; i++) {
      const star = iconEl('icon-star', i < stars ? 'clear-star lit' : 'clear-star');
      this.fanfareStars.append(star);
    }
    this.fanfareCaption.textContent = `本关用了 ${moves} 步，顺利到家！`;
    this.fanfareEl.classList.remove('hidden');
  }

  hideClear(): void {
    this.fanfareEl?.classList.add('hidden');
    this.fanfareStars?.replaceChildren();
    if (this.fanfareCaption) this.fanfareCaption.textContent = '';
  }

  setSwapVisible(v: boolean): void {
    if (!this.swapBtn) return;
    this.swapBtn.classList.toggle('hidden', !v);
  }
}

export class LevelSelect {
  private overlay = mustEl('overlay');
  private panelSelect = mustEl('panel-select');
  private panelWin = mustEl('panel-win');
  private chaptersEl = mustEl('level-chapters');
  private progressEl = document.getElementById('select-progress');
  private starsEl = document.getElementById('select-stars');
  private winText = mustEl('win-text');
  private onPick: ((level1Based: number) => void) | null = null;
  private current = 1;
  private progress: Progress = {
    maxCleared: 0,
    lastPlayed: 1,
    muted: false,
    stars: Array.from({ length: LEVEL_COUNT }, () => 0),
  };

  constructor() {
    mustEl('btn-close-select').addEventListener('click', () => this.hide());
    mustEl('btn-win-select').addEventListener('click', () => {
      this.hideWin();
      this.show(this.current, this.progress);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (this.overlay.classList.contains('hidden')) return;
      e.preventDefault();
      if (!this.panelWin.classList.contains('hidden')) {
        this.hide();
        return;
      }
      this.hide();
    });
  }

  onSelect(cb: (level1Based: number) => void): void {
    this.onPick = cb;
  }

  show(currentLevel: number, progress: Progress): void {
    this.current = currentLevel;
    this.progress = progress;
    this.overlay.classList.remove('hidden');
    this.overlay.inert = false;
    this.overlay.setAttribute('aria-hidden', 'false');
    this.panelSelect.classList.remove('hidden');
    this.panelWin.classList.add('hidden');
    this.render();
  }

  hide(): void {
    this.releaseFocusFromOverlay();
    this.overlay.classList.add('hidden');
    this.overlay.inert = true;
    this.overlay.setAttribute('aria-hidden', 'true');
    this.panelSelect.classList.add('hidden');
    this.panelWin.classList.add('hidden');
    document.getElementById('btn-select')?.focus({ preventScroll: true });
  }

  showWin(totalMoves: number, progress: Progress): void {
    this.progress = progress;
    this.overlay.classList.remove('hidden');
    this.overlay.inert = false;
    this.overlay.setAttribute('aria-hidden', 'false');
    this.panelSelect.classList.add('hidden');
    this.panelWin.classList.remove('hidden');
    const lit = totalStars(progress.stars);
    this.winText.textContent = `共走 ${totalMoves} 步，点亮 ${lit} / ${STAR_CAP} 颗星。`;
  }

  hideWin(): void {
    this.panelWin.classList.add('hidden');
  }

  /** 关闭浮层前移走焦点，避免 aria-hidden 祖先仍包着 focused 控件 */
  private releaseFocusFromOverlay(): void {
    const active = document.activeElement;
    if (active instanceof HTMLElement && this.overlay.contains(active)) {
      active.blur();
    }
  }

  private render(): void {
    const maxCleared = this.progress.maxCleared;
    fillSelectStat(this.progressEl, 'icon-check', '已通关', maxCleared, LEVEL_COUNT);
    fillSelectStat(this.starsEl, 'icon-star', '星星', totalStars(this.progress.stars), STAR_CAP);
    this.chaptersEl.replaceChildren();

    for (const chapter of chapterRanges()) {
      const section = document.createElement('section');
      section.className = 'level-chapter';

      const head = document.createElement('header');
      head.className = 'chapter-head';
      const title = document.createElement('span');
      title.className = 'chapter-name';
      title.textContent = chapter.name;
      const range = document.createElement('span');
      range.className = 'chapter-range';
      range.textContent = `${chapter.start}–${chapter.end}`;
      head.append(title, range);
      section.appendChild(head);

      const grid = document.createElement('div');
      grid.className = 'level-grid';

      for (let i = chapter.start; i <= chapter.end; i++) {
        grid.appendChild(this.makeCell(i, maxCleared));
      }
      section.appendChild(grid);
      this.chaptersEl.appendChild(section);
    }
  }

  private makeCell(i: number, maxCleared: number): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'level-cell';
    const locked = isLevelLocked(i, maxCleared);
    const num = document.createElement('span');
    num.className = 'level-num';
    num.textContent = String(i);

    if (locked) {
      btn.classList.add('locked');
      btn.append(num, iconEl('icon-lock', 'icon icon-badge'));
      btn.title = '先完成前面的关卡';
      btn.setAttribute('aria-label', `第 ${i} 关已锁定`);
    } else if (i <= maxCleared) {
      const earned = this.progress.stars[i - 1] ?? 1;
      btn.classList.add('cleared');
      btn.append(num, starRow(earned, 'cell-stars'));
      btn.setAttribute('aria-label', `第 ${i} 关，已通关，${earned} 星`);
    } else {
      btn.classList.add('next');
      btn.append(num);
      btn.setAttribute('aria-label', `第 ${i} 关，可挑战`);
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
    return btn;
  }
}
