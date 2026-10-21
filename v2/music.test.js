import {test} from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import fs from 'node:fs';
test('music starts on interaction, stops for challenges/pauses, and remembers mute',async()=>{
 const saved=new Map(),voices=[],intervals=new Set();let contexts=0;
 const gain=()=>({gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}});
 class Audio{constructor(){contexts++;this.currentTime=0;this.destination={};}createGain(){return gain();}createOscillator(){const o={frequency:{value:0},connect(){},disconnect(){},start(){},stop(){this.stopped=true;}};voices.push(o);return o;}resume(){return Promise.resolve();}}
 const scope={window:{AudioContext:Audio},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},setInterval(fn){intervals.add(fn);return fn;},clearInterval(id){intervals.delete(id);},Promise,Set,Math};
 vm.createContext(scope);vm.runInContext(fs.readFileSync(new URL('./music.js',import.meta.url),'utf8').replace('export function','function')+';globalThis.music=createMusic();',scope);
 const music=scope.music;assert.equal(contexts,0);music.setPlaying(true);assert.equal(contexts,0);music.unlock();await Promise.resolve();assert.equal(contexts,1);assert.equal(intervals.size,1);assert.ok(voices.length>0);
 music.setPlaying(false);assert.equal(intervals.size,0);assert.ok(voices.every(v=>v.stopped));
 music.setPlaying(true);assert.equal(intervals.size,1);music.toggle();assert.equal(intervals.size,0);assert.equal(saved.get('hanzi-v2-music'),'off');
 vm.runInContext('globalThis.nextMusic=createMusic()',scope);assert.equal(scope.nextMusic.enabled,false);
});
