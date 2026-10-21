// Build only 2.0. Never write docs/index.html.
const fs=require('node:fs'),path=require('node:path');
const root=__dirname,read=name=>fs.readFileSync(path.join(root,name),'utf8');
const script=name=>read(name).split('\n').filter(line=>!line.startsWith('import ')).join('\n').replace(/^export \{[^}]*\};?$/gm,'').replace(/\bexport (?=const |let |function )/g,'');
let css=read('style.css'),code=['word-bank.js','curriculum.js','vocabulary.js','recognition.js','maze.js','app.js'].map(script).join('\n');
for(const name of fs.readdirSync(path.join(root,'../assets'))){const type=name.endsWith('.png')?'image/png':name.endsWith('.woff')?'font/woff':null;if(!type)continue;const data='data:'+type+';base64,'+fs.readFileSync(path.join(root,'../assets',name)).toString('base64');css=css.replaceAll('/assets/'+name,data);code=code.replaceAll('/assets/'+name,data);}
let html=read('index.html').replace('<link rel="stylesheet" href="./style.css">','<style>'+css+'</style>').replace('<script type="module" src="./app.js"></script>','<script>'+code+'</script>');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const name of fs.readdirSync(path.join(root,'../licenses')))html=html.replace('见 licenses/'+name,escape(fs.readFileSync(path.join(root,'../licenses',name),'utf8')));
const output=path.join(root,'../docs/v2');fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'index.html'),html);console.log('Built docs/v2/index.html');
