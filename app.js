(function(){
'use strict';
var _now=new Date();
var _birth=new Date(1986,9,22);
var _age=Math.floor((_now-_birth)/31557600000);
var _expYears=_now.getFullYear()-2012;
var _dateStr=_now.toISOString().split('T')[0];
const SYSTEM = 'You are Mahir Velizade, a UI/UX designer from Baku. Today is '+_dateStr+'. Born 22 October 1986, age '+_age+'. Designing since 2012 ('+_expYears+' years). This is a casual chat — talk like a real person.\n\nSPEAKING:\n- Vary sentence length. Use fillers naturally: "honestly", "yeah", "look", "I mean", "you know", "well", "actually".\n- Do NOT list facts. Weave info into natural speech.\n- Match user tone. Be calm, friendly, slightly witty.\n- Prefer short conversational answers over long explanations.\n- If asked "how are you", respond naturally first, then offer help.\n- If unsure, be honest: "Not sure about that one, honestly."\n\nCRITICAL — Answer in user language (AZ/EN/RU). This is mandatory.\n- EN (English): be natural and conversational. Use casual English fillers.\n- AZ (Azerbaijani): danış təbii, real Bakılı kimi. "Deyəsən", "yəni", "bax", "hə", "bilirsən" kimi sözlər işlət.\n- RU (Russian): говори естественно, как в разговоре.\n- Never say "visit my portfolio" — user is already here.\n\nFACTS:\nName: Mahir Velizade. Age: '+_age+'. Born: 22 Oct 1986 in Baku, Azerbaijan.\nProfession: UI/UX Designer & Creative Developer. Experience: '+_expYears+' years (since 2012).\nCurrently: Innovation and Digital Development Agency, Baku.\nPreviously: APA Group (apa.az news portal, 2019), Limak.\nSkills: UI/UX, Branding, Motion, Graphic Design, Illustration, Frontend, Game UI.\nTools: Figma, Photoshop, Illustrator, After Effects, Adobe XD.\nBehance: 46K+ views, 1,240 appreciations, member since 2013.\nSocial: @mahir_velizade everywhere.\nPROJECTS: Seismic Survey Center, Azelish.com, Financial Reporting Center, apa.az, CERT.AZ, Heydar Aliyev Palace, Xonça game UI, PHP Book (2024).';

const GEMINI_KEY = (typeof localStorage!=='undefined'&&localStorage.getItem('gemini_key'))||'AIzaSyAQXLh_MlSEIIOLfia3QyRfQHRPm3wjAfU';
const OR_KEY = (typeof localStorage!=='undefined'&&localStorage.getItem('or_key'))||'';
const OR_MODEL = 'google/gemini-2.0-flash-exp:free';
const GEMINI_MODELS = ['gemini-2.5-flash-lite','gemini-2.5-flash','gemini-2.0-flash-lite-001'];
let GEMINI_MODEL_IDX = 0;
function buildGeminiURL(idx){ return 'https://generativelanguage.googleapis.com/v1beta/models/'+GEMINI_MODELS[idx]+':generateContent?key='+GEMINI_KEY; }
const WELCOME = {
  en: "Hey there, I'm Mahir. Feel free to ask me anything about my work or background — happy to chat.",
  az: "Salam, mən Mahir. İşim, təcrübəm və ya portfolio haqqında istədiyinizi soruşa bilərsiniz.",
  ru: "Привет, я Махир. Спрашивайте что угодно о моей работе или опыте — с радостью отвечу."
};
const PLACEHOLDERS = { en: 'Ask me anything...', az: 'Istənilən sualı verin...', ru: 'Спросите что угодно...' };
const FALLBACKS = {
  en: "Hmm, not sure what to say to that one — ask me about my work, experience, or anything design-related.",
  az: "Baqışlayın, sualınızı tam anlamadım. İşim, layihələrim və ya təcrübəm haqqında soruşa bilərsiniz.",
  ru: "Хм, не совсем понял вопрос. Спросите о моей работе, опыте или проектах."
};
const SPEECH_LANG_CODES = { en: 'en-US', az: 'tr-TR', ru: 'ru-RU' };

function detectLang(text) {
  if (/[əğııöüşç]/i.test(text)) return 'az';
  if (/[а-яё]/i.test(text)) return 'ru';
  return 'en';
}

let _lastLang='en', isOpen=false, isBusy=false, greeted=false, jawTick=null, recog=null, listening=false, history=[], _msgId=0;
let alwaysListen=true;
let recogContinuous=null;

const bubble=document.getElementById('ai-bubble'), msgs=document.getElementById('ai-msgs'),
      input=document.getElementById('ai-input'), sendBtn=document.getElementById('ai-send'),
      micBtn=document.getElementById('ai-mic'), closeB=document.getElementById('ai-x'),
      fab=document.getElementById('ai-fab'), lbl=document.getElementById('ai-lbl'),
      listenToggle=document.getElementById('ai-listen-toggle');

function jaw(open) {
  const o=window._mahirMainObject; if(!o) return;
  o.traverse(n=>{ if(!n.isBone) return; const nm=n.name.toLowerCase();
    if(nm.includes('jaw')||nm.includes('chin')||nm.includes('mandible')||nm.includes('mouth')||nm.includes('lowerlip'))
      n.rotation.x=open?0.22:0; });
}
function startJaw(){ if(jawTick) return; let ph=false; jawTick=setInterval(()=>{ph=!ph;jaw(ph);},145); fab.classList.add('speaking'); lbl.textContent='Speaking...'; lbl.classList.add('on'); }
function stopJaw(){ clearInterval(jawTick);jawTick=null;jaw(false);fab.classList.remove('speaking');lbl.classList.remove('on'); }

const synth=window.speechSynthesis;
const QUALITY_VOICES=['samantha','karen','moira','tessa','veena','sara','daniel','tom','alex','mark'];
function pickVoice(lang){
  if(!synth) return null;
  const vs=synth.getVoices(); if(!vs.length) return null;
  const pfx=lang.split('-')[0];
  let v;
  v=vs.find(x=>x.lang.startsWith(pfx)&&QUALITY_VOICES.some(n=>x.name.toLowerCase().includes(n)));
  if(v) return v;
  v=vs.find(x=>QUALITY_VOICES.some(n=>x.name.toLowerCase().includes(n))); if(v) return v;
  v=vs.find(x=>x.lang.startsWith(pfx)); if(v) return v;
  v=vs.find(x=>x.lang.startsWith('en')); if(v) return v;
  return vs[0];
}
if(synth){ synth.getVoices(); if(synth.onvoiceschanged!==undefined) synth.onvoiceschanged=()=>synth.getVoices(); }

let _vReady=false;
function ensureVoices(cb){
  const vs=synth?synth.getVoices():[];
  if(vs.length){_vReady=true;cb();return;}
  if(!synth){cb();return;}
  let t=0; function poll(){ const v2=synth.getVoices(); if(v2.length){_vReady=true;cb();return;} if(++t<30) setTimeout(poll,100); else cb(); }
  if(synth.onvoiceschanged!==undefined) synth.onvoiceschanged=function(){_vReady=true;cb();};
  setTimeout(poll,100);
}

function speak(text,cb){
  try {
    if(!synth){cb&&cb();return;}
    try{ synth.cancel(); }catch(e){}
    const ttsLang=detectLang(text);
    const TTS_LANG={en:'en-US',az:'tr-TR',ru:'ru-RU'};
    const lc=TTS_LANG[ttsLang]||'en-US';
    ensureVoices(function(){
      setTimeout(function(){
        try {
          const u=new SpeechSynthesisUtterance(text);
          var pitch=0.95;
          if(ttsLang==='az'||ttsLang==='ru'){pitch=0.85;}
          u.lang=lc;u.rate=0.92;u.pitch=pitch;u.volume=1.0;
          try {
            const vs=synth.getVoices();
            const pfx=lc.split('-')[0];
            var voice;
            if(ttsLang==='az'||ttsLang==='ru'){
              var femaleSuffix=/kadın|женский|kadın|female|yelda|milena|samanta|karen|moira|tessa|veena|sara|fiona|catherine|helen|siri/i;
              voice=vs.find(function(v){
                if(!v.lang.startsWith(pfx)) return;
                if(femaleSuffix.test(v.name)) return;
                return /male|david|mark|daniel|arthur|gordon|alex|aaron|fred|reed|rocko|alexander|yuri|ioan|toms|steffan|viktor|mikhail|nikola|petr|boris|vladimir|tolga|tom|tim|james|john|paul|mike|steve|peter|george|henry|google/i.test(v.name);
              });
              if(!voice) voice=vs.find(function(v){
                if(!v.lang.startsWith(pfx)) return;
                if(femaleSuffix.test(v.name)) return;
                return true;
              });
              if(!voice) voice=vs.find(x=>x.lang.startsWith(pfx));
            } else {
              voice=vs.find(x=>x.lang.startsWith(pfx));
            }
            if(!voice) voice=vs.find(x=>x.lang.startsWith('en'));
            if(voice){u.voice=voice;u.lang=voice.lang||lc;}
          } catch(e){}
          let done=false;
          function finish(){if(done)return;done=true;stopJaw();cb&&cb();}
          var safeTimer=setTimeout(finish,8000);
          u.onstart=startJaw;
          u.onend=function(){clearTimeout(safeTimer);finish();};
          u.onerror=function(){clearTimeout(safeTimer);finish();};
          synth.speak(u);
        } catch(e){ clearTimeout(safeTimer); done=true; cb&&cb(); }
      },80);
    });
  } catch(e){ cb&&cb(); }
}

function addMsg(text,role){ const d=document.createElement('div');d.className='cm '+role;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d; }
function lock(v){ input.disabled=v;sendBtn.disabled=v;if(!v) setTimeout(()=>input.focus(),50); }

async function callGemini(userText, lang){
  const langTag = lang ? '[LANG: '+lang.toUpperCase()+'] ' : '';
  const taggedText = langTag + userText;
  if(OR_KEY){
    try{
      const msgs=[{role:'system',content:SYSTEM}];
      for(const h of history) msgs.push({role:h.role,content:h.text});
      msgs.push({role:'user',content:taggedText});
      const res=await fetch('https://openrouter.ai/api/v1/chat/completions',{
        method:'POST',
        headers:{'Authorization':'Bearer '+OR_KEY,'Content-Type':'application/json','HTTP-Referer':'https://mahirvelizade.com','X-Title':'MahirVelizade'},
        body:JSON.stringify({model:OR_MODEL,messages:msgs,max_tokens:400,temperature:0.95})});
      if(res.ok){
        const data=await res.json();
        const reply=data?.choices?.[0]?.message?.content;
        if(reply) return reply.trim();
      }
    } catch(e){ console.warn('[OpenRouter]',e.message); }
  }
  const contents=history.map(h=>({role:h.role,parts:[{text:h.text}]}));
  contents.push({role:'user',parts:[{text:taggedText}]});
  var lastErr=null;
  for(var attempt=0;attempt<GEMINI_MODELS.length;attempt++){
    var idx=(GEMINI_MODEL_IDX+attempt)%GEMINI_MODELS.length;
    try{
      const res=await fetch(buildGeminiURL(idx),{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM}]},contents,generationConfig:{maxOutputTokens:400,temperature:0.95}})});
      if(res.status===429){ lastErr='quota'; continue; }
      if(!res.ok){ lastErr='http_'+res.status; continue; }
      const data=await res.json();
      const reply=data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if(!reply) continue;
      GEMINI_MODEL_IDX=idx;
      return reply.trim();
    } catch(e){ lastErr='network'; continue; }
  }
  if(lastErr==='quota') throw new Error('QUOTA_EXCEEDED');
  throw new Error('All models failed: '+lastErr);
}

async function send(override){
  const text=(override||input.value).trim();
  if(!text||isBusy) return;
  _lastLang = detectLang(text);
  var keyMatch=text.match(/^(key|api|apikey|api.key)[:\s]+(AIza[a-zA-Z0-9_-]+)/i);
  var orMatch=text.match(/^(key|api|apikey|api.key)[:\s]+(sk-or-[a-zA-Z0-9_-]+)/i);
  if(orMatch){
    input.value='';
    var orKey=orMatch[2];
    if(typeof localStorage!=='undefined') localStorage.setItem('or_key',orKey);
    location.reload();
    return;
  }
  if(keyMatch){
    input.value='';
    var newKey=keyMatch[2];
    if(typeof localStorage!=='undefined') localStorage.setItem('gemini_key',newKey);
    location.reload();
    return;
  }
  input.value=''; addMsg(text,'usr'); lock(true);
  isBusy=true;
  var mid=++_msgId;
  setTimeout(function(){ if(isBusy&&_msgId===mid){ isBusy=false; lock(false); } },15000);
  const typing=addMsg('','ai typing');
  try{
    const reply=await callGemini(text, _lastLang);
    history.push({role:'user',text});history.push({role:'model',text:reply});
    if(history.length>24) history=history.slice(-24);
    typing.remove(); addMsg(reply,'ai');
    speak(reply,function(){ isBusy=false; lock(false); });
  } catch(err){
    console.warn('[AI]',err.message); typing.remove();
    var fb=FALLBACKS[_lastLang]||FALLBACKS.en;
    if(typeof window.localAnswer==='function'){
      var lr=window.localAnswer(text);
      if(lr && lr!==FALLBACKS.en && lr!==FALLBACKS.az && lr!==FALLBACKS.ru) fb=lr;
    }
    if(_lastLang==='az'){ var az=localAZ(text); if(az) fb=az; }
    if(_lastLang==='ru'){ var ru=localRU(text); if(ru) fb=ru; }
    addMsg(fb,'ai');
    speak(fb,function(){ isBusy=false; lock(false); });
  }
}

function destroyRecog(){
  if(recog){
    try{ recog.abort(); }catch(e){}
    recog=null;
  }
  recogContinuous=null;
}

function buildRecog(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    if(!window._speechWarned){ window._speechWarned=true;
      addMsg('Voice input requires HTTPS or localhost. Type your questions instead.','ai');
      addMsg('Səsli giriş HTTPS tələb edir. Zəhmət olmasa yazın.','ai'); }
    return null;
  }
  destroyRecog();
  const isAlways=alwaysListen;
  const r=new SR();
  recogContinuous=isAlways;
  r.lang=SPEECH_LANG_CODES[_lastLang]||'en-US'; r.continuous=isAlways; r.interimResults=isAlways; r.maxAlternatives=1;
  r.onstart=function(){
    listening=true; micBtn.classList.add('on');
    var langLabel={en:'EN',az:'AZ',ru:'RU'}[_lastLang]||'EN';
    lbl.textContent=isAlways?'Always listening ('+langLabel+')...':'Listening ('+langLabel+')...'; lbl.classList.add('on');
  };
  r.onresult=function(e){
    if(isBusy) return;
    const last=e.results[e.results.length-1];
    if(!last) return;
    const t=last[0].transcript;
    if(!t.trim()) return;
    if(isAlways && !last.isFinal) return;
    input.value=t;
    if(!isAlways) destroyRecog();
    send(t);
  };
  r.onerror=function(e){
    if(isAlways && (e.error==='no-speech'||e.error==='aborted')) return;
    if(e.error==='language-not-supported'){ r.lang='en-US'; try{ r.start(); }catch(e2){} }
    if(e.error==='not-allowed'&&!window._micWarned){ window._micWarned=true;
      addMsg('Microphone access is blocked. Please allow mic in your browser settings and refresh.','ai'); }
  };
  r.onend=function(){
    listening=false;
    micBtn.classList.remove('on');
    lbl.classList.remove('on');
    if(isAlways && isOpen && !isBusy){
      try{ r.start(); }catch(e){ startListen(); }
    }
  };
  recog=r;
  return r;
}

function startListen(){
  if(isBusy||!isOpen) return;
  synth&&synth.cancel(); stopJaw();
  function doStart(){
    if(recog){
      try{ recog.start(); listening=true; micBtn.classList.add('on');
        var ll={en:'EN',az:'AZ',ru:'RU'}[_lastLang]||'EN';
        lbl.textContent=alwaysListen?'Always listening ('+ll+')...':'Listening ('+ll+')...'; lbl.classList.add('on'); return;
      }catch(e){ destroyRecog(); }
    }
    const r=buildRecog(); if(!r) return;
    try{ r.start(); }catch(e){}
  }
  if(typeof navigator!=='undefined'&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({audio:true}).then(doStart).catch(function(err){
      if(!window._micWarned){ window._micWarned=true;
        addMsg('Microphone access is needed for voice input. Please allow mic permission.','ai'); }
    });
  } else { doStart(); }
}

function stopListen(){
  listening=false;
  micBtn.classList.remove('on');
  lbl.classList.remove('on');
  if(recog){ try{ recog.stop(); }catch(e){} }
}

function toggleAlwaysListen(){
  alwaysListen=!alwaysListen;
  listenToggle.classList.toggle('on',alwaysListen);
  destroyRecog();
  if(isOpen) setTimeout(function(){ startListen(); },200);
}

function localAZ(t){
  t=t.toLowerCase().trim();
  var E='[e\u0259]', I='[i\u0131]', S='[s\u015F]', C='[c\u00E7]', G='[g\u011F]', O='[o\u00F6]', U='[u\u00FC]';
  function rx(s){ return new RegExp(s); }
  var _b=new Date(1986,9,22),_n=new Date(),_a=Math.floor((_n-_b)/31557600000);
  if(/^salam[.!]*$/.test(t)) return "Salam! Necesen, ne var ne yox?";
  if(rx('n'+E+'c'+E+S+E+'n?|n'+E+'t'+E+'rs'+E+'n|n'+E+' c'+U+'rs'+E+'n').test(t)||rx('n'+E+' var n'+E+' yox').test(t)||rx(S+'l'+E+'r n'+E+'c'+E+'|'+S+'l'+E+'r n'+E+'t'+E+'rs'+E+'n').test(t)) return "Sag ol, yaxsiyam. Sen nece?";
  if(rx('ad'+I+I+'?n?\\s*(ne|n'+E+'dir?)').test(t)||rx('s(e|'+E+')n\\s*kim').test(t)||/tanis|ad/.test(t)) return "Men Mahir Velizade. 1986-ci il 22 oktyabrda Bakıda anadan olmuşam. UI/UX dizaynerem.";
  if(/\byaşa\w*/i.test(t)) {
    if(/harda|harada/.test(t)) return "Baki seherinde yasayiram.";
    return "Elbette yasayib yaradiram! Necesen?";
  }
  if(rx('y'+S+I+I+'?n?\\s*(ne)?'+C+E+'?').test(t)||rx(C+E+'\\s*y'+S).test(t)||/nece.*yas|nec.*\u015Fa\u015F/.test(t)) return _a+" yasim var. 22 oktyabr 1986-ci ilde anadan olmusam.";
  if(/ne[c\u00E7].*il.*i\u015F|ne\u00E7.*ildi/.test(t)||rx('n'+E+C+E+'\\s*ildi').test(t)) return (_n.getFullYear()-2012)+" ildi ki, dizaynla mesgulam. 2012-ci ilden baslamışam.";
  if(rx('haral'+I+'s(an|n)?').test(t)||/hardan|harada|baki/.test(t)||rx(S+E+'h'+E+'r').test(t)) return "Baki, Azerbaycandanam.";
  if(rx('n'+E+'\\s*'+I+'?'+S+'|pe'+S+E+'|v'+E+'zif'+E+'|ixtisas|'+S+'leyir|'+S+'\\s*g'+O+'r').test(t)) return "UI/UX dizayner ve yaradici proqramciyam.";
  if(rx('harda\\s+('+S+'leyir|'+S+'lisir|cal'+S+'ir)').test(t)||rx(S+' yeri').test(t)||/calis[ıi]r|calisd[ıi][ğı]in|hazirki/.test(t)) return "Hazirda Innovasiya ve Reqemsal Inkisaf Agentliyinde calisiram.";
  if(/tesekkur|sag[o\u00F6]l|cox sag|t\u015Fk/.test(t)||rx('t'+E+S+E+'kk').test(t)) return "Buyurun. Basqa sualiniz?";
  if(/^salam|gunaydin|sabahin|axsamin|xo/.test(t)||rx('x'+O+S).test(t)) return "Salam! Necesen, ne var ne yox?";
  if(/portfolio|portfoli|isler/.test(t)||rx('layih'+E+'|layihe').test(t)) return "Portfoliomda 5 layihe var";
  if(rx('g'+O+'r'+U+S+'|h'+E+'l'+E+'lik|bay bay|sa'+G+'ol').test(t)) return "Sag olun. Yene sualiniz olsa, buyurun.";
  if(rx('n'+E+' var n'+E+' yox|hardasan|h'+E+'rda|n'+E+' vecim').test(t)) return "Buradayam, isleyirem. Sizin nece?";
  if(/t[əe]brik|ad g[üu]n[uü]|do[ğg]um/.test(t)) return "Teşekkür edirem!";
  if(/sevir|sevmir|xo[bB]uma|b[əe]y[əe]n|xo[sş]|g[öo]z[əe]l|goz[əe]l/.test(t)) return "Teşekkür edirem, xoş sözlerinize.";
  if(/mən (d[əe] )?yaxş[ıi](yam|y[ıi]q)?/.test(t)) return "Şükür, həmişə yaxşı olun!";
  if(/mən normal|normal(yam|[ıi]q)/.test(t)) return "Şükür, yaxşıdır. Özünüzə yaxşı baxın.";
  if(/mən pis|^pis[əe]?m?[.!]*$|kefim (yoxdu|pis)|[əe]hval[ıi]m (pis|yox)/.test(t)) return "Pis olmayın, inşallah hər şey yaxşı olar. Həmişə ümid var!";
  if(/şükür|elhamdulillah|hər şey (yaxşı|qaydasında|gözəl)/i.test(t)) return "Əla, şükür! Həmişə belə olsun!";
  if(/yaxşı (ol|bax|qal|gəz)|özün[üu]z?[əe] (yaxşı bax|diqqət et)/i.test(t)) return "Siz də özünüzə yaxşı baxın, sağ olun!";
  return null;
}

function localRU(t){
  t=t.toLowerCase().trim();
  var _b=new Date(1986,9,22),_n=new Date(),_a=Math.floor((_n-_b)/31557600000),_e=_n.getFullYear()-2012;
  if(/\u043F\u0440\u0438\u0432\u0435\u0442|\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432|\u0434\u043E\u0431\u0440/.test(t)) return "\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u041C\u0430\u0445\u0438\u0440 \u0412\u0435\u043B\u0438\u0437\u0430\u0434\u0435 \u2014 UI/UX \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0438\u0437 \u0411\u0430\u043A\u0443.";
  if(/\u0437\u043E\u0432\u0443\u0442|\u0438\u043C\u044F|\u043A\u0442\u043E \u0442\u044B|\u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432/i.test(t)) return "\u042F \u041C\u0430\u0445\u0438\u0440 \u0412\u0435\u043B\u0438\u0437\u0430\u0434\u0435 \u2014 UI/UX \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0438 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0438\u0437 \u0411\u0430\u043A\u0443, \u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043D.";
  if(/\u0441\u043A\u043E\u043B\u044C?\u043A(\u043E|\u0430) (\u0442\u0435\u0431(\u0435|\u044F)|\u0432\u0430\u043C)( \u043B\u0435\u0442)?|\u0432\u043E\u0437\u0440\u0430\u0441\u0442|\u0433\u043E\u0434 \u0440\u043E\u0436\u0434/i.test(t)) return "\u041C\u043D\u0435 "+_a+" \u0433\u043E\u0434. \u0420\u043E\u0434\u0438\u043B\u0441\u044F 22 \u043E\u043A\u0442\u044F\u0431\u0440\u044F 1986 \u0433\u043E\u0434\u0430.";
  if(/\u0441\u043A\u043E\u043B\u044C?\u043A(\u043E|\u0430) \u043B\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C|\u043E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B|\u0441\u043A\u043E\u043B\u044C?\u043A(\u043E|\u0430) \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C/i.test(t)) return "\u042F \u0432 \u0434\u0438\u0437\u0430\u0439\u043D\u0435 \u0443\u0436\u0435 "+_e+" \u043B\u0435\u0442, \u043D\u0430\u0447\u0438\u043D\u0430\u044F \u0441 2012 \u0433\u043E\u0434\u0430.";
  if(/\u043E\u0442\u043A\u0443\u0434\u0430|\u0433\u0434\u0435 \u0442\u044B|\u0433\u043E\u0440\u043E\u0434|\u0441\u0442\u0440\u0430\u043D\u0430|\u0431\u0430\u043A\u0443|\u0430\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043D/i.test(t)) return "\u042F \u0438\u0437 \u0411\u0430\u043A\u0443, \u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043D.";
  if(/\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0448\u044C|\u0447\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430|\u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044F|\u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C|\u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C/i.test(t)) return "\u042F UI/UX \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0438 \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A.";
  if(/\u0433\u0434\u0435 \u0440\u0430\u0431\u043E\u0442\u0430|\u0442\u0435\u043A\u0443\u0449\u0430\u044F|\u043C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B|\u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438/i.test(t)) return "\u0421\u0435\u0439\u0447\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u0410\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0435 \u0418\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u0439 \u0438 \u0426\u0438\u0444\u0440\u043E\u0432\u043E\u0433\u043E \u0420\u0430\u0437\u0432\u0438\u0442\u0438\u044F \u0432 \u0411\u0430\u043A\u0443.";
  if(/\u0441\u043F\u0430\u0441\u0438\u0431\u043E|\u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440/i.test(t)) return "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430. \u0415\u0449\u0451 \u0432\u043E\u043F\u0440\u043E\u0441\u044B?";
  if(/\u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E|\u043F\u0440\u043E\u0435\u043A\u0442|\u0440\u0430\u0431\u043E\u0442/i.test(t)) return "\u0412 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E 5 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432.";
  return null;
}

const SVG_STAR='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="22" height="22"><path d="M79.438 55.37c-25.987 4.274-30.607 9.703-34.072 41.35-.116 1.04-1.618 1.04-1.733 0-3.465-31.647-8.085-36.96-34.073-41.35-1.04-.115-1.04-1.616 0-1.732 25.988-4.273 30.608-9.586 34.073-41.234.115-1.04 1.617-1.04 1.733 0C48.83 44.052 53.45 49.25 79.438 53.638c.924.116.924 1.502 0 1.733zM90.527 18.872C82.44 20.49 80.13 23.146 78.745 32.617c-.115 1.04-1.617 1.04-1.732 0-1.386-9.471-3.696-12.128-11.781-13.86a.888.888 0 0 1 0-1.733c7.97-1.617 10.395-4.273 11.78-13.744.116-1.04 1.618-1.04 1.733 0 1.386 9.47 3.696 12.127 11.782 13.86.924.23.924 1.617 0 1.732z" fill="#38FB16"/></svg>';
const SVG_MIC='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16"><path d="M30.3 143c16.7 0 30.3 13.6 30.3 30.3v164.4c0 16.7-13.6 30.3-30.3 30.3C13.6 368 0 354.4 0 337.7V173.3C0 156.6 13.6 143 30.3 143zM143.1 43c16.7 0 30.3 13.6 30.3 30.3v364.5c0 16.7-13.6 30.3-30.3 30.3-16.7 0-30.3-13.6-30.3-30.3V73.3c.1-16.7 13.6-30.3 30.3-30.3zM256 143.5c16.7 0 30.3 13.6 30.3 30.3v164.4c0 16.7-13.6 30.3-30.3 30.3-16.7 0-30.3-13.6-30.3-30.3V173.8c0-16.7 13.6-30.3 30.3-30.3zM368.9 44c16.7 0 30.3 13.6 30.3 30.3v364.5c0 16.7-13.6 30.3-30.3 30.3-16.7 0-30.3-13.6-30.3-30.3V74.2c0-16.7 13.5-30.2 30.3-30.2zM481.7 144c16.7 0 30.3 13.6 30.3 30.3v164.4c0 16.7-13.6 30.3-30.3 30.3-16.7 0-30.3-13.6-30.3-30.3V174.3c0-16.7 13.6-30.3 30.3-30.3z" fill="#38FB16"/></svg>';
const SVG_LISTEN='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14" height="14"><path fill="#39FF14" d="M14 19a5.006 5.006 0 0 1-5-5V7a5 5 0 0 1 10 0v7a5.006 5.006 0 0 1-5 5zm9-5a1 1 0 0 0-2 0 7 7 0 0 1-14 0 1 1 0 0 0-2 0 9 9 0 0 0 18 0zm-8 11v-3a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0z"/></svg>';

function openChat(){
  isOpen=true;
  bubble.classList.add('open');
  fab.innerHTML=SVG_STAR;
  stopListen();
  destroyRecog();
  setTimeout(function(){
    input.focus();
    if(window.visualViewport) input.scrollIntoView({block:'center',behavior:'smooth'});
  },100);
}
function closeChat(){
  isOpen=false; isBusy=false;
  lock(false);
  bubble.classList.remove('open');
  fab.innerHTML=SVG_STAR;
  destroyRecog();
  micBtn.classList.remove('on');
  lbl.classList.remove('on');
  synth && synth.cancel();
  stopJaw();
}

listenToggle.addEventListener('click',toggleAlwaysListen);
micBtn.addEventListener('click',function(){
  if(listening||micBtn.classList.contains('on')){ stopListen(); }
  else { startListen(); }
});
fab.addEventListener('click',function(){ isOpen?closeChat():openChat(); });
closeB.addEventListener('click',closeChat);
sendBtn.addEventListener('click',function(){ send(); });
input.addEventListener('keydown',function(e){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } });

window._mahirGreet=function(){};
listenToggle.classList.toggle('on',alwaysListen);
listenToggle.innerHTML=SVG_LISTEN;
input.placeholder=PLACEHOLDERS[_lastLang]||PLACEHOLDERS.en;
fab.innerHTML=SVG_STAR;
micBtn.innerHTML=SVG_MIC;
})();

/* ─── WEATHER ─── */
async function loadWeather() {
  try {
    const locRes = await fetch("https://ipinfo.io/json?token=074a3ff56f0e8b");
    const locData = await locRes.json();
    const [lat, lon] = locData.loc.split(",");
    const city = locData.city;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await weatherRes.json();
    const temp = data.current_weather.temperature;
    document.getElementById("weather-fixed").innerHTML =
      `${city} <span class="temp">+${Math.round(temp)}°</span> 🌤️`;
  } catch(e){}
}
loadWeather();

/* ─── YOUTUBE PLAYER + EQUALIZER ─── */
let player, isPlaying = false, timeInterval;
let _ytLoading = false;

function onYouTubeIframeAPIReady(){
  try {
    player = new YT.Player('player', {
      height:'1', width:'1',
      playerVars:{
        autoplay:0, controls:0,
        enablejsapi:1,
        playsinline:1,
        listType:'playlist',
        list:'RDBPTR5-FHn9w'
      },
      events:{
        onReady:onPlayerReady,
        onStateChange:onPlayerStateChange
      }
    })
  } catch(e){ console.warn('YT init:', e) }
}

function loadYTAPI(){
  if(window.YT || _ytLoading) return;
  _ytLoading = true;
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(tag, first);
}

function onPlayerReady(){
  try {
    player.setVolume(100);
    player.unMute();
    updateTitle();
    document.getElementById('play-pause').onclick = togglePlay;
    document.getElementById('next').onclick = () => { try{ player.nextVideo() }catch(e){} updateTitle() };
    document.getElementById('prev').onclick = () => { try{ player.previousVideo() }catch(e){} updateTitle() };
  } catch(e){ console.warn('YT ready:', e) }
}

var eqCanvas = document.getElementById('eq-canvas'), eqCtx = eqCanvas ? eqCanvas.getContext('2d') : null;
var NUM_BARS = 120, barHeights = new Array(NUM_BARS).fill(5), barTargets = new Array(NUM_BARS).fill(5);
var eqAnimId = null;

function resizeEqCanvas(){
  if(!eqCanvas) return;
  eqCanvas.width = 2000;
  eqCanvas.height = 2000;
}

function drawEq(){
  if(!eqCtx) return;
  var w = eqCanvas.width, h = eqCanvas.height;
  eqCtx.clearRect(0,0,w,h);
  var cx = w/2, cy = h/2;
  var baseR = Math.min(w,h) * 0.05;
  var maxL = Math.min(w,h) * 0.50;
  for(var i=0;i<NUM_BARS;i++){
    if(Math.random()>0.88){
      var zone = Math.floor(i / (NUM_BARS/6));
      if(zone%2===0) barTargets[i] = Math.random()*maxL*0.6+15;
      else barTargets[i] = Math.random()*maxL+25;
    }
    barHeights[i] += (barTargets[i]-barHeights[i])*0.25;
    barTargets[i] *= 0.85;
  }
  for(var i=0;i<NUM_BARS;i++){
    var ang = (i*2*Math.PI)/NUM_BARS - Math.PI/2;
    var hh = Math.max(4, barHeights[i]);
    var x1 = cx + Math.cos(ang)*baseR;
    var y1 = cy + Math.sin(ang)*baseR;
    var x2 = cx + Math.cos(ang)*(baseR+hh);
    var y2 = cy + Math.sin(ang)*(baseR+hh);
    eqCtx.save();
    var grad = eqCtx.createLinearGradient(x1,y1,x2,y2);
    grad.addColorStop(0, '#b6ffab');
    grad.addColorStop(0.3, '#39ff14');
    grad.addColorStop(1, '#199905');
    eqCtx.shadowColor = '#39ff14';
    eqCtx.shadowBlur = hh>40 ? 20 : 6;
    eqCtx.strokeStyle = grad;
    eqCtx.lineWidth = Math.max(2, baseR*0.06);
    eqCtx.lineCap = 'round';
    eqCtx.beginPath();
    eqCtx.moveTo(x1,y1);
    eqCtx.lineTo(x2,y2);
    eqCtx.stroke();
    eqCtx.restore();
  }
    if(getComputedStyle(eqCanvas).display==='none'){ eqAnimId=null; return; }
    eqAnimId = requestAnimationFrame(drawEq);
}

function eq(playing){
  if(!eqCanvas) return;
  eqCanvas.classList.toggle('playing', playing);
  if(playing){
    resizeEqCanvas();
    if(eqAnimId) cancelAnimationFrame(eqAnimId);
    drawEq();
  } else {
    if(eqAnimId){ cancelAnimationFrame(eqAnimId); eqAnimId=null }
    eqCtx.clearRect(0,0,eqCanvas.width,eqCanvas.height);
  }
}

window.addEventListener('resize', function(){ if(eqCanvas && eqCanvas.classList.contains('playing')) resizeEqCanvas(); });

function onPlayerStateChange(e){
  if(e.data === YT.PlayerState.PLAYING){
    isPlaying = true;
    document.getElementById('play-pause').textContent = '⏸\uFE0E';
    clearInterval(timeInterval);
    timeInterval = setInterval(updateTime, 500);
    eq(true);
    try{ player.unMute(); player.setVolume(100); }catch(e){}
  } else if(e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED){
    isPlaying = false;
    document.getElementById('play-pause').textContent = '▶\uFE0E';
    clearInterval(timeInterval);
    eq(false);
  }
  if(e.data === YT.PlayerState.CUED || e.data === YT.PlayerState.PLAYING)
    updateTitle();
}

function togglePlay(){
  if(!player) {
    loadYTAPI();
    return;
  }
  if(isPlaying) player.pauseVideo();
  else {
    try{ player.mute(); player.playVideo(); setTimeout(function(){ try{ player.unMute(); player.setVolume(100) }catch(e){} },300); }catch(e){}
  }
}

function updateTitle(){
  try {
    const data = player.getVideoData();
    if(data && data.title) document.getElementById('music-title').textContent = data.title;
  } catch(e){}
}

function fmt(t){
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function updateTime(){
  try {
    const cur = player.getCurrentTime();
    const dur = player.getDuration();
    document.getElementById('music-time').textContent = fmt(cur) + ' / ' + fmt(dur);
  } catch(e){}
}
