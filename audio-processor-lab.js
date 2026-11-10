/* =========================================
   BEHIND THE SOUND — AUDIO PROCESSOR LAB
   FILTER LESSON + INTERACTIVE WEB AUDIO FILTER LAB
========================================= */

const topicPage = document.getElementById("topicPage");
const lessonPage = document.getElementById("lessonPage");
const lessonContent = document.getElementById("lessonContent");
const backButton = document.getElementById("backButton");
const params = new URLSearchParams(window.location.search);
const selectedTopic = params.get("topic");

const topics = {
  "filter": "Filter",
  "eq": "EQ",
  "compressor": "Compressor",
  "gain-stage": "Gain Stage",
  "reverb": "Reverb",
  "delay": "Delay",
  "pitch-shifter": "Pitch Shifter"
};

backButton.addEventListener("click", () => {
  window.location.href = selectedTopic ? "audio-processor-lab.html" : "learning.html";
});

function showLesson(topicKey) {
  const title = topics[topicKey];
  if (!title) return;

  topicPage.hidden = true;
  lessonPage.hidden = false;

  if (topicKey === "filter") {
    renderFilterLesson();
    return;
  }
  if (topicKey === "eq") {
    renderEQLesson();
    return;
  }
  if (topicKey === "compressor") {
    renderCompressorLesson();
    return;
  }
  if (topicKey === "gain-stage") {
    renderGainStageLesson();
    return;
  }

  lessonContent.innerHTML = `
    <div class="lesson-page-heading"><h1>${title}</h1></div>
    <article class="content-card"><h3>${title}</h3><p>เนื้อหาของหัวข้อนี้จะเพิ่มในส่วนนี้</p></article>
  `;
}

function renderFilterLesson() {
  lessonContent.innerHTML = `
    <div class="lesson-page-heading"><h1>Filter</h1></div>

    <article class="content-card">
      <h3>Filter คืออะไร?</h3>
      <p>Filter ทำหน้าที่คัดเลือก ปรับลด หรือเพิ่มระดับความถี่บางช่วงของสัญญาณเสียง เพื่อให้ได้ลักษณะเสียงตามความต้องการ การใช้ Filter ช่วยให้ผู้ปฏิบัติงานสามารถจัดการองค์ประกอบด้านความถี่ของเสียงได้อย่างเหมาะสม เช่น การลดเสียงรบกวน การตัดเสียงย่านต่ำที่ไม่ต้องการ การเพิ่มความชัดเจนของเสียงพูด และการปรับโทนเสียงของเครื่องดนตรี</p>
      <p>ประเภทของ Filter ที่ใช้ในงานด้านเสียงสามารถแบ่งออกเป็นประเภทต่าง ๆ ตามลักษณะการตอบสนองต่อความถี่ โดยแต่ละประเภทมีหน้าที่และวัตถุประสงค์ในการใช้งานแตกต่างกัน</p>
    </article>

    <article class="content-card">
      <h3>Low-Pass Filter (LPF)</h3>
      <p>เป็น Filter ที่ยอมให้ความถี่ต่ำกว่าจุดที่กำหนดผ่านไปได้ และลดระดับความถี่ที่สูงกว่าจุดดังกล่าวลง</p>
      <h4>หลักการทำงาน</h4>
      <p>กำหนดจุดความถี่ที่เรียกว่า Cutoff Frequency เพื่อใช้เป็นจุดเริ่มต้นในการลดระดับความถี่สูง โดยความถี่ต่ำจะยังคงผ่านได้ ส่วนความถี่สูงจะค่อย ๆ ถูกลดระดับลงตามความชันของ Filter</p>
      <h4>วัตถุประสงค์ในการใช้งาน</h4>
      <ul class="filter-bullet-list">
        <li>ลดเสียงแหลมที่มากเกินไป</li>
        <li>ลดเสียงรบกวนความถี่สูง เช่น เสียงซ่า</li>
        <li>ทำให้เสียงมีความนุ่มนวลหรือทึบลง</li>
        <li>ปรับแต่งเสียงเครื่องดนตรี เช่น Synthesizer ให้มีโทนเสียงนุ่มหรือมืดลง</li>
      </ul>
      <h4>ตัวอย่างการใช้งาน</h4>
      <p>เมื่อเสียงมีความถี่สูงที่ทำให้รู้สึกแหลมหรือบาดหูมากเกินไป สามารถใช้ LPF ลดระดับความถี่สูงที่ไม่จำเป็น เพื่อให้เสียงนุ่มนวลขึ้น แต่ควรระวังไม่ลดความถี่มากเกินไปจนเสียงร้องสูญเสียรายละเอียด</p>
    </article>

    <article class="content-card">
      <h3>High-Pass Filter (HPF)</h3>
      <p>เป็น Filter ที่ยอมให้ความถี่สูงกว่าจุดที่กำหนดผ่านไปได้ และลดระดับความถี่ต่ำกว่าจุดดังกล่าวลง</p>
      <h4>หลักการทำงาน</h4>
      <p>กำหนด Cutoff Frequency เพื่อเริ่มลดระดับความถี่ต่ำ โดยความถี่ที่สูงกว่าจุดดังกล่าวจะผ่านไปได้ ส่วนความถี่ต่ำจะถูกลดระดับลงตามความชันของ Filter</p>
      <h4>วัตถุประสงค์ในการใช้งาน</h4>
      <ul class="filter-bullet-list">
        <li>ลดเสียงลมที่กระทบไมโครโฟน</li>
        <li>ลดเสียงสั่นสะเทือนจากพื้นหรือขาตั้งไมโครโฟน</li>
        <li>ลดเสียงทุ้มที่ไม่จำเป็นในเสียงพูด</li>
        <li>จัดการความถี่ต่ำของเครื่องดนตรีที่ไม่ต้องการให้รบกวนกัน</li>
      </ul>
      <h4>ตัวอย่างการใช้งาน</h4>
      <p>ในการบันทึกเสียงบรรยาย อาจมีเสียงลมหายใจ เสียงลมกระทบไมโครโฟน หรือเสียงสั่นสะเทือนจากสภาพแวดล้อม ซึ่งทำให้เกิดเสียงความถี่ต่ำที่ไม่ต้องการ สามารถใช้ HPF ลดปัญหาดังกล่าวเพื่อให้เสียงพูดสะอาดและชัดเจนขึ้น แต่หากตั้ง Cutoff Frequency สูงเกินไป เสียงพูดอาจขาดความหนาและความอบอุ่น</p>
    </article>

    <article class="content-card">
      <h3>Band-Pass Filter (BPF)</h3>
      <p>หรือฟิลเตอร์ผ่านความถี่เฉพาะย่าน เป็น Filter ที่ยอมให้ความถี่ในช่วงที่กำหนดผ่านไปได้ โดยลดระดับความถี่ที่ต่ำกว่าและสูงกว่าช่วงดังกล่าว</p>
      <h4>หลักการทำงาน</h4>
      <p>กำหนดขอบเขตความถี่ด้านล่าง (Lower Cutoff Frequency) และขอบเขตความถี่ด้านบน (Upper Cutoff Frequency) เพื่อให้เหลือเฉพาะช่วงความถี่ที่ต้องการ</p>
      <p>ตัวอย่างเช่น หากกำหนดให้ Filter ผ่านความถี่ในช่วง 500–3,000 Hz ความถี่ที่ต่ำกว่า 500 Hz และสูงกว่า 3,000 Hz จะถูกลดระดับลง</p>
      <h4>วัตถุประสงค์ในการใช้งาน</h4>
      <ul class="filter-bullet-list">
        <li>เน้นความถี่บางช่วงของเสียงพูด</li>
        <li>สร้างเสียงที่มีลักษณะคล้ายเสียงจากลำโพงขนาดเล็ก</li>
        <li>สร้างเอฟเฟกต์เสียงสำหรับภาพยนตร์และเกม</li>
      </ul>
      <h4>ตัวอย่างการใช้งาน</h4>
      <p>หากต้องการสร้างเสียงพูดที่มีลักษณะเหมือนเสียงจากวิทยุสื่อสาร สามารถใช้ BPF จำกัดช่วงความถี่ให้เหลือเฉพาะย่านกลาง ทำให้เสียงมีลักษณะแคบลงและแตกต่างจากเสียงพูดที่ได้ยินตามปกติ</p>
    </article>

    <section class="filter-lab-section" aria-labelledby="filterLabTitle">
      <div class="filter-lab-heading">
        <span class="filter-lab-eyebrow">INTERACTIVE EXPERIMENT</span>
        <h2 id="filterLabTitle">ลองปรับ Filter ด้วยตัวเอง</h2>
        <p>เลือกประเภท Filter และปรับค่าต่าง ๆ เพื่อสังเกตการเปลี่ยนแปลงของ Frequency Response Graph</p>
      </div>

      <div class="filter-lab-panel">
        <div class="filter-lab-topline">
          <div><span class="filter-live-dot"></span><span>FILTER RESPONSE</span></div>
          <span class="filter-no-audio">DEMO AUDIO LOADED</span>
        </div>

        <div class="filter-chart-wrap">
          <canvas id="filterResponseChart" aria-label="กราฟ Frequency Response ของ Filter" role="img"></canvas>
        </div>
        <div class="filter-chart-legend"><span><i></i> Frequency Response</span><span>Frequency (Hz) · Log Scale</span></div>

        <div class="filter-controls-grid">
          <div class="filter-control full-width">
            <label for="filterType">Filter Type</label>
            <select id="filterType">
              <option value="lowpass">Low-Pass Filter (LPF)</option>
              <option value="highpass">High-Pass Filter (HPF)</option>
              <option value="bandpass">Band-Pass Filter (BPF)</option>
            </select>
          </div>

          <div class="filter-control full-width">
            <div class="filter-label-line"><label for="filterSlope">Slope</label><output id="filterSlopeValue">24 dB/oct</output></div>
            <input id="filterSlope" type="range" min="12" max="96" step="12" value="24">
            <div class="filter-range-labels"><span>12 dB/oct · ชันน้อย</span><span>96 dB/oct · ชันมาก</span></div>
          </div>
        </div>

        <div class="filter-audio-player">
          <div class="filter-audio-title"><strong>DEMO AUDIO</strong><span>เสียงตัวอย่างที่แนบมา</span></div>
          <audio id="filterDemoAudio" preload="metadata" src="assets/filter-demo.wav"></audio>
          <div class="filter-player-controls">
            <button id="filterPlayPause" type="button" aria-label="Play audio">▶ Play</button>
            <input id="filterAudioSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="ตำแหน่งเสียง">
            <span id="filterAudioTime">0:00 / 0:00</span>
          </div>
          <p id="filterAudioStatus" class="filter-audio-status">กด Play เพื่อฟังเสียงผ่าน Filter ที่เลือก</p>
        </div>
        <div class="filter-readout" id="filterReadout" aria-live="polite">LPF · 24 dB/oct</div>
        <p class="filter-tech-note"><strong>หมายเหตุ:</strong> เลื่อนจุดบนกราฟเพื่อเลือกความถี่ได้โดยตรง ส่วน Slope ปรับความชันของการลด/ตัดความถี่ ฟิลเตอร์จริงจะมีช่วงเปลี่ยนผ่านเล็กน้อย ไม่สามารถเป็นมุมฉากสมบูรณ์ได้ แต่ Slope ที่สูงขึ้นจะทำให้ขอบชันขึ้น</p>
      </div>
    </section>
  `;

  initFilterLab();
}

function initFilterLab() {
  const canvas = document.getElementById("filterResponseChart");
  const ctx = canvas.getContext("2d");
  const typeSelect = document.getElementById("filterType");
  const slopeInput = document.getElementById("filterSlope");
  const audio = document.getElementById("filterDemoAudio");
  const playButton = document.getElementById("filterPlayPause");
  const seek = document.getElementById("filterAudioSeek");
  const timeLabel = document.getElementById("filterAudioTime");
  const audioStatus = document.getElementById("filterAudioStatus");
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;
  let sourceNode = null;
  let filterNodes = [];
  let draggingMarker = null;

  const minFreq = 20, maxFreq = 20000, minDb = -60, maxDb = 12, points = 900;
  let lowerFreq = 1000;
  let upperFreq = 3000;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fmtHz = (v) => `${Math.round(v).toLocaleString("en-US")} Hz`;
  const fmtTime = (t) => {
    if (!Number.isFinite(t)) return "0:00";
    const m = Math.floor(t / 60), sec = Math.floor(t % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };
  const stages = () => Number(slopeInput.value) / 12;

  try {
    if (AudioContextClass) audioContext = new AudioContextClass();
    if (audioContext) {
      sourceNode = audioContext.createMediaElementSource(audio);
      rebuildAudioChain();
    }
  } catch (err) {
    console.warn("Web Audio setup failed", err);
    audioStatus.textContent = "เบราว์เซอร์ไม่รองรับ Web Audio API ในหน้านี้";
  }

  // Butterworth Q values keep the cascaded stages better aligned and avoid
  // the excessive resonant bump caused by repeating Q=0.707 at every stage.
  function butterworthQs(stageCount) {
    const order = stageCount * 2;
    return Array.from({ length: stageCount }, (_, i) => {
      const k = i + 1;
      return 1 / (2 * Math.sin(((2 * k) - 1) * Math.PI / (2 * order)));
    });
  }

  function makeStages(kind, frequency, count) {
    const qs = butterworthQs(count);
    return qs.map((q) => {
      const node = audioContext.createBiquadFilter();
      node.type = kind;
      node.frequency.value = frequency;
      node.Q.value = q;
      return node;
    });
  }

  function disconnectFilters() {
    filterNodes.forEach((node) => { try { node.disconnect(); } catch (_) {} });
    filterNodes = [];
  }

  function rebuildAudioChain() {
    if (!audioContext || !sourceNode) return;
    disconnectFilters();
    const count = stages();
    const type = typeSelect.value;
    if (type === "lowpass") filterNodes = makeStages("lowpass", lowerFreq, count);
    if (type === "highpass") filterNodes = makeStages("highpass", lowerFreq, count);
    if (type === "bandpass") filterNodes = [
      ...makeStages("highpass", lowerFreq, count),
      ...makeStages("lowpass", upperFreq, count)
    ];
    sourceNode.disconnect();
    let previous = sourceNode;
    filterNodes.forEach((node) => { previous.connect(node); previous = node; });
    previous.connect(audioContext.destination);
  }

  function getResponse() {
    const freqs = new Float32Array(points);
    for (let i = 0; i < points; i++) freqs[i] = minFreq * Math.pow(maxFreq / minFreq, i / (points - 1));
    const mag = new Float32Array(points).fill(1);
    const tmpMag = new Float32Array(points), tmpPhase = new Float32Array(points);
    if (!audioContext) return { freqs, db: mag.map(() => 0) };
    const type = typeSelect.value, count = stages();
    let nodes = [];
    if (type === "lowpass") nodes = makeStages("lowpass", lowerFreq, count);
    if (type === "highpass") nodes = makeStages("highpass", lowerFreq, count);
    if (type === "bandpass") nodes = [...makeStages("highpass", lowerFreq, count), ...makeStages("lowpass", upperFreq, count)];
    nodes.forEach((node) => {
      node.getFrequencyResponse(freqs, tmpMag, tmpPhase);
      for (let i = 0; i < points; i++) mag[i] *= tmpMag[i];
      node.disconnect();
    });
    const db = new Float32Array(points);
    for (let i = 0; i < points; i++) db[i] = 20 * Math.log10(Math.max(mag[i], 1e-7));
    return { freqs, db };
  }

  function drawGraph() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = rect.width, height = 360;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pad = { left: 55, right: 18, top: 18, bottom: 45 };
    const plotW = width - pad.left - pad.right, plotH = height - pad.top - pad.bottom;
    const xFor = (f) => pad.left + Math.log10(f / minFreq) / Math.log10(maxFreq / minFreq) * plotW;
    const freqForX = (x) => minFreq * Math.pow(maxFreq / minFreq, clamp((x - pad.left) / plotW, 0, 1));
    const yFor = (db) => pad.top + ((maxDb - clamp(db, minDb, maxDb)) / (maxDb - minDb)) * plotH;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(13,11,9,.55)"; ctx.fillRect(0, 0, width, height);
    ctx.font = "11px Montserrat, sans-serif"; ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (let db = -60; db <= 0; db += 12) {
      const y = yFor(db); ctx.strokeStyle = db === 0 ? "rgba(232,160,77,.45)" : "rgba(232,160,77,.13)";
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
      ctx.fillStyle = "#bca995"; ctx.fillText(`${db} dB`, pad.left - 9, y);
    }
    const ticks = [20,50,100,200,500,1000,2000,5000,10000,20000];
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ticks.forEach((f) => { const x=xFor(f); ctx.strokeStyle="rgba(232,160,77,.13)"; ctx.beginPath(); ctx.moveTo(x,pad.top); ctx.lineTo(x,pad.top+plotH); ctx.stroke(); ctx.fillStyle="#bca995"; ctx.fillText(f>=1000?`${f/1000}k`:`${f}`,x,pad.top+plotH+10); });
    const { freqs, db } = getResponse();
    ctx.beginPath();
    for (let i=0;i<points;i++){ const x=xFor(freqs[i]), y=yFor(db[i]); if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y); }
    ctx.lineTo(xFor(maxFreq),yFor(minDb)); ctx.lineTo(xFor(minFreq),yFor(minDb)); ctx.closePath();
    const grad=ctx.createLinearGradient(0,pad.top,0,pad.top+plotH); grad.addColorStop(0,"rgba(255,157,67,.18)"); grad.addColorStop(1,"rgba(255,157,67,.01)"); ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath();
    for(let i=0;i<points;i++){const x=xFor(freqs[i]),y=yFor(db[i]);if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    ctx.strokeStyle="#ffad59";ctx.lineWidth=2.5;ctx.shadowColor="rgba(255,157,67,.45)";ctx.shadowBlur=7;ctx.stroke();ctx.shadowBlur=0;
    const markers = typeSelect.value === "bandpass" ? [{f:lowerFreq,id:"lower"},{f:upperFreq,id:"upper"}] : [{f:lowerFreq,id:"lower"}];
    markers.forEach(({f})=>{const x=xFor(f);ctx.setLineDash([4,5]);ctx.strokeStyle="rgba(255,190,125,.65)";ctx.beginPath();ctx.moveTo(x,pad.top);ctx.lineTo(x,pad.top+plotH);ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(x,yFor(-3),7,0,Math.PI*2);ctx.fillStyle="#ffad59";ctx.fill();ctx.lineWidth=2;ctx.strokeStyle="#24180e";ctx.stroke();});
    ctx.fillStyle="#c6b7a9";ctx.font="11px Kanit,sans-serif";ctx.textAlign="center";ctx.fillText("Frequency (Hz) · ลากจุดเพื่อปรับความถี่",pad.left+plotW/2,height-7);
    document.getElementById("filterSlopeValue").textContent=`${slopeInput.value} dB/oct`;
    document.getElementById("filterReadout").textContent = typeSelect.value === "bandpass"
      ? `BPF · ${fmtHz(lowerFreq)} – ${fmtHz(upperFreq)} · Slope ${slopeInput.value} dB/oct (ทั้งสองด้าน)`
      : `${typeSelect.value === "lowpass" ? "LPF" : "HPF"} · ${fmtHz(lowerFreq)} · Slope ${slopeInput.value} dB/oct`;
  }

  function updateAll() { rebuildAudioChain(); drawGraph(); }
  typeSelect.addEventListener("change", updateAll);
  slopeInput.addEventListener("input", updateAll);

  function pointerFrequency(event) {
    const rect=canvas.getBoundingClientRect(), pad={left:55,right:18};
    const plotW=rect.width-pad.left-pad.right;
    return minFreq*Math.pow(maxFreq/minFreq,clamp((event.clientX-rect.left-pad.left)/plotW,0,1));
  }
  function nearestMarker(event) {
    const rect=canvas.getBoundingClientRect(), pad={left:55,right:18}, plotW=rect.width-pad.left-pad.right;
    const xFor=(f)=>pad.left+Math.log10(f/minFreq)/Math.log10(maxFreq/minFreq)*plotW;
    const x=event.clientX-rect.left;
    if(typeSelect.value!=="bandpass") return "lower";
    return Math.abs(x-xFor(lowerFreq)) <= Math.abs(x-xFor(upperFreq)) ? "lower" : "upper";
  }
  canvas.style.touchAction="none";
  canvas.addEventListener("pointerdown",(e)=>{draggingMarker=nearestMarker(e);canvas.setPointerCapture(e.pointerId);moveMarker(e);});
  canvas.addEventListener("pointermove",(e)=>{if(draggingMarker)moveMarker(e);});
  canvas.addEventListener("pointerup",()=>{draggingMarker=null;});
  canvas.addEventListener("pointercancel",()=>{draggingMarker=null;});
  function moveMarker(e) {
    const f=clamp(pointerFrequency(e),minFreq,maxFreq);
    if(draggingMarker==="lower") lowerFreq=typeSelect.value==="bandpass"?Math.min(f,upperFreq/1.03):f;
    if(draggingMarker==="upper") upperFreq=Math.max(f,lowerFreq*1.03);
    lowerFreq=clamp(lowerFreq,20,19900); upperFreq=clamp(upperFreq,Math.max(21,lowerFreq*1.03),20000);
    updateAll();
  }

  playButton.addEventListener("click", async ()=>{
    if(!audioContext){audioStatus.textContent="ไม่สามารถเริ่ม Web Audio API ได้";return;}
    try {
      if(audioContext.state==="suspended") await audioContext.resume();
      if(audio.paused){await audio.play();playButton.textContent="Ⅱ Pause";playButton.setAttribute("aria-label","Pause audio");}
      else {audio.pause();playButton.textContent="▶ Play";playButton.setAttribute("aria-label","Play audio");}
    } catch(err){audioStatus.textContent="เล่นเสียงไม่ได้ กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง";console.error(err);}
  });
  audio.addEventListener("play",()=>{playButton.textContent="Ⅱ Pause";audioStatus.textContent="กำลังเล่นเสียงผ่าน Filter ที่เลือก";});
  audio.addEventListener("pause",()=>{playButton.textContent="▶ Play";});
  audio.addEventListener("ended",()=>{playButton.textContent="▶ Play";seek.value=0;});
  audio.addEventListener("loadedmetadata",()=>{timeLabel.textContent=`0:00 / ${fmtTime(audio.duration)}`;});
  audio.addEventListener("timeupdate",()=>{if(Number.isFinite(audio.duration)&&audio.duration>0){seek.value=Math.round(audio.currentTime/audio.duration*1000);timeLabel.textContent=`${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;}});
  seek.addEventListener("input",()=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=(Number(seek.value)/1000)*audio.duration;});
  audio.addEventListener("error",()=>{audioStatus.textContent="หาไฟล์เสียงไม่พบ — ตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์ assets และชื่อ filter-demo.wav";});
  if("ResizeObserver" in window){const observer=new ResizeObserver(drawGraph);observer.observe(canvas.parentElement);}else window.addEventListener("resize",drawGraph);
  updateAll();
}


function renderCompressorLesson() {
  lessonContent.innerHTML = `
    <div class="lesson-page-heading"><h1>Compressor</h1></div>
    <article class="content-card compressor-theory-card">
      <h3>Compressor คืออะไร?</h3>
      <p>Compressor ทำหน้าที่ควบคุมระดับความดังของสัญญาณเสียง โดยลดระดับเสียงที่ดังเกินกว่าค่าที่กำหนด เพื่อให้ระดับความดังของเสียงมีความสม่ำเสมอมากขึ้น</p>
      <h4>หลักการทำงานของ Compressor</h4>
      <p>Compressor จะตรวจจับระดับความดังของสัญญาณเสียงและเปรียบเทียบกับค่าที่ผู้ใช้งานกำหนด เมื่อระดับเสียงเกิน <strong>Threshold</strong> จะลดระดับเสียงลงตามค่า <strong>Ratio</strong> ที่กำหนด</p>
      <h4>หน้าที่หลักของ Compressor</h4>
      <ul class="filter-bullet-list">
        <li><strong>Dynamic Control:</strong> ลดความแตกต่างระหว่างช่วงเสียงดังและเสียงเบา ทำให้ระดับเสียงมีความสม่ำเสมอมากขึ้น</li>
        <li><strong>Peak Control:</strong> ลดระดับเสียงที่ดังขึ้นอย่างรวดเร็ว ไม่ให้มีระดับสูงเกินความเหมาะสม</li>
        <li>เพิ่มความสม่ำเสมอให้เสียงพูดมีระดับความดังใกล้เคียงกัน แม้ผู้พูดจะเปลี่ยนระดับเสียงระหว่างพูด</li>
        <li>ควบคุมเสียงเครื่องดนตรี เช่น กลอง เบส และเสียงร้อง ให้มีระดับเสียงที่เหมาะสม</li>
        <li><strong>Mixing Control:</strong> ช่วยจัดการระดับเสียงของแต่ละช่องสัญญาณในระบบมิกซ์ได้ง่ายขึ้น</li>
      </ul>
      <h4>ค่าที่ใช้ในการปรับ</h4>
      <ul class="filter-bullet-list compressor-parameter-list">
        <li><strong>Threshold (dB):</strong> ระดับความดังที่กำหนดให้ Compressor เริ่มทำงาน เมื่อตั้ง Threshold ต่ำลง จะมีช่วงของเสียงที่ถูกบีบอัดมากขึ้น</li>
        <li><strong>Ratio:</strong> อัตราส่วนที่กำหนดว่าเมื่อเสียงดังเกิน Threshold แล้ว Compressor จะลดระดับเสียงลงมากน้อยเพียงใด</li>
        <li><strong>Make-up Gain (dB):</strong> เพิ่มระดับความดังหลังการบีบอัด เพื่อชดเชยความดังที่ลดลงจากการทำงานของ Compressor</li>
        <li><strong>Gain Reduction (dB):</strong> ค่าที่แสดงว่า Compressor กำลังลดระดับความดังของเสียงลงไปมากน้อยเพียงใด</li>
        <li><strong>Knee (dB):</strong> กำหนดความนุ่มนวลของจุดเริ่มบีบอัด</li>
        <li><strong>Attack (ms):</strong> เวลาที่ Compressor ใช้ตอบสนองเมื่อเสียงเกิน Threshold</li>
        <li><strong>Release (ms):</strong> เวลาที่ Compressor ใช้คืนการบีบอัดเมื่อระดับเสียงลดลง</li>
      </ul>
      <p class="compressor-tip"><strong>ลำดับการทำงาน:</strong> ตรวจจับเสียง → ลดระดับเสียงส่วนที่เกิน Threshold ตาม Ratio → วัด Gain Reduction → เพิ่ม Make-up Gain เพื่อชดเชยระดับเสียงที่ลดลง</p>
    </article>

    <section class="compressor-lab" aria-labelledby="compressorLabTitle">
      <div class="compressor-lab-head">
        <div><span class="filter-lab-eyebrow">INTERACTIVE EXPERIMENT</span><h2 id="compressorLabTitle">Compressor Lab</h2><p>ฟังเสียงก่อนและหลังใส่ Compressor พร้อมดูว่าเสียงถูกกดลงไปเท่าไหร่ และเพิ่ม Make-up Gain กลับเข้าไปเท่าไหร่</p></div>
        <span class="compressor-live-pill"><i></i> LIVE PROCESSING</span>
      </div>
      <div class="compressor-main-panel">
        <div class="compressor-ab-panel">
          <div><strong>PRE / POST COMPARISON</strong><small>เลือกฟังสัญญาณก่อนหรือหลังผ่าน Compressor</small></div>
          <div class="compressor-ab-buttons"><button type="button" id="compPreButton" aria-pressed="false">PRE · ก่อน Compressor</button><button type="button" id="compPostButton" class="active" aria-pressed="true">POST · หลัง Compressor</button></div>
          <div id="compModeDescription" class="compressor-mode-description">POST: ได้ยินเสียงหลังถูกบีบอัดและเพิ่ม Make-up Gain แล้ว</div>
        </div>
        <div class="compressor-graph-top"><strong>LIVE COMPRESSION VIEW</strong><span>PRE / POST Spectrum + Transfer Curve</span></div>
        <div class="compressor-combined-graph-wrap">
          <canvas id="compressorCombinedGraph" role="img" aria-label="กราฟรวม Spectrum ก่อนและหลัง Compressor พร้อม Transfer Curve แสดงระดับการบีบอัด"></canvas>
        </div>
        <div class="compressor-graph-legend compressor-combined-legend">
          <span><i class="comp-legend-pre"></i> PRE · ก่อน Compressor</span>
          <span><i class="comp-legend-post"></i> POST · หลัง Compressor + Make-up</span>
          <span><i class="comp-legend-diagonal"></i> เส้นประ · ไม่มีการบีบอัด</span>
        </div>
        <div class="compressor-meter-row">
          <div class="compressor-meter-card">
            <div class="compressor-meter-heading"><strong>GAIN REDUCTION</strong><output id="compReductionValue">0.0 dB</output></div>
            <div class="compressor-meter-track"><div id="compReductionBar"></div></div>
            <div class="compressor-meter-scale"><span>0 dB</span><span>-6</span><span>-12</span><span>-18</span><span>-24 dB</span></div>
            <small class="compressor-meter-caption">ค่าติดลบแสดงระดับเสียงที่ถูกลดลง ณ ขณะนั้น</small>
          </div>
          <div class="compressor-level-card"><span>PRE · INPUT RMS</span><strong id="compInputLevel">-∞ dBFS</strong></div>
          <div class="compressor-level-card"><span>POST · OUTPUT RMS</span><strong id="compOutputLevel">-∞ dBFS</strong></div>
        </div>
        <div class="compressor-makeup-summary"><span>MAKE-UP GAIN ที่เพิ่ม</span><strong id="compMakeupSummary">+0.0 dB</strong><small>เพิ่มหลัง Compressor เพื่อชดเชยระดับเสียงที่ลดลง ไม่ใช่ค่า Gain Reduction</small></div>
        <div class="compressor-controls compressor-primary-controls">
          <div class="compressor-control"><label for="compThreshold"><span>Threshold</span><output id="compThresholdValue">-24 dB</output></label><input id="compThreshold" type="range" min="-60" max="0" step="1" value="-24"><small>เลื่อนลงเพื่อให้ Compressor เริ่มกดเสียงมากขึ้น</small></div>
          <div class="compressor-control"><label for="compRatio"><span>Ratio</span><output id="compRatioValue">4:1</output></label><input id="compRatio" type="range" min="1" max="20" step="0.5" value="4"><small>ค่ายิ่งสูง เสียงส่วนที่เกินยิ่งถูกกดมาก</small></div>
          <div class="compressor-control"><label for="compMakeup"><span>Make-up Gain</span><output id="compMakeupValue">+0 dB</output></label><input id="compMakeup" type="range" min="0" max="18" step="0.5" value="0"><small>เพิ่มความดังกลับหลังการบีบอัด</small></div>
        </div>
        <details class="compressor-advanced">
          <summary>Advanced Settings <span>ปรับ Knee · Attack · Release</span></summary>
          <div class="compressor-controls compressor-advanced-controls">
            <div class="compressor-control"><label for="compKnee"><span>Knee</span><output id="compKneeValue">12 dB</output></label><input id="compKnee" type="range" min="0" max="40" step="1" value="12"><small>ความนุ่มนวลของจุดเริ่มบีบอัด</small></div>
            <div class="compressor-control"><label for="compAttack"><span>Attack</span><output id="compAttackValue">10 ms</output></label><input id="compAttack" type="range" min="1" max="200" step="1" value="10"><small>เวลาตอบสนองเมื่อเสียงเกิน Threshold</small></div>
            <div class="compressor-control"><label for="compRelease"><span>Release</span><output id="compReleaseValue">150 ms</output></label><input id="compRelease" type="range" min="10" max="1000" step="5" value="150"><small>เวลาคืนระดับหลังเสียงลดลง</small></div>
          </div>
        </details>
        <div class="compressor-preset-row"><span>ทดลองคาแรกเตอร์เสียง</span><button type="button" id="compNormalPreset">เริ่มต้น / Moderate</button><button type="button" id="compOverPreset">Overcompression</button></div>
        <p id="compCharacterDescription" class="compressor-character-description">Moderate: เริ่มจากการบีบอัดพอประมาณ เพื่อควบคุมเสียงที่ดังเกิน Threshold</p>
        <div class="compressor-transport">
          <div class="compressor-audio-title"><strong>DEMO AUDIO</strong><span>เสียงตัวอย่างเดียวกับ Filter และ EQ</span></div>
          <audio id="compressorDemoAudio" preload="metadata" src="assets/filter-demo.wav"></audio>
          <div class="filter-player-controls"><button id="compressorPlayPause" type="button">▶ Play</button><input id="compressorSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="ตำแหน่งเสียง"><span id="compressorTime">0:00 / 0:00</span></div>
          <p id="compressorStatus" class="filter-audio-status">กด Play เพื่อฟังเสียง และสลับ PRE / POST เพื่อเปรียบเทียบ</p>
        </div>
        <div class="compressor-readout" id="compressorReadout">Threshold -24 dB · Ratio 4:1 · Make-up +0 dB</div>
        <p class="compressor-note">หมายเหตุ: Gain Reduction เป็นค่าการลดระดับจาก Compressor ก่อน Make-up Gain ส่วน PRE / POST ใช้สลับฟังสัญญาณต้นฉบับและสัญญาณที่ผ่านการประมวลผล</p>
      </div>
    </section>
  `;
  initCompressorLab();
}

function initCompressorLab() {
  const audio = document.getElementById('compressorDemoAudio');
  const play = document.getElementById('compressorPlayPause');
  const seek = document.getElementById('compressorSeek');
  const time = document.getElementById('compressorTime');
  const status = document.getElementById('compressorStatus');
  const canvas = document.getElementById('compressorCombinedGraph');
  const ctx = canvas.getContext('2d');
  const threshold = document.getElementById('compThreshold');
  const ratio = document.getElementById('compRatio');
  const knee = document.getElementById('compKnee');
  const attack = document.getElementById('compAttack');
  const release = document.getElementById('compRelease');
  const makeup = document.getElementById('compMakeup');
  const reductionValue = document.getElementById('compReductionValue');
  const reductionBar = document.getElementById('compReductionBar');
  const inputLevel = document.getElementById('compInputLevel');
  const outputLevel = document.getElementById('compOutputLevel');
  const preButton = document.getElementById('compPreButton');
  const postButton = document.getElementById('compPostButton');
  const modeDescription = document.getElementById('compModeDescription');
  const makeupSummary = document.getElementById('compMakeupSummary');
  const characterDescription = document.getElementById('compCharacterDescription');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const fmtTime = v => Number.isFinite(v) ? `${Math.floor(v/60)}:${String(Math.floor(v%60)).padStart(2,'0')}` : '0:00';
  const toDb = rms => rms > 0 ? Math.max(-100, 20 * Math.log10(rms)) : -100;

  let audioContext = null, source = null, compressor = null, makeupNode = null;
  let prePathGain = null, postPathGain = null;
  let monitorMode = 'post';
  let inputAnalyser = null, outputAnalyser = null, postSpectrumAnalyser = null;
  let inputSamples = null, outputSamples = null, postSamples = null;
  let preSpectrumData = null, postSpectrumData = null;
  let animationId = 0, lastDraw = 0, smoothReduction = 0;

  try {
    if (AudioContextClass) audioContext = new AudioContextClass();
    if (audioContext) {
      source = audioContext.createMediaElementSource(audio);
      compressor = audioContext.createDynamicsCompressor();
      makeupNode = audioContext.createGain();
      prePathGain = audioContext.createGain();
      postPathGain = audioContext.createGain();
      prePathGain.gain.value = 0;
      postPathGain.gain.value = 1;

      inputAnalyser = audioContext.createAnalyser();
      outputAnalyser = audioContext.createAnalyser();
      postSpectrumAnalyser = audioContext.createAnalyser();
      inputAnalyser.fftSize = postSpectrumAnalyser.fftSize = 4096;
      outputAnalyser.fftSize = 2048;
      inputAnalyser.smoothingTimeConstant = postSpectrumAnalyser.smoothingTimeConstant = 0.86;
      outputAnalyser.smoothingTimeConstant = 0.78;

      inputSamples = new Float32Array(inputAnalyser.fftSize);
      outputSamples = new Float32Array(outputAnalyser.fftSize);
      postSamples = new Float32Array(postSpectrumAnalyser.fftSize);
      preSpectrumData = new Float32Array(inputAnalyser.frequencyBinCount);
      postSpectrumData = new Float32Array(postSpectrumAnalyser.frequencyBinCount);

      // Split the source into PRE monitor and processed POST path.
      source.connect(inputAnalyser);
      inputAnalyser.connect(prePathGain);
      prePathGain.connect(outputAnalyser);
      inputAnalyser.connect(compressor);
      compressor.connect(makeupNode);
      makeupNode.connect(postSpectrumAnalyser);
      postSpectrumAnalyser.connect(postPathGain);
      postPathGain.connect(outputAnalyser);
      outputAnalyser.connect(audioContext.destination);
    }
  } catch (error) {
    console.error('Compressor Web Audio setup failed:', error);
    status.textContent = 'ไม่สามารถเริ่ม Web Audio API ได้ในเบราว์เซอร์นี้';
  }

  function transfer(inputDb) {
    const t = Number(threshold.value), r = Number(ratio.value);
    const k = Number(knee.value), m = Number(makeup.value);
    let compressed = inputDb;
    if (k > 0 && inputDb > t - k / 2 && inputDb < t + k / 2) {
      const x = inputDb - t + k / 2;
      compressed = inputDb + (1 / r - 1) * x * x / (2 * k);
    } else if (inputDb >= t + k / 2) {
      compressed = t + (inputDb - t) / r;
    }
    return compressed + m;
  }

  function drawCombinedGraph() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    if (!w) return;
    const h = Math.max(390, Math.min(470, w * 0.53));
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#11100f';
    ctx.fillRect(0, 0, w, h);

    const left = 49, right = 16, top = 24, gap = 37, bottom = 28;
    const spectrumH = Math.round((h - top - gap - bottom) * 0.66);
    const curveTop = top + spectrumH + gap;
    const curveH = h - curveTop - bottom;
    const plotW = w - left - right;
    const minHz = 20, maxHz = 20000, minLevel = -90, maxLevel = -10;
    const xFreq = hz => left + Math.log10(hz / minHz) / Math.log10(maxHz / minHz) * plotW;
    const ySpectrum = db => top + (maxLevel - clamp(db, minLevel, maxLevel)) / (maxLevel - minLevel) * spectrumH;
    const xDb = db => left + (db + 60) / 60 * plotW;
    const yDb = db => curveTop + (12 - clamp(db, -60, 12)) / 72 * curveH;

    // Spectrum panel.
    ctx.fillStyle = '#e8c49d';
    ctx.font = '700 10px Montserrat,sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('FREQUENCY SPECTRUM · PRE / POST', left, 11);
    ctx.fillStyle = '#9e9081';
    ctx.font = '9px Kanit,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('dBFS', w - right, 11);

    for (let db = -90; db <= -10; db += 20) {
      const y = ySpectrum(db);
      ctx.strokeStyle = 'rgba(255,255,255,.09)';
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(w - right, y); ctx.stroke();
      ctx.fillStyle = '#a99b8b'; ctx.font = '9px Montserrat,sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(String(db), left - 8, y);
    }
    const ticks = [20,50,100,200,500,1000,2000,5000,10000,20000];
    ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.font = '9px Montserrat,sans-serif';
    ticks.forEach(hz => {
      const x = xFreq(hz);
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, top + spectrumH); ctx.stroke();
      ctx.fillStyle = '#a99b8b';
      ctx.fillText(hz >= 1000 ? `${hz/1000}k` : `${hz}`, x, top + spectrumH + 5);
    });

    let prePoints = [], postPoints = [];
    if (!audio.paused && !audio.ended && inputAnalyser && postSpectrumAnalyser && audioContext) {
      inputAnalyser.getFloatFrequencyData(preSpectrumData);
      postSpectrumAnalyser.getFloatFrequencyData(postSpectrumData);
      const binHz = audioContext.sampleRate / inputAnalyser.fftSize;
      for (let i = 1; i < preSpectrumData.length; i++) {
        const hz = i * binHz;
        if (hz < minHz || hz > maxHz) continue;
        const pre = Number.isFinite(preSpectrumData[i]) ? preSpectrumData[i] : minLevel;
        const post = Number.isFinite(postSpectrumData[i]) ? postSpectrumData[i] : minLevel;
        prePoints.push([xFreq(hz), ySpectrum(pre)]);
        postPoints.push([xFreq(hz), ySpectrum(post)]);
      }
      // Fill the gap between PRE and POST to make the level difference easier to see.
      if (prePoints.length > 1 && postPoints.length === prePoints.length) {
        ctx.beginPath();
        prePoints.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
        for (let i = postPoints.length - 1; i >= 0; i--) ctx.lineTo(postPoints[i][0], postPoints[i][1]);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,177,95,.13)';
        ctx.fill();
      }
      const drawTrace = (points, color) => {
        if (points.length < 2) return;
        ctx.beginPath();
        points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
        ctx.strokeStyle = color; ctx.lineWidth = 1.9; ctx.lineJoin = 'round'; ctx.stroke();
      };
      drawTrace(prePoints, '#ffb15f');
      drawTrace(postPoints, '#62d9ad');
    } else {
      ctx.fillStyle = '#9c8d7d'; ctx.font = '11px Kanit,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('กด Play เพื่อดู Spectrum ก่อนและหลัง Compressor', left + plotW/2, top + spectrumH/2);
    }

    // Current Gain Reduction badge in the spectrum panel.
    const gr = audio.paused ? 0 : Math.abs(Number(compressor?.reduction) || 0);
    ctx.fillStyle = 'rgba(255,177,95,.13)';
    ctx.strokeStyle = 'rgba(255,177,95,.35)';
    ctx.beginPath(); ctx.roundRect(w - right - 104, top + 8, 98, 25, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffc17d'; ctx.font = '700 10px Montserrat,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`GR ${gr.toFixed(1)} dB`, w - right - 55, top + 20);

    // Transfer curve panel.
    const dividerY = curveTop - 16;
    ctx.strokeStyle = 'rgba(232,160,77,.24)';
    ctx.beginPath(); ctx.moveTo(left, dividerY); ctx.lineTo(w-right, dividerY); ctx.stroke();
    ctx.fillStyle = '#e8c49d'; ctx.font = '700 10px Montserrat,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('COMPRESSION CURVE · INPUT → OUTPUT', left, curveTop - 7);
    ctx.font = '9px Montserrat,sans-serif'; ctx.textAlign = 'right'; ctx.fillStyle = '#9e9081';
    ctx.fillText(`Threshold ${threshold.value} dB  ·  Ratio ${Number(ratio.value).toFixed(1)}:1`, w-right, curveTop - 7);

    for (let db = -60; db <= 0; db += 20) {
      const x = xDb(db);
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.beginPath(); ctx.moveTo(x, curveTop); ctx.lineTo(x, curveTop+curveH); ctx.stroke();
      ctx.fillStyle = '#a99b8b'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(String(db), x, curveTop+curveH+4);
    }
    for (let db = -60; db <= 0; db += 20) {
      const y = yDb(db);
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.beginPath(); ctx.moveTo(left,y); ctx.lineTo(w-right,y); ctx.stroke();
      ctx.fillStyle = '#a99b8b'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(String(db), left-8, y);
    }
    ctx.beginPath(); ctx.moveTo(xDb(-60),yDb(-60)); ctx.lineTo(xDb(0),yDb(0));
    ctx.strokeStyle = 'rgba(190,190,190,.65)'; ctx.lineWidth = 1.2; ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath();
    for (let db=-60; db<=0; db+=0.25) {
      const out = clamp(transfer(db),-60,12);
      const px=xDb(db), py=yDb(out);
      if (db===-60) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.strokeStyle='#ffb15f'; ctx.lineWidth=2.3; ctx.stroke();
    ctx.fillStyle='#bba68f'; ctx.font='9px Kanit,sans-serif'; ctx.textAlign='left'; ctx.textBaseline='bottom';
    ctx.fillText('เส้นประ = ไม่มีการบีบอัด', left+5, curveTop+curveH-4);
  }

  function readRms(analyser, buffer) {
    if (!analyser || !buffer) return 0;
    analyser.getFloatTimeDomainData(buffer);
    let sum = 0;
    for (let i=0;i<buffer.length;i++) sum += buffer[i]*buffer[i];
    return Math.sqrt(sum / buffer.length);
  }

  function updateMeters() {
    if (!compressor || !audioContext || audio.paused || audio.ended) {
      smoothReduction = 0;
      reductionValue.textContent = '0.0 dB';
      reductionBar.style.width = '0%';
      if (audio.paused || audio.ended) {
        inputLevel.textContent = '-∞ dBFS';
        outputLevel.textContent = '-∞ dBFS';
      }
      return;
    }
    const target = Math.abs(Number(compressor.reduction) || 0);
    smoothReduction = smoothReduction * 0.78 + target * 0.22;
    reductionValue.textContent = `${smoothReduction.toFixed(1)} dB`;
    reductionBar.style.width = `${clamp(smoothReduction / 24 * 100, 0, 100)}%`;
    inputLevel.textContent = `${toDb(readRms(inputAnalyser,inputSamples)).toFixed(1)} dBFS`;
    outputLevel.textContent = `${toDb(readRms(postSpectrumAnalyser,postSamples)).toFixed(1)} dBFS`;
  }

  function animate() {
    if (animationId) cancelAnimationFrame(animationId);
    const frame = now => {
      if (audio.paused || audio.ended) {
        animationId = 0; updateMeters(); drawCombinedGraph(); return;
      }
      updateMeters();
      if (now - lastDraw >= 66) {
        drawCombinedGraph();
        lastDraw = now;
      }
      animationId = requestAnimationFrame(frame);
    };
    animationId = requestAnimationFrame(frame);
  }

  function applySettings() {
    const values = {
      threshold: Number(threshold.value), ratio: Number(ratio.value), knee: Number(knee.value),
      attack: Number(attack.value) / 1000, release: Number(release.value) / 1000,
      makeup: Number(makeup.value)
    };
    if (compressor && audioContext) {
      const now = audioContext.currentTime;
      compressor.threshold.setTargetAtTime(values.threshold, now, 0.015);
      compressor.ratio.setTargetAtTime(values.ratio, now, 0.015);
      compressor.knee.setTargetAtTime(values.knee, now, 0.015);
      compressor.attack.setTargetAtTime(values.attack, now, 0.015);
      compressor.release.setTargetAtTime(values.release, now, 0.015);
      makeupNode.gain.setTargetAtTime(Math.pow(10, values.makeup / 20), now, 0.015);
    }
    document.getElementById('compThresholdValue').textContent = `${values.threshold} dB`;
    document.getElementById('compRatioValue').textContent = `${values.ratio.toFixed(1).replace(/\.0$/,'')}:1`;
    document.getElementById('compKneeValue').textContent = `${values.knee} dB`;
    document.getElementById('compAttackValue').textContent = `${values.attack * 1000} ms`;
    document.getElementById('compReleaseValue').textContent = `${values.release * 1000} ms`;
    document.getElementById('compMakeupValue').textContent = `+${values.makeup.toFixed(1)} dB`;
    makeupSummary.textContent = `+${values.makeup.toFixed(1)} dB`;
    document.getElementById('compressorReadout').textContent =
      `Threshold ${values.threshold} dB · Ratio ${values.ratio.toFixed(1).replace(/\.0$/,'')}:1 · Make-up +${values.makeup.toFixed(1)} dB`;
    drawCombinedGraph();
  }

  function setMonitorMode(mode) {
    monitorMode = mode;
    if (audioContext && prePathGain && postPathGain) {
      const now = audioContext.currentTime;
      prePathGain.gain.setTargetAtTime(mode === 'pre' ? 1 : 0, now, 0.01);
      postPathGain.gain.setTargetAtTime(mode === 'post' ? 1 : 0, now, 0.01);
    }
    preButton.classList.toggle('active', mode === 'pre');
    postButton.classList.toggle('active', mode === 'post');
    preButton.setAttribute('aria-pressed', String(mode === 'pre'));
    postButton.setAttribute('aria-pressed', String(mode === 'post'));
    modeDescription.textContent = mode === 'pre'
      ? 'PRE: ได้ยินเสียงต้นฉบับก่อนผ่าน Compressor (Bypass)'
      : 'POST: ได้ยินเสียงหลังถูกบีบอัดและเพิ่ม Make-up Gain แล้ว';
    drawCombinedGraph();
  }

  function setPreset(kind) {
    const presets = kind === 'over'
      ? { threshold: -36, ratio: 16, knee: 2, attack: 3, release: 90, makeup: 8 }
      : { threshold: -24, ratio: 4, knee: 12, attack: 10, release: 150, makeup: 0 };
    threshold.value = presets.threshold;
    ratio.value = presets.ratio;
    knee.value = presets.knee;
    attack.value = presets.attack;
    release.value = presets.release;
    makeup.value = presets.makeup;
    applySettings();
    characterDescription.textContent = kind === 'over'
      ? 'Overcompression: บีบอัดแรงด้วย Threshold ต่ำและ Ratio สูง แล้วชดเชยด้วย Make-up Gain มากขึ้น ลองฟังความแน่น/ความแบนของไดนามิก และสังเกต Gain Reduction ที่เพิ่มขึ้น'
      : 'Moderate: เริ่มจากการบีบอัดพอประมาณ เพื่อควบคุมเสียงที่ดังเกิน Threshold โดยยังคงความแตกต่างของไดนามิกไว้';
    drawCombinedGraph();
  }

  preButton.addEventListener('click', () => setMonitorMode('pre'));
  postButton.addEventListener('click', () => setMonitorMode('post'));
  document.getElementById('compNormalPreset').addEventListener('click', () => setPreset('normal'));
  document.getElementById('compOverPreset').addEventListener('click', () => setPreset('over'));
  [threshold, ratio, knee, attack, release, makeup].forEach(el => el.addEventListener('input', applySettings));

  play.addEventListener('click', async () => {
    if (!audioContext) { status.textContent = 'ไม่สามารถเริ่ม Web Audio API ได้'; return; }
    try {
      if (audioContext.state === 'suspended') await audioContext.resume();
      if (audio.paused) {
        await audio.play(); play.textContent = 'Ⅱ Pause';
        status.textContent = 'กำลังประมวลผลเสียงด้วย Compressor แบบเรียลไทม์';
        animate();
      } else {
        audio.pause(); play.textContent = '▶ Play';
      }
    } catch (error) {
      console.error(error);
      status.textContent = 'เล่นเสียงไม่ได้ กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง';
    }
  });
  audio.addEventListener('play', () => {
    play.textContent = 'Ⅱ Pause';
    status.textContent = 'กำลังประมวลผลเสียงด้วย Compressor แบบเรียลไทม์';
    animate();
  });
  audio.addEventListener('pause', () => {
    play.textContent = '▶ Play';
    if (animationId) { cancelAnimationFrame(animationId); animationId = 0; }
    updateMeters(); drawCombinedGraph();
  });
  audio.addEventListener('ended', () => {
    play.textContent = '▶ Play'; seek.value = 0;
    if (animationId) { cancelAnimationFrame(animationId); animationId = 0; }
    updateMeters(); drawCombinedGraph();
  });
  audio.addEventListener('loadedmetadata', () => { time.textContent = `0:00 / ${fmtTime(audio.duration)}`; });
  audio.addEventListener('timeupdate', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      seek.value = Math.round(audio.currentTime / audio.duration * 1000);
      time.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    }
  });
  seek.addEventListener('input', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = Number(seek.value) / 1000 * audio.duration;
  });
  audio.addEventListener('error', () => { status.textContent = 'หาไฟล์เสียงไม่พบ — ตรวจสอบ assets/filter-demo.wav'; });

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(drawCombinedGraph);
    observer.observe(canvas.parentElement);
  } else {
    window.addEventListener('resize', drawCombinedGraph);
  }
  applySettings();
  drawCombinedGraph();
}


function renderGainStageLesson() {
  lessonContent.innerHTML = `
    <div class="lesson-page-heading"><h1>Gain Stage</h1></div>

    <article class="content-card">
      <h3>Gain Staging คืออะไร?</h3>
      <p>Gain Staging คือ กระบวนการจัดการและควบคุมระดับความดังของสัญญาณเสียงในแต่ละขั้นตอนของระบบเสียงให้เหมาะสม ตั้งแต่แหล่งกำเนิดเสียง การรับสัญญาณ การประมวลผลเสียง ไปจนถึงการส่งสัญญาณออกไปยังอุปกรณ์ปลายทาง เพื่อให้สัญญาณเสียงมีความดังเพียงพอ ไม่เบาจนเกินไป และไม่ดังจนเกิดความผิดเพี้ยนของเสียง</p>
      <div class="gain-definition-grid">
        <div class="gain-definition"><strong>GAIN</strong><p>การปรับเพิ่มหรือลดระดับของสัญญาณเสียง ณ จุดใดจุดหนึ่ง โดยมักใช้กับระดับสัญญาณขาเข้า (Input) เช่น ปุ่ม Gain หรือ Trim บนมิกเซอร์</p></div>
        <div class="gain-definition"><strong>LEVEL</strong><p>ระดับความแรงหรือระดับความดังของสัญญาณเสียงที่จุดใดจุดหนึ่งในระบบ เช่น Input Level, Channel Level หรือ Output Level</p></div>
        <div class="gain-definition"><strong>HEADROOM</strong><p>ระยะห่างระหว่างระดับสัญญาณเสียงที่ใช้งานอยู่ กับระดับสูงสุดที่ระบบสามารถรองรับได้ก่อนเกิดความผิดเพี้ยนหรือ Clipping</p></div>
      </div>
    </article>

    <section class="gain-lab" aria-labelledby="gainLabTitle">
      <div class="gain-lab-heading">
        <span class="gain-eyebrow">INTERACTIVE MIXER EXPERIMENT</span>
        <h2 id="gainLabTitle">ลองปรับ Gain Staging</h2>
        <p>เล่นเสียงตัวอย่าง แล้วปรับ Gain เพื่อเปรียบเทียบระดับสัญญาณก่อนและหลังการปรับ เหมือนดูมิเตอร์บนมิกเซอร์</p>
      </div>

      <div class="gain-console">
        <div class="gain-console-top">
          <div><span class="gain-live-dot"></span> SIGNAL FLOW</div>
          <span class="gain-console-tag">INPUT → GAIN → OUTPUT</span>
        </div>

        <div class="gain-meter-grid">
          <section class="gain-meter-channel">
            <div class="gain-meter-title"><span>INPUT</span><small>PRE GAIN</small></div>
            <div class="gain-meter-body">
              <div class="gain-scale"><span>0</span><span>-6</span><span>-12</span><span>-18</span><span>-24</span><span>-36</span><span>-48</span><span>-60</span></div>
              <div class="gain-led-meter" id="gainInputMeter" role="meter" aria-label="Input level" aria-valuemin="-60" aria-valuemax="0" aria-valuenow="-60"></div>
              <div class="gain-meter-readout"><strong id="gainInputDb">−∞</strong><small>dBFS</small></div>
            </div>
            <div class="gain-meter-foot">ระดับสัญญาณก่อนปรับ Gain</div>
          </section>

          <div class="gain-flow-arrow" aria-hidden="true">→</div>

          <section class="gain-meter-channel gain-output-channel">
            <div class="gain-meter-title"><span>OUTPUT</span><small>POST GAIN</small></div>
            <div class="gain-meter-body">
              <div class="gain-scale"><span>0</span><span>-6</span><span>-12</span><span>-18</span><span>-24</span><span>-36</span><span>-48</span><span>-60</span></div>
              <div class="gain-led-meter" id="gainOutputMeter" role="meter" aria-label="Output level" aria-valuemin="-60" aria-valuemax="0" aria-valuenow="-60"></div>
              <div class="gain-meter-readout"><strong id="gainOutputDb">−∞</strong><small>dBFS</small></div>
            </div>
            <div class="gain-meter-foot">ระดับสัญญาณหลังปรับ Gain</div>
          </section>
        </div>

        <div class="gain-status-row">
          <div class="gain-status-cell"><span>HEADROOM</span><strong id="gainHeadroom">— dB</strong></div>
          <div class="gain-status-cell"><span>PEAK HOLD</span><strong id="gainPeak">−∞ dBFS</strong></div>
          <div class="gain-status-cell gain-clip-cell" id="gainClipCell"><span>CLIPPING</span><strong id="gainClip">SAFE</strong></div>
        </div>

        <div class="gain-control-area">
          <div class="gain-control-heading">
            <label for="gainAmount">GAIN / TRIM</label>
            <output id="gainAmountValue">0.0 dB</output>
          </div>
          <input id="gainAmount" class="gain-slider" type="range" min="-24" max="24" step="0.5" value="0">
          <div class="gain-range-labels"><span>−24 dB</span><span>0 dB</span><span>+24 dB</span></div>
          <div class="gain-presets">
            <button type="button" data-gain-preset="-12">−12 dB</button>
            <button type="button" data-gain-preset="0" class="active">UNITY</button>
            <button type="button" data-gain-preset="6">+6 dB</button>
            <button type="button" data-gain-preset="12">+12 dB</button>
          </div>
        </div>

        <div class="gain-audio-player">
          <div class="gain-audio-title"><strong>DEMO AUDIO</strong><span>ใช้เสียงตัวอย่างเดียวกับ Filter และ EQ</span></div>
          <audio id="gainDemoAudio" preload="metadata" src="assets/filter-demo.wav"></audio>
          <div class="gain-player-controls">
            <button id="gainPlayPause" type="button">▶ Play</button>
            <input id="gainAudioSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="ตำแหน่งเสียง">
            <span id="gainAudioTime">0:00 / 0:00</span>
          </div>
          <p id="gainAudioStatus" class="gain-audio-status">กด Play เพื่อเริ่มดูระดับสัญญาณ Input และ Output</p>
        </div>
      </div>
      <p class="gain-note"><strong>ข้อควรรู้:</strong> 0 dBFS คือระดับสูงสุดในระบบดิจิทัล หากสัญญาณพยายามเกินค่านี้จะเกิด Clipping การเพิ่ม Gain ไม่ได้เพิ่ม Headroom แต่ทำให้ระดับสัญญาณเข้าใกล้ขีดจำกัดมากขึ้น</p>
    </section>
  `;
  initGainStageLab();
}

function initGainStageLab() {
  const audio = document.getElementById("gainDemoAudio");
  const play = document.getElementById("gainPlayPause");
  const seek = document.getElementById("gainAudioSeek");
  const time = document.getElementById("gainAudioTime");
  const status = document.getElementById("gainAudioStatus");
  const slider = document.getElementById("gainAmount");
  const sliderValue = document.getElementById("gainAmountValue");
  const inputMeter = document.getElementById("gainInputMeter");
  const outputMeter = document.getElementById("gainOutputMeter");
  const inputDb = document.getElementById("gainInputDb");
  const outputDb = document.getElementById("gainOutputDb");
  const headroom = document.getElementById("gainHeadroom");
  const peakReadout = document.getElementById("gainPeak");
  const clipCell = document.getElementById("gainClipCell");
  const clipReadout = document.getElementById("gainClip");
  let context, source, inputAnalyser, outputAnalyser, gainNode;
  let inputData, outputData, raf = 0, peakHold = -Infinity, peakTimer = 0;
  let outputPeakHold = -Infinity;

  const fmtTime = value => {
    if (!Number.isFinite(value)) return "0:00";
    const m = Math.floor(value / 60);
    const sec = Math.floor(value % 60);
    return `${m}:${String(sec).padStart(2,"0")}`;
  };
  const db = value => value > 0.00001 ? 20 * Math.log10(value) : -Infinity;
  const fmtDb = value => Number.isFinite(value) ? `${value.toFixed(1)}` : "−∞";
  const setMeter = (element, level) => {
    const dbLevel = Math.max(-60, Math.min(0, level));
    const active = Math.round((dbLevel + 60) / 60 * 30);
    const segments = element.children;
    for (let i = 0; i < segments.length; i++) {
      const lit = i < active;
      segments[i].classList.toggle("lit", lit);
      segments[i].classList.toggle("hot", lit && i >= 24);
      segments[i].classList.toggle("red", lit && i >= 28);
    }
    element.setAttribute("aria-valuenow", Number.isFinite(level) ? Math.max(-60, Math.min(0, level)).toFixed(1) : "-60");
  };
  const makeSegments = element => {
    element.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const seg = document.createElement("i");
      element.appendChild(seg);
    }
  };
  makeSegments(inputMeter);
  makeSegments(outputMeter);

  function setupAudio() {
    if (context) return true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      status.textContent = "เบราว์เซอร์นี้ไม่รองรับ Web Audio API";
      return false;
    }
    try {
      context = new AudioContextClass();
      source = context.createMediaElementSource(audio);
      inputAnalyser = context.createAnalyser();
      outputAnalyser = context.createAnalyser();
      inputAnalyser.fftSize = outputAnalyser.fftSize = 2048;
      inputAnalyser.smoothingTimeConstant = outputAnalyser.smoothingTimeConstant = 0.65;
      gainNode = context.createGain();
      source.connect(inputAnalyser);
      inputAnalyser.connect(gainNode);
      gainNode.connect(outputAnalyser);
      outputAnalyser.connect(context.destination);
      inputData = new Float32Array(inputAnalyser.fftSize);
      outputData = new Float32Array(outputAnalyser.fftSize);
      return true;
    } catch (error) {
      console.error(error);
      status.textContent = "เริ่มระบบเสียงไม่ได้ กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง";
      return false;
    }
  }

  function measure(analyser, data) {
    analyser.getFloatTimeDomainData(data);
    let sum = 0, peak = 0;
    for (let i = 0; i < data.length; i++) {
      const v = Math.abs(data[i]);
      if (v > peak) peak = v;
      sum += data[i] * data[i];
    }
    const rms = Math.sqrt(sum / data.length);
    return { rmsDb: db(rms), peakDb: db(peak), peak };
  }

  function drawMeters() {
    if (!context || audio.paused || audio.ended) {
      raf = 0;
      return;
    }
    const input = measure(inputAnalyser, inputData);
    const output = measure(outputAnalyser, outputData);
    setMeter(inputMeter, input.rmsDb);
    setMeter(outputMeter, output.rmsDb);
    inputDb.textContent = fmtDb(input.rmsDb);
    outputDb.textContent = fmtDb(output.rmsDb);
    headroom.textContent = Number.isFinite(output.peakDb) ? `${Math.max(0, -output.peakDb).toFixed(1)} dB` : "60+ dB";
    if (input.peakDb > peakHold) {
      peakHold = input.peakDb;
      peakTimer = performance.now();
    } else if (performance.now() - peakTimer > 1500) {
      peakHold = Math.max(input.peakDb, peakHold - 0.15);
    }
    if (output.peakDb > outputPeakHold) outputPeakHold = output.peakDb;
    else if (performance.now() - peakTimer > 1500) outputPeakHold = Math.max(output.peakDb, outputPeakHold - 0.15);
    peakReadout.textContent = `${fmtDb(outputPeakHold)} dBFS`;
    const clipping = output.peak >= 0.999;
    clipCell.classList.toggle("clipping", clipping);
    clipReadout.textContent = clipping ? "CLIPPING" : "SAFE";
    raf = requestAnimationFrame(drawMeters);
  }

  function updateGain() {
    const value = Number(slider.value);
    gainNode && (gainNode.gain.setTargetAtTime(Math.pow(10, value / 20), context.currentTime, 0.015));
    sliderValue.textContent = `${value > 0 ? "+" : ""}${value.toFixed(1)} dB`;
    document.querySelectorAll("[data-gain-preset]").forEach(button => {
      button.classList.toggle("active", Number(button.dataset.gainPreset) === value);
    });
    if (!audio.paused) status.textContent = `กำลังปรับ Gain ${value > 0 ? "+" : ""}${value.toFixed(1)} dB`;
  }

  slider.addEventListener("input", updateGain);
  document.querySelectorAll("[data-gain-preset]").forEach(button => {
    button.addEventListener("click", () => {
      slider.value = button.dataset.gainPreset;
      updateGain();
    });
  });

  play.addEventListener("click", async () => {
    if (!setupAudio()) return;
    try {
      if (context.state === "suspended") await context.resume();
      if (audio.paused) {
        await audio.play();
        play.textContent = "Ⅱ Pause";
        status.textContent = "กำลังแสดงระดับสัญญาณแบบเรียลไทม์";
        if (!raf) raf = requestAnimationFrame(drawMeters);
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error(error);
      status.textContent = "เล่นเสียงไม่ได้ กรุณาตรวจสอบไฟล์ assets/filter-demo.wav";
    }
  });
  audio.addEventListener("play", () => {
    play.textContent = "Ⅱ Pause";
    if (!raf) raf = requestAnimationFrame(drawMeters);
  });
  audio.addEventListener("pause", () => {
    play.textContent = "▶ Play";
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  });
  audio.addEventListener("ended", () => {
    play.textContent = "▶ Play";
    seek.value = 0;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  });
  audio.addEventListener("loadedmetadata", () => {
    time.textContent = `0:00 / ${fmtTime(audio.duration)}`;
  });
  audio.addEventListener("timeupdate", () => {
    if (audio.duration > 0) {
      seek.value = Math.round(audio.currentTime / audio.duration * 1000);
      time.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    }
  });
  seek.addEventListener("input", () => {
    if (audio.duration > 0) audio.currentTime = Number(seek.value) / 1000 * audio.duration;
  });
  audio.addEventListener("error", () => {
    status.textContent = "หาไฟล์เสียงไม่พบ — ตรวจสอบ assets/filter-demo.wav";
  });
  updateGain();
}

function renderEQLesson() {
  lessonContent.innerHTML = `
    <div class="lesson-page-heading"><h1>EQ (Equalizer)</h1></div>
    <article class="content-card eq-theory-card">
      <h3>EQ คืออะไร?</h3>
      <p>EQ (Equalizer) คือเครื่องมือที่ใช้ปรับเพิ่มหรือลดระดับความถี่ในช่วงต่าง ๆ ของเสียง เพื่อเปลี่ยนโทน ลักษณะ และคุณภาพของเสียงให้ตรงกับความต้องการ เช่น เพิ่มย่านต่ำ ลดเสียงขุ่น หรือเพิ่มรายละเอียดของย่านสูง</p>
      <h4>หน้าที่หลักของ EQ</h4>
      <ul class="filter-bullet-list">
        <li>ปรับโทนเสียงให้ทุ้ม หนา บาง ใส หรือสว่างตามต้องการ</li>
        <li>แก้ปัญหาเสียงไม่ชัด เสียงขุ่น เสียงอู้ หรือเสียงแหลมบาดหู</li>
        <li>เพิ่มความชัดเจนของเสียงพูดและเสียงดนตรี</li>
        <li>ปรับสมดุลไม่ให้ย่านใดย่านหนึ่งเด่นหรือกลบเสียงอื่นมากเกินไป</li>
        <li>สร้างบุคลิกเสียงให้เหมาะกับงาน เช่น เสียงพูดในห้องประชุมหรือเสียงร้องเพลง</li>
      </ul>
      <h4>หลักการทำงาน: Boost และ Cut</h4>
      <p><strong>Boost</strong> คือเพิ่มระดับความดังของย่านความถี่ที่เลือก ส่วน <strong>Cut</strong> คือลดระดับความดังของย่านความถี่นั้น โดยค่าการเปลี่ยนแปลงวัดเป็น dB</p>
      <h4>ค่าที่ใช้ในการปรับ EQ</h4>
      <ul class="filter-bullet-list">
        <li><strong>Frequency (Hz):</strong> กำหนดตำแหน่งความถี่ที่ต้องการปรับ</li>
        <li><strong>Gain (dB):</strong> กำหนดว่าจะ Boost หรือ Cut มากน้อยเพียงใด</li>
        <li><strong>Q (Quality Factor):</strong> กำหนดความกว้างของช่วงความถี่ที่ได้รับผล — Q ต่ำจะกว้าง ส่วน Q สูงจะแคบและเจาะจงมากขึ้น</li>
      </ul>
      <h4>ตัวอย่างการใช้งาน</h4>
      <p>EQ สามารถใช้ลดความถี่ที่ทำให้เกิดเสียงหอน (Feedback) และปรับย่านความถี่เพื่อช่วยให้เสียงพูดชัดเจนขึ้น ทั้งนี้ควรฟังเปรียบเทียบก่อนและหลังปรับทุกครั้ง</p>
    </article>

    <section class="eq-lab-panel" aria-labelledby="eqLabTitle">
      <div class="eq-lab-head">
        <div><span class="filter-lab-eyebrow">INTERACTIVE EXPERIMENT</span><h2 id="eqLabTitle">Parametric EQ Lab</h2><p>คลิกบนกราฟเพื่อเพิ่มจุด EQ แล้วลากจุดเพื่อ Boost / Cut ได้ทันที</p></div>
        <div class="eq-live-state"><i></i> LIVE EQ</div>
      </div>
      <div class="eq-chart-shell">
        <div class="eq-chart-top"><span>REAL-TIME SPECTRUM + EQ RESPONSE</span><span>20 Hz — 20 kHz</span></div>
        <canvas id="eqResponseChart" role="img" aria-label="กราฟ Parametric Equalizer สามารถคลิกเพิ่มและลากจุดปรับ EQ ได้"></canvas>
        <div class="eq-chart-foot"><span><i class="eq-legend-spectrum"></i> Live Spectrum (เสียงจริง)</span><span><i class="eq-legend-curve"></i> EQ Curve</span><span><i class="eq-legend-speech"></i> ย่านความถี่เสียงพูดโดยประมาณ</span></div>
      </div>
      <div class="eq-speech-guide"><strong>ช่วงความถี่ของเสียงพูด</strong><span class="eq-speech-band"><b>100–300 Hz</b> น้ำหนักและความหนา</span><span class="eq-speech-band"><b>300 Hz–1 kHz</b> เนื้อเสียง</span><span class="eq-speech-band"><b>1–5 kHz</b> ความชัดและความเข้าใจคำพูด</span><span class="eq-speech-band"><b>5–8 kHz</b> รายละเอียดและเสียงเสียดแทรก</span><small>ช่วงเหล่านี้เป็นแนวทางโดยประมาณ ไม่ใช่ขอบเขตตายตัวของเสียงพูดทุกคน</small></div>
      <div class="eq-tools-row">
        <button id="eqAddBand" class="eq-action-button" type="button">＋ Add Band</button>
        <button id="eqRemoveBand" class="eq-action-button secondary" type="button">− Remove Selected</button>
        <button id="eqReset" class="eq-action-button secondary" type="button">Reset EQ</button>
        <span id="eqBandCount">4 bands</span>
      </div>
      <div class="eq-selected-panel">
        <div class="eq-selected-title"><strong id="eqSelectedName">Band 1</strong><span id="eqSelectedMode">PEAKING</span></div>
        <div class="eq-control-grid">
          <label class="eq-control"><span>Filter Type</span><select id="eqBandType"><option value="peaking">Bell / Peaking</option><option value="lowshelf">Low Shelf</option><option value="highshelf">High Shelf</option><option value="notch">Notch</option></select></label>
          <label class="eq-control"><span>Frequency <output id="eqFreqValue">250 Hz</output></span><input id="eqFrequency" type="range" min="20" max="20000" value="250" step="1"></label>
          <label class="eq-control"><span>Gain <output id="eqGainValue">0.0 dB</output></span><input id="eqGain" type="range" min="-18" max="18" value="0" step="0.1"></label>
          <label class="eq-control"><span>Q <output id="eqQValue">1.0</output></span><input id="eqQ" type="range" min="0.1" max="12" value="1" step="0.1"></label>
        </div>
        <p class="eq-hint">ทิป: ลากจุดขึ้น/ลงเพื่อปรับ Gain และลากซ้าย/ขวาเพื่อเปลี่ยน Frequency · คลิกพื้นที่ว่างบนกราฟเพื่อเพิ่ม Band</p>
      </div>
      <div class="eq-audio-box">
        <div class="eq-audio-title"><strong>DEMO AUDIO</strong><span>ใช้เสียงตัวอย่างเดียวกับหน้า Filter</span></div>
        <audio id="eqDemoAudio" preload="metadata" src="assets/filter-demo.wav"></audio>
        <div class="filter-player-controls"><button id="eqPlayPause" type="button">▶ Play</button><input id="eqAudioSeek" type="range" min="0" max="1000" value="0" step="1" aria-label="ตำแหน่งเสียง"><span id="eqAudioTime">0:00 / 0:00</span></div>
        <p id="eqAudioStatus" class="filter-audio-status">กด Play เพื่อฟังเสียงผ่าน EQ ที่กำลังปรับ</p>
      </div>
      <div class="eq-readout" id="eqReadout">4 EQ bands · Flat response</div>
    </section>
  `;
  initEQLab();
}

function initEQLab() {
  const canvas = document.getElementById('eqResponseChart');
  const ctx = canvas.getContext('2d');
  const audio = document.getElementById('eqDemoAudio');
  const play = document.getElementById('eqPlayPause');
  const seek = document.getElementById('eqAudioSeek');
  const time = document.getElementById('eqAudioTime');
  const status = document.getElementById('eqAudioStatus');
  const typeInput = document.getElementById('eqBandType');
  const freqInput = document.getElementById('eqFrequency');
  const gainInput = document.getElementById('eqGain');
  const qInput = document.getElementById('eqQ');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const minFreq = 20, maxFreq = 20000, minDb = -24, maxDb = 24, sampleCount = 1000;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmtFreq = f => f >= 1000 ? `${(f/1000).toFixed(f>=10000?1:2).replace(/\.0+$/,'')} kHz` : `${Math.round(f)} Hz`;
  const fmtTime = t => `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
  let bands = [
    {type:'lowshelf',frequency:120,gain:0,q:0.8},
    {type:'peaking',frequency:350,gain:0,q:1.0},
    {type:'peaking',frequency:2500,gain:0,q:1.2},
    {type:'highshelf',frequency:8000,gain:0,q:0.8}
  ];
  let selected = 1, dragging = false, audioContext = null, source = null, nodes = [];
  let analyser = null, spectrumData = null, animationId = 0, responseCache = null;
  try {
    if (AudioContextClass) audioContext = new AudioContextClass();
    if (audioContext) {
      source = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 8192;
      analyser.smoothingTimeConstant = 0.78;
      spectrumData = new Float32Array(analyser.frequencyBinCount);
      rebuildChain();
    }
  } catch (e) { console.error(e); status.textContent = 'Web Audio API ไม่พร้อมใช้งานในเบราว์เซอร์นี้'; }

  function rebuildChain() {
    if (!audioContext || !source) return;
    nodes.forEach(n => { try { n.disconnect(); } catch (_) {} }); nodes = [];
    bands.forEach(b => {
      const n = audioContext.createBiquadFilter();
      n.type = b.type; n.frequency.value = b.frequency; n.gain.value = b.gain; n.Q.value = b.q;
      nodes.push(n);
    });
    source.disconnect(); let prev = source;
    nodes.forEach(n => { prev.connect(n); prev = n; });
    if (analyser) { prev.connect(analyser); analyser.connect(audioContext.destination); }
    else prev.connect(audioContext.destination);
    responseCache = null;
  }
  function response() {
    if (responseCache) return responseCache;
    const frequencies = new Float32Array(sampleCount);
    for(let i=0;i<sampleCount;i++) frequencies[i]=minFreq*Math.pow(maxFreq/minFreq,i/(sampleCount-1));
    const magnitude = new Float32Array(sampleCount).fill(1);
    if (!audioContext) return {frequencies,db:new Float32Array(sampleCount)};
    const mag = new Float32Array(sampleCount), phase = new Float32Array(sampleCount);
    bands.forEach(b => {
      const n=audioContext.createBiquadFilter(); n.type=b.type; n.frequency.value=b.frequency; n.gain.value=b.gain; n.Q.value=b.q;
      n.getFrequencyResponse(frequencies,mag,phase);
      for(let i=0;i<sampleCount;i++) magnitude[i]*=mag[i];
      n.disconnect();
    });
    const db = new Float32Array(sampleCount);
    for(let i=0;i<sampleCount;i++) db[i]=20*Math.log10(Math.max(magnitude[i],1e-8));
    responseCache = {frequencies,db};
    return responseCache;
  }
  function geometry() {
    const r=canvas.getBoundingClientRect(), w=r.width, h=390;
    const pad={left:58,right:58,top:22,bottom:48};
    const pw=w-pad.left-pad.right, ph=h-pad.top-pad.bottom;
    const x=f=>pad.left+Math.log10(f/minFreq)/Math.log10(maxFreq/minFreq)*pw;
    const y=db=>pad.top+(maxDb-clamp(db,minDb,maxDb))/(maxDb-minDb)*ph;
    const fAt=px=>minFreq*Math.pow(maxFreq/minFreq,clamp((px-pad.left)/pw,0,1));
    return {r,w,h,pad,pw,ph,x,y,fAt};
  }
  function draw() {
    const r=canvas.getBoundingClientRect(); if(!r.width)return;
    const dpr=Math.max(1,window.devicePixelRatio||1), g=geometry();
    canvas.width=Math.round(g.w*dpr); canvas.height=Math.round(g.h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,g.w,g.h); ctx.fillStyle='#11100f';ctx.fillRect(0,0,g.w,g.h);
    // Highlight approximate speech spectrum and intelligibility region.
    const speechX1=g.x(100), speechX2=g.x(8000), intelX1=g.x(1000), intelX2=g.x(5000);
    ctx.fillStyle='rgba(86,170,190,.075)';ctx.fillRect(speechX1,g.pad.top,speechX2-speechX1,g.ph);
    ctx.fillStyle='rgba(86,190,160,.12)';ctx.fillRect(intelX1,g.pad.top,intelX2-intelX1,g.ph);
    ctx.font='10px Kanit,sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(143,207,213,.8)';ctx.fillText('SPEECH RANGE', (speechX1+speechX2)/2,g.pad.top+13);
    ctx.fillStyle='rgba(141,220,184,.9)';ctx.fillText('INTELLIGIBILITY', (intelX1+intelX2)/2,g.pad.top+28);
    ctx.font='11px Montserrat,sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
    for(let db=-24;db<=24;db+=6){const yy=g.y(db);ctx.strokeStyle=db===0?'rgba(255,255,255,.35)':'rgba(255,255,255,.09)';ctx.beginPath();ctx.moveTo(g.pad.left,yy);ctx.lineTo(g.w-g.pad.right,yy);ctx.stroke();ctx.fillStyle='#a99d91';ctx.fillText(`${db>0?'+':''}${db} dB`,g.pad.left-9,yy);}
    ctx.textAlign='left';ctx.fillStyle='#70dcb5';ctx.font='10px Montserrat,sans-serif';[-100,-75,-50,-25,0].forEach(v=>{const yy=g.pad.top+(0-v)/100*g.ph;ctx.fillText(`${v} dBFS`,g.w-g.pad.right+7,yy);});
    const ticks=[20,50,100,200,500,1000,2000,5000,10000,20000];ctx.textAlign='center';ctx.textBaseline='top';
    ticks.forEach(f=>{const xx=g.x(f);ctx.strokeStyle='rgba(255,255,255,.08)';ctx.beginPath();ctx.moveTo(xx,g.pad.top);ctx.lineTo(xx,g.pad.top+g.ph);ctx.stroke();ctx.fillStyle='#b5a99d';ctx.fillText(f>=1000?`${f/1000}k`:String(f),xx,g.pad.top+g.ph+11);});
    // Live FFT spectrum from the audio AFTER the EQ chain.
    if (analyser && spectrumData && !audio.paused && !audio.ended) {
      analyser.getFloatFrequencyData(spectrumData);
      const nyquist = audioContext.sampleRate / 2;
      const binHz = audioContext.sampleRate / analyser.fftSize;
      const spectrumPoints = [];
      for (let i = 1; i < spectrumData.length; i++) {
        const hz = i * binHz;
        if (hz < minFreq || hz > maxFreq) continue;
        const dbfs = Number.isFinite(spectrumData[i]) ? spectrumData[i] : -100;
        const normalized = clamp((dbfs + 100) / 100, 0, 1);
        spectrumPoints.push([g.x(hz), g.pad.top + (1 - normalized) * g.ph]);
      }
      if (spectrumPoints.length) {
        const gradient = ctx.createLinearGradient(0, g.pad.top, 0, g.pad.top + g.ph);
        gradient.addColorStop(0, 'rgba(91,220,174,.42)');
        gradient.addColorStop(1, 'rgba(91,220,174,.015)');
        ctx.beginPath();
        ctx.moveTo(spectrumPoints[0][0], g.pad.top + g.ph);
        spectrumPoints.forEach(([x,y]) => ctx.lineTo(x,y));
        ctx.lineTo(spectrumPoints[spectrumPoints.length-1][0], g.pad.top + g.ph);
        ctx.closePath(); ctx.fillStyle = gradient; ctx.fill();
        ctx.beginPath();
        spectrumPoints.forEach(([x,y],i) => { if (!i) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
        ctx.strokeStyle = '#62d9ad'; ctx.lineWidth = 1.8;
        ctx.shadowColor = 'rgba(98,217,173,.45)'; ctx.shadowBlur = 7; ctx.stroke(); ctx.shadowBlur = 0;
      }
    }
    const {frequencies,db}=response();
    ctx.beginPath();for(let i=0;i<sampleCount;i++){const xx=g.x(frequencies[i]),yy=g.y(db[i]);if(!i)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);}ctx.strokeStyle='#ffb15f';ctx.lineWidth=2.6;ctx.shadowColor='rgba(255,177,95,.45)';ctx.shadowBlur=8;ctx.stroke();ctx.shadowBlur=0;
    bands.forEach((b,i)=>{const xx=g.x(b.frequency), yy=g.y(b.gain);const hue=i===selected?'#fff0d7':`hsl(${(i*67+28)%360} 78% 66%)`;ctx.beginPath();ctx.arc(xx,yy,i===selected?9:7,0,Math.PI*2);ctx.fillStyle=hue;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#21170f';ctx.stroke();if(i===selected){ctx.beginPath();ctx.arc(xx,yy,13,0,Math.PI*2);ctx.strokeStyle='rgba(255,190,120,.65)';ctx.stroke();}});
    ctx.fillStyle='#c7b8a8';ctx.font='11px Kanit,sans-serif';ctx.textAlign='center';ctx.fillText('Frequency (Hz) · คลิกเพิ่ม Band / ลากจุดเพื่อปรับ',g.pad.left+g.pw/2,g.h-8);
    document.getElementById('eqBandCount').textContent=`${bands.length} bands`;
    document.getElementById('eqReadout').textContent=`${bands.length} EQ bands · ${bands.filter(b=>b.gain!==0).length} active adjustments · selected: ${fmtFreq(bands[selected].frequency)} / ${bands[selected].gain>0?'+':''}${bands[selected].gain.toFixed(1)} dB`;
  }
  function syncControls() {
    const b=bands[selected]; if(!b)return;
    typeInput.value=b.type;freqInput.value=b.frequency;gainInput.value=b.gain;qInput.value=b.q;
    qInput.disabled = b.type === 'lowshelf' || b.type === 'highshelf';
    document.getElementById('eqQValue').textContent = qInput.disabled ? 'N/A' : b.q.toFixed(1);
    document.getElementById('eqSelectedName').textContent=`Band ${selected+1}`;
    document.getElementById('eqSelectedMode').textContent=b.type.toUpperCase();
    document.getElementById('eqFreqValue').textContent=fmtFreq(b.frequency);
    document.getElementById('eqGainValue').textContent=`${b.gain>0?'+':''}${b.gain.toFixed(1)} dB`;
    document.getElementById('eqRemoveBand').disabled=bands.length<=1;
    draw();
  }
  function updateSelected() {
    const b=bands[selected];b.type=typeInput.value;b.frequency=Number(freqInput.value);b.gain=Number(gainInput.value);b.q=Number(qInput.value);
    document.getElementById('eqSelectedMode').textContent=b.type.toUpperCase();
    qInput.disabled = b.type === 'lowshelf' || b.type === 'highshelf';
    document.getElementById('eqQValue').textContent = qInput.disabled ? 'N/A' : b.q.toFixed(1);
    document.getElementById('eqFreqValue').textContent=fmtFreq(b.frequency);
    document.getElementById('eqGainValue').textContent=`${b.gain>0?'+':''}${b.gain.toFixed(1)} dB`;
    rebuildChain();draw();
  }
  [typeInput,freqInput,gainInput,qInput].forEach(el=>el.addEventListener('input',updateSelected));
  document.getElementById('eqAddBand').addEventListener('click',()=>{
    bands.push({type:'peaking',frequency:1000,gain:0,q:1});selected=bands.length-1;syncControls();
  });
  document.getElementById('eqRemoveBand').addEventListener('click',()=>{
    if(bands.length<=1)return;bands.splice(selected,1);selected=Math.min(selected,bands.length-1);rebuildChain();syncControls();
  });
  document.getElementById('eqReset').addEventListener('click',()=>{
    bands=[{type:'lowshelf',frequency:120,gain:0,q:.8},{type:'peaking',frequency:350,gain:0,q:1},{type:'peaking',frequency:2500,gain:0,q:1.2},{type:'highshelf',frequency:8000,gain:0,q:.8}];selected=1;rebuildChain();syncControls();
  });
  function pointerPos(e){const g=geometry();return {x:e.clientX-g.r.left,y:e.clientY-g.r.top,g};}
  function closestBand(pos){let idx=-1,dist=Infinity;bands.forEach((b,i)=>{const dx=pos.x-pos.g.x(b.frequency),dy=pos.y-pos.g.y(b.gain),d=Math.hypot(dx,dy);if(d<dist){dist=d;idx=i;}});return dist<25?idx:-1;}
  canvas.style.touchAction='none';
  canvas.addEventListener('pointerdown',e=>{
    const pos=pointerPos(e),hit=closestBand(pos);
    if(hit>=0){selected=hit;dragging=true;canvas.setPointerCapture(e.pointerId);syncControls();}
    else {
      const f=clamp(pos.g.fAt(pos.x),20,20000), gain=clamp((pos.g.pad.top+pos.g.ph/2-pos.y)/pos.g.ph*(maxDb-minDb),-12,12);
      bands.push({type:'peaking',frequency:f,gain,q:1});selected=bands.length-1;dragging=true;canvas.setPointerCapture(e.pointerId);syncControls();
    }
    movePoint(e);
  });
  canvas.addEventListener('pointermove',e=>{if(dragging)movePoint(e);});
  canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
  function movePoint(e){const pos=pointerPos(e),b=bands[selected];b.frequency=clamp(pos.g.fAt(pos.x),20,20000);b.gain=clamp((pos.g.pad.top+pos.g.ph/2-pos.y)/pos.g.ph*(maxDb-minDb),-18,18);freqInput.value=b.frequency;gainInput.value=b.gain;document.getElementById('eqFreqValue').textContent=fmtFreq(b.frequency);document.getElementById('eqGainValue').textContent=`${b.gain>0?'+':''}${b.gain.toFixed(1)} dB`;rebuildChain();draw();}
  function animateSpectrum() {
    if (animationId) cancelAnimationFrame(animationId);
    const frame = () => {
      if (audio.paused || audio.ended) { animationId = 0; draw(); return; }
      draw();
      animationId = requestAnimationFrame(frame);
    };
    animationId = requestAnimationFrame(frame);
  }
  play.addEventListener('click',async()=>{if(!audioContext){status.textContent='ไม่สามารถเริ่ม Web Audio API ได้';return;}try{if(audioContext.state==='suspended')await audioContext.resume();if(audio.paused){await audio.play();play.textContent='Ⅱ Pause';animateSpectrum();}else{audio.pause();play.textContent='▶ Play';}}catch(e){console.error(e);status.textContent='เล่นเสียงไม่ได้ กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง';}});
  audio.addEventListener('play',()=>{play.textContent='Ⅱ Pause';status.textContent='กำลังวิเคราะห์ Spectrum แบบเรียลไทม์จากเสียงที่ผ่าน EQ';animateSpectrum();});audio.addEventListener('pause',()=>{play.textContent='▶ Play';if(animationId){cancelAnimationFrame(animationId);animationId=0;}draw();});audio.addEventListener('ended',()=>{play.textContent='▶ Play';seek.value=0;if(animationId){cancelAnimationFrame(animationId);animationId=0;}draw();});
  audio.addEventListener('loadedmetadata',()=>time.textContent=`0:00 / ${fmtTime(audio.duration)}`);
  audio.addEventListener('timeupdate',()=>{if(audio.duration>0){seek.value=Math.round(audio.currentTime/audio.duration*1000);time.textContent=`${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;}});
  seek.addEventListener('input',()=>{if(audio.duration>0)audio.currentTime=Number(seek.value)/1000*audio.duration;});
  audio.addEventListener('error',()=>status.textContent='หาไฟล์เสียงไม่พบ — ตรวจสอบ assets/filter-demo.wav');
  if('ResizeObserver'in window){const ro=new ResizeObserver(draw);ro.observe(canvas.parentElement);}else window.addEventListener('resize',draw);
  rebuildChain();syncControls();
}

if (selectedTopic) {
  if (topics[selectedTopic]) showLesson(selectedTopic);
  else window.location.replace("audio-processor-lab.html");
}
