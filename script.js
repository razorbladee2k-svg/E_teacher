document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Elements ---------- */
  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".nav-center .navBtn");
  const logo = document.getElementById("logo");

  const themeBtn = document.getElementById("themeBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const authPage = document.getElementById("auth");
  const authTitle = document.getElementById("authTitle");
  const authUser = document.getElementById("authUser");
  const authPass = document.getElementById("authPass");
  const authSubmit = document.getElementById("authSubmit");

  const levelChoice = document.getElementById("levelChoice");
  const quickChooseBtn = document.getElementById("quickChooseBtn");
  const quickTestBtn = document.getElementById("quickTestBtn");

  const home = document.getElementById("home");
  const dashboard = document.getElementById("dashboard");
  const grammar = document.getElementById("grammar");
  const practice = document.getElementById("practice");
  const essay = document.getElementById("essay");

  const levelsDiv = document.getElementById("levels");
  const levelDisplay = document.getElementById("levelDisplay");
  const recList = document.getElementById("recList");
  const grammarList = document.getElementById("grammarList");
  const grammarTitle = document.getElementById("grammarTitle");

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const practiceFeedback = document.getElementById("practiceFeedback");
  const askAiBtn = document.getElementById("askAiBtn");

  const essayText = document.getElementById("essayText");
  const essayInfo = document.getElementById("essayInfo");
  const essayCount = document.getElementById("essayCount");
  const saveEssay = document.getElementById("saveEssay");
  const essayList = document.getElementById("essayList");

  const aiModal = document.getElementById("aiModal");
  const aiResponse = document.getElementById("aiResponse");
  const aiClose = document.getElementById("aiClose");

  /* ---------- App data ---------- */
  const LEVELS = ["A1","A2","B1","B2","C1"];
  const ESSAY_RULES = { A1:[60,80], A2:[80,120], B1:[150,180], B2:[200,250], C1:[280,350] };

  const QUESTION_BANK = {
    A1: [
      { q:"She ___ happy.", o:["is","are"], a:0, skill:"to_be" },
      { q:"I ___ coffee every morning.", o:["drink","drinks"], a:0, skill:"present_simple" },
      { q:"They ___ watching TV now.", o:["is","are"], a:1, skill:"present_continuous" }
    ],
    A2: [
      { q:"He ___ yesterday.", o:["worked","works"], a:0, skill:"past_simple" },
      { q:"I ___ seen that movie.", o:["have","had"], a:0, skill:"present_perfect" },
      { q:"She ___ her homework now.", o:["does","is doing"], a:1, skill:"present_continuous" }
    ],
    B1: [
      { q:"If I ___ time, I would help.", o:["have","had"], a:1, skill:"conditional" },
      { q:"The cake ___ by Mary.", o:["was baked","baked"], a:0, skill:"passive" },
      { q:"I ___ here since 2020.", o:["have been","was"], a:0, skill:"present_perfect" }
    ],
    B2: [
      { q:"No sooner ___ than he left.", o:["had I arrived","I had arrived"], a:0, skill:"inversion" },
      { q:"They should have ___ earlier.", o:["arrived","arrive"], a:0, skill:"modals_perfect" }
    ],
    C1: [
      { q:"Rarely ___ we see such talent.", o:["do","does"], a:0, skill:"inversion" },
      { q:"Had he known, he ___ helped.", o:["would have","would"], a:0, skill:"conditional_past" }
    ]
  };

  /* ---------- Helpers (storage + model) ---------- */
  function db(){ return JSON.parse(localStorage.getItem("users") || "{}"); }
  function saveDB(x){ localStorage.setItem("users", JSON.stringify(x)); }
  function currentUser(){ return localStorage.getItem("currentUser"); }
  function ensureModel(user){
    const users = db();
    if(!users[user]) users[user] = { level: "A1", model: createModel(), essays:[] };
    if(!users[user].model) users[user].model = createModel();
    saveDB(users);
  }
  function createModel(){ return { skills:{}, confidence:{}, mistakes:[] }; }

  /* ---------- UI navigation ---------- */
  function show(pageId){
    pages.forEach(p=>p.classList.remove("active"));
    const el = document.getElementById(pageId);
    if(el) el.classList.add("active");
    // special behavior: update top nav active color
    navBtns.forEach(n=>n.classList.toggle("active", n.dataset.page===pageId));
  }

  navBtns.forEach(btn=>{
    btn.addEventListener("click", ()=> {
      const page = btn.dataset.page;
      // require login to access practice/dashboard/essay/grammar? we'll allow but show content dynamically
      if(page === "dashboard") renderDashboard();
      if(page === "grammar") renderGrammarForCurrentUser();
      if(page === "practice") startPracticeForCurrentUser();
      if(page === "essay") renderEssayArea();
      show(page);
    });
  });

  logo.addEventListener("click", ()=> show("home"));

  document.querySelectorAll(".backBtn").forEach(b=> b.addEventListener("click", ()=> {
    // go back to dashboard if logged in, else home
    if(currentUser()) show("dashboard");
    else show("home");
  }));

  /* ---------- Theme ---------- */
  themeBtn.addEventListener("click", ()=> document.body.classList.toggle("dark"));

  /* ---------- Auth flow ---------- */
  let authMode = "login";
  loginBtn.addEventListener("click", ()=> { authMode="login"; authTitle.textContent="Login"; show("auth"); });
  signupBtn.addEventListener("click", ()=> { authMode="signup"; authTitle.textContent="Sign Up"; show("auth"); });

  authSubmit.addEventListener("click", ()=> {
    const u = authUser.value.trim();
    const p = authPass.value; // we don't use password for persistence here; it's a placeholder
    if(!u) return alert("Enter username");
    const users = db();
    if(authMode === "signup"){
      if(users[u]) return alert("That username exists");
      users[u] = { level: "A1", model: createModel(), essays: [] };
      saveDB(users);
    } else {
      if(!users[u]) return alert("User not found — please sign up");
      if(!users[u].model) users[u].model = createModel(); // ensure
    }
    localStorage.setItem("currentUser", u);
    ensureModel(u);
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    authUser.value = ""; authPass.value = "";
    // after login show level choice prompt
    show("levelChoice");
  });

  logoutBtn.addEventListener("click", ()=> {
    localStorage.removeItem("currentUser");
    logoutBtn.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    show("home");
  });

  /* ---------- After login: choose level or test ---------- */
  quickChooseBtn.addEventListener("click", ()=> {
    renderLevelChoicePage();
    show("dashboard");
  });
  quickTestBtn.addEventListener("click", ()=> {
    startPlacementTest();
  });

  // Also hero buttons
  document.getElementById("testLevelBtn").addEventListener("click", ()=> startPlacementTest());
  document.getElementById("chooseLevelBtn").addEventListener("click", ()=> { renderLevelChoicePage(); show("dashboard"); });

  /* ---------- Dashboard ---------- */
  function renderLevelChoicePage(){
    const user = currentUser();
    if(!user) return show("auth");
    const u = db()[user];
    // show level buttons in levelsDiv
    levelsDiv.innerHTML = "";
    LEVELS.forEach(l=>{
      const el = document.createElement("div");
      el.className = "card";
      el.textContent = l;
      el.style.cursor = "pointer";
      el.addEventListener("click", ()=> {
        const ok = confirm(`Are you sure you want to set your level to ${l}?`);
        if(!ok) return;
        const users = db(); users[user].level = l; saveDB(users);
        alert(`Level set to ${l}`);
        renderDashboard();
        show("dashboard");
      });
      levelsDiv.appendChild(el);
    });
  }

  function renderDashboard(){
    const user = currentUser();
    if(!user) { levelDisplay.innerHTML = `<div class="card">Not logged in. Please login or sign up.</div>`; recList.innerHTML=""; return; }
    ensureModel(user);
    const users = db();
    const lvl = users[user].level || "A1";
    levelDisplay.innerHTML = `<strong>Signed in:</strong> ${user} — Level: <em>${lvl}</em>`;
    // compute weak skills from model
    const model = users[user].model || createModel();
    const weak = Object.entries(model.confidence || {}).filter(([s,v]) => v < 70).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
    recList.innerHTML = "";
    if(weak.length===0) recList.innerHTML = `<div class="card">No weak skills detected yet. Do a practice to generate personalized recommendations.</div>`;
    else {
      weak.forEach(skill=>{
        const d = document.createElement("div"); d.textContent = `Weak skill: ${skill} — practice ' ${skill} ' topics.`; recList.appendChild(d);
      });
    }
  }

  /* ---------- Grammar ---------- */
  const GRAMMAR_TOPICS = {
    A1: ["To be (am/is/are)","Present simple","Present continuous"],
    A2: ["Past simple","Present perfect","Have got"],
    B1: ["Conditionals","Passive voice","Reported speech"],
    B2: ["Cleft sentences","Advanced modals"],
    C1: ["Inversion","Advanced discourse"]
  };

  function renderGrammarForCurrentUser(){
    const user = currentUser();
    const users = db();
    const lvl = user && users[user] ? users[user].level : "A1";
    grammarTitle.textContent = `${lvl} — Grammar Topics`;
    grammarList.innerHTML = "";
    (GRAMMAR_TOPICS[lvl] || []).forEach(topic=>{
      const div = document.createElement("div");
      div.textContent = topic;
      div.addEventListener("click", ()=> {
        // open practice for this topic's level
        startPracticeForLevel(lvl);
      });
      grammarList.appendChild(div);
    });
  }

  /* ---------- Practice & model recording ---------- */
  let currentSet = [];
  let qIndex = 0;

  function startPracticeForCurrentUser(){
    const user = currentUser();
    const users = db();
    const lvl = user && users[user] ? users[user].level : "A1";
    startPracticeForLevel(lvl);
  }

  function startPracticeForLevel(level){
    currentSet = (QUESTION_BANK[level] || []).slice();
    if(currentSet.length===0){
      questionEl.textContent = "No questions available for this level yet.";
      answersEl.innerHTML = "";
      show("practice");
      return;
    }
    qIndex = 0;
    show("practice");
    renderPracticeQuestion();
  }

  function renderPracticeQuestion(){
    const q = currentSet[qIndex];
    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    practiceFeedback.textContent = "";
    q.o.forEach((opt,i)=>{
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "primary";
      btn.addEventListener("click", ()=>{
        const correct = i===q.a;
        recordAnswer(q, correct);
        btn.style.opacity = "0.7";
        practiceFeedback.textContent = correct ? "Correct ✔" : "Wrong ✖";
        setTimeout(()=> {
          qIndex++;
          if(qIndex >= currentSet.length){
            practiceFeedback.textContent += " — Practice finished.";
            // after practice, show dashboard so user can see recommendations
            renderDashboard();
            show("dashboard");
            return;
          }
          renderPracticeQuestion();
        }, 700);
      });
      answersEl.appendChild(btn);
    });
  }

  function recordAnswer(question, correct){
    const user = currentUser();
    if(!user) return;
    ensureModel(user);
    const all = db();
    const model = all[user].model;
    const skill = question.skill || "general";
    if(!model.skills[skill]) model.skills[skill] = { correct:0, wrong:0 };
    if(correct) model.skills[skill].correct++; else { model.skills[skill].wrong++; model.mistakes.push({ skill, q: question.q, time: Date.now() }); }
    const s = model.skills[skill];
    model.confidence[skill] = Math.round((s.correct / (s.correct + s.wrong)) * 100);
    all[user].model = model;
    saveDB(all);
  }

  /* ---------- Simple AI assistant ---------- */
  askAiBtn.addEventListener("click", ()=> {
    const user = currentUser();
    if(!user) return alert("Please login to use AI advisor");
    const users = db();
    const model = users[user].model || createModel();
    const mistakes = model.mistakes || [];
    const summary = generateAIAdvice(mistakes, model.confidence || {});
    aiResponse.textContent = summary;
    aiModal.classList.remove("hidden");
  });

  aiClose.addEventListener("click", ()=> aiModal.classList.add("hidden"));

  function generateAIAdvice(mistakes, confidence){
    // If no mistakes, be encouraging
    if(!mistakes || mistakes.length===0) return "Great job — I don't see any recorded mistakes yet. Do a short practice and I'll analyze.";
    // count mistakes per skill
    const counts = {};
    mistakes.forEach(m => counts[m.skill] = (counts[m.skill] || 0) + 1);
    // build friendly suggestions
    const parts = [];
    Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(([skill,n])=>{
      const conf = (confidence[skill] || 0);
      parts.push(`Skill: ${skill} — mistakes: ${n}. Confidence ~ ${conf}%. Suggestion: review examples and do 5 targeted questions on "${skill}".`);
    });
    parts.push("\nGeneral tips:\n• Read short explanations for the weak topics.\n• Try to produce example sentences and check form.\n• If you want, paste an essay and I'll highlight common weak points.");
    return parts.join("\n\n");
  }

  /* ---------- Placement test (short) ---------- */
  const PLACEMENT = [
    { q:"She ___ working now.", o:["is","was"], a:0, level:"A1" },
    { q:"I ___ finished my homework.", o:["have","had"], a:0, level:"A2" },
    { q:"If I ___ you, I'd study.", o:["am","were"], a:1, level:"B1" },
    { q:"No sooner ___ than he left.", o:["we arrived","had we arrived"], a:1, level:"B2" },
    { q:"Hardly ___ when it started raining.", o:["had I arrived","I had arrived"], a:0, level:"C1" }
  ];
  let testIndex = 0, testScore = [];
  function startPlacementTest(){
    testIndex = 0; testScore = [];
    currentSet = PLACEMENT.slice();
    qIndex = 0;
    show("practice");
    renderPlacementQuestion();
  }
  function renderPlacementQuestion(){
    const q = currentSet[qIndex];
    questionEl.textContent = q.q;
    answersEl.innerHTML = "";
    q.o.forEach((opt,i)=>{
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "primary";
      btn.addEventListener("click", ()=>{
        if(i===q.a) testScore.push(q.level);
        testIndex++;
        if(testIndex >= currentSet.length){
          const chosen = decideLevelFromScores(testScore);
          const user = currentUser();
          if(user){
            const users = db(); users[user].level = chosen; saveDB(users);
            alert(`Placement result: ${chosen}.`);
          } else {
            alert(`Placement result: ${chosen}. Please log in to save level.`);
          }
          renderDashboard();
          show("dashboard");
          return;
        }
        qIndex = testIndex;
        renderPlacementQuestion();
      });
      answersEl.appendChild(btn);
    });
  }
  function decideLevelFromScores(scores){
    if(scores.includes("C1")) return "C1";
    if(scores.includes("B2")) return "B2";
    if(scores.includes("B1")) return "B1";
    if(scores.includes("A2")) return "A2";
    return "A1";
  }

  /* ---------- Essay UI + word counter ---------- */
  function renderEssayArea(){
    const user = currentUser();
    if(!user) return show("auth");
    ensureModel(user);
    const users = db();
    const lvl = users[user].level || "A1";
    const [min,max] = ESSAY_RULES[lvl];
    essayInfo.textContent = `Your level: ${lvl}. Required words: ${min}–${max}.`;
    updateEssayCounter(); loadEssays();
  }

  function updateEssayCounter(){
    const words = countWords(essayText.value);
    const user = currentUser();
    const lvl = user ? (db()[user].level || "A1") : "A1";
    const [min,max] = ESSAY_RULES[lvl];
    essayCount.textContent = `${words} / ${max} words`;
  }

  essayText.addEventListener("input", updateEssayCounter);

  saveEssay.addEventListener("click", ()=>{
    const user = currentUser();
    if(!user) return alert("Please login to save essays");
    const words = countWords(essayText.value);
    const lvl = db()[user].level || "A1";
    const [min,max] = ESSAY_RULES[lvl];
    if(words < min) return alert(`Too short for ${lvl}. Minimum ${min} words.`);
    if(words > max) return alert(`Too long for ${lvl}. Maximum ${max} words.`);
    const users = db();
    users[user].essays = users[user].essays || [];
    users[user].essays.unshift({ text: essayText.value, time: new Date().toLocaleString() });
    saveDB(users);
    essayText.value = "";
    updateEssayCounter();
    loadEssays();
    alert("Essay saved.");
  });

  function loadEssays(){
    essayList.innerHTML = "";
    const user = currentUser();
    if(!user) { essayList.innerHTML = "<li>Please login to see essays</li>"; return; }
    const arr = (db()[user].essays || []);
    if(arr.length===0) essayList.innerHTML = "<li>No essays yet</li>";
    arr.forEach(e=>{
      const li = document.createElement("li");
      li.textContent = `${e.time} — ${e.text.slice(0,140)}${e.text.length>140?"…":""}`;
      essayList.appendChild(li);
    });
  }

  function countWords(text){
    return text.trim().length===0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  }

  /* ---------- Init: show home and wire top nav to update colors in dark mode ---------- */
  show("home");

  // top nav visual update in dark mode: ensure buttons become readable
  const observer = new MutationObserver(()=> {
    // toggle nav button color class when body has .dark
    navBtns.forEach(btn => {
      if(document.body.classList.contains("dark")) btn.style.color = "#ffffff";
      else btn.style.color = "";
    });
  });
  observer.observe(document.body, { attributes:true, attributeFilter:["class"] });

  // make sure logout state shows correctly
  if(currentUser()){
    logoutBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
  }

  // ensure level choice actions exist (for the case not navigated)
  quickChooseBtn.addEventListener("click", ()=> { renderLevelChoicePage = renderLevelChoicePage || (()=>{}); });

});
