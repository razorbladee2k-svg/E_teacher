function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function signup() {
  alert("Sign up successful (demo)");
}

function login() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Enter username");
  localStorage.setItem("user", name);
  showPage("testIntro");
}

/* ===== TEST ===== */

const questions = [
  { q: "If I ___ him, I will tell him.", o: ["see", "saw"], c: 0 },
  { q: "She ___ lived here for 5 years.", o: ["has", "have"], c: 0 },
  { q: "He is ___ than me.", o: ["taller", "tall"], c: 0 },
  { q: "They ___ finished.", o: ["have", "has"], c: 0 },
  { q: "I enjoy ___ music.", o: ["listening to", "listen"], c: 0 },
  { q: "We ___ go now.", o: ["must", "must to"], c: 0 },
  { q: "This is ___ book.", o: ["my", "mine"], c: 0 },
  { q: "She speaks ___.", o: ["fluently", "fluent"], c: 0 },
  { q: "He didn’t ___ come.", o: ["want to", "wanted"], c: 0 },
  { q: "I’ve known him ___ years.", o: ["for", "since"], c: 0 }
];

let qIndex = 0;
let score = 0;

function startTest() {
  qIndex = 0;
  score = 0;
  showPage("test");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[qIndex];
  document.getElementById("questionText").innerText = q.q;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.o.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.innerText = t;
    b.onclick = () => answer(i);
    opts.appendChild(b);
  });
}

function answer(i) {
  if (i === questions[qIndex].c) score++;
  qIndex++;
  if (qIndex < questions.length) loadQuestion();
  else finishTest();
}

function finishTest() {
  let level = "A1";
  if (score >= 4) level = "A2";
  if (score >= 6) level = "B1";
  if (score >= 8) level = "B2";
  localStorage.setItem("level", level);
  document.getElementById("resultText").innerText =
    `Your English level is ${level}`;
  showPage("result");
}

/* ===== DASHBOARD ===== */

function loadDashboard() {
  document.getElementById("userLevel").innerText =
    localStorage.getItem("level");
  showPage("dashboard");
}

/* ===== GRAMMAR ===== */

function loadGrammar() {
  const level = localStorage.getItem("level");
  let text = "";
  if (level === "A1")
    text = "Present Simple: Subject + Verb (+s)";
  if (level === "A2")
    text = "Past Simple: Subject + Verb(ed)";
  if (level === "B1")
    text = "Present Perfect: Subject + have/has + Past Participle";
  if (level === "B2")
    text = "Conditionals: If + past, would + verb";
  document.getElementById("grammarContent").innerText = text;
  showPage("grammar");
}

/* ===== PRACTICE ===== */

const practice = [
  "Choose the correct verb form.",
  "Fill the blank correctly.",
  "Pick the correct tense."
];

let p = 0;

function loadPractice() {
  p = 0;
  nextPractice();
  showPage("practice");
}

function nextPractice() {
  document.getElementById("practiceQuestion").innerText =
    practice[p % practice.length];
  p++;
}

/* ===== ESSAY ===== */

const titles = [
  "My Future Goals",
  "Why English Is Important",
  "My Favorite Technology"
];

function loadEssay() {
  document.getElementById("essayTitle").innerText =
    titles[Math.floor(Math.random() * titles.length)];
  document.getElementById("essayFeedback").innerText = "";
  showPage("essay");
}

function checkEssay() {
  document.getElementById("essayFeedback").innerText =
    "AI Feedback: Good structure. Check verb tenses and articles.";
}

function logout() {
  localStorage.clear();
  showPage("auth");
}
