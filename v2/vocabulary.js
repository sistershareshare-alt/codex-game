import {wordBank} from "./word-bank.js";
import {curriculum} from "./curriculum.js";
export const vocabulary = curriculum.flatMap(group=>group.chars.map(char=>({char,word:char,courses:[group.id],characters:[...char].map(c=>wordBank.find(item=>item.char===c))})));
export function choiceOptions(answer, random=Math.random){
 const others=vocabulary.filter(item=>item.char!==answer.char);
 for(let i=others.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[others[i],others[j]]=[others[j],others[i]];}
 const options=[answer,...others.slice(0,3)];
 for(let i=options.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
 return options;
}
