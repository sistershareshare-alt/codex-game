# 汉字迷宫 2.0

题库为老师提供的 50 个字词，按原表每行分为一组，共 10 组。每局在选定范围抽取 5 个不同字词。

钥匙挑战：自动朗读字词本身 → 四选一 → 逐字书写 → 整词写对获得钥匙 → 继续迷宫。挑战未完成时不能退出。语音需要设备支持中文 Speech Synthesis，可重复播放。

构建：在仓库根目录运行 `node v2/build.cjs`，只更新 `docs/v2/index.html`，保留原版。可直接打开生成的独立 HTML，或由 GitHub Pages 托管。

验证：`node --test`，覆盖 50 个字词笔画数据、四选一、选错与写错拦截、整词完成及退出限制。

新增字的笔画数据来自 chanind/hanzi-writer-data 的 data/*.json，沿用 Hanzi Writer Data / Make Me a Hanzi 的 Arphic Public License，许可见仓库 licenses/。
