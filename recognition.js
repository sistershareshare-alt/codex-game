const lessons = [
{char:'一',pinyin:'yī',word:'一，一颗星星的一',tip:'从左到右，写一条平平的横线。',strokes:[[[65,180],[295,180]]]},
{char:'二',pinyin:'èr',word:'二，两个朋友的二',tip:'先写上面的短横，再写下面的长横。',strokes:[[[100,115],[260,115]],[[60,245],[300,245]]]},
{char:'三',pinyin:'sān',word:'三，三朵花的三',tip:'从上到下写三横，最后一横最长。',strokes:[[[85,85],[275,85]],[[110,175],[250,175]],[[55,275],[305,275]]]},
{char:'十',pinyin:'shí',word:'十，十根手指的十',tip:'先横后竖，两笔在中间相交。',strokes:[[[60,155],[300,155]],[[180,55],[180,300]]]},
{char:'人',pinyin:'rén',word:'人，家人的人',tip:'先写撇，再写捺，像两条站稳的小腿。',strokes:[[[200,55],[185,140],[145,215],[65,300]],[[185,140],[230,230],[300,300]]]}
];
function sample(stroke,n=24){let lengths=[0];for(let i=1;i<stroke.length;i++)lengths.push(lengths[i-1]+Math.hypot(stroke[i][0]-stroke[i-1][0],stroke[i][1]-stroke[i-1][1]));const total=lengths.at(-1);if(!total)return Array.from({length:n},()=>stroke[0]);let j=1;return Array.from({length:n},(_,i)=>{let d=total*i/(n-1);while(j<lengths.length-1&&lengths[j]<d)j++;let t=(d-lengths[j-1])/(lengths[j]-lengths[j-1]||1);return [stroke[j-1][0]+t*(stroke[j][0]-stroke[j-1][0]),stroke[j-1][1]+t*(stroke[j][1]-stroke[j-1][1])];});}
function normalize(strokes){let points=strokes.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);let minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);let size=Math.max(maxX-minX,maxY-minY);if(size<35)return null;let cx=(minX+maxX)/2,cy=(minY+maxY)/2;return strokes.map(s=>sample(s).map(([x,y])=>[(x-cx)/size,(y-cy)/size]));}
function recognize(strokes,lesson){if(strokes.length!==lesson.strokes.length)return {ok:false,reason:`这个字有 ${lesson.strokes.length} 笔。试试看提示，再写一次吧。`};let a=normalize(strokes),b=normalize(lesson.strokes);if(!a)return {ok:false,reason:'把字写大一点，让小狐狸看清楚吧。'};let distance=0;for(let i=0;i<a.length;i++)for(let j=0;j<a[i].length;j++)distance+=Math.hypot(a[i][j][0]-b[i][j][0],a[i][j][1]-b[i][j][1]);distance/=a.length*24;return {ok:distance<0.16,reason:'再看看每一笔的方向和位置，慢慢写，你可以的！',distance};}
export {lessons,recognize};
