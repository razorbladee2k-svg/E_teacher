const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll("nav button");

function showPage(id) {
  pages.forEach(p => p.classList.add("hidden"));
  const page = document.getElementById(id);
  if (page) page.classList.remove("hidden");
}

/* NAV ROUTING */
navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
    if (btn.dataset.page === "dashboard") renderLevels();
    if (btn.dataset.page === "practice") loadPractice();
  });
});

/* DARK MODE */
theme.onclick = () => document.body.classList.toggle("dark");

/* AUTH */
let mode = "login";

login.onclick = () => {
  mode = "login";
  authTitle.textContent = "Login";
  showPage("authPage");
};

signup.onclick = () => {
  mode = "signup";
  authTitle.textContent = "Sign Up";
  showPage("authPage");
};

submitAuth.onclick = () => {
  const u = user.value.trim();
  if (!u) return alert("Username required");

  const db = JSON.parse(localStorage.users || "{}");

  if (mode === "signup") {
    if (db[u]) return alert("User exists");
    db[u] = { level: "A1", essays: [] };
  } else {
    if (!db[u]) return alert("User not found");
  }

  localStorage.users = JSON.stringify(db);
  localStorage.currentUser = u;

  logout.classList.remove("hidden");
  login.classList.add("hidden");
  signup.classList.add("hidden");

  renderLevels();
  showPage("dashboard");
};

logout.onclick = () => {
  localStorage.removeItem("currentUser");
  login.classList.remove("hidden");
  signup.classList.remove("hidden");
  logout.classList.add("hidden");
  showPage("home");
};

/* LEVELS */
const levels = ["A1","A2","B1","B2","C1"];

function renderLevels() {
  levelsDiv.innerHTML = "";
  levels.forEach(l => {
    const d = document.createElement("div");
    d.className = "card";
    d.textContent = l;
    d.onclick = () => {
      const db = JSON.parse(localStorage.users);
      db[currentUser()].level = l;
      localStorage.users = JSON.stringify(db);
      showGrammar(l);
    };
    levelsDiv.appendChild(d);
  });
}

function showGrammar(level) {
  grammarTitle.textContent = level + " Grammar";
  grammarList.innerHTML = "";
  ["Core structures","Tenses","Usage"].forEach(g => {
    const div = document.createElement("div");
    div.textContent = g;
    div.onclick = () => startPractice(level);
    grammarList.appendChild(div);
  });
  showPage("grammar");
}

/* PRACTICE */
function loadPractice() {
  const lvl = JSON.parse(localStorage.users || "{}")[currentUser()]?.level || "A1";
  startPractice(lvl);
}

function startPractice(level) {
  q.textContent = `Practice question for ${level}`;
  opts.innerHTML = "";
  ["Option A","Option B"].forEach(o => {
    const b = document.createElement("button");
    b.className = "primary";
    b.textContent = o;
    opts.appendChild(b);
  });
  showPage("practice");
}

function currentUser() {
  return localStorage.currentUser;
}

/* INIT */
showPage("home");
