/* =========================================
   BEHIND THE SOUND — PRACTICE
   Target matching with real Web Audio processing
   Target samples: user-provided MP3 files
   Source audio: assets/filter-demo.wav
========================================= */

import { app, auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// -----------------------------------------
// 1. FIREBASE
// -----------------------------------------
let currentUser = null;

// -----------------------------------------
// 2. CONFIGURATION
// -----------------------------------------
const SOURCE_URL = "assets/practice-source.wav";
const SAMPLE_OPTIONS = {
  "assets/crape-6-foley-1-trash-koh.mp3": { name: "Trash / Foley 01" },
  "assets/crape-2-foley-6-table-toob.mp3": { name: "Table / Foley 02" }
};
const PROCESSORS = {
  filter: { title: "Filter", subtitle: "Shape the frequency range" },
  eq: { title: "EQ", subtitle: "Boost or reduce frequency bands" },
  compressor: { title: "Compressor", subtitle: "Control dynamic range" },
  "gain-stage": { title: "Gain Stage", subtitle: "Adjust the signal level" },
  reverb: { title: "Reverb", subtitle: "Add room ambience" },
  delay: { title: "Delay", subtitle: "Create repeating echoes" },
  "pitch-shifter": { title: "Pitch Shifter", subtitle: "Change the pitch" }
};
const selectedProcessors = [];
const processorValues = {
  filter: { enabled: true, type: "lowpass", cutoff: 5000, slope: 24 },
  eq: { enabled: true, lowFreq: 180, lowGain: 0, midFreq: 1000, midGain: 0, highFreq: 6000, highGain: 0, q: 1 },
  compressor: { enabled: true, threshold: -24, ratio: 4, attack: 10, release: 150 },
  "gain-stage": { enabled: true, gain: 0 },
  reverb: { enabled: true, decay: 1.8, wet: 20 },
  delay: { enabled: true, time: 280, feedback: 20, mix: 15 },
  "pitch-shifter": { enabled: true, semitones: 0 }
};

// -----------------------------------------
// 3. ELEMENTS
// -----------------------------------------
const $ = (id) => document.getElementById(id);
const sampleSelect = $("sampleSelect");
const processorPicker = $("processorPicker");
const addProcessorButton = $("addProcessorButton");
const processorList = $("processorList");
const emptyProcessors = $("emptyProcessors");
const targetAudio = $("targetAudio");
const processedAudio = $("processedAudio");
const saveStatus = $("saveStatus");
const submitButton = $("submitButton");
const resultOverlay = $("resultOverlay");
let audioContext = null;
let processedMediaSource = null;
let processingNodes = [];
let isSubmitting = false;
let lastEvaluation = null;

// -----------------------------------------
// 4. AUDIO CONTEXT + LIVE PROCESSING CHAIN
// -----------------------------------------
async function ensureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) throw new Error("This browser does not support Web Audio API.");
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") await audioContext.resume();
  if (!processedMediaSource) processedMediaSource = audioContext.createMediaElementSource(processedAudio);
}

function makeImpulse(context, seconds) {
  const rate = context.sampleRate;
  const length = Math.max(1, Math.floor(rate * seconds));
  const impulse = context.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const envelope = Math.pow(1 - i / length, 2.4);
      const noise = Math.sin((i + 1) * 12.9898 + channel * 78.233) * 43758.5453;
      data[i] = ((noise - Math.floor(noise)) * 2 - 1) * envelope;
    }
  }
  return impulse;
}

function disconnectLiveNodes() {
  processingNodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
  processingNodes = [];
}

function addTracked(node) { processingNodes.push(node); return node; }

async function buildLiveChain() {
  await ensureAudioContext();
  // Remove the previous route first so the dry source never bypasses the effects.
  try { processedMediaSource.disconnect(); } catch (_) {}
  disconnectLiveNodes();
  processedAudio.playbackRate = 1;
  let current = processedMediaSource;

  selectedProcessors.forEach(key => {
    const value = processorValues[key];
    if (!value.enabled) return;

    if (key === "filter") {
      const stages = Math.max(1, Math.min(4, Math.round(value.slope / 12)));
      for (let i = 0; i < stages; i++) {
        const node = addTracked(audioContext.createBiquadFilter());
        node.type = value.type;
        node.frequency.value = value.cutoff;
        node.Q.value = 0.707;
        current.connect(node); current = node;
      }
    }
    if (key === "eq") {
      [
        { type: "lowshelf", frequency: value.lowFreq, gain: value.lowGain },
        { type: "peaking", frequency: value.midFreq, gain: value.midGain, Q: value.q },
        { type: "highshelf", frequency: value.highFreq, gain: value.highGain }
      ].forEach(config => {
        const node = addTracked(audioContext.createBiquadFilter());
        node.type = config.type; node.frequency.value = config.frequency; node.gain.value = config.gain;
        if (config.Q) node.Q.value = config.Q;
        current.connect(node); current = node;
      });
    }
    if (key === "compressor") {
      const node = addTracked(audioContext.createDynamicsCompressor());
      node.threshold.value = value.threshold; node.ratio.value = value.ratio;
      node.attack.value = value.attack / 1000; node.release.value = value.release / 1000;
      current.connect(node); current = node;
    }
    if (key === "gain-stage") {
      const node = addTracked(audioContext.createGain());
      node.gain.value = Math.pow(10, value.gain / 20);
      current.connect(node); current = node;
    }
    if (key === "reverb") {
      const dry = addTracked(audioContext.createGain());
      const wet = addTracked(audioContext.createGain());
      const convolver = addTracked(audioContext.createConvolver());
      const output = addTracked(audioContext.createGain());
      convolver.buffer = makeImpulse(audioContext, value.decay);
      const wetAmount = value.wet / 100;
      dry.gain.value = 1 - wetAmount; wet.gain.value = wetAmount;
      current.connect(dry); current.connect(convolver); convolver.connect(wet);
      dry.connect(output); wet.connect(output); current = output;
    }
    if (key === "delay") {
      const delay = addTracked(audioContext.createDelay(2));
      const feedback = addTracked(audioContext.createGain());
      const dry = addTracked(audioContext.createGain());
      const wet = addTracked(audioContext.createGain());
      const output = addTracked(audioContext.createGain());
      delay.delayTime.value = value.time / 1000;
      feedback.gain.value = Math.min(.85, value.feedback / 100);
      const mix = value.mix / 100;
      dry.gain.value = 1 - mix; wet.gain.value = mix;
      current.connect(dry); current.connect(delay); delay.connect(wet); delay.connect(feedback); feedback.connect(delay);
      dry.connect(output); wet.connect(output); current = output;
    }
    if (key === "pitch-shifter") {
      // Playback-rate pitch shifting is intentionally simple and audible; it also changes duration.
      processedAudio.playbackRate = Math.pow(2, value.semitones / 12);
    }
  });
  current.connect(audioContext.destination);
}

// -----------------------------------------
// 5. RENDER PROCESSOR CONTROLS
// -----------------------------------------
function controlRange(key, label, property, min, max, step, unit, help = "") {
  const value = processorValues[key][property];
  const id = `${key}-${property}`;
  return `<div class="processor-control"><label for="${id}"><span>${label}</span><output id="${id}-value">${formatValue(value, unit)}</output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-key="${key}" data-property="${property}" data-unit="${unit}"><small class="control-help">${help}</small></div>`;
}
function controlSelect(key, label, property, options) {
  const value = processorValues[key][property];
  return `<div class="processor-control"><label>${label}</label><select data-key="${key}" data-property="${property}">${options.map(o => `<option value="${o.value}" ${o.value === value ? "selected" : ""}>${o.label}</option>`).join("")}</select></div>`;
}
function formatValue(value, unit) {
  if (unit === "dB") return `${Number(value) > 0 ? "+" : ""}${Number(value).toFixed(1)} dB`;
  if (unit === "Hz") return Number(value) >= 1000 ? `${(Number(value)/1000).toFixed(Number(value)%1000 ? 1 : 0)} kHz` : `${value} Hz`;
  if (unit === "ms") return `${value} ms`;
  if (unit === "%") return `${value}%`;
  if (unit === ":1") return `${value}:1`;
  if (unit === "st") return `${Number(value) > 0 ? "+" : ""}${value} semitones`;
  if (unit === "s") return `${Number(value).toFixed(1)} s`;
  if (unit === "dB/oct") return `${value} dB/oct`;
  return String(value);
}
function controlsFor(key) {
  if (key === "filter") return controlSelect(key,"Filter Type","type",[
    {value:"lowpass",label:"Low-Pass Filter (LPF)"},{value:"highpass",label:"High-Pass Filter (HPF)"},{value:"bandpass",label:"Band-Pass Filter (BPF)"}
  ]) + controlRange(key,"Cutoff Frequency","cutoff",80,16000,10,"Hz") + controlRange(key,"Slope","slope",12,48,12,"dB/oct");
  if (key === "eq") return controlRange(key,"Low Frequency","lowFreq",40,500,5,"Hz") + controlRange(key,"Low Gain","lowGain",-18,18,.5,"dB") + controlRange(key,"Mid Frequency","midFreq",250,5000,10,"Hz") + controlRange(key,"Mid Gain","midGain",-18,18,.5,"dB") + controlRange(key,"High Frequency","highFreq",2000,16000,50,"Hz") + controlRange(key,"High Gain","highGain",-18,18,.5,"dB") + controlRange(key,"Q","q",.1,8,.1,"", "กำหนดความกว้างของย่าน EQ");
  if (key === "compressor") return controlRange(key,"Threshold","threshold",-60,0,1,"dB") + controlRange(key,"Ratio","ratio",1,20,.5,":1") + controlRange(key,"Attack","attack",1,200,1,"ms") + controlRange(key,"Release","release",10,1000,5,"ms");
  if (key === "gain-stage") return controlRange(key,"Gain","gain",-24,24,.5,"dB","ปรับระดับความดังของสัญญาณ");
  if (key === "reverb") return controlRange(key,"Decay","decay",.2,5,.1,"s") + controlRange(key,"Wet Level","wet",0,100,1,"%");
  if (key === "delay") return controlRange(key,"Delay Time","time",50,900,5,"ms") + controlRange(key,"Feedback","feedback",0,80,1,"%") + controlRange(key,"Mix","mix",0,100,1,"%");
  if (key === "pitch-shifter") return controlRange(key,"Semitone","semitones",-12,12,1,"st","ค่าบวกทำให้เสียงสูงขึ้น ค่าลบทำให้เสียงต่ำลง");
  return "";
}
function renderProcessors() {
  emptyProcessors.hidden = selectedProcessors.length > 0;
  processorList.innerHTML = selectedProcessors.map((key,index) => {
    const info = PROCESSORS[key]; const value = processorValues[key];
    return `<article class="processor-card ${value.enabled ? "" : "disabled"}" data-card="${key}">
      <div class="processor-card-head"><div class="processor-title-wrap"><span class="processor-number">${String(index+1).padStart(2,"0")}</span><div><div class="processor-title">${info.title}</div><div class="processor-subtitle">${info.subtitle}</div></div></div>
      <label class="processor-toggle"><input type="checkbox" data-toggle="${key}" ${value.enabled ? "checked" : ""}><span>Enable</span></label></div>
      <div class="processor-controls">${controlsFor(key)}</div></article>`;
  }).join("");
  processorList.querySelectorAll("input[type=range], select[data-key]").forEach(input => {
    input.addEventListener(input.tagName === "SELECT" ? "change" : "input", () => {
      const {key,property,unit} = input.dataset;
      processorValues[key][property] = Number(input.value) || (input.value === "0" ? 0 : input.value);
      const output = document.getElementById(`${key}-${property}-value`);
      if (output) output.textContent = formatValue(input.value, unit || "");
      refreshProcessing();
    });
  });
  processorList.querySelectorAll("input[data-toggle]").forEach(input => input.addEventListener("change", () => {
    processorValues[input.dataset.toggle].enabled = input.checked;
    renderProcessors(); refreshProcessing();
  }));
}

async function refreshProcessing() {
  try { await buildLiveChain(); }
  catch (error) { console.error(error); saveStatus.textContent = "Audio processing could not start. Please use a modern browser."; }
}

// -----------------------------------------
// 6. AUDIO PLAYER BUTTONS
// -----------------------------------------
function setPlayButton(button, playing, label) {
  button.classList.toggle("playing", playing);
  button.innerHTML = `<span>${playing ? "Ⅱ" : "▶"}</span> ${playing ? "Pause" : label}`;
}
function stopOtherPlayers(except) {
  [targetAudio, processedAudio].forEach(audio => {
    if (audio !== except) { audio.pause(); audio.currentTime = 0; }
  });
  setPlayButton($("targetPlayButton"), false, "Play Target");
  setPlayButton($("processedPlayButton"), false, "Play Processed Sound");
}
function connectPlayerButton(audio, button, label, isProcessed=false) {
  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        stopOtherPlayers(audio);
        if (isProcessed) await refreshProcessing();
        await audio.play();
        setPlayButton(button, true, label);
        $("audioNote").textContent = isProcessed
          ? "กำลังเล่นเสียงที่ผ่าน Processor ปัจจุบัน"
          : "กำลังเล่นเสียง Target";
      } else {
        audio.pause();
        setPlayButton(button, false, label);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      $("audioNote").textContent = "เล่นเสียงไม่สำเร็จ กรุณาตรวจสอบไฟล์เสียงและลองอีกครั้ง";
    }
  });
  audio.addEventListener("ended", () => setPlayButton(button, false, label));
  audio.addEventListener("pause", () => setPlayButton(button, false, label));
}
connectPlayerButton(targetAudio, $("targetPlayButton"), "Play Target");
connectPlayerButton(processedAudio, $("processedPlayButton"), "Play Processed Sound", true);

sampleSelect.addEventListener("change", () => {
  stopOtherPlayers(null);
  targetAudio.src = sampleSelect.value;
  targetAudio.load();
  $("targetName").textContent = SAMPLE_OPTIONS[sampleSelect.value].name;
  $("audioNote").textContent = `Target changed to ${SAMPLE_OPTIONS[sampleSelect.value].name}. Listen and adjust your processors.`;
  lastEvaluation = null;
});
targetAudio.src = sampleSelect.value;
targetAudio.load();

// -----------------------------------------
// 7. ADD PROCESSORS WITH A REPEATABLE BUTTON
// -----------------------------------------
function renderProcessorPicker() {
  processorPicker.innerHTML = Object.entries(PROCESSORS).map(([key, info]) => {
    const added = selectedProcessors.includes(key);
    return `<button type="button" class="processor-choice" data-add-processor="${key}" ${added ? "disabled" : ""}>${added ? "✓ " : "+ "}${info.title}${added ? " · Added" : ""}</button>`;
  }).join("");
  processorPicker.querySelectorAll("[data-add-processor]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.addProcessor;
      if (selectedProcessors.includes(key)) return;
      selectedProcessors.push(key);
      processorPicker.hidden = true;
      addProcessorButton.textContent = "＋ Add Processor";
      renderProcessors();
      renderProcessorPicker();
      refreshProcessing();
      $("audioNote").textContent = `${PROCESSORS[key].title} added. Play Processed Sound to hear the result.`;
    });
  });
}
addProcessorButton.addEventListener("click", () => {
  renderProcessorPicker();
  processorPicker.hidden = !processorPicker.hidden;
  addProcessorButton.textContent = processorPicker.hidden ? "＋ Add Processor" : "× Close Processor List";
});
$("resetButton").addEventListener("click", () => {
  selectedProcessors.splice(0, selectedProcessors.length);
  Object.values(processorValues).forEach(value => { value.enabled = true; });
  renderProcessors();
  renderProcessorPicker();
  refreshProcessing();
  saveStatus.textContent = "Processor list cleared.";
});

// -----------------------------------------
// 8. FEATURE EXTRACTION FOR MATCH SCORE
// Compares broad tonal balance + loudness, not exact waveform.
// -----------------------------------------
function fft(real, imag) {
  const n = real.length;
  for (let i=1,j=0;i<n;i++) { let bit=n>>1; for(;j&bit;bit>>=1) j^=bit; j^=bit; if(i<j){[real[i],real[j]]=[real[j],real[i]];[imag[i],imag[j]]=[imag[j],imag[i]];} }
  for(let len=2;len<=n;len<<=1){const angle=-2*Math.PI/len;const wr0=Math.cos(angle),wi0=Math.sin(angle);for(let i=0;i<n;i+=len){let wr=1,wi=0;for(let j=0;j<len/2;j++){const uR=real[i+j],uI=imag[i+j],vR=real[i+j+len/2]*wr-imag[i+j+len/2]*wi,vI=real[i+j+len/2]*wi+imag[i+j+len/2]*wr;real[i+j]=uR+vR;imag[i+j]=uI+vI;real[i+j+len/2]=uR-vR;imag[i+j+len/2]=uI-vI;const next=wr*wr0-wi*wi0;wi=wr*wi0+wi*wr0;wr=next;}}}
}
function describeBuffer(buffer) {
  const channelCount = buffer.numberOfChannels;
  const length = buffer.length;
  const sampleRate = buffer.sampleRate;
  const size = 2048;
  const mono = new Float32Array(length);
  for(let c=0;c<channelCount;c++){const data=buffer.getChannelData(c);for(let i=0;i<length;i++)mono[i]+=data[i]/channelCount;}
  const frames = Math.min(12, Math.max(1, Math.floor(length/size)));
  const sums=[0,0,0]; let rmsSum=0, centroidSum=0, used=0;
  for(let f=0;f<frames;f++){
    const start=Math.floor(f*(Math.max(0,length-size))/Math.max(1,frames-1));
    const real=new Float64Array(size),imag=new Float64Array(size);let square=0;
    for(let i=0;i<size;i++){const sample=mono[Math.min(length-1,start+i)]||0;const win=.5-.5*Math.cos(2*Math.PI*i/(size-1));real[i]=sample*win;square+=sample*sample;}
    fft(real,imag);let total=0,weighted=0;const bands=[0,0,0];
    for(let k=1;k<size/2;k++){const hz=k*sampleRate/size;const mag=Math.hypot(real[k],imag[k]);const energy=mag*mag;total+=energy;weighted+=hz*mag;if(hz<250)bands[0]+=energy;else if(hz<4000)bands[1]+=energy;else bands[2]+=energy;}
    if(total>0){for(let b=0;b<3;b++)sums[b]+=bands[b]/total;rmsSum+=Math.sqrt(square/size);centroidSum+=weighted/(Math.sqrt(1)*Math.max(1e-9,Array.from({length:size/2-1},(_,i)=>Math.hypot(real[i+1],imag[i+1])).reduce((a,b)=>a+b,0)));used++;}
  }
  if(!used)return [0,0,0,0,0];
  const bands=sums.map(v=>v/used);
  return [...bands, Math.min(1,centroidSum/used/10000), Math.min(1, rmsSum/used)];
}

// Offline rendering uses the same processor order/settings for a stable score.
async function renderOffline(sourceBuffer, keys) {
  const duration=Math.min(sourceBuffer.duration,8);
  const frames=Math.max(1,Math.floor(duration*sourceBuffer.sampleRate));
  const Offline=window.OfflineAudioContext||window.webkitOfflineAudioContext;
  const ctx=new Offline(sourceBuffer.numberOfChannels,frames,sourceBuffer.sampleRate);
  const source=ctx.createBufferSource(); source.buffer=sourceBuffer;
  let current=source;
  keys.forEach(key=>{
    const v=processorValues[key]; if(!v.enabled)return;
    if(key==="filter"){
      const stages=Math.max(1,Math.min(4,Math.round(v.slope/12)));
      for(let i=0;i<stages;i++){const n=ctx.createBiquadFilter();n.type=v.type;n.frequency.value=v.cutoff;current.connect(n);current=n;}
    }
    if(key==="eq"){
      [{type:"lowshelf",frequency:v.lowFreq,gain:v.lowGain},{type:"peaking",frequency:v.midFreq,gain:v.midGain,Q:v.q},{type:"highshelf",frequency:v.highFreq,gain:v.highGain}].forEach(c=>{const n=ctx.createBiquadFilter();n.type=c.type;n.frequency.value=c.frequency;n.gain.value=c.gain;if(c.Q)n.Q.value=c.Q;current.connect(n);current=n;});
    }
    if(key==="compressor"){const n=ctx.createDynamicsCompressor();n.threshold.value=v.threshold;n.ratio.value=v.ratio;n.attack.value=v.attack/1000;n.release.value=v.release/1000;current.connect(n);current=n;}
    if(key==="gain-stage"){const n=ctx.createGain();n.gain.value=Math.pow(10,v.gain/20);current.connect(n);current=n;}
    if(key==="reverb"){
      const dry=ctx.createGain(),wet=ctx.createGain(),conv=ctx.createConvolver(),out=ctx.createGain();conv.buffer=makeImpulse(ctx,v.decay);dry.gain.value=1-v.wet/100;wet.gain.value=v.wet/100;current.connect(dry);current.connect(conv);conv.connect(wet);dry.connect(out);wet.connect(out);current=out;
    }
    if(key==="delay"){
      const d=ctx.createDelay(2),fb=ctx.createGain(),dry=ctx.createGain(),wet=ctx.createGain(),out=ctx.createGain();d.delayTime.value=v.time/1000;fb.gain.value=Math.min(.85,v.feedback/100);dry.gain.value=1-v.mix/100;wet.gain.value=v.mix/100;current.connect(dry);current.connect(d);d.connect(wet);d.connect(fb);fb.connect(d);dry.connect(out);wet.connect(out);current=out;
    }
    if(key==="pitch-shifter") source.playbackRate.value=Math.pow(2,v.semitones/12);
  });
  current.connect(ctx.destination); source.start(0);
  return await ctx.startRendering();
}

async function decodeFile(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Cannot load audio: ${url} (${response.status})`);
  const data = await response.arrayBuffer();
  await ensureAudioContext();
  return await audioContext.decodeAudioData(data.slice(0));
}
function calculateSimilarity(target, processed) {
  const a=describeBuffer(target),b=describeBuffer(processed);
  const weights=[1.25,1.5,1.25,1.1,.8];
  let error=0,total=0;
  for(let i=0;i<a.length;i++){const diff=Math.abs(a[i]-b[i]);error+=Math.min(1,diff)*weights[i];total+=weights[i];}
  return {score:Math.max(0,Math.min(100,Math.round((1-error/total)*100))),targetFeatures:a,processedFeatures:b};
}
function makeSuggestions(targetFeatures, processedFeatures) {
  const labels=["Low frequencies","Mid frequencies","High frequencies","Overall tone","Loudness"];
  const diffs=targetFeatures.map((v,i)=>({i,d:processedFeatures[i]-v,abs:Math.abs(processedFeatures[i]-v)})).sort((a,b)=>b.abs-a.abs);
  const tips=[];
  diffs.slice(0,3).forEach(item=>{
    if(item.i===0)tips.push(item.d<0?"เพิ่มย่านเสียงต่ำด้วย EQ Low Gain หรือปรับ Filter ให้เปิดย่านต่ำมากขึ้น":"ลดเสียงทุ้มด้วย EQ Low Gain หรือทดลองใช้ High-Pass Filter");
    if(item.i===1)tips.push(item.d<0?"เพิ่มความชัดของย่านกลางด้วย EQ Mid Gain":"ลดความเด่นของย่านกลางด้วย EQ Mid Gain");
    if(item.i===2)tips.push(item.d<0?"เพิ่มรายละเอียดเสียงแหลมด้วย EQ High Gain หรือปรับ Cutoff ให้สูงขึ้น":"ลดความแหลมด้วย EQ High Gain หรือ Low-Pass Filter");
    if(item.i===3)tips.push("ลองปรับสมดุลย่านความถี่ทีละส่วน แล้วฟังเทียบกับ Target อีกครั้ง");
    if(item.i===4)tips.push(item.d<0?"เพิ่มระดับเสียงด้วย Gain Stage เล็กน้อย":"ลด Gain Stage เพื่อให้ระดับความดังใกล้เคียง Target");
  });
  return [...new Set(tips)].slice(0,3);
}

// -----------------------------------------
// 9. SUBMIT + FIRESTORE RESULT
// -----------------------------------------
async function submitPractice() {
  if(isSubmitting)return;
  if(!currentUser){saveStatus.textContent="Please sign in before submitting your practice.";return;}
  isSubmitting=true;submitButton.disabled=true;saveStatus.textContent="Analyzing your sound...";
  try{
    const [targetBuffer,sourceBuffer]=await Promise.all([decodeFile(sampleSelect.value),decodeFile(SOURCE_URL)]);
    const processedBuffer=await renderOffline(sourceBuffer,selectedProcessors);
    const evaluation=calculateSimilarity(targetBuffer,processedBuffer);
    const suggestions=makeSuggestions(evaluation.targetFeatures,evaluation.processedFeatures);
    const active=selectedProcessors.filter(key=>processorValues[key].enabled);
    const score=evaluation.score;
    const feedback=active.length?`Processors used: ${active.map(key=>PROCESSORS[key].title).join(", ")}. The score compares frequency balance, overall tone and loudness between the target and your processed sound.`:"No processor is active. Add and enable processors, then listen to the processed sound before submitting.";
    const record={type:"practice",sampleName:SAMPLE_OPTIONS[sampleSelect.value].name,sampleUrl:sampleSelect.value,score,maxScore:100,processors:active,processorSettings:Object.fromEntries(active.map(key=>[key,{...processorValues[key]}])),suggestions,completed:true,createdAt:serverTimestamp()};
    await addDoc(collection(db,"users",currentUser.uid,"learningResults"),record);
    lastEvaluation={score,suggestions,feedback};
    showResult(lastEvaluation);
    saveStatus.textContent="Your practice result has been saved.";
  }catch(error){console.error("Practice evaluation error:",error);saveStatus.textContent="Unable to evaluate or save your result. Please check your connection and try again.";}
  finally{isSubmitting=false;submitButton.disabled=false;}
}
function showResult(result){
  $("finalScore").textContent=result.score;
  $("resultMessage").textContent=result.score>=85?"Excellent match! Your processed sound is very close to the target.":result.score>=65?"Good work! Your sound is getting closer to the target.":"Keep experimenting. Try adjusting the processor settings and compare again.";
  $("processorFeedback").textContent=result.feedback;
  $("suggestionList").innerHTML=result.suggestions.map(t=>`<li>${t}</li>`).join("")||"<li>Try a different processor combination and listen again.</li>";
  resultOverlay.classList.add("active");resultOverlay.setAttribute("aria-hidden","false");
}
submitButton.addEventListener("click",submitPractice);
function closeResult(){resultOverlay.classList.remove("active");resultOverlay.setAttribute("aria-hidden","true");}
$("resultClose").addEventListener("click",closeResult);
$("tryAgainButton").addEventListener("click",()=>{closeResult();saveStatus.textContent="Adjust your processors and submit again when ready.";});
$("resultHomeButton").addEventListener("click",()=>window.location.href="home.html");
$("backButton").addEventListener("click",()=>window.location.href="home.html");

// -----------------------------------------
// 10. AUTHENTICATION
// -----------------------------------------
onAuthStateChanged(auth,user=>{
  currentUser=user;
  if(!user)window.location.href="login.html";
  else console.log("Practice user authenticated:",user.uid);
});

// Initial UI. Audio graph is created only after a user presses Play or adds a processor.
renderProcessors();
renderProcessorPicker();
