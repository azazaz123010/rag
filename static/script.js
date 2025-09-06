/* ---------- DOM hooks ---------- */
const listEl   = document.getElementById("cs-list");
const inputEl  = document.getElementById("cs-search");
const countEl  = document.getElementById("cs-count");
const emptyEl  = document.getElementById("cs-empty");

const overlayEl   = document.getElementById("modal-overlay");
const modalEl     = document.getElementById("modal");
const modalTitleEl= document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalCloseEl= document.getElementById("modal-close");

/* ---------- Modal controls ---------- */
function openModal(title) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = `<p class="muted small">Loading…</p>`;
  overlayEl.hidden = false;
  modalEl.hidden = false;
  modalEl.classList.add("show");             // reveal via CSS
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

/* ---------- Data loading ---------- */
/**
 * Priority:
 * 1) Jinja bootstrap <script id="bootstrap-cs10" type="application/json"> … </script>
 * 2) fetch(window.CS10_JSON_URL || "/static/cs10_results.json")
 */
async function loadCsData() {
  const tag = document.getElementById("bootstrap-cs10");
  if (tag && tag.textContent && tag.textContent.trim().startsWith("{")) {
    // Bootstrapped: rag_map = { "School Name": "answer text", ... }
    const ragData = JSON.parse(tag.textContent);
    const top10 = Object.keys(ragData).slice(0, 10);
    return { top10, ragData };
  }

  // Fallback to static JSON (array of objects: [{school, answer}, ...])
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

/* ---------- Answer parsing ---------- */
/** Parse one big blob with "Summary:", "Q1:", "A1:" etc. */
function parseAnswerBlob(blob) {
  if (!blob) return { summary: "No summary available.", qas: [] };

  // Grab Summary paragraph (first "Summary:" or fallback to first paragraph)
  const paragraphs = String(blob).split(/\n\s*\n/);
  const summaryBlock = paragraphs.find(p => /^summary\s*:/i.test(p)) || paragraphs[0] || "";
  const summary = summaryBlock.replace(/^summary\s*:\s*/i, "").trim();

  // Extract Qn/An pairs
  const lines = String(blob).split(/\n+/);
  const qas = [];
  for (let i = 0; i < lines.length; i++) {
    const qMatch = lines[i].match(/^Q\s*:?|^Q(\d+)\s*:/i) ? lines[i].replace(/^Q(\d*)\s*:\s*/i, "") : null;
    if (qMatch !== null) {
      // find next "A..." line
      let aText = "";
      for (let j = i + 1; j < lines.length; j++) {
        if (/^A(\d*)\s*:/i.test(lines[j])) {
          aText = lines[j].replace(/^A(\d*)\s*:\s*/i, "").trim();
          break;
        }
      }
      qas.push({ q: qMatch.trim(), a: aText });
    }
  }

  return { summary: summary || "No summary available.", qas };
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

    // If the list wasn't rendered server-side, render now:
    if (!listEl.children.length) renderList(top10, ragData);
    // Wire search (works either way)
    attachSearch(top10, ragData);

    // UX: hide "no matches" initially
    emptyEl.style.display = "none";
  } catch (err) {
    console.error(err);
    emptyEl.textContent = "Failed to load data.";
    emptyEl.style.display = "block";
  }
})();
