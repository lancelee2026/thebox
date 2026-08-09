import './style.css';
import { Game } from './game/Game';
import { mountVisitCount } from './ui/visits';

try {
  new Game();
  void mountVisitCount(document.getElementById('visit-count'));
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[翻砖块]', message, err);
  const el = document.createElement('div');
  el.setAttribute('role', 'alert');
  el.style.cssText =
    'position:fixed;inset:12px;z-index:99;padding:16px;border-radius:12px;background:#fff;color:#c0392b;font:600 14px/1.5 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2);white-space:pre-wrap';
  el.textContent =
    message.includes('WebGL')
      ? '暂时无法显示立体画面。请换用较新的浏览器，或在浏览器设置中打开硬件加速后重试。'
      : '游戏暂时无法启动。请刷新页面后再试。';
  document.body.appendChild(el);
}
