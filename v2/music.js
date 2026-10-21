// A cheerful original looping tune, synthesized locally without audio downloads.
export function createMusic(){
 let enabled=true,context=null,master=null,timer=null,step=0,next=0,playing=false;
 const voices=new Set(),beat=.24;
 const melody=[72,76,79,76,77,81,79,0,76,79,84,83,81,79,76,0,74,77,81,77,76,79,77,0,74,76,79,76,74,72,72,0];
 const bass=[48,48,53,53,48,48,55,55,50,50,48,48,55,55,48,48];
 try{enabled=localStorage.getItem('hanzi-v2-music')!=='off';}catch{}
 function tone(note,time,duration,volume,type='triangle'){
  if(!note)return;
  const oscillator=context.createOscillator(),gain=context.createGain();
  oscillator.type=type;oscillator.frequency.value=440*2**((note-69)/12);
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(volume,time+.015);gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
  oscillator.connect(gain);gain.connect(master);voices.add(oscillator);
  oscillator.onended=()=>{voices.delete(oscillator);oscillator.disconnect();gain.disconnect();};
  oscillator.start(time);oscillator.stop(time+duration+.02);
 }
 function schedule(){
  if(!context||!playing||!enabled)return;
  while(next<context.currentTime+.15){
   tone(melody[step%melody.length],next,beat*.85,.14);
   if(step%2===0)tone(bass[(step/2)%bass.length],next,beat*1.6,.13,'sine');
   step++;next+=beat;
  }
 }
 function silence(){
  if(timer!==null){clearInterval(timer);timer=null;}
  if(master)master.gain.setValueAtTime(0,context.currentTime);
  for(const voice of voices){try{voice.stop();}catch{}}voices.clear();
 }
 function sync(){
  if(!context||!enabled||!playing){silence();return;}
  if(timer!==null)return;
  master.gain.setValueAtTime(.55,context.currentTime);next=context.currentTime+.03;schedule();timer=setInterval(schedule,80);
 }
 function unlock(){
  if(!enabled)return;
  try{
   const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
   if(!context){context=new Audio();master=context.createGain();master.connect(context.destination);}
   Promise.resolve(context.resume()).then(sync).catch(()=>{});
  }catch{}
 }
 return {
  get enabled(){return enabled;},
  setPlaying(value){playing=value;sync();},
  unlock,
  toggle(){enabled=!enabled;try{localStorage.setItem('hanzi-v2-music',enabled?'on':'off');}catch{}if(enabled)unlock();sync();return enabled;}
 };
}
