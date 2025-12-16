/* ======================
   PAGE SWITCH (GLOBAL)
====================== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

/* ======================
   GRAMMAR LESSONS (GLOBAL)
====================== */
function loadLesson(type) {
  const lessons = {
    presentPerfect: `
      <h3>Present Perfect</h3>
      <p>have / has + past participle</p>
      <p>I have finished my work.</p>
    `,
    pastPerfect: `
      <h3>Past Perfect</h3>
      <p>had + past participle</p>
      <p>She had left before I arrived.</p>
    `,
    ppContinuous: `
      <h3>Present Perfect Continuous</h3>
      <p>have/has been + verb-ing</p>
      <p>I have been studying for hours.</p>
    `,
    pastPerfectCont: `
      <h3>Past Perfect Continuous</h3>
      <p>had been + verb-ing</p>
      <p>They had been waiting for hours.</p>
    `,
    mixedPerfect: `
      <h3>Mixed Perfect Tenses</h3>
      <p>I have lived here for years.</p>
      <p>I had lived there before I moved.</p>
    `
  };

  document.getElementById("lessonBox").innerHTML = lessons[type];
}

/* ======================
   GLOBAL AUTH FUNCTIONS
====================== */
let mode = "";

function openAuth(type) {
  mode = type;
  document.getElementById("authTitle").textContent =
    type === "login" ? "Login" : "Sign Up";
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuth() {
  document.getElementById("authModal").classList.add("hidden");
}

function submitAuth() {
  const username = document.getElementById("authUsername").value.trim();
  const password = document.getElementById("authPassword").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  if (mode === "signup") {
    localStorage.setItem("user_" + username, password);
    alert("Account created! Now login.");
    closeAuth();
    return;
  }

  if (mode === "login") {
    const saved = localStorage.getItem("user_" + username);
    if (saved === password) {
      localStorage.setItem("loggedUser", username);
      updateUserUI();
      closeAuth();
    } else {
      alert("Wrong username or password");
    }
  }
}

function logout() {
  localStorage.removeItem("loggedUser");
  location.reload();
}

function updateUserUI() {
  const user = localStorage.getItem("loggedUser");
  if (user) {
    document.getElementById("user-name").textContent = user;
    document.getElementById("loginBtn").classList.add("hidden");
    document.getElementById("signupBtn").classList.add("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
  }
}

/* ======================
   MAIN INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {

  // Auth buttons
  document.getElementById("loginBtn").onclick = () => openAuth("login");
  document.getElementById("signupBtn").onclick = () => openAuth("signup");
  document.getElementById("logoutBtn").onclick = logout;

  updateUserUI();

  /* ======================
     PRACTICE + MISTAKES
  ====================== */
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

  let quiz = [];
  let index = 0;

  const difficulty = document.getElementById("difficulty");
  const question = document.getElementById("question");
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("feedback");

  difficulty.onchange = e => {
    quiz = quizzes[e.target.value] || [];
    index = 0;
    loadQuestion();
  };

  function loadQuestion() {
    if (!quiz.length) return;
    question.textContent = quiz[index].q;
    answers.innerHTML = "";

    quiz[index].a.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => checkAnswer(i);
      answers.appendChild(btn);
    });
  }

  function checkAnswer(i) {
    const user = localStorage.getItem("loggedUser") || "guest";
    if (i !== quiz[index].c) {
      const key = "mistakes_" + user;
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      data.push(quiz[index].q);
      localStorage.setItem(key, JSON.stringify(data));
      feedback.textContent = "Wrong ✘ (saved)";
    } else {
      feedback.textContent = "Correct ✔";
    }
  }

  window.nextQuestion = function () {
    index = (index + 1) % quiz.length;
    loadQuestion();
  };
});
