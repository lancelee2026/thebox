import './style.css';
import { Game } from './game/Game';

try {
  new Game();
} catch (err) {
  console.error(err);
  const el = document.createElement('div');
  el.setAttribute('role', 'alert');
  el.style.cssText =
    'position:fixed;inset:12px;z-index:99;padding:16px;border-radius:12px;background:#fff;color:#c0392b;font:600 14px/1.5 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2)';
  el.textContent = `游戏启动失败：${err instanceof Error ? err.message : String(err)}`;
  document.body.appendChild(el);
}
