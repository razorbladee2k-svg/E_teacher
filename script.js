/* =====================
   PAGE NAVIGATION
===================== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* =====================
   AUTH SYSTEM (WORKING)
===================== */
let authMode = "";

function openAuth(mode) {
  authMode = mode;
  document.getElementById("authTitle").textContent =
    mode === "login" ? "Login" : "Sign Up";
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuth() {
  document.getElementById("authModal").classList.add("hidden");
}

function submitAuth() {
  const name = authName.value;
  const pass = authPass.value;

  if (!name || !pass) return alert("Fill all fields");

  if (authMode === "signup") {
    localStorage.setItem(name, pass);
    alert("Account created!");
  }

  if (authMode === "login") {
    if (localStorage.getItem(name) === pass) {
      localStorage.setItem("loggedUser", name);
      updateUser();
      closeAuth();
    } else {
      alert("Wrong login");
    }
  }
}

function updateUser() {
  const user = localStorage.getItem("loggedUser");
  if (user) {
    userName.textContent = user;
    logoutBtn.classList.remove("hidden");
  }
}

function logout() {
  localStorage.removeItem("loggedUser");
  location.reload();
}

updateUser();

/* =====================
   ADVANCED GRAMMAR
===================== */
function loadLesson(topic) {
  const lessons = {
    presentPerfect: `
      <h3>Present Perfect</h3>
      <p>Form: have/has + past participle</p>
      <p>Used for experiences and unfinished time</p>
      <p>Example: I have finished my work.</p>
    `,
    pastPerfect: `
      <h3>Past Perfect</h3>
      <p>Form: had + past participle</p>
      <p>Used for an action before another past action</p>
      <p>Example: She had left before I arrived.</p>
    `,
    perfectContinuous: `
      <h3>Perfect Continuous</h3>
      <p>have/has been + verb-ing</p>
      <p>Focus on duration</p>
    `,
    conditionalsAdvanced: `
      <h3>Advanced Conditionals</h3>
      <p>If I had studied, I would have passed.</p>
    `
  };

  lessonBox.innerHTML = lessons[topic];
}

/* =====================
   PRACTICE BY DIFFICULTY
===================== */
const quizzes = {
  easy: [
    { q: "I ___ finished my homework.", a: ["have", "had"], c: 0 }
  ],
  medium: [
    { q: "She ___ left before I arrived.", a: ["has", "had"], c: 1 }
  ],
  hard: [
    { q: "They ___ been waiting for hours.", a: ["have", "had"], c: 0 }
  ]
};

let currentQuiz = [];
let qIndex = 0;

function setDifficulty(level) {
  currentQuiz = quizzes[level];
  qIndex = 0;
  loadQuestion();
}

function loadQuestion() {
  if (!currentQuiz.length) return;
  question.textContent = currentQuiz[qIndex].q;
  answers.innerHTML = "";

  currentQuiz[qIndex].a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => check(i);
    answers.appendChild(btn);
  });
}

function check(i) {
  feedback.textContent =
    i === currentQuiz[qIndex].c ? "Correct ✔" : "Wrong ✘";
}

function nextQuestion() {
  qIndex = (qIndex + 1) % currentQuiz.length;
  loadQuestion();
}
