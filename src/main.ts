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
      ? '游戏启动失败：当前浏览器无法创建 WebGL（三维画面）。请换 Chrome / Edge，或关闭硬件加速相关限制后重试。'
      : `游戏启动失败：${message}\n\n可尝试强制刷新（Ctrl/Cmd+Shift+R）。`;
  document.body.appendChild(el);
}
