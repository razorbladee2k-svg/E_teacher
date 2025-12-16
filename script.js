document.addEventListener("DOMContentLoaded", () => {

  /* ROUTER */
  function show(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
  }

  document.querySelectorAll(".nav button").forEach(b =>
    b.onclick = () => show(b.dataset.page)
  );

  signupBtn.onclick = () => show("signup");
  loginBtn.onclick = () => show("login");

  /* AUTH */
  const db = () => JSON.parse(localStorage.getItem("users") || "{}");
  const saveDB = d => localStorage.setItem("users", JSON.stringify(d));

  suSubmit.onclick = () => {
    const u = suUser.value.trim(), p = suPass.value.trim();
    if (!u || !p) return alert("Fill all fields");
    const d = db();
    if (d[u]) return alert("User exists");
    d[u] = { pass: p, score: 0 };
    saveDB(d);
    show("login");
  };

  liSubmit.onclick = () => {
    const u = liUser.value.trim(), p = liPass.value.trim();
    const d = db();
    if (!d[u] || d[u].pass !== p) return alert("Wrong login");
    localStorage.setItem("logged", u);
    updateUser();
    show("home");
  };

  logoutBtn.onclick = () => {
    localStorage.removeItem("logged");
    updateUser();
  };

  function updateUser() {
    const u = localStorage.getItem("logged");
    if (u) {
      currentUser.textContent = u;
      signupBtn.classList.add("hidden");
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
      progressText.textContent = "Total score: " + (db()[u]?.score || 0);
    } else {
      currentUser.textContent = "Guest";
    }
  }
  updateUser();

  /* GRAMMAR DATA (REAL, EXPANDABLE) */
  const grammar = {
    B1: {
      "Present simple vs present continuous":
        "Use present simple for habits. Use present continuous for actions happening now.",
      "Past simple vs present perfect":
        "Past simple = finished time. Present perfect = experience.",
      "Present perfect simple vs continuous":
        "Simple focuses on result, continuous on duration.",
      "Conditionals (0,1,2)":
        "Zero = facts, First = real future, Second = unreal.",
      "Passive voice":
        "Object becomes subject. Form: be + past participle.",
      "Reported speech":
        "Tense and pronouns change when reporting speech.",
      "Modal verbs":
        "Must, should, might, could express obligation or possibility."
    }
  };

  document.querySelectorAll("[data-level]").forEach(btn => {
    btn.onclick = () => {
      const lvl = btn.dataset.level;
      topicList.innerHTML = "";
      lessonBox.innerHTML = "";
      if (!grammar[lvl]) return;
      Object.keys(grammar[lvl]).forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        li.onclick = () => lessonBox.textContent = grammar[lvl][t];
        topicList.appendChild(li);
      });
    };
  });

  /* PRACTICE ENGINE (FIXED) */
  const quizzes = {
    easy: [
      { q: "She ___ happy.", o: ["is", "are"], a: 0 }
    ],
    medium: [
      { q: "I ___ finished my work.", o: ["have", "had"], a: 0 }
    ],
    hard: [
      { q: "If I ___ you, I would study.", o: ["am", "were"], a: 1 }
    ]
  };

  let set = [], i = 0, score = 0;

  document.querySelectorAll("[data-diff]").forEach(btn => {
    btn.onclick = () => {
      set = quizzes[btn.dataset.diff];
      i = 0;
      score = 0;
      quizBox.classList.remove("hidden");
      renderQ();
    };
  });

  function renderQ() {
    const q = set[i];
    qText.textContent = q.q;
    qOptions.innerHTML = "";
    qFeedback.textContent = "";
    q.o.forEach((opt, idx) => {
      const b = document.createElement("button");
      b.textContent = opt;
      b.onclick = () => {
        if (idx === q.a) {
          score++;
          qFeedback.textContent = "Correct ✔";
        } else qFeedback.textContent = "Wrong ✘";
      };
      qOptions.appendChild(b);
    });
  }

  nextBtn.onclick = () => {
    i++;
    if (i >= set.length) {
      const u = localStorage.getItem("logged");
      if (u) {
        const d = db();
        d[u].score += score * 10;
        saveDB(d);
        progressText.textContent = "Total score: " + d[u].score;
      }
      qFeedback.textContent = "Finished. Score: " + score;
      return;
    }
    renderQ();
  };

});
