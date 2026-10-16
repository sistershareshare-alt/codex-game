export const grid=[
'###############',
'#.....#.......#',
'#.###.#.###.#.#',
'#...#...#...#.#',
'###.#####.###.#',
'#...#.....#...#',
'#.###.###.#.###',
'#.....#...#...#',
'#.#####.#####.#',
'#...#...#.....#',
'###.#.###.###.#',
'#.....#.....#.#',
'###############'];
export const start={x:1,y:1},enemyStart={x:13,y:11},exit={x:13,y:1};
export const keySites=[{x:5,y:1},{x:1,y:5},{x:7,y:7},{x:1,y:11},{x:11,y:9}];
export function walkable(x,y){return grid[y]?.[x]==='.';}
export function route(from,to){let q=[[from]],seen=new Set([`${from.x},${from.y}`]);for(let i=0;i<q.length;i++){let path=q[i],p=path.at(-1);if(p.x===to.x&&p.y===to.y)return path;for(const [dx,dy]of [[0,-1],[1,0],[0,1],[-1,0]]){let n={x:p.x+dx,y:p.y+dy},id=`${n.x},${n.y}`;if(walkable(n.x,n.y)&&!seen.has(id)){seen.add(id);q.push([...path,n]);}}}return [];}
export function doorOpen(keys){return keys.size===keySites.length;}
