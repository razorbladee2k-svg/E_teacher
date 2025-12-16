const body = document.body;
const app = document.getElementById("app");

themeToggle.onclick = () => body.classList.toggle("dark");

/* ENTRY */
startPractice.onclick = () => {
  app.classList.remove("hidden");
  document.querySelector(".hero").classList.add("hidden");
  document.querySelector(".features").classList.add("hidden");
  loadPractice("A1");
};

chooseLevel.onclick = () => {
  app.classList.remove("hidden");
  document.querySelector(".hero").classList.add("hidden");
  document.querySelector(".features").classList.add("hidden");
  renderLevels();
};

/* DATA */
const grammar = {
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
    "Modal verbs"
  ]
};

const questions = {
  A1: [
    { q: "She ___ happy.", o: ["is", "are"], a: 0 },
    { q: "They ___ here.", o: ["is", "are"], a: 1 }
  ],
  B1: [
    { q: "I ___ here since 2020.", o: ["have been", "was"], a: 0 }
  ]
};

/* LEVELS */
function renderLevels() {
  const grid = document.getElementById("levels");
  grid.innerHTML = "";
  Object.keys(grammar).forEach(level => {
    const card = document.createElement("div");
    card.className = "feature";
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
  grammar[level].forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = item;
    div.onclick = () => loadPractice(level);
    grammarList.appendChild(div);
  });
}

function goBack() {
  document.getElementById("grammar").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
}

/* PRACTICE */
let index = 0;
let set = [];

function loadPractice(level) {
  document.getElementById("grammar").classList.add("hidden");
  document.getElementById("practice").classList.remove("hidden");
  practiceTitle.textContent = level + " Practice";
  set = questions[level];
  index = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = set[index];
  question.textContent = q.q;
  answers.innerHTML = "";
  feedback.textContent = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      btn.classList.add(i === q.a ? "correct" : "wrong");
      setTimeout(next, 600);
    };
    answers.appendChild(btn);
  });
}

function next() {
  index++;
  if (index >= set.length) {
    document.getElementById("practice").classList.add("hidden");
    renderLevels();
    document.getElementById("dashboard").classList.remove("hidden");
    return;
  }
  renderQuestion();
}

