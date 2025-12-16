const body = document.body;
const app = document.getElementById("app");

themeBtn.onclick = () => body.classList.toggle("dark");

/* START FLOW */
startPractice.onclick = () => {
  document.querySelector(".hero").classList.add("hidden");
  app.classList.remove("hidden");
  loadPractice("A1");
};

chooseLevel.onclick = () => {
  document.querySelector(".hero").classList.add("hidden");
  app.classList.remove("hidden");
  renderDashboard();
};

/* DASHBOARD */
const grammarData = {
  A1: [
    "To be (am / is / are)",
    "Present simple",
    "Present continuous",
    "Have got",
    "Was / were"
  ],
  B1: [
    "Present simple vs continuous",
    "Past simple vs present perfect",
    "Conditionals",
    "Passive voice",
    "Reported speech",
    "Modal verbs",
    "Gerund vs infinitive"
  ]
};

function renderDashboard() {
  const grid = document.getElementById("levelCards");
  grid.innerHTML = "";
  Object.keys(grammarData).forEach(level => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = level;
    card.onclick = () => showGrammar(level);
    grid.appendChild(card);
  });
}

function showGrammar(level) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("grammar").classList.remove("hidden");
  grammarTitle.textContent = level + " Grammar";
  grammarList.innerHTML = "";
  grammarData[level].forEach(g => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = g;
    div.onclick = () => loadPractice(level);
    grammarList.appendChild(div);
  });
}

function goDashboard() {
  document.getElementById("grammar").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

/* PRACTICE */
const questions = {
  A1: [
    { q: "She ___ happy.", o: ["is", "are"], a: 0 },
    { q: "They ___ here.", o: ["is", "are"], a: 1 }
  ],
  B1: [
    { q: "I ___ here since 2020.", o: ["have been", "was"], a: 0 },
    { q: "If I ___ you, I would study.", o: ["am", "were"], a: 1 }
  ]
};

let qIndex = 0;
let currentSet = [];

function loadPractice(level) {
  document.getElementById("grammar").classList.add("hidden");
  document.getElementById("practice").classList.remove("hidden");
  practiceTitle.textContent = level + " Practice";
  currentSet = questions[level];
  qIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = currentSet[qIndex];
  question.textContent = q.q;
  answers.innerHTML = "";
  feedback.textContent = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      btn.classList.add(i === q.a ? "correct" : "wrong");
      setTimeout(nextQuestion, 600);
    };
    answers.appendChild(btn);
  });
}

function nextQuestion() {
  qIndex++;
  if (qIndex >= currentSet.length) {
    renderDashboard();
    document.getElementById("practice").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    return;
  }
  renderQuestion();
}
