let level = "";
let questionIndex = 0;

const questions = [
  "Choose the correct sentence.",
  "She has ___ finished her work.",
  "Present perfect structure is?",
  "If I ___ more time, I would study.",
  "They have ___ to London."
];

const essayTitles = [
  "Is technology good for education?",
  "Should students wear uniforms?",
  "Advantages of learning English",
  "Social media in modern life"
];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  if (id === "practice") loadPractice();
  if (id === "essay") loadEssay();
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function login() {
  showPage("level");
}

function setLevel(lvl) {
  level = lvl;
  document.getElementById("welcome").innerText =
    `Welcome (${level})`;
  showPage("dashboard");
}

function loadPractice() {
  questionIndex = 0;
  document.getElementById("qText").innerText = questions[0];
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex >= questions.length) {
    alert("Practice finished!");
    showPage("dashboard");
    return;
  }
  document.getElementById("qText").innerText =
    questions[questionIndex];
}

function loadEssay() {
  const title = document.getElementById("essayTitle");
  const text = document.getElementById("essayText");
  const count = document.getElementById("count");

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
  alert("AI Essay Checker coming next (OpenAI API)");
}
