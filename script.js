/* ---------- BASIC ROUTING ---------- */
const pages = document.querySelectorAll(".page");
const hero = document.getElementById("hero");
const body = document.body;

function show(id) {
  pages.forEach(p => p.classList.add("hidden"));
  hero.classList.add("hidden");
  document.getElementById(id)?.classList.remove("hidden");
}

document.querySelectorAll(".backBtn").forEach(b =>
  b.onclick = () => {
    pages.forEach(p => p.classList.add("hidden"));
    hero.classList.remove("hidden");
  }
);

/* ---------- DARK MODE ---------- */
themeToggle.onclick = () => body.classList.toggle("dark");

/* ---------- AUTH ---------- */
let mode = "login";
const users = () => JSON.parse(localStorage.getItem("users") || "{}");
const saveUsers = u => localStorage.setItem("users", JSON.stringify(u));

loginBtn.onclick = () => {
  mode = "login";
  authTitle.textContent = "Log in";
  show("auth");
};

signupBtn.onclick = () => {
  mode = "signup";
  authTitle.textContent = "Sign up";
  show("auth");
};

authSubmit.onclick = () => {
  const u = authUser.value.trim();
  const p = authPass.value.trim();
  if (!u || !p) return alert("Fill all fields");

  const db = users();
  if (mode === "signup") {
    if (db[u]) return alert("User exists");
    db[u] = { model: createUserModel() };
    saveUsers(db);
  } else {
    if (!db[u]) return alert("User not found");
  }

  localStorage.setItem("currentUser", u);
  loginBtn.classList.add("hidden");
  signupBtn.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  loadUserModel();
  renderLevels();
  show("dashboard");
};

logoutBtn.onclick = () => {
  localStorage.removeItem("currentUser");
  logoutBtn.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  signupBtn.classList.remove("hidden");
};

/* ---------- USER MODEL (AI CORE) ---------- */
let userModel = {};

function createUserModel() {
  return { skills: {}, confidence: {}, mistakes: [] };
}

function loadUserModel() {
  const user = localStorage.getItem("currentUser");
  if (!user) return;
  userModel = users()[user].model || createUserModel();
}

function saveUserModel() {
  const user = localStorage.getItem("currentUser");
  if (!user) return;
  const db = users();
  db[user].model = userModel;
  saveUsers(db);
}

/* ---------- LEVELS ---------- */
const levels = ["A1", "A2", "B1", "B2", "C1"];

function renderLevels() {
  levelGrid.innerHTML = "";
  levels.forEach(l => {
    const d = document.createElement("div");
    d.className = "card";
    d.textContent = l;
    d.onclick = () => showGrammar(l);
    levelGrid.appendChild(d);
  });
}

chooseLevelBtn.onclick = () => {
  renderLevels();
  show("dashboard");
};

/* ---------- GRAMMAR ---------- */
const grammar = {
  A1: ["To be", "Present simple", "Present continuous"],
  A2: ["Past simple", "Present perfect"],
  B1: ["Conditionals", "Passive", "Reported speech"],
  B2: ["Advanced modals", "Cleft sentences"],
  C1: ["Inversion", "Advanced discourse"]
};

function showGrammar(level) {
  grammarTitle.textContent = level + " Grammar";
  grammarList.innerHTML = "";
  grammar[level].forEach(g => {
    const div = document.createElement("div");
    div.textContent = g;
    div.onclick = () => startPractice(level);
    grammarList.appendChild(div);
  });
  show("grammar");
}

/* ---------- QUESTIONS (TAGGED BY SKILL) ---------- */
const questions = {
  A1: [
    { q: "She ___ happy.", o: ["is", "are"], a: 0, skill: "to_be" },
    { q: "They ___ students.", o: ["is", "are"], a: 1, skill: "to_be" }
  ],
  B1: [
    { q: "I ___ here since 2020.", o: ["have been", "was"], a: 0, skill: "present_perfect" },
    { q: "If I ___ you, I would study.", o: ["am", "were"], a: 1, skill: "conditional" }
  ]
};

/* ---------- PRACTICE ENGINE (ADAPTIVE) ---------- */
let currentSet = [];
let index = 0;

function startPractice(level) {
  practiceTitle.textContent = level + " Practice";
  currentSet = questions[level];
  index = 0;
  show("practice");
  renderQuestion();
}

function recordAnswer(q, correct) {
  if (!userModel.skills[q.skill]) {
    userModel.skills[q.skill] = { correct: 0, wrong: 0 };
  }

  correct
    ? userModel.skills[q.skill].correct++
    : userModel.skills[q.skill].wrong++;

  const s = userModel.skills[q.skill];
  userModel.confidence[q.skill] = Math.round(
    (s.correct / (s.correct + s.wrong)) * 100
  );

  if (!correct) userModel.mistakes.push(q.q);
  saveUserModel();
}

function renderQuestion() {
  const q = currentSet[index];
  question.textContent = q.q;
  answers.innerHTML = "";
  feedback.textContent = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      const correct = i === q.a;
      btn.classList.add(correct ? "correct" : "wrong");
      recordAnswer(q, correct);
      setTimeout(nextQuestion, 600);
    };
    answers.appendChild(btn);
  });
}

function nextQuestion() {
  index++;
  if (index >= currentSet.length) {
    renderLevels();
    show("dashboard");
    return;
  }
  renderQuestion();
}

/* ---------- LEVEL TEST ---------- */
testLevelBtn.onclick = () => {
  alert("Level test logic ready. Add more questions to expand.");
};

