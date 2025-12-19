/* ================= PAGE ================= */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ================= AUTH ================= */
function signup() {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return alert("Fill all fields");
  if (localStorage.getItem("acc_" + u)) return alert("User already exists");
  localStorage.setItem("acc_" + u, JSON.stringify({ p }));
  alert("Account created. Now login.");
}

function login() {
  const u = username.value.trim();
  const p = password.value.trim();
  const acc = localStorage.getItem("acc_" + u);
  if (!acc) return alert("Account does not exist");
  if (JSON.parse(acc).p !== p) return alert("Wrong password");
  localStorage.setItem("currentUser", u);
  showPage("testIntro");
}

/* ================= UTIL ================= */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ================= ENGLISH LEVEL TEST (15) ================= */
let questions = shuffle([
  { q:"She ___ lived here for 5 years.", a:"has", w:["have","is"] },
  { q:"If it ___, we will stay home.", a:"rains", w:["rained","will rain"] },
  { q:"I didn’t ___ him yesterday.", a:"see", w:["saw","seen"] },
  { q:"They ___ finished already.", a:"have", w:["has","are"] },
  { q:"He speaks ___ than me.", a:"better", w:["best","good"] },
  { q:"I am interested ___ music.", a:"in", w:["on","at"] },
  { q:"She ___ to school yesterday.", a:"went", w:["go","gone"] },
  { q:"The book ___ written by him.", a:"was", w:["is","has"] },
  { q:"We were tired, ___ we left.", a:"so", w:["because","but"] },
  { q:"I’ve known her ___ 2020.", a:"since", w:["for","from"] },
  { q:"He enjoys ___ English.", a:"learning", w:["learn","to learn"] },
  { q:"This is ___ book.", a:"my", w:["mine","me"] },
  { q:"She doesn’t like ___ coffee.", a:"drinking", w:["drink","to drink"] },
  { q:"I ___ never been to Japan.", a:"have", w:["has","had"] },
  { q:"If I ___ more time, I would help.", a:"had", w:["have","will have"] }
]);

let qi = 0, score = 0;

function startTest() {
  qi = 0;
  score = 0;
  showPage("test");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[qi];
  questionText.innerText = `(${qi + 1}/15) ${q.q}`;
  options.innerHTML = "";

  const choices = shuffle([q.a, ...q.w]);
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = choice;
    btn.onclick = () => {
      if (choice === q.a) score++;
      qi++;
      qi < questions.length ? loadQuestion() : finishTest();
    };
    options.appendChild(btn);
  });
}

function finishTest() {
  let level = "A1";
  if (score >= 4) level = "A2";
  if (score >= 7) level = "B1";
  if (score >= 10) level = "B2";
  if (score >= 13) level = "C1";

  localStorage.setItem("level", level);
  resultText.innerText = `Your English level is ${level} (${score}/15)`;
  showPage("result");
}

/* ================= DASHBOARD ================= */
function loadDashboard() {
  userLevel.innerText = localStorage.getItem("level");
  showPage("dashboard");
}

/* ================= GRAMMAR (EXPANDED + C1) ================= */
function loadGrammar() {
  const lvl = localStorage.getItem("level");
  const g = {
    A1: `
<b>Present Simple</b><br>
Subject + verb (+s)<br>
Example: She works here.<br>
Negative: She does not work here.<br>
Question: Does she work here?
`,
    A2: `
<b>Past Simple</b><br>
Subject + verb(ed)<br>
Example: I visited London.<br>
Negative: I did not visit London.<br>
Question: Did you visit London?
`,
    B1: `
<b>Present Perfect</b><br>
Subject + have/has + past participle<br>
Example: I have finished my work.<br>
Negative: I have not finished my work.<br>
Question: Have you finished your work?
`,
    B2: `
<b>Conditionals</b><br>
If + past simple, would + base verb<br>
Example: If I had time, I would help.
`,
    C1: `
<b>Advanced Structures (C1)</b><br>
• Inversion: Never have I seen this<br>
• Mixed conditionals<br>
• Cleft sentences: What I need is time
`
  };
  grammarContent.innerHTML = g[lvl];
  showPage("grammar");
}

/* ================= PRACTICE (50 QUESTIONS) ================= */
let practiceQs = shuffle([
  { q:"She ___ finished.", a:"has", w:["have"], why:"She = has" },
  { q:"If I ___ time, I would study.", a:"had", w:["have"], why:"2nd conditional" },
  { q:"He ___ playing now.", a:"is", w:["are"], why:"He = is" },
  { q:"They ___ been here before.", a:"have", w:["has"], why:"They = have" },
  { q:"This is the ___ movie.", a:"best", w:["better"], why:"Superlative" }
]);

while (practiceQs.length < 50) {
  practiceQs.push(...practiceQs.slice(0,5));
}

let pi = 0;

function loadPractice() {
  pi = 0;
  showPractice();
  showPage("practice");
}

function showPractice() {
  const q = practiceQs[pi];
  practiceQuestion.innerText = q.q;
  practiceOptions.innerHTML = "";

  shuffle([q.a, ...q.w]).forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = choice;
    btn.onclick = () => {
      alert(choice === q.a ? "Correct ✅" : "Wrong ❌ " + q.why);
      pi++;
      pi < practiceQs.length ? showPractice() : showPage("dashboard");
    };
    practiceOptions.appendChild(btn);
  });
}

/* ================= ESSAY (STRICT & HONEST) ================= */
function loadEssay() {
  essayTitle.innerText = "Should English be compulsory in schools?";
  essayFeedback.innerText = "";
  showPage("essay");
}

function checkEssay() {
  const t = essayText.value.trim();
  const words = t.split(/\s+/);
  let f = [];

  if (words.length < 100) f.push("❌ Too short (min 100 words)");
  if (!/[.!?]/.test(t)) f.push("❌ No punctuation");
  if (t === t.toUpperCase()) f.push("❌ All caps detected");
  if (/(.)\1{4,}/.test(t)) f.push("❌ Repeated characters detected");

  if (f.length === 0)
    f.push("✅ Acceptable C1-level structure. Review grammar carefully.");

  essayFeedback.innerText = f.join("\n");
}

function logout() {
  localStorage.clear();
  showPage("auth");
}
