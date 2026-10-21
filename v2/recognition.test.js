import {test} from 'node:test';import assert from 'node:assert/strict';import {lessons,recognize} from './recognition.js';
const char=c=>lessons.find(l=>l.char===c);
test('recognizes all required characters at translated scale',()=>{for(const lesson of lessons)assert.equal(recognize(lesson.strokes.map(s=>s.map(([x,y])=>[x*.8+20,y*.8+10])),lesson).ok,true,lesson.char);});
test('rejects blanks, malformed points, wrong count and unrelated writing',()=>{for(const input of [[],null,[[[]]],[[[NaN,1],[1,2]]],[[[1,2]]],[[[10,10],[12,12]]]])assert.equal(recognize(input,char('一')).ok,false);assert.equal(recognize(char('你').strokes,char('我')).ok,false);assert.equal(recognize([[[180,50],[180,300]]],char('一')).ok,false);assert.equal(recognize(char('一').strokes.map(s=>[...s].reverse()),char('一')).ok,false);});
test('rejects missing terminal hooks on horizontal-turn and vertical hooks',()=>{
 for(const [c,strokeIndex,cut] of [['书',1,1],['字',4,1],['学',6,1],['同',1,3],['问',2,2],['包',4,1],['你',4,3]]){
  const model=char(c),input=model.strokes.map(s=>s.map(p=>[...p]));input[strokeIndex]=input[strokeIndex].slice(0,-cut);
  assert.equal(recognize(input,model).ok,false,`missing hook in ${c} stroke ${strokeIndex+1}`);
 }
});
test('rejects a tiny hook stub and a hook in the opposite direction',()=>{
 const model=char('书'),input=model.strokes.map(s=>s.map(p=>[...p]));
 const pivot=input[1].at(-2),end=input[1].at(-1);
 input[1][input[1].length-1]=[pivot[0]+(end[0]-pivot[0])*.15,pivot[1]+(end[1]-pivot[1])*.15];assert.equal(recognize(input,model).ok,false);
 input[1][input[1].length-1]=[pivot[0]-(end[0]-pivot[0]),pivot[1]-(end[1]-pivot[1])];assert.equal(recognize(input,model).ok,false);
});
test('small natural coordinate deviations still pass complete writing',()=>{for(const lesson of lessons){const input=lesson.strokes.map((s,k)=>s.map(([x,y],j)=>[x+Math.sin(j+k)*2,y+Math.cos(j-k)*2]));assert.equal(recognize(input,lesson).ok,true,lesson.char);}});
