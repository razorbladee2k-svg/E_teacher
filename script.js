/* ======================
   PAGE SWITCH
====================== */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ======================
   GRAMMAR LESSONS
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
      <p>I have been studying for 2 hours.</p>
    `,
    pastPerfectCont: `
      <h3>Past Perfect Continuous</h3>
      <p>had been + verb-ing</p>
      <p>They had been waiting for hours.</p>
    `,
    mixedPerfect: `
      <h3>Mixed Perfect Tenses</h3>
      <p>Compare:</p>
      <p>I have lived here for years.</p>
      <p>I had lived there before I moved.</p>
    `
  };
  lessonBox.innerHTML = lessons[type];
}

/* ======================
   AUTH + PRACTICE
====================== */
document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userNameBox = document.getElementById("user-name");

  const modal = document.getElementById("authModal");
  const authTitle = document.getElementById("authTitle");
  const authUsername = document.getElementById("authUsername");
  const authPassword = document.getElementById("authPassword");

  let mode = "";

  loginBtn.onclick = () => openAuth("login");
  signupBtn.onclick = () => openAuth("signup");
  logoutBtn.onclick = logout;

  function openAuth(type) {
    mode = type;
    authTitle.textContent = type === "login" ? "Login" : "Sign Up";
    modal.classList.remove("hidden");
  }

  window.closeAuth = () => modal.classList.add("hidden");

  window.submitAuth = () => {
    const u = authUsername.value.trim();
    const p = authPassword.value.trim();
    if (!u || !p) return alert("Fill all fields");

    if (mode === "signup") {
      localStorage.setItem("user_" + u, p);
      alert("Account created. Now login.");
      modal.classList.add("hidden");
    }

    if (mode === "login") {
      if (localStorage.getItem("user_" + u) === p) {
        localStorage.setItem("loggedUser", u);
        updateUser();
        modal.classList.add("hidden");
      } else alert("Wrong login");
    }
  };

  function updateUser() {
    const u = localStorage.getItem("loggedUser");
    if (u) {
      userNameBox.textContent = u;
      loginBtn.classList.add("hidden");
      signupBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    }
  }

  function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
  }

  updateUser();

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
      const b = document.createElement("button");
      b.textContent = ans;
      b.onclick = () => check(i);
      answers.appendChild(b);
    });
  }

  function check(i) {
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

  window.nextQuestion = () => {
    index = (index + 1) % quiz.length;
    loadQuestion();
  };
});
