const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const routes = {'/':'index.html','/style.css':'style.css','/app.js':'app.js','/recognition.js':'recognition.js','/maze.js':'maze.js','/word-bank.js':'word-bank.js','/curriculum.js':'curriculum.js','/licenses/ARPHICPL.TXT':'licenses/ARPHICPL.TXT','/assets/garden-background.png':'assets/garden-background.png','/assets/characters.png':'assets/characters.png'};
http.createServer((req,res)=>{ const file=routes[new URL(req.url,'http://localhost').pathname]; if(!file){res.writeHead(404);return res.end('Not found');} res.setHeader('Content-Type',file.endsWith('.png')?'image/png':file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8');fs.createReadStream(path.join(root,file)).pipe(res); }).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Hanzi adventure listening on port '+(process.env.PORT||3000)));
