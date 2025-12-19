// =====================
// GLOBAL STATE
// =====================
let currentPage = "auth";
let user = null;
let level = null;
let darkMode = false;

// =====================
// PAGE NAVIGATION
// =====================
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// =====================
// DARK MODE
// =====================
function toggleDark() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
}

// =====================
// AUTH
// =====================
function signup() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (!u || !p) {
    alert("Enter username and password");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ u, p }));
  alert("Sign up successful. Now login.");
}

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const saved = JSON.parse(localStorage.getItem("user"));

  if (!saved || saved.u !== u || saved.p !== p) {
    alert("Wrong login");
    return;
  }

  user = u;
  showPage("testIntro");
}

// =====================
// TEST
// =====================
let testIndex = 0;
let score = 0;

const testQuestions = [
  { q: "I ___ finished my homework.", a: "have" },
  { q: "She ___ to school yesterday.", a: "went" },
  { q: "If it rains, I ___ home.", a: "will stay" },
  { q: "This movie is ___ than that one.", a: "better" },
  { q: "He has lived here ___ 5 years.", a: "for" },
  { q: "I was tired, ___ I went to bed.", a: "so" },
  { q: "They ___ playing football now.", a: "are" },
  { q: "The book ___ written by him.", a: "was" },
  { q: "She speaks ___ than me.", a: "more confidently" },
  { q: "I didn’t see ___ there.", a: "anyone" }
];

function startTest() {
  testIndex = 0;
  score = 0;
  showPage("test");
  renderQuestion();
}

function renderQuestion() {
  const q = testQuestions[testIndex];
  document.getElementById("questionText").innerText = q.q;
  document.getElementById("answer").value = "";
}

function submitAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  if (input === testQuestions[testIndex].a) score++;

  testIndex++;
  if (testIndex < testQuestions.length) {
    renderQuestion();
  } else {
    finishTest();
  }
}

function finishTest() {
  if (score <= 3) level = "A1";
  else if (score <= 6) level = "A2";
  else if (score <= 8) level = "B1";
  else level = "B2";

  document.getElementById("dashboardTitle").innerText =
    `Welcome ${user} (${level})`;

  showPage("dashboard");
}

// =====================
// DASHBOARD
// =====================
function openGrammar() {
  document.getElementById("grammarContent").innerHTML = `
    <div class="grammar-rule">
      <b>Present Perfect</b><br>
      Subject + have/has + Past Participle + Object
    </div>
    <div class="grammar-rule">
      <b>Conditionals</b><br>
      If + present simple, will + verb
    </div>
  `;
  showPage("grammar");
}

function openPractice() {
  showPage("practice");
}

function openEssay() {
  randomEssay();
  showPage("essay");
}

function logout() {
  user = null;
  showPage("auth");
}

// =====================
// ESSAY
// =====================
const essayTitles = [
  "Is technology making life better?",
  "Should students wear uniforms?",
  "Advantages of learning English",
  "Social media: good or bad?"
];

function randomEssay() {
  const t = essayTitles[Math.floor(Math.random() * essayTitles.length)];
  document.getElementById("essayTitle").innerText = t;
}

function checkEssay() {
  const text = document.getElementById("essayText").value;
  const words = text.trim().split(/\s+/).length;

  document.getElementById("essayFeedback").innerText =
    `Words: ${words}. AI feedback simulation: Work on clarity and grammar.`;
}
