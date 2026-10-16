import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lessons,recognize} from './recognition.js';
for(const lesson of lessons){test(`recognizes ${lesson.char} with translation and scale`,()=>{assert.equal(recognize(lesson.strokes.map(s=>s.map(([x,y])=>[x*.8+20,y*.8+10])),lesson).ok,true);});}
test('rejects blank writing and dots',()=>{assert.equal(recognize([],lessons[0]).ok,false);assert.equal(recognize([[[10,10],[12,12]]],lessons[0]).ok,false);});
test('rejects wrong stroke count',()=>{assert.equal(recognize(lessons[1].strokes,lessons[0]).ok,false);});
test('rejects vertical line for horizontal character',()=>{assert.equal(recognize([[[180,50],[180,300]]],lessons[0]).ok,false);});
test('rejects reversed stroke direction',()=>{assert.equal(recognize([[[295,180],[65,180]]],lessons[0]).ok,false);});
test('rejects two parallel lines for 十',()=>{assert.equal(recognize(lessons[1].strokes,lessons[3]).ok,false);});
