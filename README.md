# 汉字迷宫 · 彩虹花园

小学一年级华语听写与迷宫追逐游戏。操控探险家躲开机器人，在五个钥匙站听音写字，集齐钥匙后前往右上角出口。

## 教师字库与随机练习

- `curriculum.js` 保存教师提供的 19 组生字，保留课次与原始顺序。原表中排在 1.9 后的第二个「1.1」按顺序记为 1.10。
- 去重后共 500 个汉字。每局随机抽五个不同的字，不重复上一局的五字；上局字目存在浏览器 localStorage，刷新后也会避开。
- 顶部可以选择全部生字或指定 1.1–1.19 课。切换正在练习的课次会先暂停并确认重开，取消则恢复原课次。
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

方向键 / WASD / 低位触屏方向按钮移动，按住连续走，空格或暂停按钮暂停。两档追逐速度，获得钥匙后机器人加速。三颗心，被抓返回起点并保留钥匙，短暂无敌。书写期间追逐暂停。听写弹窗靠近屏幕底部，田字格保持正方形。

已检查电脑与手机横竖屏共九种尺寸。中文朗读使用浏览器 SpeechSynthesis，需设备支持中文语音；无法朗读时可由家长查看提示读题。字迹不上传，无账号或付费项目。

## GitHub Pages

仓库 Settings → Pages → Deploy from a branch，选择 `main`、`/docs`。修改后运行构建并一并提交 `docs/index.html` 及 `docs/licenses/`。网站默认地址：<https://sistershareshare-alt.github.io/codex-game/>。不自动更改仓库可见性。

## 数据来源

笔画中线来自 [Hanzi Writer Data](https://github.com/chanind/hanzi-writer-data) / [Make Me a Hanzi](https://github.com/skishore/makemeahanzi)，Copyright (C) 1999 Arphic Technology Co., Ltd.，按 Arphic Public License 发布。应用将坐标转换为 360px 画板尺寸，原许可完整保留于 `licenses/ARPHICPL.TXT`，网站「怎么玩」内也可查看。该许可适用于衍生笔画数据，不改变独立应用代码的许可。拼音生成使用 pinyin-pro（MIT），许可见 `licenses/pinyin-pro-LICENSE`。

## 全界面楷体

界面文字、按钮、课次选项、拼音、田字格参考字及画布内标签统一使用内嵌的霞鹜文楷网页字体，未安装楷体的设备也能显示。`assets/game-kaiti.woff` 约 222 KiB，覆盖当前全部 500 个生字、界面中文、拉丁字母与拼音符号；Emoji 图标由系统绘制。

字体来自 LXGW WenKai，上游固定版本 `a06dd23142e82758f23f792f4060bbf1613286e8`；原许可保留在 `licenses/WenKai-OFL.txt`、网站许可面板和字体元数据中。仅为网页交付提取字符并转为 WOFF，不提供修改后的桌面安装字体。若新增字库或界面文字，可下载该版本的 `fonts/TTF/LXGWWenKai-Regular.ttf`，安装 Python fonttools 后运行 `python3 scripts/subset-kaiti.py /path/to/LXGWWenKai-Regular.ttf` 并重新构建。
