/* =========================
   Universities Explorer JS
   (merged legacy + new)
   ========================= */

/* ---------- Legacy constants preserved (Nat Top Universities) ---------- */
const natTopUnis = [
  "Princeton University","Massachusetts Institute of Technology","Harvard University",
  "Stanford University","Yale University","California Institute of Technology",
  "Duke University","Johns Hopkins University","Northwestern University",
  "University of Pennsylvania","Cornell University","University of Chicago",
  "Brown University","Columbia University","Dartmouth College",
  "University of California, Los Angeles","University of California, Berkeley",
  "University of Notre Dame","Rice University","Vanderbilt University",
  "Carnegie Mellon University","University of Michigan",
  "University of California, San Diego","New York University",
  "University of Florida","University of Texas at Austin"
];

/* ---------- DOM hooks (both cards) ---------- */
const csListEl   = document.getElementById("cs-list");
const csInputEl  = document.getElementById("cs-search");
const csCountEl  = document.getElementById("cs-count");
const csEmptyEl  = document.getElementById("cs-empty");

const natListEl  = document.getElementById("nat-list");
const natInputEl = document.getElementById("nat-search");
const natCountEl = document.getElementById("nat-count");
const natEmptyEl = document.getElementById("nat-empty");

/* ---------- Modal controls (legacy ids kept) ---------- */
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

/* ---------- Card toggle (legacy) ---------- */
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

/* ---------- Data loading for CS Top-10 (Jinja bootstrap -> JSON fetch) ---------- */
async function loadCsData() {
  // Bootstrapped JSON map from Jinja: { "School": "blob", ... }
  const tag = document.getElementById("bootstrap-cs10");
  if (tag && tag.textContent && tag.textContent.trim().startsWith("{")) {
    const ragData = JSON.parse(tag.textContent);
    const top10 = Object.keys(ragData).slice(0, 10);
    return { top10, ragData };
  }

  // Fallback to static JSON array: [{school, answer}, ...]
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
    if (!seen.has(name) && top10.length < 10) {
      seen.add(name); top10.push(name);
    }
  }
  return { top10, ragData };
}

/* ---------- Normalization + parsing (new) ---------- */
// strip **bold**, bullets, trim
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

  // gather summary
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

  // pair Q/A
  const qas = [];
  const pending = new Map();
  for (const b of after){
    if (b.type==="q"){
      const idx = qas.p
