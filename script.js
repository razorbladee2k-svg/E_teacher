/*********************
  PAGE NAVIGATION
*********************/
const pages = document.querySelectorAll(".page");
function show(id){
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/*********************
  ELEMENTS (FIX)
*********************/
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const chooseLevelBtn = document.getElementById("chooseLevelBtn");
const testLevelBtn = document.getElementById("testLevelBtn");

const grammarBtn = document.getElementById("grammarBtn");
const practiceBtn = document.getElementById("practiceBtn");
const essayBtn = document.getElementById("essayBtn");

const grammarList = document.getElementById("grammarList");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const essayTitle = document.getElementById("essayTitle");
const essayText = document.getElementById("essayText");
const wordCount = document.getElementById("wordCount");
const welcomeText = document.getElementById("welcomeText");

const aiModal = document.getElementById("aiModal");
const aiText = document.getElementById("aiText");
const askAI = document.getElementById("askAI");

/*********************
  DATA
*********************/
let USERS = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = null;

const GRAMMAR = {
  A1:["To be","Present simple","Present continuous"],
  A2:["Past simple","Present perfect"],
  B1:["Conditionals","Passive voice"],
  B2:["Advanced modals","Inversion"]
};

const PRACTICE = {
  A1:{q:"She ___ happy.",a:["is","are"],c:0},
  A2:{q:"I ___ finished.",a:["have","had"],c:0},
  B1:{q:"If I ___ you.",a:["was","were"],c:1},
  B2:{q:"No sooner ___ arrived.",a:["had we","we had"],c:0}
};

const ESSAY_TOPICS = {
  A1:["My daily routine","My family"],
  A2:["A memorable trip","My favorite movie"],
  B1:["Technology in education","Social media pros and cons"],
  B2:["Is AI a threat or opportunity?"]
};

/*********************
  AUTH (FIXED)
*********************/
loginBtn.onclick = () => {
  const u = usernameInput.value.trim();
  if(!u) return alert("Enter username");

  if(!USERS[u]){
    alert("User not found. Please sign up.");
    return;
  }

  currentUser = u;
  show("level");
};

signupBtn.onclick = () => {
  const u = usernameInput.value.trim();
  if(!u) return alert("Enter username");

  if(USERS[u]){
    alert("User already exists");
    return;
  }

  USERS[u] = { level:null };
  localStorage.setItem("users", JSON.stringify(USERS));
  currentUser = u;

  show("level");
};

logoutBtn.onclick = () => {
  currentUser = null;
  show("auth");
};

/*********************
  LEVEL SELECTION
*********************/
chooseLevelBtn.onclick = () => {
  const lvl = prompt("Choose your level: A1, A2, B1, B2");
  if(!GRAMMAR[lvl]) return alert("Invalid level");

  USERS[currentUser].level = lvl;
  localStorage.setItem("users", JSON.stringify(USERS));

  welcomeText.textContent = `Welcome ${currentUser} (${lvl})`;
  show("hub");
};

testLevelBtn.onclick = () => {
  USERS[currentUser].level = "B1";
  localStorage.setItem("users", JSON.stringify(USERS));

  welcomeText.textContent = `Welcome ${currentUser} (B1)`;
  show("hub");
};

/*********************
  HUB ACTIONS
*********************/
grammarBtn.onclick = () => {
  const lvl = USERS[currentUser].level;
  grammarList.innerHTML = "";
  GRAMMAR[lvl].forEach(g => {
    const div = document.createElement("div");
    div.textContent = g;
    grammarList.appendChild(div);
  });
  show("grammar");
};

practiceBtn.onclick = () => {
  const lvl = USERS[currentUser].level;
  const p = PRACTICE[lvl];
  question.textContent = p.q;
  answers.innerHTML = "";

  p.a.forEach((text,i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => alert(i === p.c ? "Correct" : "Wrong");
    answers.appendChild(btn);
  });

  show("practice");
};

essayBtn.onclick = () => {
  const lvl = USERS[currentUser].level;
  const topics = ESSAY_TOPICS[lvl];
  essayTitle.textContent = topics[Math.floor(Math.random()*topics.length)];
  show("essay");
};

/*********************
  ESSAY COUNTER
*********************/
essayText.oninput = () => {
  const words = essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent = `${words} / 180`;
};

/*********************
  AI ASSISTANT
*********************/
askAI.onclick = () => {
  aiText.textContent =
    "AI advice:\n\n" +
    "• Focus on verb tense consistency\n" +
    "• Avoid long sentences\n" +
    "• Review conditionals\n\n" +
    "Try more practice to improve.";
  aiModal.classList.remove("hidden");
};

function closeAI(){
  aiModal.classList.add("hidden");
}
window.closeAI = closeAI;

/*********************
  BACK BUTTONS
*********************/
document.querySelectorAll(".back").forEach(b=>{
  b.onclick = () => show("hub");
});

/*********************
  INIT
*********************/
show("auth");
