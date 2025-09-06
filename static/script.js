// ===== Lists you provided =====
const csTop10 = [
  "Massachusetts Institute of Technology",
  "Carnegie Mellon University",
  "Stanford University",
  "University of California, Berkeley",
  "University of Illinois Urbana-Champaign",
  "Georgia Institute of Technology",
  "Cornell University",
  "Princeton University",
  "University of Texas at Austin",
  "University of Washington",
];

const natTopUnis = [
  "Princeton University",
  "Massachusetts Institute of Technology",
  "Harvard University",
  "Stanford University",
  "Yale University",
  "California Institute of Technology",
  "Duke University",
  "Johns Hopkins University",
  "Northwestern University",
  "University of Pennsylvania",
  "Cornell University",
  "University of Chicago",
  "Brown University",
  "Columbia University",
  "Dartmouth College",
  "University of California, Los Angeles",
  "University of California, Berkeley",
  "University of Notre Dame",
  "Rice University",
  "Vanderbilt University",
  "Carnegie Mellon University",
  "University of Michigan",
  "University of California, San Diego",
  "New York University",
  "University of Florida",
  "University of Texas at Austin",
];

// ===== Your RAG content (embedded, no backend needed) =====
const ragData = {
  "Massachusetts Institute of Technology": {
    summary: `The Massachusetts Institute of Technology (MIT) is a prestigious private research university located in Cambridge, Massachusetts. Established in 1861 by William Barton Rogers, MIT was initially set up in Boston to provide "useful knowledge" amidst the burgeoning industrialization of the United States. It adopted a European polytechnic university model and emphasized laboratory instruction in applied science and engineering from the onset. Overcoming various financial challenges in its early years, MIT expanded its programs, student body, and infrastructure, with strong growth momentum seen in the late 19th century under President Francis Amasa Walker. Despite recurring attempts to merge with Harvard, MIT successfully retained its autonomy. In 1916, MIT relocated from Boston to its current campus along the Charles River in Cambridge, funded significantly by donations through the industrialist George Eastman. This new "New Technology" campus, designed by William W. Bosworth, set the stage for MIT’s evolution into a leading research and educational institution.

The MIT campus extends over a mile along the Charles River and is notable for its blend of neoclassical and modernist architecture, including interconnected academic buildings and tunnels that facilitate movement across campus. MIT is known for its strong entrepreneurial culture and has contributed significantly to advancements in technology and science globally. Throughout the 20th century, MIT established itself as a preeminent center for research in emerging fields such as computer science, digital technology, and artificial intelligence. Its role in initiatives like the Human Genome Project highlights its impact on big science and interdisciplinary research. The institution comprises five schools: Science, Engineering, Architecture and Planning, Management, and Humanities, Arts, and Social Sciences, alongside the Schwarzman College of Computing. It has no dedicated schools for law or medicine.

Governed as a state-chartered nonprofit corporation, MIT is overseen by the MIT Corporation, which includes members appointed for various terms and responsible for key administrative and financial decisions. MIT's operations and its sizable endowment are managed by the MIT Investment Management Company. The Institute's energy initiatives and recent developments, such as the 2016 expansion plan for Kendall Square, underscore its commitment to sustainability and urban growth. Historically dubbed "Boston Tech," MIT played a pivotal role under influential figures like Vannevar Bush, progressing rapidly in collaboration with private industries and federal research agencies. The institution is acclaimed for its academic and research excellence, boasting a legacy of 105 Nobel laureates, 26 Turing Award winners, and numerous other distinguished affiliations and accomplishments.
`,
    qas: [
      {
        q: "What are the main academic divisions at MIT?",
        a: "MIT consists of five schools: Science, Engineering, Architecture and Planning, Management, and Humanities, Arts, and Social Sciences, plus the Schwarzman College of Computing.",
      },
      {
        q: "What notable research initiatives has MIT been involved in?",
        a: "MIT has led in computer science, digital technology, AI, and big science such as the Human Genome Project.",
      },
      {
        q: "What is unique about MIT's campus energy initiatives?",
        a: "MIT reduces environmental impact via natural-gas CHP, alternative-fuel shuttles, transit subsidies, solar offsets, and a cogeneration plant.",
      },
    ],
  },

  "Carnegie Mellon University": {
    summary: `Carnegie Mellon University (CMU) is a prestigious private research university located in Pittsburgh, Pennsylvania. Founded in 1900 by Andrew Carnegie, the institution initially began as the Carnegie Technical Schools and later evolved through a merger with the Mellon Institute of Industrial Research to become Carnegie Mellon University in 1967. Renowned globally for its distinguished contributions in research and education, it comprises seven colleges, notably the School of Computer Science, College of Engineering, Dietrich College of Humanities and Social Sciences, and the Tepper School of Business. The School of Computer Science, distinguished for pioneering contributions to computer science, oversees several departments, including Computational Biology, Robotics, Machine Learning, Human-Computer Interaction, and Language Technologies, alongside offering a joint Bachelor of Computer Science and Arts degree with the College of Fine Arts.

CMU's main campus is situated five miles from downtown Pittsburgh and spans 157.2 acres. It's bordered by the University of Pittsburgh, and its facilities include approximately 81 buildings. The campus possesses a rich history of educational innovation and infrastructure development, marked by the replacement of the mid-century Skibo Hall with the modern, Wi-Fi enabled Cohon University Center. CMU emphasizes interdisciplinary collaboration across its various academic entities, housing institutes like the Software Engineering Institute, known for the Capability Maturity Model, and the Cert/CC for cybersecurity. The university operates on a global scale with campuses in Qatar, Silicon Valley, and Kigali (Carnegie Mellon University Africa), supporting a diverse student body of over 15,800 from 117 countries.

The Tepper School of Business has made notable strides in management science, originating influential theories like bounded rationality and the behavioral theory of the firm. Expanding the undergraduate business program thanks to a substantial donation from alumnus David A. Tepper, the school offers an updated curriculum inaugurated in 2015. Carnegie Mellon's innovative edge also extends to numerous university-wide initiatives like the Cylab Security and Privacy Institute and Disruptive Healthcare Technology Institute, furthering its research in critical technical and social issues. The university's extensive collaborations with industry leaders like Apple, Google, Microsoft, and Intel reflect its commitment to real-world impact and innovation in areas such as claytronics.
`,    
    qas: [
      {
        q: "What are the main areas of study at CMU?",
        a: "Seven colleges span SCS, Engineering, Dietrich H&SS, Tepper Business, and more—covering engineering, CS, management, and the arts.",
      },
      {
        q: "Does CMU offer programs for high school students?",
        a: "Yes—programs like the Pennsylvania Governor's School for the Sciences and CMU Pre-College.",
      },
      {
        q: "What notable contributions has CMU made to computer science?",
        a: "CMU pioneered departments in machine learning, robotics, and computational biology and remains a leader in these fields.",
      },
    ],
  },

  "Stanford University": {
    summary: `Leland Stanford Junior University, commonly known as Stanford University, is a private research institution located in Stanford, California. Established in 1885 by Leland and Jane Stanford in memory of their only son, the university opened its doors in 1891 as a coeducational and non-denominational institution. Following financial hardships after Leland Stanford's death and the 1906 San Francisco earthquake, the university emerged as a leader in innovative education and research under the guidance of Provost Frederick Terman after World War II. This led to the development of an entrepreneurial ecosystem synonymous with Silicon Valley, spurred further by the establishment of the Stanford Research Park in 1951. The university's 8,180-acre campus includes seven academic schools offering both undergraduate and graduate programs, and houses major research facilities such as the Hoover Institution. Stanford has made significant contributions to academics and athletics, winning 136 NCAA team championships and consistently achieving top positions in university sports standings. Its influential community includes 94 billionaires, 58 Nobel laureates, and numerous prestigious award recipients. Recent initiatives have strengthened its educational offerings, including the integration of its medical facilities and expansion programs in student aid and infrastructure. Governed by a private board of trustees, Stanford emphasizes rigorous academic standards through its administration, led by the president and provost overseeing seven schools and various research and business entities. It also benefits from a tax exemption clause under California’s Constitution, permitting its properties to be free from taxation when used for educational purposes. 
`,
    qas: [
      {
        q: "What types of programs does Stanford offer?",
        a: "Seven schools; H&S, Engineering, and Sustainability have undergrad + grad; Law, Medicine, Education, and Business are graduate-only.",
      },
      {
        q: "What is Stanford’s role in Silicon Valley?",
        a: "Through research grants and the Stanford Research Park, Stanford fostered an innovation ecosystem crucial to Silicon Valley’s growth.",
      },
      {
        q: "Who is the current president of Stanford?",
        a: "As of April 2024, Jonathan Levin was announced as the 13th president, beginning August 1, 2024.",
      },
    ],
  },

  "University of California, Berkeley": {
    summary: `The University of California, Berkeley, commonly referred to as UC Berkeley, is a public land-grant research institution located in Berkeley, California. Established in 1868 and named after the philosopher George Berkeley, it is the first land-grant university in the state and serves as the founding campus of the University of California system. UC Berkeley is organized into fifteen schools, including notable ones like the College of Chemistry, College of Engineering, College of Letters and Science, and the Haas School of Business. The university has an enrollment of more than 45,000 students and is recognized for its high research activity, evidenced by its classification as an "R1: Doctoral Universities – Very high research activity." In 2021, the university's research and development funding from federal sources exceeded $1 billion. A robust library system with 32 libraries positions Berkeley's library as the sixth-largest research library in the United States by volume.

Berkeley has played a significant role in political activism, gaining international acclaim during the 1960s. The Free Speech Movement in 1964 epitomizes its commitment to activism, particularly concerning civil rights and Vietnam War protests. The university is also home to the Mathematical Sciences Research Institute (MSRI), founded in 1982, which is a prominent hub for collaborative mathematical research worldwide. UC Berkeley's influence extends into athletics, with the California Golden Bears having won 107 national championships, 196 individual national titles, and 223 Olympic medals, including 121 gold. As part of the Atlantic Coast Conference, Berkeley competes in thirty varsity sports. The institution is a birthplace of eminent talents, having an impressive network of alumni, faculty, and researchers, including 59 Nobel laureates and 19 Academy Award winners, as well as a producer of Rhodes Scholars, Marshall Scholars, and Fulbright Scholars.

Beyond academics and sports, Berkeley fosters diverse extracurricular activities. The Democratic Education at Cal (DeCal) program, established formally in 1981 post the Free Speech Movement, allows students to lead and facilitate courses on varied topics, ranging from Rubik's Cube solving to bioprinting. The University also supports vibrant performing arts with numerous a cappella groups and jazz ensembles, providing platforms for artistic expression and cultural engagement.
`,
    qas: [
      {
        q: "What are notable academic offerings at UC Berkeley?",
        a: "Fifteen schools including Chemistry, Engineering, Letters & Science, and Haas School of Business.",
      },
      {
        q: "What is the Free Speech Movement?",
        a: "A 1964 student movement at Berkeley opposing restrictions on political activity, influencing civil rights and anti-war activism.",
      },
      {
        q: "Unique extracurriculars?",
        a: "The DeCal program allows student-led courses on many topics.",
      },
    ],
  },

  "University of Illinois Urbana-Champaign": {
    summary: `The University of Illinois Urbana-Champaign (U of I) is a prominent public land-grant research university located in the Champaign-Urbana metropolitan area of Illinois. Established in 1867, it stands as the flagship institution of the University of Illinois System and one of the largest public universities in the United States, with an enrollment exceeding 59,000 students. The university comprises 16 schools and colleges offering over 150 undergraduate and 100 graduate programs. It boasts a campus spread across 6,370 acres, housing 651 buildings, and operates on an annual budget that surpassed $2 billion in 2016. It is an esteemed member of the Association of American Universities and classified as an R1: Doctoral University for very high research activity, with research expenditures reaching $652 million in fiscal year 2019. The university library system ranks as the fourth-largest in the country by holdings, and the campus hosts the National Center for Supercomputing Applications. Illinois has a legacy of pioneering computer-based education, as evidenced by its hosting of the PLATO project and its role as a second-generation ARPAnet site. The university also emphasizes sustainability, striving towards carbon neutrality by 2050 through its Illinois Climate Action Plan and various sustainable initiatives, earning gold certification from STARS consistently since 2013. The athletic prowess of the university is displayed by its Fighting Illini teams competing in Division I of the NCAA and accumulating numerous conference and national championship titles. Notable alumni and faculty include numerous Nobel, Pulitzer, Fields, and Turing awardees. Recreation facilities on the campus include the Activities and Recreation Center and the Campus Recreation Center – East, both modernized with updated equipment and spaces for students. The university continues to attract high-achieving students, offering a rich blend of academic rigor, research opportunities, and extracurricular activities.
`,
    qas: [
      {
        q: "What is UIUC’s research focus?",
        a: "Strong in engineering and sciences with $652M research expenditures (FY2019) and R1 classification.",
      },
      {
        q: "What sustainability efforts exist?",
        a: "Illinois Climate Action Plan toward 2050 carbon neutrality; iSEE institute; consistent STARS Gold since 2013.",
      },
      {
        q: "Notable athletics facts?",
        a: "Fighting Illini in the Big Ten; Rose Bowl wins (1947, 1952, 1964) and five national football titles.",
      },
    ],
  },

  "Georgia Institute of Technology": {
    summary: `The Georgia Institute of Technology, commonly known as Georgia Tech, is a prestigious public research university in Atlanta, Georgia, established in 1885. It emerged as a part of Reconstruction initiatives to foster industrial growth in the Southern United States following the Civil War, initially focusing on mechanical engineering. By 1901, its academic offerings expanded to additional engineering disciplines including electrical, civil, and chemical engineering. In 1948, it evolved from the Georgia School of Technology into the comprehensive technical institute it is today. Georgia Tech is organized into seven colleges with approximately 31 departments, placing a strong emphasis on science and technology fields. In fiscal year 2023, its economic impact in Georgia was noted as being the largest among state public institutions, totaling $5.3 billion. The university is an active participant in NCAA Division I athletics, part of the Atlantic Coast Conference, and has earned five national championships.

Georgia Tech has a significant global presence with its satellite campuses and programs. Its Savannah, Georgia, campus complements the main facility while Georgia Tech Europe, established in Metz, France in 1990, provides master's-level and Ph.D. courses in engineering and computer science. Another collaborative campus in Shenzhen, China, was established in partnership with Tianjin University in 2014, offering various engineering and scientific programs, but this partnership was dissolved in 2024 following concerns about ties to the Chinese military. Other international partnerships include programs in Paris, Barcelona, Athlone, Shanghai, and Singapore. Previously announced plans to open campuses in India were put on hold. The central campus hosts numerous academic buildings, including state-of-the-art facilities for physics, chemistry, computing, design, and public policy.
`,
    qas: [
      { q: "Which engineering programs are available?", a: "Mechanical, electrical, civil, chemical, computer, environmental, and more." },
      { q: "Economic impact on Georgia?", a: "$5.3B in FY2023, leading public institutions in the state." },
      { q: "International presence?", a: "Campus in Metz, France; prior Shenzhen partnership; affiliations in Europe and Asia." },
    ],
  },

  "Cornell University": {
    summary: `Cornell University, a private Ivy League research institution located in Ithaca, New York, was founded in 1865 by Ezra Cornell and Andrew Dickson White. It is a co-educational and nonsectarian university committed to providing educational opportunities without distinction based on rank or origin, as stipulated by its charter. The university spans a 745-acre main campus and operates three satellite campuses, including medical facilities in New York City and Doha, Qatar. Notably, Cornell is one of three private land-grant universities in the United States and participates in land-grant, sea-grant, and space-grant programs.

Cornell is organized into eight undergraduate colleges and seven graduate divisions, all of which hold significant autonomy over their admission standards and academic curricula. Four undergraduate colleges receive partial state funding through the State University of New York, reinforcing Cornell's land-grant mission. The university enrolls over 26,000 students from all U.S. states and 130 countries, fostering a diverse academic environment. 

Cornell's governance involves a 64-member board of trustees, which includes members appointed by the New York Governor, elected alumni, faculty, students, and staff members. This board is responsible for overseeing university affairs, including the election of the university's president. As of July 1, 2024, Michael Kotlikoff serves as the interim president, following Martha E. Pollack's retirement.

The institution prides itself on producing notable figures, including Nobel laureates, Rhodes Scholars, Olympians, and Fortune 500 CEOs, among its over 250,000 alumni. Committed to financial accessibility, Cornell continues to offer need-based financial aid, having pledged to match offers from other Ivy League schools. Its financial aid initiatives prioritize scholarships over loans for lower-income families, enhancing the affordability of its programs.

Despite economic hurdles, such as the 2008 financial crisis, the university has upheld its financial aid commitments, ensuring access for a significant portion of its student body. Cornell's tradition of alumni involvement dates back to the 19th century when it was among the first to allow alumni-elected trustees. The university also emerged as one of the first electrified campuses in the late 19th century, continually incorporating technological advancements into its infrastructure.
`,
    qas: [
      {
        q: "Which undergraduate colleges are state-supported?",
        a: "CALS, Human Ecology, ILR, and Jeb E. Brooks School of Public Policy.",
      },
      {
        q: "What financial aid does Cornell offer?",
        a: "Need-based aid; aims to replace loans with scholarships for lower-income families and match Ivy offers.",
      },
      {
        q: "Who is the current president?",
        a: "As of 2024, Michael Kotlikoff (interim).",
      },
    ],
  },

  "Princeton University": {
    summary: `Princeton University, established in New Jersey in 1756, has a rich history intertwined with significant events such as the Battle of Princeton in 1777 and its temporary service as the nation's capital in 1783. Influential figures like John Witherspoon played pivotal roles, advancing education and shaping leadership during the American Revolution. Princeton's residential college system, originally proposed by Woodrow Wilson, has evolved over the years, starting from Wilson Lodge in 1957 (later renamed First College in 2020) as an alternative to eating clubs. The system expanded significantly in the 1980s, with the establishment of Rockefeller, Mathey, Butler, and Forbes Colleges, later joined by Whitman College in 2007 and Yeh College alongside New College West in 2022. The university plans to replace First College with Hobson College in the future. Princeton's singular Graduate College, marked by the gothic Cleveland Tower, is located about half a mile from its main campus. The Graduate College's location is the result of a historical disagreement about keeping graduate students away from undergraduates.

Princeton's student life is distinguished by several longstanding organizations and activities. The American Whig-Cliosophic Society, founded around 1765, is the oldest collegiate political and debate society in the country. The campus is home to numerous publications, including "The Daily Princetonian," the second oldest college daily newspaper in the U.S. WPRB, Princeton's radio station, holds the distinction of being the oldest licensed college radio station in the nation. In performing arts, the university features groups like the Princeton Triangle Club, America's oldest touring musical-comedy troupe, and the Princeton University Orchestra. A cappella is a significant part of campus culture, with groups such as the Nassoons, founded in 1941, performing frequently.

Princeton supports student diversity and inclusion through centers like the Carl A. Fields Center for Equality and Cultural Understanding, the LGBT Center, and various chaplaincies representing multiple faiths. This blend of historical significance, diverse student life, and a comprehensive residential system makes Princeton University a prominent institution in American higher education.
`,
    qas: [
      {
        q: "History of the residential college system?",
        a: "From Wilson’s quadrangle proposal to Wilson Lodge (1957), expansion in the 1980s, Whitman (2007), and Yeh/NCW (2022); Hobson College forthcoming.",
      },
      {
        q: "Performing arts opportunities?",
        a: "Triangle Club, Princeton University Orchestra, and many a cappella groups like the Nassoons.",
      },
      {
        q: "How is diversity and inclusion supported?",
        a: "Centers like the Carl A. Fields Center, the LGBT Center, and 15+ chaplaincies across multiple faiths.",
      },
    ],
  },

  "University of Texas at Austin": {
    summary: `The University of Texas at Austin, a prominent educational institution, has a rich history dating back to its post-annexation origins. Established due to legislative efforts following Texas's annexation, the university's foundation was financially supported by allocations from the Compromise of 1850, although the Civil War significantly delayed its financial backing. Despite having only $16,000 by 1865, the Texas Constitution of 1876 reinforced its establishment, and by 1881, Austin was selected as its location following a public vote. The official commencement was marked on November 17, 1882, with the cornerstone laying at College Hill, and the university opened to students on September 15, 1883. Over the years, it expanded to including nineteen colleges and schools.

One significant incident that shaped the university's history was the tragic shooting on August 1, 1966, when a student, Charles Whitman, killed 14 people from the university's Main Building's observation deck. This led to its temporary closure, reopening in 1999 with increased security. Moreover, the campus also hosts the Lyndon Baines Johnson Library and Museum, which was dedicated in 1971 as the first-ever presidential library on a university campus. The library forms part of a select group administered by the National Archives and Records Administration. In addition, a statue of Martin Luther King Jr. was presented on the campus in 1999, though it faced vandalism and discussions about its relocation. Situated in Austin, a city vibrant with cultural and historical significance, the university stands as a testament to Texas's dedication to higher education and societal progress.
`,
    qas: [
      { q: "How was UT Austin funded initially?", a: "Through U.S. bonds from the Compromise of 1850; later reaffirmed by the 1876 Texas Constitution." },
      { q: "When did UT Austin open?", a: "September 15, 1883." },
      { q: "What tragic event occurred in 1966?", a: "A mass shooting from the Main Building observation deck resulted in 14 deaths." },
    ],
  },

  "University of Washington": {
    summary: `The University of Washington, commonly referred to as UW or U-Dub, is a highly regarded public research university located in Seattle, Washington, in the United States. Established in 1861, it is one of the oldest institutions of higher education on the West Coast. Its main campus spans 700 acres in the city's University District and includes an expansive infrastructure of more than 500 buildings totaling over 20 million gross square feet. These facilities accommodate a variety of academic and extracurricular activities, including one of the largest library systems in the world with 26 libraries, art centers, museums, laboratories, lecture halls, and sports stadiums. Notably, UW is the flagship among the six public universities in Washington State and is distinguished for its contributions to medical, engineering, and scientific research. In 2024, the university allocated $1.73 billion for research and development, positioning it fifth nationally according to the National Science Foundation. Academically, UW is organized into various colleges and schools, offering a range of undergraduate and graduate programs across 140 departments. The university is part of the prestigious Association of American Universities, affirming its role in academic excellence and research innovation.

In the 21st century, UW has expanded its campuses to Bothell and Tacoma, which originally catered to students with two years of higher education but have since grown into full four-year institutions. The first freshman classes for these campuses were admitted in 2006. Today, both locations offer an array of master's programs. To accommodate growth, in 2012, UW initiated expansion plans for the Seattle campus, enhancing student housing, teaching facilities, and public transit options. A notable addition is the University of Washington light rail station, completed in March 2016, which provides swift and sustainable transportation options for students and faculty.

In terms of academic organization, UW's various colleges include the College of Arts and Sciences, College of Engineering, School of Medicine, Foster School of Business, and many more specialized schools. The institution supports diverse research initiatives and programs, such as the Pacific Coast Architecture Database (PCAD), managed by Alan Michelson. The university's robust research infrastructure has attracted significant attention, including cyberattacks aimed at acquiring technology information developed for the U.S. Navy, emphasizing its strategic importance in research domains.
`,
    qas: [
      { q: "Which areas is UW known for?", a: "Medical, engineering, and scientific research." },
      { q: "What transit options exist?", a: "The 2016 light rail station links campus to Seattle’s network, reducing car/bus reliance." },
      { q: "Which conference do UW sports compete in?", a: "The Huskies compete in NCAA Division I (Big Ten Conference)." },
    ],
  },
};

// ===== Utilities =====
const wikiUrl = (name) =>
  `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;

function renderList(targetOl, items) {
  targetOl.innerHTML = "";
  items.forEach((name, i) => {
    const li = document.createElement("li");
    li.dataset.school = name;
    li.innerHTML = `
      <span class="rank">${i + 1}</span>
      <div>
        <div class="name">${name}</div>
        <a class="wikilink" href="${wikiUrl(name)}" target="_blank" rel="noreferrer">View on Wikipedia</a>
      </div>
    `;
    // Clicking the row opens modal with local RAG content (if available)
    li.addEventListener("click", () => openModalAndRender(name));
    // Let the wiki link be clickable without triggering modal
    li.querySelector(".wikilink").addEventListener("click", (e) => e.stopPropagation());
    targetOl.appendChild(li);
  });
}

function attachSearch(inputEl, listEl, emptyEl, source) {
  function apply() {
    const q = (inputEl.value || "").trim().toLowerCase();
    const filtered = source.filter((name) => name.toLowerCase().includes(q));
    renderList(listEl, filtered);
    emptyEl.style.display = filtered.length ? "none" : "block";
  }
  inputEl.addEventListener("input", apply);
  apply(); // initial render
}

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

// ===== Modal =====
const overlayEl = document.getElementById("modal-overlay");
const modalEl = document.getElementById("modal");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalCloseEl = document.getElementById("modal-close");

function openModal(title) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = `<div class="spinner"></div><p class="muted small">Loading RAG content…</p>`;
  overlayEl.hidden = false;
  modalEl.hidden = false;
  modalEl.classList.add("show");     // NEW: reveal with CSS transition
  document.body.style.overflow = "hidden"; // NEW: stop background scroll
}

function closeModal() {
  modalEl.classList.remove("show");  // NEW
  overlayEl.hidden = true;
  modalEl.hidden = true;
  document.body.style.overflow = ""; // NEW
}
overlayEl.addEventListener("click", closeModal);
modalCloseEl.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function openModalAndRender(school) {
  openModal(school);
  // Render from local ragData
  const data = ragData[school];
  if (!data) {
    modalBodyEl.innerHTML = `<div class="error">No summary/Q&As available yet for "${school}".</div>`;
    return;
  }
  const { summary, qas } = data;

  const qaHtml = (qas || []).map((qa, idx) => {
    const n = idx + 1;
    return `<div><strong>Q${n}:</strong> ${escapeHtml(qa.q)}<br><strong>A${n}:</strong> ${escapeHtml(qa.a)}</div>`;
  }).join("\n");

  const html = `
    <div><strong>Summary:</strong></div>
    <div class="code">${escapeHtml(summary)}</div>
    <br>
    ${qaHtml}
  `;
  modalBodyEl.innerHTML = html;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== Boot =====
document.getElementById("cs-count").textContent  = csTop10.length;
document.getElementById("nat-count").textContent = natTopUnis.length;

attachSearch(
  document.getElementById("cs-search"),
  document.getElementById("cs-list"),
  document.getElementById("cs-empty"),
  csTop10
);
attachSearch(
  document.getElementById("nat-search"),
  document.getElementById("nat-list"),
  document.getElementById("nat-empty"),
  natTopUnis
);

wireCard("cs-card", "cs-arrow", "cs-panel");
wireCard("nat-card", "nat-arrow", "nat-panel");
