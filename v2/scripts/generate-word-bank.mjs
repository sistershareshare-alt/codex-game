import fs from 'node:fs';
import {createRequire} from 'node:module';
import {pinyin} from 'pinyin-pro';
import {curriculum} from '../curriculum.js';
const require=createRequire(import.meta.url);
// Context phrases distinguish homophones in a listening exercise. Teachers may edit them.
const phrases=`蓝天 天空 太阳 阳光 小鸟 鸟儿 上学 学校 读书 书本 写字 字体 开花 跟着 我们 招手 手心 一起 起床 走路 到校 校门 门口 口水 跑得快
早上 跳高 来到 去年 在家 树枝 枝叶 做操 早操 朋友 友好 跑步 小草 草地 课本 认识 学会 儿歌 唱歌 故事 事情 学习 长大 知识 铅笔 笔画 要求 好人
眼睛 开心 也好 顺序 错误 不是 开门 爸爸 妈妈 微笑 笑着 回家 哥哥 姐姐 全家 家人 我的 声音 星星 那么 这么 许多 这边 一颗 中间 房间 是的 三个 依靠 样子 靠近 亲人 明天
吃饭 晚饭 米饭 没有 西瓜 金鱼 还有 鸡蛋 桌子 青菜 可爱 大家 都来 喜欢 欢喜 妹妹 搭配 积木 木头 房子 孩子 飞机 机场 配合 说话 城市 城堡 市场 学校 快乐 和平 游戏
双手 树林 一片 森林 绿色 山羊 美丽 肥胖 丽人 舌头 甘甜 甜蜜 爱心 蜜蜂 蜂蜜 露珠 珍珠 照相 相片 一张 又来 月亮 明亮 出门 红花 看见 下雨 停车 更好 高山 青山 弯曲 曲线 小河 胖子 好啊
一个 一只 老虎 虎牙 小猫 旁边 多少 一群 白鹅 数数 瞧见 记住 牢记 蚂蚁 蚁群 搬家 小虫 动作 两个 点头 重要 四个 五个 六个 七个 进去 山洞
眼睛 脚步 爪子 双腿 长短 牙齿 齿轮 可以 睡觉 午觉 你好 就是 飞鸟 花园 要画 画画 嗅觉 香气 味道 才来 好吗 采花 造船 时间 流水 汗水 河水
香蕉 黄色 好像 滑梯 梯子 玩耍 爬山 下来 坐下 快来 唱歌 里面 很好 每天 从前 一棵 响声 落叶 大风 听见 一座
对错 晴天 伤心 吵架 热闹 安静 静夜 害怕 天空 放学 心情 夜晚 悄悄 交换 黑色 颜色 衣服 最好 一把 留下 用心 铅笔 发光 发现 慢走 白云 文字 图画 本子
金子 沙子 沙滩 银色 小船 工人 工具 好呀 简单 单个 木板 看书 身体 后面 一串 公园 轻轻 吹风 叶子 飘走 头发 带来 拿来 剪刀 小刀 贴纸 白纸
同学 前面 拉手 老师 您好 帮助 谢谢 握手 人们 礼物 礼貌 生气 买书 汽水 汽车 问好 商店 存钱 钱包 能够 算数 一半 今年 十个 再见 一辆 一架 好吧
几个 大海 海马 帮忙 小孩 干什么 什么 好呢 翅膀 膀子 左手 右手 父亲 节日 青蛙 想念 捉虫 荷花 别人 认真 没有 很久 它们 运动 第一 名字
养鱼 清洁 羽毛 毛衣 肚子 饿了 寻找 食物 物品 吃饱 坏人 小屋 娃娃 影子 电灯 灯光 比较 东边 墙壁 兔子 西边 为了 拍手 她们 雨伞 怎么 头顶 盒子 遮住 干净
鞋子 穿衣 玩耍 国家 成长 力气 士兵 清水 蝴蝶 蝶儿 窗户 前方 弟弟 喷水 报纸 应该 分开 儿童 童话
皮球 摇头 圆形 高兴 远方 生日 回答 猜想 新年 当心 笑脸 小鹿 生病 牛角 变成 他们 鸟窝 被子 打球 站立 花朵
厕所 所以 洗澡 澡盆 电话 哭泣 肯定 木床 外面 小狗 手指 知道 升旗 时候 火车 时钟 喊叫 大叫 踢球 奇怪 过关 关门 可笑
加法 书包 拥抱 宝贝 足球 比赛 水泡 送给 杯子 红茶 牛奶 白云 住家 哪里 追赶 赶快 方法 办法 颜色 兄弟 问题 因为 休息 气息 等候 请问 呼吸
九个 八个 日子 国旗 次数 庆祝 今天 举手 共同 电视 目光 表演 男孩 女孩 跳舞 农田 田地 稻田 大米 水果 保护 泥土
小桥 方便 平地 后背 各种 种类 害虫 让开 热水 彩虹 排队 马路 叔叔 阿姨 姨妈 班级 一直 立正 送花`;
const examples=phrases.split(/\s+/).filter(Boolean);
const overrides={'了':'好了','得':'跑得快','着':'笑着','长':'长大','还':'还有','乐':'快乐','和':'和平','只':'一只','少':'多少','数':'数一数','重':'重要','觉':'睡觉','爪':'爪子','吗':'好吗','啊':'好啊','空':'天空','发':'发现','看':'看书','单':'简单','干':'干什么','呢':'好呢','为':'为了','应':'应该','当':'当心','被':'被子','背':'后背','种':'种类','好':'好人','什':'什么','地':'草地','的':'我的'};
const pronunciations={'长':'zhǎng','数':'shǔ','觉':'jiào','乐':'lè','干':'gàn','只':'zhī','背':'bèi','得':'de','着':'zhe','了':'le','的':'de','们':'men','么':'me','吗':'ma','呢':'ne','吧':'ba','啊':'a','爪':'zhuǎ','还':'hái','为':'wèi','应':'yīng','少':'shǎo','更':'gèng','空':'kōng','发':'fā','看':'kàn','好':'hǎo','当':'dāng','地':'dì','种':'zhǒng','相':'xiàng','曲':'qū','露':'lù','重':'zhòng'};
const chars=[...new Set(curriculum.flatMap(c=>c.chars))];
const missing=chars.filter(char=>!overrides[char]&&!examples.some(w=>w.includes(char)));
if(missing.length)throw Error('Missing context phrases: '+missing.join('、'));
const bank=chars.map(char=>{
 const example=overrides[char]||examples.find(w=>w.includes(char));
 const source=require('hanzi-writer-data/'+char+'.json');
 if(!source.medians?.length)throw Error('Missing stroke data: '+char);
 return {char,pinyin:pronunciations[char]||pinyin(char),example,word:`请写${example}的${char}。`,courses:curriculum.filter(c=>c.chars.includes(char)).map(c=>c.id),tip:`共 ${source.medians.length} 笔，按笔顺写；可点击「看笔顺」观察。`,strokes:source.medians.map(s=>s.map(([x,y])=>[Math.round(x*360/1024),Math.round((900-y)*360/1024)]))};
});
fs.writeFileSync(new URL('../word-bank.js',import.meta.url),'// Generated from the teacher curriculum and hanzi-writer-data 2.0.1 medians.\n// Copyright (C) 1999 Arphic Technology Co., Ltd. Licensed under the Arphic Public License.\n// Coordinates converted to a 360px canvas; see licenses/ARPHICPL.TXT.\nexport const wordBank = '+JSON.stringify(bank)+';\n');
console.log(`Generated ${bank.length} characters from ${curriculum.length} courses; all have context phrases and stroke templates.`);
