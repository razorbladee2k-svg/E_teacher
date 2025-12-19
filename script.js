// ---------- DARK MODE ----------
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ---------- AUTH ----------
function signup() {
  const u = username.value;
  const p = password.value;
  if (!u || !p) return alert("Fill all fields");
  localStorage.setItem("user", JSON.stringify({ u, p }));
  alert("Account created!");
}

function login() {
  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) return alert("No account found");
  if (username.value === data.u && password.value === data.p) {
    show("testIntro");
  } else {
    alert("Wrong credentials");
  }
}

// ---------- NAV ----------
function show(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ---------- TEST ----------
let testIndex = 0;
let score = 0;

const testQuestions = [
  { q: "If I ___ time, I will help you.", a: ["have","had","will have"], c:0 },
  { q: "She has lived here ___ 2018.", a:["since","for","from"], c:0 },
  { q: "The book ___ by him.", a:["is written","was write","wrote"], c:0 },
  // 12 more auto-generated
];

while (testQuestions.length < 15) {
  testQuestions.push(testQuestions[Math.floor(Math.random()*3)]);
}

function startTest() {
  testIndex = 0;
  score = 0;
  show("test");
  loadTest();
}

function loadTest() {
  const q = testQuestions[testIndex];
  testQuestion.innerText = q.q;
  testOptions.innerHTML = "";
  q.a.forEach((opt,i)=>{
    const b=document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=opt;
    b.onclick=()=>{ if(i===q.c) score++; };
    testOptions.appendChild(b);
  });
}

function nextTest() {
  testIndex++;
  if (testIndex >= 15) return finishTest();
  loadTest();
}

function finishTest() {
  show("result");
  let level = score < 6 ? "A2" : score < 10 ? "B1" : score < 13 ? "B2" : "C1";
  levelResult.innerText = `Score: ${score}/15 → ${level}`;
}

// ---------- PRACTICE ----------
const practiceQs = [];
for(let i=1;i<=50;i++){
  practiceQs.push({
    q:`Practice question ${i}`,
    a:["A","B","C","D"],
    c:Math.floor(Math.random()*4)
  });
}

let pIndex=0;

function goPractice(){ show("practice"); loadPractice(); }

function loadPractice(){
  const q=practiceQs[pIndex];
  practiceQuestion.innerText=q.q;
  practiceOptions.innerHTML="";
  q.a.forEach(opt=>{
    const b=document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=opt;
    practiceOptions.appendChild(b);
  });
}

function nextPractice(){
  pIndex=(pIndex+1)%practiceQs.length;
  loadPractice();
}

// ---------- ESSAY ----------
const titles=[
  "Technology and Education",
  "Is English Important?",
  "Social Media Pros and Cons"
];

essayTitle.innerText=titles[Math.floor(Math.random()*titles.length)];

function checkEssay(){
  const text=essayText.value;
  let feedback=[];
  if(text.length<100) feedback.push("Essay is too short.");
  if(!/\.|\?/.test(text)) feedback.push("Add punctuation.");
  if(!/(have|has|was|were)/i.test(text)) feedback.push("Check verb tenses.");
  essayFeedback.innerText=feedback.length
    ? feedback.join(" ")
    : "Good structure. Minor grammar improvements needed.";
}
