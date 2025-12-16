  document.addEventListener("DOMContentLoaded", () => {

  /* PAGE SWITCH */
  function show(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  document.getElementById("goGrammar").onclick = () => show("grammar");
  document.getElementById("goPractice").onclick = () => show("practice");
  document.getElementById("signupBtn").onclick = () => show("signup");
  document.getElementById("loginBtn").onclick = () => show("login");

  document.querySelectorAll(".backBtn").forEach(b =>
    b.onclick = () => show("home")
  );

  /* AUTH */
  function users() {
    return JSON.parse(localStorage.getItem("users") || "{}");
  }

  function saveUsers(u) {
    localStorage.setItem("users", JSON.stringify(u));
  }

  signupSubmit.onclick = () => {
    const u = suUser.value.trim();
    const p = suPass.value.trim();
    if (!u || !p) return alert("Fill all fields");
    const us = users();
    if (us[u]) return alert("Username exists");
    us[u] = p;
    saveUsers(us);
    alert("Account created");
    show("login");
  };

  loginSubmit.onclick = () => {
    const u = liUser.value.trim();
    const p = liPass.value.trim();
    const us = users();
    if (!us[u] || us[u] !== p) return alert("Wrong login");
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
      userName.textContent = u;
      signupBtn.classList.add("hidden");
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    }
  }

  updateUser();

  /* GRAMMAR */
  const grammar = {
    B1: [
      "Present simple vs present continuous",
      "Past simple vs present perfect",
      "Present perfect simple vs continuous",
      "First & second conditional",
      "Passive voice",
      "Reported speech",
      "Modal verbs",
      "Gerund or infinitive"
    ]
  };

  document.querySelectorAll(".levelBtn").forEach(btn => {
    btn.onclick = () => {
      grammarList.innerHTML = "";
      const lvl = btn.dataset.level;
      if (!grammar[lvl]) {
        grammarList.innerHTML = "<li>Coming soon</li>";
        return;
      }
      grammar[lvl].forEach(g => {
        const li = document.createElement("li");
        li.textContent = g;
        grammarList.appendChild(li);
      });
    };
  });

  /* PRACTICE */
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

  let quiz = [];
  let index = 0;
  let score = 0;

  document.querySelectorAll(".diffBtn").forEach(btn => {
    btn.onclick = () => {
      quiz = quizzes[btn.dataset.diff];
      index = 0;
      score = 0;
      quizBox.classList.remove("hidden");
      showQ();
    };
  });

  function showQ() {
    const q = quiz[index];
    question.textContent = q.q;
    answers.innerHTML = "";
    feedback.textContent = "";
    q.o.forEach((opt, i) => {
      const b = document.createElement("button");
      b.textContent = opt;
      b.onclick = () => {
        if (i === q.a) {
          score++;
          feedback.textContent = "Correct ✔";
        } else feedback.textContent = "Wrong ✘";
      };
      answers.appendChild(b);
    });
  }

  nextQ.onclick = () => {
    index++;
    if (index >= quiz.length) {
      progress.textContent =
        "Score: " + Math.round((score / quiz.length) * 100) + "%";
      return;
    }
    showQ();
  };

});
