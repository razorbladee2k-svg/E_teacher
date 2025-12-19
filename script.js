/* ===== PAGE ===== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ===== AUTH ===== */
function signup() {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return alert("Fill all fields");
  if (localStorage.getItem("acc_" + u)) return alert("User exists");
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

/* ===== TEST (50 QUESTIONS) ===== */
const questions = [];
while (questions.length < 50) {
  questions.push(
    { q: "She ___ lived here for 5 years.", o: ["has", "have"], c: 0 },
    { q: "If it ___, we will stay home.", o: ["rains", "rained"], c: 0 },
    { q: "He speaks ___ than me.", o: ["better", "best"], c: 0 },
    { q: "They ___ finished.", o: ["have", "has"], c: 0 },
    { q: "I am interested ___ music.", o: ["in", "on"], c: 0 }
  );
}

let qi = 0, score = 0;

function startTest() {
  qi = 0; score = 0;
  showPage("test");
  loadQ();
}

function loadQ() {
  const q = questions[qi];
  questionText.innerText = `(${qi + 1}/50) ${q.q}`;
  options.innerHTML = "";
  q.o.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.innerText = t;
    b.onclick = () => {
      if (i === q.c) score++;
      qi++;
      qi < 50 ? loadQ() : finishTest();
    };
    options.appendChild(b);
  });
}

function finishTest() {
  let lvl = "A1";
  if (score >= 15) lvl = "A2";
  if (score >= 25) lvl = "B1";
  if (score >= 35) lvl = "B2";
  localStorage.setItem("level", lvl);
  resultText.innerText = `Your English level is ${lvl} (${score}/50)`;
  showPage("result");
}

/* ===== DASHBOARD ===== */
function loadDashboard() {
  userLevel.innerText = localStorage.getItem("level");
  showPage("dashboard");
}

/* ===== GRAMMAR ===== */
function loadGrammar() {
  const lvl = localStorage.getItem("level");
  grammarContent.innerText =
    lvl === "A1" ? "Present Simple: Subject + Verb" :
    lvl === "A2" ? "Past Simple: Subject + Verb(ed)" :
    lvl === "B1" ? "Present Perfect: Subject + have/has + V3" :
                   "Conditionals: If + past, would + verb";
  showPage("grammar");
}

/* ===== PRACTICE ===== */
const practiceQs = [
  { q: "She ___ finished.", o: ["has", "have"], c: 0 },
  { q: "If I ___ time, I would help.", o: ["had", "have"], c: 0 }
];

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
  q.o.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.innerText = t;
    b.onclick = () => {
      alert(i === q.c ? "Correct" : "Wrong");
      pi++;
      pi < practiceQs.length ? showPractice() : showPage("dashboard");
    };
    practiceOptions.appendChild(b);
  });
}

/* ===== ESSAY ===== */
const titles = [
  "Why English is important",
  "Technology and education",
  "My future goals"
];

function loadEssay() {
  essayTitle.innerText = titles[Math.floor(Math.random() * titles.length)];
  essayFeedback.innerText = "";
  showPage("essay");
}

function checkEssay() {
  const text = essayText.value.trim();
  const words = text.split(/\s+/).length;
  if (words < 80) {
    essayFeedback.innerText = "Essay too short (min 80 words).";
  } else {
    essayFeedback.innerText =
      "Good structure. Check verb tenses and articles.";
  }
}

function logout() {
  localStorage.clear();
  showPage("auth");
}
