document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Elements ---------- */
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".navBtn");
  const hero = document.getElementById("home");
  const body = document.body;

  /* auth/essay elements */
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const authSubmit = document.getElementById("authSubmit");
  const authTitle = document.getElementById("authTitle");
  const authUser = document.getElementById("authUser");
  const authPass = document.getElementById("authPass");

  const themeToggle = document.getElementById("themeToggle");
  const chooseLevelBtn = document.getElementById("chooseLevelBtn");
  const testLevelBtn = document.getElementById("testLevelBtn");

  /* practice elements */
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const feedbackEl = document.getElementById("feedback");

  const levelGrid = document.getElementById("levelGrid");
  const grammarList = document.getElementById("grammarList");
  const grammarTitle = document.getElementById("grammarTitle");

  const saveEssayBtn = document.getElementById("saveEssay");
  const essayText = document.getElementById("essayText");
  const essayList = document.getElementById("essayList");

  /* ---------- Small helpers ---------- */
  function showPage(id){
    pages.forEach(p => p.classList.add("hidden"));
    const target = document.getElementById(id);
    if(!target) return;
    target.classList.remove("hidden");

    // show/hide hero (home)
    if(id === "home") hero.classList.remove("hidden");
    else hero.classList.add("hidden");

    // update nav active
    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === id);
    });
  }

  function currentUser(){ return localStorage.getItem("currentUser"); }
  function db(){ return JSON.parse(localStorage.getItem("users") || "{}"); }
  function saveDB(x){ localStorage.setItem("users", JSON.stringify(x)); }

  /* ---------- Nav wiring ---------- */
  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const page = btn.dataset.page;
      // if user clicks dashboard but not signed in -> show dashboard anyway (optional)
      showPage(page);
      // fix: ensure dashboard content renders on show
      if(page === "dashboard") renderLevels();
      if(page === "grammar") { grammarTitle.textContent = "Grammar"; grammarList.innerHTML = ""; }
      if(page === "practice"){ loadPractice(); }
      if(page === "essay"){ loadEssays(); }
    });
  });

  /* ---------- Theme ---------- */
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("theme-dark");
    body.classList.toggle("theme-light");
  });

  /* ---------- Auth ---------- */
  let authMode = "login";
  loginBtn.addEventListener("click", () => {
    authMode = "login";
    authTitle.textContent = "Log in";
    showPage("auth");
  });
  signupBtn.addEventListener("click", () => {
    authMode = "signup";
    authTitle.textContent = "Sign up";
    showPage("auth");
  });

  authSubmit.addEventListener("click", () => {
    const u = (authUser.value || "").trim();
    const p = (authPass.value || "").trim();
    if(!u) return alert("Enter username");
    const users = db();
    if(authMode === "signup"){
      if(users[u]) return alert("User exists");
      users[u] = { essays: [], level: "A1", model: createUserModel() };
      saveDB(users);
    } else {
      if(!users[u]) return alert("User not found");
    }
    localStorage.setItem("currentUser", u);
    // update UI
    logoutBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    authUser.value = ""; authPass.value = "";
    renderLevels();
    showPage("dashboard");
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    logoutBtn.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    showPage("home");
  });

  /* ---------- Data / user model (mistake tracking ready) ---------- */
  function createUserModel(){ return { skills: {}, confidence: {}, mistakes: [] }; }
  function loadUserModel(){
    const u = currentUser();
    if(!u) return null;
    const users = db();
    if(!users[u].model) users[u].model = createUserModel();
    return users[u].model;
  }
  function saveUserModel(model){
    const u = currentUser();
    if(!u) return;
    const users = db();
    users[u].model = model;
    saveDB(users);
  }

  /* ---------- Levels / grammar ---------- */
  const levels = ["A1","A2","B1","B2","C1"];
  const grammar = {
    A1: ["To be (am/is/are)", "Present simple", "Present continuous"],
    A2: ["Past simple", "Present perfect", "Quantifiers"],
    B1: ["Conditionals", "Passive voice", "Reported speech"],
    B2: ["Cleft sentences", "Advanced modals"],
    C1: ["Inversion", "Advanced discourse"]
  };

  function renderLevels(){
    levelGrid.innerHTML = "";
    levels.forEach(l => {
      const el = document.createElement("div");
      el.className = "card";
      el.textContent = l;
      el.addEventListener("click", () => {
        const confirmLevel = confirm(`Are you sure you want to choose ${l} as your level?`);
        if(!confirmLevel) return;
        // save chosen level for current user (if logged in)
        const u = currentUser();
        if(u){
          const users = db();
          users[u].level = l;
          saveDB(users);
        }
        showGrammar(l);
      });
      levelGrid.appendChild(el);
    });
  }

  function showGrammar(level){
    grammarTitle.textContent = level + " Grammar";
    grammarList.innerHTML = "";
    grammar[level].forEach(topic => {
      const div = document.createElement("div");
      div.textContent = topic;
      div.addEventListener("click", () => startPractice(level));
      grammarList.appendChild(div);
    });
    showPage("grammar");
  }

  /* ---------- Practice engine (real question set) ---------- */
  const questionBank = {
    A1: [
      { q:"She ___ my sister.", o:["is","are"], a:0, skill:"to_be" },
      { q:"I ___ coffee every morning.", o:["drink","drinks"], a:0, skill:"present_simple" },
      { q:"They ___ watching TV now.", o:["is","are"], a:1, skill:"present_continuous" }
    ],
    A2: [
      { q:"He ___ yesterday.", o:["worked","works"], a:0, skill:"past_simple" },
      { q:"I ___ seen that movie.", o:["have","had"], a:0, skill:"present_perfect" }
    ],
    B1: [
      { q:"If I ___ time, I would help.", o:["have","had"], a:1, skill:"second_conditional" },
      { q:"The cake ___ by Mary.", o:["was baked","baked"], a:0, skill:"passive" }
    ],
    B2: [
      { q:"No sooner ___ than he left.", o:["had I arrived","I had arrived"], a:0, skill:"inversion" }
    ],
    C1: [
      { q:"Rarely ___ we see such talent.", o:["do","does"], a:0, skill:"inversion" }
    ]
  };

  let currentSet = [];
  let qIndex = 0;

  function startPractice(level){
    const pool = questionBank[level] || [];
    if(pool.length === 0){ alert("No questions for this level yet."); return; }
    currentSet = pool.slice(); // copy
    qIndex = 0;
    showPage("practice");
    renderQuestion();
  }

  function loadPractice(){
    // default: if user logged in use user's level, otherwise A1
    const u = currentUser();
    const users = db();
    const level = (u && users[u] && users[u].level) ? users[u].level : "A1";
    startPractice(level);
  }

  function recordAnswer(questionObj, correct){
    const model = loadUserModel() || createUserModel();
    const skill = questionObj.skill || "general";
    if(!model.skills[skill]) model.skills[skill] = { correct:0, wrong:0 };
    if(correct) model.skills[skill].correct++; else model.skills[skill].wrong++;
    const s = model.skills[skill];
    model.confidence[skill] = Math.round( (s.correct / (s.correct + s.wrong)) * 100 );
    if(!correct) model.mistakes.push({ q: questionObj.q, time: Date.now() });
    saveUserModel(model);
  }

  function renderQuestion(){
    const q = currentSet[qIndex];
    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    q.o.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        const ok = i === q.a;
        btn.classList.add(ok ? "correct" : "wrong");
        recordAnswer(q, ok);
        setTimeout(() => {
          qIndex++;
          if(qIndex >= currentSet.length){
            alert("Practice finished — returning to dashboard.");
            renderLevels();
            showPage("dashboard");
            return;
          }
          renderQuestion();
        }, 600);
      });
      answersEl.appendChild(btn);
    });
  }

  /* ---------- Placement test ---------- */
  const placement = [
    { q:"She ___ working now.", o:["is","was"], a:0, level:"A1" },
    { q:"I ___ finished my homework.", o:["have","had"], a:0, level:"A2" },
    { q:"If I ___ you, I'd study.", o:["am","were"], a:1, level:"B1" },
    { q:"No sooner ___ than he left.", o:["we arrived","had we arrived"], a:1, level:"B2" },
    { q:"Hardly ___ when it happened.", o:["had I arrived","I had arrived"], a:0, level:"C1" }
  ];

  let testIndex = 0;
  let testScore = [];

  testLevelBtn.addEventListener("click", () => {
    testIndex = 0; testScore = [];
    currentSet = placement.slice();
    qIndex = 0;
    showPage("practice");
    renderTestQuestion();
  });

  function renderTestQuestion(){
    const q = currentSet[qIndex];
    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    q.o.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if(i === q.a) testScore.push(q.level);
        setTimeout(() => {
          qIndex++;
          if(qIndex >= currentSet.length){
            const level = calculateLevel(testScore);
            alert(`Estimated level: ${level}`);
            const u = currentUser();
            if(u){ const users = db(); users[u].level = level; saveDB(users); }
            renderLevels(); showPage("dashboard");
            return;
          }
          renderTestQuestion();
        }, 400);
      });
      answersEl.appendChild(btn);
    });
  }

  function calculateLevel(scores){
    if(scores.includes("C1")) return "C1";
    if(scores.includes("B2")) return "B2";
    if(scores.includes("B1")) return "B1";
    if(scores.includes("A2")) return "A2";
    return "A1";
  }

  /* ---------- Essay system ---------- */
  saveEssayBtn.addEventListener("click", () => {
    const text = (essayText.value || "").trim();
    if(!text) return alert("Write your essay first.");
    const u = currentUser();
    if(!u) return alert("Please log in to save essays.");
    const users = db();
    users[u].essays = users[u].essays || [];
    users[u].essays.unshift({ text, time: new Date().toLocaleString() });
    saveDB(users);
    essayText.value = "";
    loadEssays();
    alert("Essay saved.");
  });

  function loadEssays(){
    essayList.innerHTML = "";
    const u = currentUser();
    if(!u){ essayList.innerHTML = "<li>Please log in to see essays.</li>"; return; }
    const users = db();
    (users[u].essays || []).forEach(e => {
      const li = document.createElement("li");
      li.textContent = `${e.time} — ${e.text.slice(0, 120)}${e.text.length>120?"...":""}`;
      essayList.appendChild(li);
    });
  }

  /* ---------- Init ---------- */
  // default show home
  showPage("home");

  // make nav active on load (home)
  navButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.page === "home"));

  // ensure login status reflected
  if(currentUser()){
    logoutBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
  }

});
