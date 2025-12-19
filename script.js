const pages = document.querySelectorAll(".page");
const user = document.getElementById("user");
const pass = document.getElementById("pass");

let testIndex = 0;
let score = 0;

const testQuestions = [
  { q: "She ___ already eaten.", a: ["has","have","is"], c: 0 },
  { q: "If I ___ rich, I would travel.", a: ["am","were","was"], c: 1 },
  { q: "The book was ___ by him.", a: ["write","written","wrote"], c: 1 }
];

const practiceQuestions = [
  { q: "I wish I ___ more time.", a: ["have","had","has"], c: 1 },
  { q: "This car ___ in Germany.", a: ["made","is made","make"], c: 1 }
];

function show(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function signup() {
  if (!user.value || !pass.value) return alert("Fill all fields");
  localStorage.setItem("eteacher_" + user.value, pass.value);
  alert("Account created");
}

function login() {
  const saved = localStorage.getItem("eteacher_" + user.value);
  if (saved === pass.value) show("testIntro");
  else alert("Wrong login");
}

function startTest() {
  testIndex = 0;
  score = 0;
  show("test");
  loadTest();
}

function loadTest() {
  if (testIndex >= 15) {
    let level = score >= 12 ? "C1" : score >= 9 ? "B2" : score >= 6 ? "B1" : "A2";
    document.getElementById("welcome").innerText = `Welcome ${user.value} (${level})`;
    show("dashboard");
    return;
  }

  const q = testQuestions[Math.floor(Math.random()*testQuestions.length)];
  document.getElementById("questionText").innerText = q.q;
  document.getElementById("options").innerHTML = q.a.map((o,i)=>
    `<button class="btn" onclick="answerTest(${i},${q.c})">${o}</button>`
  ).join("");
}

function answerTest(i,c) {
  if (i === c) score++;
  testIndex++;
  loadTest();
}

let pIndex = 0;
function openPractice() {
  pIndex = 0;
  show("practice");
  loadPractice();
}

function loadPractice() {
  const q = practiceQuestions[pIndex % practiceQuestions.length];
  document.getElementById("practiceQ").innerText = q.q;
  document.getElementById("practiceOpts").innerHTML =
    q.a.map((o,i)=>`<button class="btn">${o}</button>`).join("");
}

function nextPractice() {
  pIndex++;
  loadPractice();
}

function openGrammar(){ show("grammar"); }
function openDashboard(){ show("dashboard"); }
function openEssay(){
  const titles = ["My future goals","Technology in education","Why learning English matters"];
  document.getElementById("essayTitle").innerText =
    titles[Math.floor(Math.random()*titles.length)];
  show("essay");
}

document.getElementById("essayText")?.addEventListener("input", e=>{
  document.getElementById("count").innerText =
    e.target.value.trim().split(/\s+/).filter(Boolean).length + " words";
});

function checkEssay() {
  document.getElementById("feedback").innerText =
    "AI Feedback: Check verb tenses, articles, and sentence clarity.";
}

function logout(){ show("auth"); }
function goHome(){ show("auth"); }
