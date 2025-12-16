function showPage(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     PAGE SWITCHING
  ===================== */
  window.showPage = function (id) {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
  };

  /* =====================
     AUTH SYSTEM
  ===================== */
  const loginBtn = document.getElementById("loginBtn");
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

  window.closeAuth = function () {
    modal.classList.add("hidden");
  };

  window.submitAuth = function () {
    const u = authUsername.value.trim();
    const p = authPassword.value.trim();

    if (!u || !p) {
      alert("Fill all fields");
      return;
    }

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
      } else {
        alert("Wrong username or password");
      }
    }
  };

  function updateUser() {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      userNameBox.textContent = user;
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

  /* =====================
     GRAMMAR LESSONS
  ===================== */
  window.loadLesson = function (type) {
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
      perfectContinuous: `
        <h3>Perfect Continuous</h3>
        <p>have/has been + verb-ing</p>
        <p>They have been studying for hours.</p>
      `
    };
    document.getElementById("lessonBox").innerHTML = lessons[type];
  };

  /* =====================
     PRACTICE SYSTEM
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
  let index = 0;

  const difficulty = document.getElementById("difficulty");
  const question = document.getElementById("question");
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("feedback");

  difficulty.onchange = e => {
    currentQuiz = quizzes[e.target.value] || [];
    index = 0;
    loadQuestion();
  };

  function loadQuestion() {
    if (!currentQuiz.length) return;
    question.textContent = currentQuiz[index].q;
    answers.innerHTML = "";

    currentQuiz[index].a.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => check(i);
      answers.appendChild(btn);
    });
  }

  function check(i) {
    feedback.textContent =
      i === currentQuiz[index].c ? "Correct ✔" : "Wrong ✘";
  }

  window.nextQuestion = function () {
    index = (index + 1) % currentQuiz.length;
    loadQuestion();
  };

});
