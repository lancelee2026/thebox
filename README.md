# 翻砖块（thecube）

适合儿童的益智小游戏：用方向键翻转长方体砖块，把它**完整躺进**绿色区域即可过关。

灵感来自 [Cuboid](https://www.thomasfriday.com/cuboid/) / Bloxorz 类玩法，独立重写，中文界面，无广告无账号。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端提示的地址（一般是 `http://localhost:5173`）。

打包静态站点：

```bash
npm run build
npm run preview
```

## 操作

| 平台 | 操作 |
|------|------|
| 电脑 | 方向键或 WASD 移动；`Z` / Backspace 撤销；`R` 重来 |
| 手机 / 平板 | 屏幕下方方向按钮；顶部「撤销 / 重来 / 选关」 |

## 规则摘要

- 砖块可站立（占 1 格）或躺倒（占 2 格），向四面翻边移动
- **可以半悬空**（躺倒时一格在砖上、一格在空中仍安全）
- 两格都悬空，或踩到红色砖，会失败（变小坠落 + 路径抖动）
- 必须**躺倒且两格都在绿色上**才算过关

## 关卡进度

- 「选关」中：已通关可重玩，仅下一未通关可进，其余锁定
- 进度保存在浏览器 `localStorage`

## 技术栈

Vite · TypeScript · Three.js · @tweenjs/tween.js

## 架构文档

后续开发与 agent 请先读：[docs/architecture.md](docs/architecture.md)（模块职责、规则、数据流、二期扩展点）。

## 二期预留

脆弱砖、开关桥、分裂传送、多层楼（尚未实现）。
