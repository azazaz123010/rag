/* =========================
   Universities Explorer JS
   ========================= */

/* ---------- DOM hooks ---------- */
const listEl    = document.getElementById("cs-list");
const inputEl   = document.getElementById("cs-search");
const countEl   = document.getElementById("cs-count");
const emptyEl   = document.getElementById("cs-empty");

const overlayEl    = document.getElementById("modal-overlay");
const modalEl      = document.getElementById("modal");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl  = document.getElementById("modal-body");
const modalCloseEl = document.getElementById("modal-close");

/* ---------- Modal controls ---------- */
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

/* ---------- Data loading (Jinja bootstrap -> JSON fetch fallback) ---------- */
async function loadCsData() {
  // 1) Bootstrapped JSON map from Jinja: { "School": "blob with Summary/Q/A", ... }
  const tag = document.getElementById("bootstrap-cs10");
  if (tag && tag.textContent && tag.textContent.trim().startsWith("{")) {
    const ragData = JSON.parse(tag.textContent);
    const top10 = Object.keys(ragData).slice(0, 10);
    return { top10, ragData };
  }

  // 2) Fallback: fetch the array of rows [{ school, answer }, ...]
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
      seen.add(name);
      top10.push(name);
    }
  }
  return { top10, ragData };
}

/* ---------- Normalization + parsing ---------- */
/* Remove markdown **bold**, bullets, and trim */
function normLine(line) {
  let s = String(line || "").replace(/\r/g, "").trim();
  s = s.replace(/^\*{1,3}|\*{1,3}$/g, "");   // **text** -> text
  s = s.replace(/^[-•]\s*/, "");             // - text / • text -> text
  return s;
}
function isSummaryLabel(line) {
  // "Summary", "Summary:", "**Summary:**"
  return /^summary\s*:?\s*$/i.test(line) || /^summary\s*:/i.test(line);
}
function isQLabel(line) {
  // "Q:", "Q1:", "Question:", "Question 2:"
  return /^(q(uestion)?)\s*\d*\s*:/i.test(line);
}
function isALabel(line) {
  // "A:", "A1:", "Answer:", "Answer 2:"
  return /^(a(nswer)?)\s*\d*\s*:/i.test(line);
}
function getLabelNum(line) {
  const m = line.match(/^[qa](?:uestion|nswer)?\s*(\d*)\s*:/i);
  return m && m[1] ? parseInt(m[1], 10) : null;
}
function stripLabel(line) {
  return line.replace(/^(summary|q(uestion)?\s*\d*|a(nswer)?\s*\d*)\s*:\s*/i, "").trim();
}

/** Robust parser for mixed-format blobs (Summary/Q/A) */
function parseAnswerBlob(blob) {
  if (!blob) return { summary: "No summary available.", qas: [] };

  const rawLines = String(blob).split(/\n+/).map(normLine).filter(Boolean);

  // Build typed blocks
  const blocks = [];
  for (const line of rawLines) {
    if (isSummaryLabel(line)) {
      blocks.push({ type: "summary-label" });
    } else if (isQLabel(line)) {
      blocks.push({ type: "q", n: getLabelNum(line), text: stripLabel(line) });
    } else if (isALabel(line)) {
      blocks.push({ type: "a", n: getLabelNum(line), text: stripLabel(line) });
    } else if (/^summary\s*:/i.test(line)) {
      blocks.push({ type: "summary", text: stripLabel(line) });
    } else {
      blocks.push({ type: "text", text: line });
    }
  }

  // Collect summary: text after a "Summary" label (until first Q/A),
  // otherwise leading paragraphs until first Q/A
  let summary = "";
  const after = [];
  let inSummary = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "summary-label") { inSummary = true; continue; }
    if (inSummary) {
      if (b.type === "q" || b.type === "a") { inSummary = false; i--; continue; }
      if (b.type === "text" || b.type === "summary") {
        summary += (summary ? "\n\n" : "") + b.text;
        continue;
      }
    } else {
      after.push(b);
    }
  }
  if (!summary) {
    const lead = [];
    for (const b of blocks) {
      if (b.type === "q" || b.type === "a") break;
      if (b.type === "text" || b.type === "summary") lead.push(b.text);
    }
    summary = (lead.join("\n\n").trim()) || "No summary available.";
  }

  // Pair Q/A: match by number when available; else nearest following A
  const qas = [];
  const pending = new Map(); // number or synthetic key -> index in qas
  for (const b of after) {
    if (b.type === "q") {
      const idx = qas.push({ q: b.text, a: "" }) - 1;
      if (b.n != null) pending.set(b.n, idx);
      else pending.set(`_u_${idx}`, idx);
    } else if (b.type === "a") {
      if (b.n != null && pending.has(b.n)) {
        qas[pending.get(b.n)].a = b.text;
        pending.delete(b.n);
      } else {
        // attach to last unanswered question
        for (let i = qas.length - 1; i >= 0; i--) {
          if (!qas[i].a) { qas[i].a = b.text; break; }
        }
      }
    }
  }

  // Cleanup stray markdown
  summary = summary.replace(/\*\*/g, "");
  qas.forEach(x => {
    x.q = (x.q || "").replace(/\*\*/g, "");
    x.a = (x.a || "").replace(/\*\*/g, "");
  });

  return { summary, qas };
}

/* ---------- Rendering ---------- */
function renderList(items, ragMap) {
  listEl.innerHTML = "";
  items.forEach((name, idx) => {
    const li = document.createElement("li");
    li.dataset.school = name;
    li.innerHTML = `
      <span class="rank">${idx + 1}</span>
      <div>
        <div class="name">${name}</div>
        <a class="wikilink" href="https://en.wikipedia.org/wiki/${encodeURIComponent(name)}" target="_blank" rel="noreferrer">View on Wikipedia</a>
      </div>
    `;
    li.addEventListener("click", () => openModalAndRender(name, ragMap));
    li.querySelector(".wikilink").addEventListener("click", (e) => e.stopPropagation());
    listEl.appendChild(li);
  });
}

function attachSearch(source, ragMap) {
  function apply() {
    const q = (inputEl.value || "").trim().toLowerCase();
    const filtered = q ? source.filter(s => s.toLowerCase().includes(q)) : source.slice();
    renderList(filtered, ragMap);
    countEl.textContent = String(filtered.length);
    emptyEl.style.display = filtered.length ? "none" : "block";
  }
  inputEl.addEventListener("input", apply);
  apply();
}

function openModalAndRender(name, ragMap) {
  openModal(name);
  const blob = ragMap[name];
  if (!blob) {
    modalBodyEl.innerHTML = `<p class="muted">No summary/Q&As available.</p>`;
    return;
  }
  const { summary, qas } = parseAnswerBlob(blob);
  modalBodyEl.innerHTML =
    `<section class="summary">
       <strong>Summary:</strong>
       <p>${summary.replace(/\n/g, "<br>")}</p>
     </section>` +
    qas.map(({ q, a }) => `
      <div class="qa">
        <h3>Q: ${q}</h3>
        <p>${a}</p>
      </div>
    `).join("");
}

/* ---------- Boot ---------- */
(async function init() {
  try {
    const { top10, ragData } = await loadCsData();

    // If server already rendered the list (Jinja), keep it; else render now.
    if (!listEl.children.length) renderList(top10, ragData);

    // Wire search either way
    attachSearch(top10, ragData);

    // Hide "no matches" initially
    emptyEl.style.display = "none";
  } catch (err) {
    console.error(err);
    emptyEl.textContent = "Failed to load data.";
    emptyEl.style.display = "block";
  }
})();
