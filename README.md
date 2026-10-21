# 汉字迷宫 · 万圣节南瓜派对

小学一年级华语听写与迷宫追逐游戏。操控探险家躲开机器人，在五个钥匙站听音写字，集齐钥匙后前往右上角出口。

## 教师字库与随机练习

- `curriculum.js` 保存教师提供的 19 组生字，保留课次与原始顺序。原表中排在 1.9 后的第二个「1.1」按顺序记为 1.10。
- 去重后共 500 个汉字。每局随机抽五个不同的字，不重复上一局的五字；上局字目存在浏览器 localStorage，刷新后也会避开。
- 每次开局、重新挑战或通关后再玩，都先显示设置页，可选择起始课次与结束课次（例如 1.9–1.11，包含 1.10）。只从范围内抽五字。设置保存在当前浏览器；也可通过顶部按钮调整，取消不会重置当前关卡。
- 听题包含示例词语以区分同音字。拼音与示例词语由应用补充，多音字可在 `scripts/generate-word-bank.mjs` 中调整。
- 每个字均包含 Hanzi Writer Data 的笔画中线模板。可以查看参考字、分笔顺序示范、撤回、重写或由家长确认。
- 比对笔画数、顺序和形状；模板匹配并非专业手写识别，复杂字或不同写法可能误判，不评判美观。

## 运行与开发

需要 Node.js 18+。运行已提交的游戏和测试无需外部服务：

```sh
npm start
npm test
```

默认端口 3000，环境变量 `PORT` 可修改。重新生成字库及发布文件需安装锁定的开发依赖：

```sh
npm ci
npm run build
```

`npm run generate:bank` 单独生成 `word-bank.js`。生成过程会检查全部生字都有词语和笔画数据。构建将图片、脚本、字库、样式及笔画许可内嵌到 `docs/index.html`，同时输出 `/workspace/artifacts/hanzi-maze-storybook.html` 和 `hanzi-maze-escape.html`。生成文件可独立打开，无需另行下载字库、图片或运行识别服务器。

## 操作与设备

方向键 / WASD / 低位触屏方向按钮移动，按住连续走，空格或暂停按钮暂停。两档追逐速度，获得钥匙后机器人加速。三颗心，被抓返回起点并保留钥匙，短暂无敌。书写期间追逐暂停。听写使用贴近屏幕底边的横向操作台，田字格保持正方形；提交/解锁按钮在其右侧，提示、笔顺、撤回、重写靠近底部。手机竖屏也保留田字格在左、提交在右。离开听写后有 4 秒无敌时间，可先选择逃跑方向。

已检查电脑与手机横竖屏共十种尺寸（含 1920×1080 Smartboard）。中文朗读使用浏览器 SpeechSynthesis，需设备支持中文语音；无法朗读时可由家长查看提示读题。字迹不上传，无账号或付费项目。

## 万圣节与迷宫路线

明亮可爱的手绘南瓜灯、幽灵、糖果与魔法花园背景，保留方正楷体和高对比角色。开局可随机或指定六张地图：南瓜小径、幽灵花园、糖果回廊、月光城堡、蝙蝠环道、星星迷藏。随机路线避开上一局地图。

每张地图的墙体是分离的障碍岛，通道形成环路。测试遍历所有通道，验证连通性、每格至少两个出口、五把钥匙均可到达；再逐一假设任意一个通道格被阻挡，验证剩余区域仍全部连通（无单点瓶颈）。这消除了钥匙藏在死胡同里的必被堵住情况，追逐与碰撞仍按游戏规则进行。

## GitHub Pages

仓库 Settings → Pages → Deploy from a branch，选择 `main`、`/docs`。修改后运行构建并一并提交 `docs/index.html` 及 `docs/licenses/`。网站默认地址：<https://sistershareshare-alt.github.io/codex-game/>。不自动更改仓库可见性。

## 数据来源

笔画中线来自 [Hanzi Writer Data](https://github.com/chanind/hanzi-writer-data) / [Make Me a Hanzi](https://github.com/skishore/makemeahanzi)，Copyright (C) 1999 Arphic Technology Co., Ltd.，按 Arphic Public License 发布。应用将坐标转换为 360px 画板尺寸，原许可完整保留于 `licenses/ARPHICPL.TXT`，网站「怎么玩」内也可查看。该许可适用于衍生笔画数据，不改变独立应用代码的许可。拼音生成使用 pinyin-pro（MIT），许可见 `licenses/pinyin-pro-LICENSE`。

## 全界面方正楷体

使用项目负责人提供的「方正楷体简体.ttf」（内部字体名 FZKai-Z03S），覆盖界面、按钮、拼音、田字格参考字和画布标签。网页内嵌 `assets/game-fangzheng-kaiti.woff`，无需设备安装字体。Emoji 图标由系统绘制。

子集覆盖全部 500 个生字、当前界面中文、拉丁字母与带调拼音。字体原始名称和版权元数据保留，来源与原文件摘要见 `licenses/Founder-font-NOTICE.txt`。新增字库或界面文字后，使用获准使用的原字体运行 `python3 scripts/subset-kaiti.py /path/to/方正楷体简体.ttf` 再构建；此可选步骤需要 Python fonttools。
