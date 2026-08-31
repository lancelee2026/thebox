---
name: 翻砖块
description: 晴空树脂游乐场中的成熟可爱空间解谜
colors:
  sky-clear: "#38abf0"
  sky-mid: "#248fd9"
  sky-deep: "#126bb8"
  scene-blue: "#2f8fd0"
  cuboid-teal: "#16afc7"
  arrival-mint: "#32c990"
  cloud-white: "#f9fcff"
  ink-navy: "#17395d"
  ink-soft: "#58718b"
  success-gold: "#ffd45a"
typography:
  display:
    fontFamily: "ZCOOL KuaiLe, Nunito, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 4.5vw, 2.35rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.035em"
  body:
    fontFamily: "Nunito, PingFang SC, Hiragino Sans GB, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  control: "16px"
  panel: "24px"
  stage: "26px"
  pill: "999px"
spacing:
  tight: "6px"
  compact: "9px"
  control: "14px"
  panel: "20px"
components:
  resin-button:
    backgroundColor: "{colors.sky-clear}"
    textColor: "{colors.cloud-white}"
    rounded: "{rounded.control}"
    padding: "0.6rem 0.9rem"
    height: "44px"
  hud-pill:
    backgroundColor: "{colors.sky-deep}"
    textColor: "{colors.cloud-white}"
    rounded: "{rounded.pill}"
    padding: "0.38rem 0.68rem"
  panel:
    backgroundColor: "{colors.cloud-white}"
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.panel}"
    padding: "20px"
---

# Design System: 翻砖块

## Overview

**Creative North Star: "晴空树脂游乐场"**

界面是一座悬在晴空里的精巧树脂玩具舞台：清爽、有触感、带一点轻竞技的利落感。可爱来自小方块的比例、表情、翻滚反应和材质，而不是婴幼儿符号或装饰堆叠。每个视觉决定都要先保证关卡格子、姿态和终点清晰可判断。

**Key Characteristics:**

- 清透蓝色空间、云白路径和青蓝角色形成稳定识别。
- 三层树脂托盘承担舞台深度，HUD 与按钮保持次要。
- 圆润但不软弱；色彩明快但不糖果化。
- 普通站点与小红书离线入口共享同一视觉和交互语义。

## Colors

主色是连续的晴空蓝；青蓝主角和薄荷终点只承担角色与目标，暖金仅用于通关和焦点反馈。

**The One Warm Accent Rule.** 暖色只服务于成功、星级和键盘焦点，不扩散成彩虹式装饰。

## Typography

标题使用粗壮、略带玩具感的展示字；正文与数字使用清晰的圆体无衬线。中文标题要有轻微立体阴影，但不使用气泡字、手写童趣字或夸张描边。

**The Confident Title Rule.** 品牌标题必须醒目而简短，不能比 HUD 更轻、更碎。

## Layout

首屏顺序固定为紧凑 HUD、主舞台、触控方向键和一句操作提示。舞台保持正方形，在桌面端最高约 78vh、移动端最高约 70vh；`640px` 以下头部改为两行，`900px` 以下或粗指针设备显示方向键。小红书入口额外保留顶部胶囊安全区，完整首轮交互必须在 `390×844` 内可见且无横向溢出。

## Elevation & Depth

深度由分层树脂、接触阴影和少量环境阴影共同建立。棋盘使用深色底座、亮色厚边和较深内凹面；按钮以顶部高光、底部投影和按下位移表达触感。背景云层只作为低对比景深，不能抢占关卡焦点。

**The Molded Stage Rule.** 路径不能直接漂在纯色卡片上；主舞台必须保留可读的边框厚度、内层色差和落地阴影。

## Shapes

角色、格子、托盘、按钮与面板都使用连续圆角，但半径随尺度分级：控制约 `16px`，面板约 `24px`，舞台约 `26px`，信息胶囊使用全圆角。角色仍需保持明确的长方体占格轮廓，圆角不得模糊空间判断。

## Components

### Resin Buttons

按钮采用浅蓝树脂渐变、半透明亮边和下方软阴影；点击时下移并轻微缩小。所有移动端点击区不小于 `44px`，焦点使用暖金外环。

### HUD Pill

关卡和步数放在低对比深蓝胶囊中，使用等宽数字特性；信息紧凑但不压过品牌标题。

### Game Stage

舞台外框裁切 WebGL 场景并承载内阴影。WebGL 内部的三层托盘、云白格子、薄荷到达台和青蓝角色共同构成签名组件。

### Direction Pad

保持十字布局和四个独立真实按钮，使用 authored SVG 箭头。不要改成横向四连按钮，也不要用字体箭头代替图标。

### Panels

选关与通关面板使用云白表面、深蓝文字和柔和大圆角。统计色块只做信息分组，不引入新的高饱和品牌色。

## Do's and Don'ts

### Do:

- **Do** 让角色表情在 `390px` 宽度下仍能读出眼白与瞳孔。
- **Do** 让终点通过形体、亮度和微光同时可辨，不只依赖绿色。
- **Do** 保留真实关卡几何、44px 点击区、安全区和 reduced-motion 支持。

### Don't:

- **Don't** 使用宝宝巴士式动物耳朵、婴儿比例、奶嘴、彩虹糖果色或密集贴纸。
- **Don't** 复制跑跑卡丁车、蛋仔派对的角色或资产；只学习其成熟休闲游戏的完成度。
- **Don't** 为追求萌感遮挡路径、缩弱终点或改变长方体的逻辑占格。
