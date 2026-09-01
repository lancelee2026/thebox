import { access, readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputDir = resolve(projectRoot, process.argv[2] || 'dist-xhs');
const allowedExtensions = new Set([
  '.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2', '.json',
]);
const errors = [];

async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(fullPath)));
    else result.push(fullPath);
  }
  return result;
}

await access(join(outputDir, 'index.html')).catch(() => errors.push('index.html 不在产物根目录'));
const files = await walk(outputDir);
const paths = files.map((file) => relative(outputDir, file));

for (const path of paths) {
  if (!allowedExtensions.has(extname(path).toLowerCase())) errors.push(`不支持的文件类型: ${path}`);
  if (path.includes('node_modules') || path.includes('.git') || path.endsWith('.map') || path.endsWith('.DS_Store')) {
    errors.push(`禁止的文件: ${path}`);
  }
}

const html = await readFile(join(outputDir, 'index.html'), 'utf8');
const scriptFiles = files.filter((file) => extname(file) === '.js');
const cssFiles = files.filter((file) => extname(file) === '.css');
const scripts = await Promise.all(scriptFiles.map((file) => readFile(file, 'utf8')));
const styles = await Promise.all(cssFiles.map((file) => readFile(file, 'utf8')));
const allCode = [html, ...scripts, ...styles].join('\n');
const resourceCode = [html, ...styles].join('\n');

const checks = [
  ['DOCTYPE', /<!DOCTYPE html>/i, true],
  ['lang=zh-CN', /<html\s+lang=["']zh-CN["']/i, true],
  ['charset=UTF-8', /charset=["']?UTF-8/i, true],
  ['viewport width', /width=device-width/i, true],
  ['viewport initial-scale', /initial-scale=1(?:\.0)?/i, true],
  ['viewport-fit=cover', /viewport-fit=cover/i, true],
  ['内联脚本', /<script(?![^>]*\bsrc=)[^>]*>/i, false],
  ['行内事件', /\son[a-z]+\s*=/i, false],
  ['module 脚本', /<script[^>]*\btype=["']module["']/i, false],
  ['外部资源 URL', /(?:src|href)=["']https?:\/\/|url\(\s*["']?https?:\/\//i, false],
  ['绝对资源路径', /(?:src|href)=["']\//i, false],
  ['base', /<base\b/i, false],
  ['iframe/object', /<(?:iframe|object)\b/i, false],
  ['自建 CSP', /http-equiv=["']Content-Security-Policy["']/i, false],
  ['javascript URI', /javascript\s*:/i, false],
  ['eval', /\beval\s*\(/, false],
  ['new Function', /new\s+Function\s*\(/, false],
  ['WebAssembly', /\bWebAssembly\s*\./, false],
  ['fetch', /\bfetch\s*\(/, false],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/, false],
  ['WebSocket/EventSource/WebRTC', /\b(?:WebSocket|EventSource|RTCPeerConnection)\b/, false],
  ['Worker', /\b(?:SharedWorker|Worker)\s*\(/, false],
  ['serviceWorker', /navigator\.serviceWorker/, false],
  ['clipboard', /navigator\.clipboard|execCommand\s*\(\s*["'](?:copy|cut|paste)/, false],
  ['geolocation', /navigator\.geolocation/, false],
  ['window.open/prompt', /window\.(?:open|prompt)\s*\(/, false],
  ['fullscreen', /requestFullscreen\s*\(/, false],
  ['download/blank', /<a\b[^>]*\bdownload\b|target=["']_blank["']/i, false],
];

for (const [label, pattern, required] of checks) {
  const matched = label === '外部资源 URL' ? pattern.test(resourceCode) : pattern.test(allCode);
  if ((required && !matched) || (!required && matched)) errors.push(`${label} 校验失败`);
}

// 云雾由运行时按 data-cloud-depth 取节点；双入口 HTML 漏同步时，开关会看似打开却没有任何云可渲染。
for (const depth of ['far', 'mid', 'near']) {
  if (!new RegExp(`data-cloud-depth=["']${depth}["']`).test(html)) {
    errors.push(`缺少 ${depth} 云层节点`);
  }
}

for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
  const ref = match[1];
  if (ref.startsWith('data:') || ref.startsWith('blob:') || ref.startsWith('#')) continue;
  const target = resolve(outputDir, ref.replace(/^\.\//, ''));
  await access(target).catch(() => errors.push(`缺少引用资源: ${ref}`));
}

const totalBytes = (await Promise.all(files.map((file) => stat(file)))).reduce((sum, item) => sum + item.size, 0);
if (totalBytes > 10 * 1024 * 1024) errors.push(`未压缩产物超过 10MB: ${totalBytes} bytes`);

if (errors.length) {
  console.error(errors.map((error) => `✗ ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`✓ 结构、CSP、端能力与本地资源校验通过`);
  console.log(`✓ ${files.length} 个文件，未压缩总计 ${(totalBytes / 1024).toFixed(1)} KiB`);
}
