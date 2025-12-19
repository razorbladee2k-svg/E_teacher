let level = "B1";
let qIndex = 0;

const questions = [
  "Choose the correct sentence:",
  "Which tense fits: I ___ lived here for years",
  "Present Perfect structure is?",
  "She ___ finished her homework.",
  "They ___ been to London."
];

const essayTitles = [
  "Is technology good for students?",
  "Should school be online?",
  "Advantages of learning English",
  "Social media and education",
  "Learning English in 2025"
];

/* ---------- PAGE SYSTEM ---------- */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  const page = document.getElementById(id);
  if (page) page.classList.add("active");

  // Run page-specific logic
  if (id === "practice") loadPractice();
  if (id === "essay") loadEssay();
}

/* ---------- DARK MODE ---------- */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ---------- AUTH ---------- */
function login() {
  showPage("level");
}

function setLevel(l) {
  level = l;
  const welcome = document.getElementById("welcome");
  if (welcome) welcome.innerText = `Welcome (${level})`;
  showPage("dashboard");
}

/* ---------- PRACTICE ---------- */
function loadPractice() {
  qIndex = 0;
  const qText = document.getElementById("qText");
  if (qText) qText.innerText = questions[qIndex];
}

function answer() {
  qIndex++;
  if (qIndex >= questions.length) {
    alert("Practice finished!");
    showPage("dashboard");
    return;
  }
  document.getElementById("qText").innerText = questions[qIndex];
}

/* ---------- ESSAY ---------- */
function loadEssay() {
  const title = document.getElementById("essayTitle");
  const text = document.getElementById("essayText");
  const count = document.getElementById("count");

  if (!title || !text || !count) return;

  title.innerText =
    essayTitles[Math.floor(Math.random() * essayTitles.length)];

  text.value = "";
  count.innerText = "0 / 180 words";

  text.oninput = () => {
    const words = text.value.trim().split(/\s+/).filter(Boolean);
    count.innerText = `${words.length} / 180 words`;
  };
}

function checkEssay() {
  alert("AI Essay Checker will be connected here (OpenAI API ready)");
}
