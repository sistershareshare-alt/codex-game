export const curriculum = [{"id": "1", "chars": ["我", "学校", "上课", "你好", "今天"]}, {"id": "2", "chars": ["你", "教室", "放学", "谢谢", "一起"]}, {"id": "3", "chars": ["他", "课本", "读书", "借过", "开心"]}, {"id": "4", "chars": ["老师", "书包", "写字", "请问", "快乐"]}, {"id": "5", "chars": ["同学", "铅笔", "听课", "对不起", "喜欢"]}, {"id": "6", "chars": ["朋友", "橡皮", "学习", "没关系", "伤心"]}, {"id": "7", "chars": ["校长", "长尺", "回答", "再见", "生气"]}, {"id": "8", "chars": ["男生", "桌子", "举手", "早安", "排队"]}, {"id": "9", "chars": ["女生", "椅子", "唱歌", "午安", "游戏"]}, {"id": "10", "chars": ["大家", "黑板", "画画", "晚安", "帮忙"]}];
export function pickRound(bank, course='all', previous=[], random=Math.random){
 const pool=course==='all'?bank:bank.filter(item=>item.courses.includes(course));
 if(pool.length<5)throw new Error('A course needs at least five characters.');
 const previousChars=new Set(previous.map(item=>item.char));
 const fresh=pool.filter(item=>!previousChars.has(item.char));
 const candidates=[...(fresh.length>=5?fresh:pool)];
 for(let i=candidates.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];}
 return candidates.slice(0,5);
}

export function rangeBank(bank,from,to){const first=curriculum.findIndex(c=>c.id===from),last=curriculum.findIndex(c=>c.id===to);if(first<0||last<first)throw Error('Invalid course range');const ids=new Set(curriculum.slice(first,last+1).map(c=>c.id));return bank.filter(item=>item.courses.some(id=>ids.has(id)));}

