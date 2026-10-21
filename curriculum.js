// Teacher-provided curriculum, in its original order. The row after 1.9 is 1.10.
export const curriculum = [
['1.1','蓝、天、太、阳、小、鸟、上、学、读、书、写、字、了、花、跟、我、招、手、一、起、走、到、校、门、口、得'],
['1.2','早、跳、来、去、在、树、枝、做、操、朋、友、跑、草、地、课、识、会、儿、歌、故、事、习、长、知、笔、画、要、好'],
['1.3','眼、心、也、顺、错、不、手、开、爸、妈、笑、着、回、哥、姐、全、家、的、声、星、那、么、多、这、颗、中、间、是、三、靠、样、近、亲、明'],
['1.4','吃、晚、饭、有、瓜、鱼、还、蛋、桌、菜、可、大、都、喜、欢、妹、搭、积、木、房、子、机、场、配、说、们、城、市、校、乐、和、游'],
['1.5','双、林、片、森、绿、羊、美、肥、丽、舌、甘、甜、爱、蜂、蜜、露、珠、照、相、张、又、月、亮、出、红、见、雨、停、更、山、青、弯、曲、河、胖、啊'],
['1.6','个、只、老、虎、猫、边、少、群、鹅、数、瞧、记、牢、蚂、蚁、搬、虫、动、两、点、重、四、五、六、七、进、洞'],
['1.7','睛、脚、爪、腿、短、牙、齿、以、睡、觉、你、就、飞、园、要、画、嗅、香、味、才、吗、采、造、时、流、汗、水'],
['1.8','蕉、黄、像、滑、梯、玩、爬、下、坐、快、唱、里、很、每、从、棵、响、落、风、听、座、在、爱'],
['1.9','对、晴、伤、吵、闹、安、静、怕、空、放、情、夜、悄、换、黑、色、衣、最、把、留、用、铅、发、现、慢、白、文、图、本'],
['1.10','金、沙、滩、银、船、工、具、呀、简、单、板、看、身、后、串、公、轻、吹、叶、飘、头、带、拿、剪、刀、贴、纸'],
['1.11','同、面、拉、师、您、助、谢、握、人、礼、貌、气、买、汽、车、问、店、存、钱、能、算、半、年、十、再、辆、架、吧'],
['1.12','几、海、马、忙、孩、干、什、呢、翅、膀、左、右、父、节、蛙、想、捉、荷、别、真、没、久、它、运、第、名、到'],
['1.13','养、洁、羽、毛、肚、饿、找、食、物、饱、坏、屋、娃、影、灯、光、比、东、墙、兔、西、为、拍、她、伞、晚、怎、顶、盒、遮、净、出、么、着、们、干'],
['1.14','鞋、穿、耍、国、成、力、士、清、蝴、蝶、窗、前、弟、喷、跳、和、玩、报、应、该、分、童、话、认、花、看'],
['1.15','球、摇、圆、高、远、生、答、猜、新、当、脸、鹿、病、角、变、他、窝、被、打、站、朵、很、美、丽'],
['1.16','厕、所、洗、澡、电、哭、肯、床、外、狗、指、道、升、候、火、钟、喊、叫、踢、怪、过、关、可、笑、最、做'],
['1.17','加、包、抱、宝、足、赛、泡、给、杯、茶、奶、云、住、哪、追、赶、方、法、颜、兄、题、因、休、息、等、请、呼、海、顺、他'],
['1.18','九、八、日、旗、次、庆、今、举、共、视、目、表、男、女、舞、农、田、稻、米、果、护、土'],
['1.19','桥、便、平、背、各、种、害、让、热、彩、虹、排、路、叔、那、阿、姨、班、直、立、送、星、灯']
].map(([id,text])=>({id,chars:[...new Set(text.split('、'))]}));

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
