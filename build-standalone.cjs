const fs=require('node:fs');const path=require('node:path');
const root=__dirname;const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const script=name=>read(name).split('\n').filter(line=>!line.startsWith('import ')).join('\n').replace(/^export \{[^}]*\};?$/gm,'').replace(/\bexport (?=const |function )/g,'');
let css=read('style.css'),code=['word-bank.js','curriculum.js','recognition.js','maze.js','app.js'].map(script).join('\n');

for(const name of fs.readdirSync(path.join(root,'assets'))){if(!name.endsWith('.png'))continue;let ref='/assets/'+name;let data='data:image/png;base64,'+fs.readFileSync(path.join(root,'assets',name)).toString('base64');css=css.replaceAll(ref,data);code=code.replaceAll(ref,data);}
const escapeHtml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const html=read('index.html').replace('见 licenses/ARPHICPL.TXT',escapeHtml(read('licenses/ARPHICPL.TXT')).replace(/ +(?=\n|$)/g,spaces=>'&#32;'.repeat(spaces.length))).replace('<link rel="stylesheet" href="/style.css">','<style>'+css+'</style>').replace('<script type="module" src="/app.js"></script>','<script>'+code+'</script>');
const output=path.join(root,'..','artifacts');fs.mkdirSync(output,{recursive:true});for(const name of ['hanzi-maze-escape.html','hanzi-maze-storybook.html'])fs.writeFileSync(path.join(output,name),html);console.log('Standalone game built with embedded artwork: '+path.join(output,'hanzi-maze-storybook.html'));

const pages=path.join(root,'docs');fs.mkdirSync(pages,{recursive:true});fs.writeFileSync(path.join(pages,'index.html'),html);fs.writeFileSync(path.join(pages,'.nojekyll'),'');console.log('GitHub Pages prepared in docs/');

fs.mkdirSync(path.join(pages,'licenses'),{recursive:true});for(const name of fs.readdirSync(path.join(root,'licenses')))fs.copyFileSync(path.join(root,'licenses',name),path.join(pages,'licenses',name));
