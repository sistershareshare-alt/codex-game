import {test} from 'node:test';import assert from 'node:assert/strict';
import {grid,start,exit,enemyStart,keySites,route,walkable,doorOpen} from './maze.js';
test('all keys, exit and enemy are reachable through corridors',()=>{for(const target of [...keySites,exit,enemyStart]){const path=route(start,target);assert.ok(path.length>1);for(let i=1;i<path.length;i++){assert.ok(walkable(path[i].x,path[i].y));assert.equal(Math.abs(path[i].x-path[i-1].x)+Math.abs(path[i].y-path[i-1].y),1);}}});
test('door needs all five keys',()=>{assert.equal(doorOpen(new Set([0,1,2,3])),false);assert.equal(doorOpen(new Set([0,1,2,3,4])),true);});
test('maze boundaries are closed and rectangular',()=>{assert.ok(grid.every(r=>r.length===15&&r[0]==='#'&&r.at(-1)==='#'));assert.equal(grid[0],'###############');assert.equal(grid.at(-1),'###############');});
