document.addEventListener("DOMContentLoaded", () => {

  /* ========= STATE ========= */
  const state = {
    user: null,
    xp: 0,
    streak: 0,
    currentLesson: null,
    questionIndex: 0
  };

  const users = () => JSON.parse(localStorage.getItem("USERS") || "{}");
  const saveUsers = d => localStorage.setItem("USERS", JSON.stringify(d));

  /* ========= ROUTER ========= */
  const screens = document.querySelectorAll(".screen");
  function show(id) {
    screens.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  /* ========= AUTH ========= */
  loginBtn.onclick = signupBtn.onclick = () => {
    authTitle.textContent = event.target.id === "signupBtn" ? "Sign up" : "Login";
    show("auth");
  };

  authSubmit.onclick = () => {
    const u = authUser.value.trim();
    const p = authPass.value.trim();
    const db = users();

    if (!db[u]) {
      db[u] = { pass: p, xp: 0, streak: 1 };
    }
    if (db[u].pass !== p) return alert("Wrong password");

    saveUsers(db);
    state.user = u;
    state.xp = db[u].xp;
    state.streak = db[u].streak;

    updateHeader();
    show("dashboard");
  };

  logoutBtn.onclick = () => {
    state.user = null;
    show("dashboard");
    updateHeader();
  };

  function updateHeader() {
    if (!state.user) {
      username.textContent = "Guest";
      xp.textContent = "0 XP";
      streak.textContent = "🔥 0";
      logoutBtn.classList.add("hidden");
      return;
    }
    username.textContent = state.user;
    xp.textContent = state.xp + " XP";
    streak.textContent = "🔥 " + state.streak;
    logoutBtn.classList.remove("hidden");
  }

  /* ========= GRAMMAR DATA ========= */
  const lessons = {
    A1: [
      {
        title: "To be (am/is/are)",
        quiz: [
          { q: "She ___ happy.", a: ["is", "are"], c: 0 },
          { q: "They ___ here.", a: ["is", "are"], c: 1 }
        ]
      },
      {
        title: "Present Simple",
        quiz: [
          { q: "I ___ coffee.", a: ["like", "likes"], c: 0 }
        ]
      }
    ]
  };

  /* ========= DASHBOARD ========= */
  document.querySelector(".level-card[data-level='A1']").onclick = () => {
    lessonTitle.textContent = "A1 Lessons";
    lessonList.innerHTML = "";
    lessons.A1.forEach((l, i) => {
      const div = document.createElement("div");
      div.className = "lesson";
      div.textContent = l.title;
      div.onclick = () => startLesson(l);
      lessonList.appendChild(div);
    });
    show("lessons");
  };

  /* ========= PRACTICE ENGINE ========= */
  function startLesson(lesson) {
    state.currentLesson = lesson;
    state.questionIndex = 0;
    practiceTitle.textContent = lesson.title;
    show("practice");
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.currentLesson.quiz[state.questionIndex];
    question.textContent = q.q;
    answers.innerHTML = "";
    feedback.textContent = "";

    q.a.forEach((opt, i) => {
      const b = document.createElement("button");
      b.textContent = opt;
      b.onclick = () => {
        if (i === q.c) {
          b.classList.add("correct");
          reward();
        } else {
          b.classList.add("wrong");
        }
      };
      answers.appendChild(b);
    });
  }

  function reward() {
    state.xp += 10;
    const db = users();
    db[state.user].xp = state.xp;
    saveUsers(db);
    updateHeader();

    state.questionIndex++;
    if (state.questionIndex >= state.currentLesson.quiz.length) {
      show("dashboard");
      return;
    }
    setTimeout(renderQuestion, 600);
  }

  show("dashboard");
});
