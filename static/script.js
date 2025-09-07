/* =========================
   Universities Explorer JS
   (CS Top-10 + Nat Top-30 via JSON)
   ========================= */

/* ---------- DOM hooks ---------- */
const csListEl   = document.getElementById("cs-list");
const csInputEl  = document.getElementById("cs-search");
const csCountEl  = document.getElementById("cs-count");
const csEmptyEl  = document.getElementById("cs-empty");

const natListEl  = document.getElementById("nat-list");
const natInputEl = document.getElementById("nat-search");
const natCountEl = document.getElementById("nat-count");
const natEmptyEl = document.getElementById("nat-empty");

/* ---------- Modal (existing behavior preserved) ---------- */
const overlayEl    = document.getElementById("modal-overlay");
const modalEl      = document.getElementById("modal");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl  = document.getElementById("modal-body");
const modalCloseEl = document.getElementById("modal-close");

function openModal(title) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = `<p class="muted small">Loading…</p>`;
  overlayEl.hidden = false;
  modalEl.hidden = false;
  modalEl.classList.add("show");
}
function closeModal() {
  modalEl.classList.remove("show");
  overlayEl.hidden = true;
  modalEl.hidden = true;
}
overlayEl.addEventListener("click", closeModal);
modalCloseEl.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.hidden) closeModal();
});

/* ---------- Card toggle (existing) ---------- */
function wireCard(cardId, arrowId, panelId) {
  const card = document.getElementById(cardId);
  const headerBtn = card.querySelector(".card-header");
  const arrow = document.getElementById(arrowId);
  const panel = document.getElementById(panelId);
  const rightLabel = headerBtn.querySelector(".muted");

  headerBtn.addEventListener("click", () => {
    const open = panel.classList.toggle("show");
    arrow.classList.toggle("open", open);
    headerBtn.setAttribute("aria-expanded", open ? "true" : "false");
    rightLabel.textContent = open ? "Hide" : "Show";
  });
}

/* ---------- Loaders ---------- */
// CS Top-10 from Jinja bootstrap or /static/cs10_results.json
async function loadCsData() {
  const tag = document.getElementById("bootstrap-cs10");
  if (tag && tag.textContent && tag.textContent.trim().startsWith("{")) {
    const ragData = JSON.parse(tag.textContent);
    const top10 = Object.keys(ragData).slice(0, 10);
    return { top10, ragData };
  }
  const url = window.CS10_JSON_URL || "/static/cs10_results.json";
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  const rows = await res.json();
  const ragData = {};
  const seen = new Set();
  const top10 = [];
  for (const row of rows) {
    const name = (row.school || "").trim();
    if (!name) continue;
    ragData[name] = row.answer || "";
    if (!seen.has(name) && top10.length < 10) { seen.add(name); top10.push(name); }
  }
  return { top10, ragData };
}

// NEW: National Top-30 from Jinja bootstrap or /static/top30_results.json
async function loadNatData() {
  const tag = document.getElementById("bootstrap-nat30");
  if (tag && tag.textContent && tag.textContent.trim().startsWith("{")) {
    const ragData = JSON.parse(tag.textContent);         // { "School": "<Summary/Q&A blob>", ... }
    const list = Object.keys(ragData);                   // whatever length (26 in your set)
    return { list, ragData };
  }
  const url = window.NAT30_JSON_URL || "/static/top30_results.json";
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  const rows = await res.json();                         // [{school, answer}, ...]
  const ragData = {};
  const list = [];
  for (const row of rows) {
    const name = (row.school || "").trim();
    if (!name) continue;
    ragData[name] = row.answer || "";
    list.push(name);
  }
  return { list, ragData };
}

/* ---------- Parser (unchanged, robust to **Summary:** / Q1: / etc.) ---------- */
function normLine(line) {
  let s = String(line || "").replace(/\r/g, "").trim();
  s = s.replace(/^\*{1,3}|\*{1,3}$/g, "");
  s = s.replace(/^[-•]\s*/, "");
  return s;
}
function isSummaryLabel(line){ return /^summary\s*:?\s*$/i.test(line)||/^summary\s*:/i.test(line); }
function isQLabel(line){ return /^(q(uestion)?)\s*\d*\s*:/i.test(line); }
function isALabel(line){ return /^(a(nswer)?)\s*\d*\s*:/i.test(line); }
function getLabelNum(line){ const m=line.match(/^[qa](?:uestion|nswer)?\s*(\d*)\s*:/i); return m&&m[1]?parseInt(m[1],10):null; }
function stripLabel(line){ return line.replace(/^(summary|q(uestion)?\s*\d*|a(nswer)?\s*\d*)\s*:\s*/i,"").trim(); }

function parseAnswerBlob(blob) {
  if (!blob) return { summary: "No summary available.", qas: [] };
  const raw = String(blob).split(/\n+/).map(normLine).filter(Boolean);

  const blocks = [];
  for (const l of raw) {
    if (isSummaryLabel(l)) blocks.push({type:"summary-label"});
    else if (isQLabel(l))  blocks.push({type:"q", n:getLabelNum(l), text:stripLabel(l)});
    else if (isALabel(l))  blocks.push({type:"a", n:getLabelNum(l), text:stripLabel(l)});
    else if (/^summary\s*:/i.test(l)) blocks.push({type:"summary", text:stripLabel(l)});
    else blocks.push({type:"text", text:l});
  }

  let summary = "";
  const after = [];
  let inSum = false;
  for (let i=0;i<blocks.length;i++){
    const b = blocks[i];
    if (b.type==="summary-label"){ inSum=true; continue; }
    if (inSum){
      if (b.type==="q"||b.type==="a"){ inSum=false; i--; continue; }
      if (b.type==="text"||b.type==="summary"){
        summary += (summary ? "\n\n" : "") + b.text;
        continue;
      }
    } else after.push(b);
  }
  if (!summary){
    const lead=[];
    for (const b of blocks){
      if (b.type==="q"||b.type==="a") break;
      if (b.type==="text"||b.type==="summary") lead.push(b.text);
    }
    summary = (lead.join("\n\n").trim()) || "No summary available.";
  }

  const qas = [];
  const pending = new Map();
  for (const b of after){
    if (b.type==="q"){
      const idx = qas.push({q:b.text, a:""})-1;
      if (b.n!=null) pending.set(b.n, idx); else pending.set(`_u_${idx}`, idx);
    } else if (b.type==="a"){
      if (b.n!=null && pending.has(b.n)){
        qas[pending.get(b.n)].a = b.text; pending.delete(b.n);
      } else {
        for (let i=qas.length-1;i>=0;i--){ if (!qas[i].a){ qas[i].a=b.text; break; } }
      }
    }
  }

  summary = summary.replace(/\*\*/g,"");
  qas.forEach(x => { x.q=(x.q||"").replace(/\*\*/g,""); x.a=(x.a||"").replace(/\*\*/g,""); });
  return { summary, qas };
}

/* ---------- Rendering + search ---------- */
const wikiUrl = (name) => `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;

function renderList(targetOl, items, ragMap) {
  targetOl.innerHTML = "";
  items.forEach((name, i) => {
    const li = document.createElement("li");
    li.dataset.school = name;
    li.innerHTML = `
      <span class="rank">${i + 1}</span>
      <div>
        <div class="name">${name}</div>
        <a class="wikilink" href="${wikiUrl(name)}" target="_blank" rel="noreferrer">View on Wikipedia</a>
      </div>`;
    li.addEventListener("click", () => openModalAndRender(name, ragMap));
    li.querySelector(".wikilink").addEventListener("click", (e) => e.stopPropagation());
    targetOl.appendChild(li);
  });
}

function attachSearch(inputEl, listEl, emptyEl, source, ragMap, countEl) {
  function apply() {
    const q = (inputEl.value || "").trim().toLowerCase();
    const filtered = q ? source.filter(s => s.toLowerCase().includes(q)) : source.slice();
    renderList(listEl, filtered, ragMap);
    if (countEl) countEl.textContent = String(filtered.length);
    emptyEl.style.display = filtered.length ? "none" : "block";
  }
  inputEl.addEventListener("input", apply);
  apply();
}

function openModalAndRender(name, ragMap) {
  openModal(name);
  const blob = ragMap ? ragMap[name] : null;
  if (!blob) {
    modalBodyEl.innerHTML = `<p class="muted">No summary/Q&As available for “${name}”.</p>`;
    return;
  }
  const { summary, qas } = parseAnswerBlob(blob);
  modalBodyEl.innerHTML =
    `<section class="summary">
       <strong>Summary:</strong>
       <p>${summary.replace(/\n/g,"<br>")}</p>
     </section>` +
    qas.map(({q,a}) => `
      <div class="qa">
        <h3>Q: ${q}</h3>
        <p>${a}</p>
      </div>`).join("");
}

/* ---------- Boot ---------- */
(async function init() {
  try {
    const [{ top10, ragData: csRag }, { list: natList, ragData: natRag }] = await Promise.all([
      loadCsData(),
      loadNatData()
    ]);

    // Merge both RAG maps so the modal can resolve from either source
    const mergedRag = Object.assign({}, csRag, natRag);

    // CS card (use server prerender if present)
    if (!csListEl.children.length) renderList(csListEl, top10, mergedRag);
    csCountEl.textContent = String(top10.length);
    attachSearch(csInputEl, csListEl, csEmptyEl, top10, mergedRag, csCountEl);

    // National card (JSON-driven now)
    natCountEl.textContent = String(natList.length);
    renderList(natListEl, natList, mergedRag);
    attachSearch(natInputEl, natListEl, natEmptyEl, natList, mergedRag, natCountEl);

    // Expand/collapse arrows (unchanged)
    wireCard("cs-card", "cs-arrow", "cs-panel");
    wireCard("nat-card", "nat-arrow", "nat-panel");
  } catch (err) {
    console.error(err);
    csEmptyEl.textContent = "Failed to load data.";
    csEmptyEl.style.display = "block";
  }
})();
