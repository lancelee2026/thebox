const SESSION_KEY = 'fan-zhuan-kuai-visit-hit';
const UP_URL = 'https://api.counterapi.dev/v1/thebox-e2n-studio/visits/up';
const GET_URL = 'https://api.counterapi.dev/v1/thebox-e2n-studio/visits/';

function isLocalHost(): boolean {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

async function readCount(url: string): Promise<number | null> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = (await res.json()) as { count?: unknown };
  const n = Number(data.count);
  return Number.isFinite(n) ? n : null;
}

/** 每个浏览器会话计一次；本地开发不写入线上计数。 */
export async function mountVisitCount(el: HTMLElement | null): Promise<void> {
  if (!el || isLocalHost()) return;
  try {
    const fresh = !sessionStorage.getItem(SESSION_KEY);
    const count = fresh ? await readCount(UP_URL) : await readCount(GET_URL);
    if (count == null) return;
    if (fresh) sessionStorage.setItem(SESSION_KEY, '1');
    el.textContent = `已被打开 ${count.toLocaleString('zh-CN')} 次`;
    el.hidden = false;
  } catch {
    /* 计数失败不影响游戏 */
  }
}
