// Validate the teacher's checked-in bank; never regenerate the original curriculum.
import {vocabulary} from '../vocabulary.js';
if(vocabulary.length!==50||vocabulary.some(w=>w.characters.some(c=>!c?.strokes?.length)))throw Error('Invalid teacher vocabulary or missing stroke data');
console.log('Validated 50 teacher words and all stroke templates.');
