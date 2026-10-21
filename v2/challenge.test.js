import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {vocabulary,choiceOptions} from './vocabulary.js';
import {recognize} from './recognition.js';
import {pickRound,rangeBank} from './curriculum.js';
test('all 50 teacher words have usable stroke templates and four distinct choices',()=>{
 assert.equal(vocabulary.length,50);assert.equal(new Set(vocabulary.map(x=>x.char)).size,50);
 for(const item of vocabulary){assert.equal(item.word,item.char);assert.equal(item.characters.length,[...item.char].length);for(const c of item.characters)assert.ok(recognize(c.strokes,c).ok,c.char);const options=choiceOptions(item);assert.equal(new Set(options.map(x=>x.char)).size,4);assert.equal(options.filter(x=>x.char===item.char).length,1);}
 assert.equal(rangeBank(vocabulary,'1','10').length,50);assert.equal(pickRound(rangeBank(vocabulary,'3','3')).length,5);
});
test('listening gates writing, each character gates the key, and unfinished challenge cannot exit',()=>{
 const elements=new Map();
 const context2d=new Proxy({}, {get:()=>()=>({addColorStop(){}}),set:()=>true});
 function el(id){if(!elements.has(id)){const e={id,value:'',textContent:'',innerHTML:'',style:{},open:false,children:[],classList:{add(){},remove(){},toggle(){}},getContext:()=>context2d,addEventListener(){},setAttribute(){},querySelector:()=>({open:false,textContent:''}),replaceChildren(){this.children=[]},append(b){this.children.push(b)},showModal(){this.open=true},close(){this.open=false}};elements.set(id,e);}return elements.get(id);}
 const scope={console,Math,Set,Map,JSON,Number,Array,performance:{now:()=>1000},setInterval,clearInterval,requestAnimationFrame(){},Image:class{},localStorage:{getItem:()=>null,setItem(){}},document:{getElementById:el,createElement:()=>el(Symbol()),querySelectorAll:()=>[],addEventListener(){},body:{classList:{toggle(){}}}},window:{addEventListener(){}}};
 const code=['word-bank.js','curriculum.js','vocabulary.js','recognition.js','maze.js','music.js','app.js'].map(file=>fs.readFileSync(new URL(file,import.meta.url),'utf8').split('\n').filter(line=>!line.startsWith('import ')).join('\n').replace(/^export \{[^}]*\};?$/gm,'').replace(/\bexport (?=const |let |function )/g,'')).join('\n');
 vm.createContext(scope);vm.runInContext(code,scope);
 const run=code=>vm.runInContext(code,scope);
 run("lessons=[vocabulary.find(x=>x.char==='没关系')];openWriting(0)");assert.equal(el('choices').children.length,4);
 run("$('submit').onclick();leaveWriting()");assert.equal(run('state'),'writing');assert.equal(run('keys.size'),0);
 el('choices').children.find(x=>x.textContent!=='没关系').onclick();assert.equal(run('choicePassed'),false);
 el('choices').children.find(x=>x.textContent==='没关系').onclick();assert.equal(run('choicePassed'),true);
 run("strokes=[[[0,0],[359,359]]];$('submit').onclick()");assert.equal(run('characterIndex'),0);assert.equal(run('keys.size'),0);
 for(let i=0;i<3;i++){run("strokes=currentCharacter().strokes;$('submit').onclick()");assert.equal(run('keys.size'),i===2?1:0);}
 run("$('submit').onclick()");assert.equal(run('state'),'running');assert.equal(el('writing').open,false);
 const html=fs.readFileSync(new URL('../docs/v2/index.html',import.meta.url),'utf8');new vm.Script(html.match(/<script>([\s\S]*)<\/script>/)[1]);
});
