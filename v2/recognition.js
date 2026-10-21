import {wordBank} from './word-bank.js';
function sample(stroke,n=24){let lengths=[0];for(let i=1;i<stroke.length;i++)lengths.push(lengths[i-1]+Math.hypot(stroke[i][0]-stroke[i-1][0],stroke[i][1]-stroke[i-1][1]));const total=lengths.at(-1);if(!total)return Array.from({length:n},()=>stroke[0]);let j=1;return Array.from({length:n},(_,i)=>{let d=total*i/(n-1);while(j<lengths.length-1&&lengths[j]<d)j++;let t=(d-lengths[j-1])/(lengths[j]-lengths[j-1]||1);return [stroke[j-1][0]+t*(stroke[j][0]-stroke[j-1][0]),stroke[j-1][1]+t*(stroke[j][1]-stroke[j-1][1])];});}
function normalize(strokes){let points=strokes.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);let minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);let size=Math.max(maxX-minX,maxY-minY);if(size<35)return null;let cx=(minX+maxX)/2,cy=(minY+maxY)/2;return strokes.map(s=>sample(s).map(([x,y])=>[(x-cx)/size,(y-cy)/size]));}
// Detect a terminal hook from a real change in direction, not a stroke-count guess.
function terminalHook(points){
 const pointsSample=sample(points,64),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const extent=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys));
 let corner=38;for(let j=39;j<62;j++)if(pointsSample[j][1]>pointsSample[corner][1])corner=j;
 const end=pointsSample.at(-1),pivot=pointsSample[corner],before=pointsSample[Math.max(0,corner-12)];
 const tail=[end[0]-pivot[0],end[1]-pivot[1]],incoming=[pivot[0]-before[0],pivot[1]-before[1]],length=Math.hypot(...tail),inLength=Math.hypot(...incoming);
 if(tail[1]<-Math.max(4,extent*.035)&&length>Math.max(7,extent*.055)&&inLength>4&&((incoming[0]*tail[0]+incoming[1]*tail[1])/(length*inLength)<.55||tail[1]<-extent*.16))return {tail,length,corner:corner/63};
 return null;
}
function recognize(strokes,lesson){
 if(!lesson||!Array.isArray(strokes)||strokes.some(s=>!Array.isArray(s)||s.length<2||s.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v)))))return {ok:false,reason:'先写下完整的笔画，再来试试看。'};
 if(strokes.length!==lesson.strokes.length)return {ok:false,reason:`这个字有 ${lesson.strokes.length} 笔，请按笔顺写完整。`};
 const a=normalize(strokes),b=normalize(lesson.strokes);if(!a)return {ok:false,reason:'请把字写大一点。'};
 let totalDistance=0;
 for(let i=0;i<a.length;i++){
  const distances=a[i].map((p,j)=>Math.hypot(p[0]-b[i][j][0],p[1]-b[i][j][1]));
  const mean=distances.reduce((sum,d)=>sum+d,0)/distances.length;
  totalDistance+=mean;
  const hook=terminalHook(lesson.strokes[i]);
  if(hook){
   // Compare the terminal movement in normalized character coordinates. A plain
   // horizontal/vertical ending cannot pass by averaging it with other strokes.
   const expected=sample(b[i],64),actual=sample(a[i],64),q=Math.round(hook.corner*63);
   const wanted=[expected[63][0]-expected[q][0],expected[63][1]-expected[q][1]],length=Math.hypot(...wanted);
   let bottom=35;for(let j=36;j<63;j++)if(actual[j][1]>actual[bottom][1])bottom=j;
   const tail=[actual[63][0]-actual[bottom][0],actual[63][1]-actual[bottom][1]],projection=(tail[0]*wanted[0]+tail[1]*wanted[1])/length;
   if(projection<length*.35||tail[1]>=-Math.abs(wanted[1])*.45)return {ok:false,reason:`第 ${i+1} 笔的钩没有写完整，请在收笔时钩出来。`};
  }
  // Check the stroke itself independently of its position/size in the character.
  // This tolerates uneven spacing and proportions while retaining stroke direction.
  const localA=normalize([strokes[i]]),localB=normalize([lesson.strokes[i]]);
  if(localA&&localB){
   const shapeError=localA[0].reduce((sum,p,j)=>sum+Math.hypot(p[0]-localB[0][j][0],p[1]-localB[0][j][1]),0)/24;
   if(shapeError>.26)return {ok:false,reason:`请检查第 ${i+1} 笔的方向和转折。`};
  }
  if(mean>.34)return {ok:false,reason:`第 ${i+1} 笔的位置偏得有点远，再试一次。`};
 }
 const similarity=Math.max(0,1-totalDistance/a.length);
 return {ok:similarity>=.8,similarity,reason:'字形大致写像就可以，请稍微调整各笔的位置。'};
}
export {wordBank as lessons,recognize};
