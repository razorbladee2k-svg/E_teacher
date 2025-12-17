/* ---------- NAV ---------- */
const pages = document.querySelectorAll(".page");
const hero = document.getElementById("hero");

function show(id) {
  pages.forEach(p => p.classList.add("hidden"));
  hero.classList.add("hidden");
  document.getElementById(id)?.classList.remove("hidden");
}

document.querySelectorAll(".navBtn").forEach(b =>
  b.onclick = () => show(b.dataset.page)
);

document.querySelectorAll(".backBtn").forEach(b =>
  b.onclick = () => {
    pages.forEach(p => p.classList.add("hidden"));
    hero.classList.remove("hidden");
  }
);

/* ---------- DARK MODE ---------- */
themeToggle.onclick = () =>
  document.body.classList.toggle("dark");

/* ---------- AUTH ---------- */
let mode = "login";
const users = () => JSON.parse(localStorage.getItem("users") || "{}");
const saveUsers = d => localStorage.setItem("users", JSON.stringify(d));

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
  if (!u) return alert("Enter username");

  const db = users();
  if (mode === "signup") {
    if (db[u]) return alert("User exists");
    db[u] = { essays: [] };
    saveUsers(db);
  } else {
    if (!db[u]) return alert("User not found");
  }

  localStorage.setItem("currentUser", u);
  logoutBtn.classList.remove("hidden");
  loginBtn.classList.add("hidden");
  signupBtn.classList.add("hidden");
  show("dashboard");
};

/* ---------- LEVELS ---------- */
const levels = ["A1", "A2", "B1", "B2", "C1"];

function renderLevels() {
  levelGrid.innerHTML = "";
  levels.forEach(l => {
    const d = document.createElement("div");
    d.className = "list";
    d.textContent = l;
    levelGrid.appendChild(d);
  });
}

chooseLevelBtn.onclick = () => {
  renderLevels();
  show("dashboard");
};

/* ---------- PRACTICE ---------- */
const practiceQuestions = [
  { q: "She ___ happy.", o: ["is", "are"], a: 0 },
  { q: "I ___ finished.", o: ["have", "had"], a: 0 },
  { q: "If I ___ you, I'd study.", o: ["am", "were"], a: 1 }
];

let qIndex = 0;

function loadPractice() {
  qIndex = 0;
  show("practice");
  renderQ();
}

function renderQ() {
  const q = practiceQuestions[qIndex];
  question.textContent = q.q;
  answers.innerHTML = "";
  feedback.textContent = "";

  q.o.forEach((opt, i) => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.onclick = () => {
      b.classList.add(i === q.a ? "correct" : "wrong");
      setTimeout(nextQ, 600);
    };
    answers.appendChild(b);
  });
}

function nextQ() {
  qIndex++;
  if (qIndex >= practiceQuestions.length) return show("dashboard");
  renderQ();
}

/* ---------- ESSAY ---------- */
saveEssay.onclick = () => {
  const text = essayText.value.trim();
  if (!text) return alert("Write something first");

  const u = localStorage.getItem("currentUser");
  const db = users();
  db[u].essays.push({ text, time: new Date().toLocaleString() });
  saveUsers(db);

  essayText.value = "";
  loadEssays();
};

function loadEssays() {
  essayList.innerHTML = "";
  const u = localStorage.getItem("currentUser");
  const db = users();
  db[u]?.essays.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.time}: ${e.text.slice(0, 40)}...`;
    essayList.appendChild(li);
  });
}

document.querySelector("[data-page='essay']").onclick = () => {
  loadEssays();
  show("essay");
};
