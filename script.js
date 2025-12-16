document.addEventListener("DOMContentLoaded", () => {

  /* ROUTER */
  function show(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
  }

  document.querySelectorAll(".nav button").forEach(btn => {
    btn.onclick = () => show(btn.dataset.page);
  });

  signupBtn.onclick = () => show("signup");
  loginBtn.onclick = () => show("login");

  /* AUTH SYSTEM */
  const users = () => JSON.parse(localStorage.getItem("users") || "{}");
  const saveUsers = u => localStorage.setItem("users", JSON.stringify(u));

  suSubmit.onclick = () => {
    const u = suName.value.trim(), p = suPass.value.trim();
    if (!u || !p) return alert("Fill all fields");
    const db = users();
    if (db[u]) return alert("Username exists");
    db[u] = { pass: p, progress: 0 };
    saveUsers(db);
    alert("Account created");
    show("login");
  };

  liSubmit.onclick = () => {
    const u = liName.value.trim(), p = liPass.value.trim();
    const db = users();
    if (!db[u] || db[u].pass !== p) return alert("Wrong login");
    localStorage.setItem("logged", u);
    updateUser();
    show("home");
  };

  logoutBtn.onclick = () => {
    localStorage.removeItem("logged");
    updateUser();
    show("home");
  };

  function updateUser() {
    const u = localStorage.getItem("logged");
    if (u) {
      currentUser.textContent = u;
      signupBtn.classList.add("hidden");
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
      progressInfo.textContent = "Progress saved for " + u;
    } else {
      currentUser.textContent = "Guest";
      signupBtn.classList.remove("hidden");
      loginBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
    }
  }
  updateUser();

  /* GRAMMAR DATA (B1 FULL CORE) */
  const grammar = {
    B1: {
      "Present simple vs present continuous":
        "Use present simple for habits, present continuous for actions now.",
      "Past simple vs present perfect":
        "Past simple = finished time. Present perfect = experience.",
      "Present perfect simple vs continuous":
        "Simple = result. Continuous = duration.",
      "Conditionals (0,1,2)":
        "Zero: facts. First: real future. Second: unreal.",
      "Passive voice":
        "Object becomes subject. Form: be + past participle.",
      "Reported speech":
        "Change tense and pronouns when reporting speech.",
      "Modal verbs":
        "Must, should, might, could express meaning."
    }
  };

  document.querySelectorAll("[data-level]").forEach(btn => {
    btn.onclick = () => {
      const level = btn.dataset.level;
      grammarTopics.innerHTML = "";
      lessonContent.innerHTML = "";
      if (!grammar[level]) return;

      Object.keys(grammar[level]).forEach(topic => {
        const li = document.createElement("li");
        li.textContent = topic;
        li.onclick = () => lessonContent.textContent = grammar[level][topic];
        grammarTopics.appendChild(li);
      });
    };
  });

  /* PRACTICE ENGINE */
  const quizzes = {
    easy: [
      { q: "She ___ happy.", o: ["is", "are"], a: 0 }
    ],
    medium: [
      { q: "I ___ finished.", o: ["have", "had"], a: 0 }
    ],
    hard: [
      { q: "If I ___ you, I would study.", o: ["am", "were"], a: 1 }
    ]
  };

  let qSet = [], qIndex = 0, score = 0;

  document.querySelectorAll("[data-diff]").forEach(btn => {
    btn.onclick = () => {
      qSet = quizzes[btn.dataset.diff];
      qIndex = 0;
      score = 0;
      quiz.classList.remove("hidden");
      renderQ();
    };
  });

  function renderQ() {
    const q = qSet[qIndex];
    qText.textContent = q.q;
    qOptions.innerHTML = "";
    qFeedback.textContent = "";
    q.o.forEach((opt, i) => {
      const b = document.createElement("button");
      b.textContent = opt;
      b.onclick = () => {
        if (i === q.a) {
          score++;
          qFeedback.textContent = "Correct ✔";
        } else qFeedback.textContent = "Wrong ✘";
      };
      qOptions.appendChild(b);
    });
  }

  nextQuestion.onclick = () => {
    qIndex++;
    if (qIndex >= qSet.length) {
      qFeedback.textContent = "Score: " + Math.round(score / qSet.length * 100) + "%";
      return;
    }
    renderQ();
  };

});
