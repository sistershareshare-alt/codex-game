// Separate wall islands create connected loops rather than one-way pockets.
const designs=[
 {name:'南瓜小径',blocks:[[2,2,4,2],[7,2,5,2],[2,6,3,4],[7,6,2,2],[10,6,2,4]],targets:[[6,3],[3,5],[8,9],[5,10],[12,7]]},
 {name:'幽灵花园',blocks:[[2,2,2,3],[6,2,2,3],[10,2,2,3],[2,8,4,2],[8,8,4,2]],targets:[[5,3],[3,7],[7,9],[11,7],[9,5]]},
 {name:'糖果回廊',blocks:[[2,2,8,2],[2,6,3,4],[7,6,5,2],[8,10,4,1]],targets:[[11,3],[5,5],[7,9],[3,11],[12,9]]},
 {name:'月光城堡',blocks:[[2,2,3,2],[8,2,4,2],[3,6,2,4],[7,6,2,2],[11,6,1,4]],targets:[[6,3],[3,5],[9,7],[6,10],[12,9]]},
 {name:'蝙蝠环道',blocks:[[2,2,2,7],[6,2,3,2],[11,2,1,4],[6,6,3,3],[11,9,1,1]],targets:[[5,3],[3,10],[9,5],[7,10],[12,7]]},
 {name:'星星迷藏',blocks:[[2,2,4,2],[8,2,4,2],[2,6,2,4],[6,6,2,4],[10,6,2,4]],targets:[[7,3],[3,5],[5,8],[9,10],[12,7]]}
];
export const start={x:1,y:1},enemyStart={x:13,y:11},exit={x:13,y:1};
function makeLayout(design,id){const cells=Array.from({length:13},(_,y)=>Array.from({length:15},(_,x)=>x===0||x===14||y===0||y===12?'#':'.'));for(const [x,y,w,h]of design.blocks)for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)cells[j][i]='#';const map=cells.map(r=>r.join(''));const sites=[];for(const [x,y]of design.targets){const candidates=[];for(let j=1;j<12;j++)for(let i=1;i<14;i++)if(map[j][i]==='.'&&Math.abs(i-start.x)+Math.abs(j-start.y)>=3&&sites.every(p=>Math.abs(p.x-i)+Math.abs(p.y-j)>=3)&&!(i===exit.x&&j===exit.y))candidates.push({x:i,y:j});candidates.sort((a,b)=>(Math.abs(a.x-x)+Math.abs(a.y-y))-(Math.abs(b.x-x)+Math.abs(b.y-y)));sites.push(candidates[0]);}return {id,name:design.name,grid:map,keySites:sites};}
export const mazeLayouts=designs.map(makeLayout);
export let grid=mazeLayouts[0].grid,keySites=mazeLayouts[0].keySites;
export function selectMaze(selection='random',previousId=null,random=Math.random){const choices=mazeLayouts.filter(m=>m.id!==previousId);const selected=selection==='random'?choices[Math.floor(random()*choices.length)]:mazeLayouts.find(m=>String(m.id)===String(selection));if(!selected)throw Error('Unknown maze');grid=selected.grid;keySites=selected.keySites;return selected;}
export function walkable(x,y,map=grid){return map[y]?.[x]==='.';}
export function neighbors(p,map=grid){return [[0,-1],[1,0],[0,1],[-1,0]].map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).filter(n=>walkable(n.x,n.y,map));}
export function route(from,to,map=grid){let q=[[from]],seen=new Set([`${from.x},${from.y}`]);for(let i=0;i<q.length;i++){const path=q[i],p=path.at(-1);if(p.x===to.x&&p.y===to.y)return path;for(const n of neighbors(p,map)){const id=`${n.x},${n.y}`;if(!seen.has(id)){seen.add(id);q.push([...path,n]);}}}return [];}
export function doorOpen(keys){return keys.size===keySites.length;}
