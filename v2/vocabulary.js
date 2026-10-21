import {wordBank} from "./word-bank.js";
import {curriculum} from "./curriculum.js";
// Context pronunciation, reviewed against MOE Mandarin dictionary entries.
// 长尺 uses the homophone 常 only as an invisible TTS pronunciation cue.
const pronunciation={
'我':'wǒ','学校':'xué xiào','上课':'shàng kè','你好':'nǐ hǎo','今天':'jīn tiān',
'你':'nǐ','教室':'jiào shì','放学':'fàng xué','谢谢':'xiè xie','一起':'yì qǐ',
'他':'tā','课本':'kè běn','读书':'dú shū','借过':'jiè guò','开心':'kāi xīn',
'老师':'lǎo shī','书包':'shū bāo','写字':'xiě zì','请问':'qǐng wèn','快乐':'kuài lè',
'同学':'tóng xué','铅笔':'qiān bǐ','听课':'tīng kè','对不起':'duì bu qǐ','喜欢':'xǐ huan',
'朋友':'péng you','橡皮':'xiàng pí','学习':'xué xí','没关系':'méi guān xi','伤心':'shāng xīn',
'校长':'xiào zhǎng','长尺':'cháng chǐ','回答':'huí dá','再见':'zài jiàn','生气':'shēng qì',
'男生':'nán shēng','桌子':'zhuō zi','举手':'jǔ shǒu','早安':'zǎo ān','排队':'pái duì',
'女生':'nǚ shēng','椅子':'yǐ zi','唱歌':'chàng gē','午安':'wǔ ān','游戏':'yóu xì',
'大家':'dà jiā','黑板':'hēi bǎn','画画':'huà huà','晚安':'wǎn ān','帮忙':'bāng máng'};
export function mandarinVoice(voices){
 const preferred=['zh-cn','zh-sg','cmn-cn','cmn-hans-cn','zh-tw','cmn-tw','zh'];
 return preferred.map(lang=>voices.find(v=>v.lang.toLowerCase()===lang)).find(Boolean)||voices.find(v=>/^cmn(?:-|$)/i.test(v.lang)&&!/hk|yue/i.test(v.lang));
}
export const vocabulary = curriculum.flatMap(group=>group.chars.map(char=>({char,word:char,speechText:char==='长尺'?'常尺':char,pinyin:pronunciation[char],courses:[group.id],characters:[...char].map((c,i)=>({...wordBank.find(item=>item.char===c),pinyin:pronunciation[char].split(' ')[i]}))})));
export function choiceOptions(answer, random=Math.random){
 const others=vocabulary.filter(item=>item.char!==answer.char);
 for(let i=others.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[others[i],others[j]]=[others[j],others[i]];}
 const options=[answer,...others.slice(0,3)];
 for(let i=options.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
 return options;
}
