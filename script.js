/* PAGE SWITCH */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* DARK MODE */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* AUTH */
function signup() {
  const u = username.value;
  const p = password.value;
  if (!u || !p) return alert("Fill all fields");
  localStorage.setItem(u, p);
  alert("Account created");
}

function login() {
  const u = username.value;
  const p = password.value;
  if (localStorage.getItem(u) !== p) return alert("Wrong login");
  localStorage.setItem("currentUser", u);
  show("testIntro");
}

function logout() {
  localStorage.removeItem("currentUser");
  show("login");
}

/* TEST */
const testQuestions = [
  {q:"She ___ to school every day.", a:["go","goes","going"], c:1},
  {q:"I have lived here ___ 2020.", a:["since","for","from"], c:0},
  {q:"If it rains, we ___ home.", a:["stay","will stay","stayed"], c:1},
  {q:"He ___ already finished.", a:["has","have","had"], c:0},
  {q:"The book ___ by John.", a:["writes","was written","is write"], c:1},
];

let tIndex=0, score=0;

function startTest() {
  tIndex=0; score=0;
  show("test");
  nextTest();
}

function nextTest() {
  if (tIndex >= 15) {
    let level = score < 5 ? "A1" : score < 8 ? "A2" : score < 11 ? "B1" : score < 14 ? "B2" : "C1";
    levelResult.innerText = `Your level: ${level} (${score}/15)`;
    welcome.innerText = `Welcome ${localStorage.getItem("currentUser")} (${level})`;
    show("result");
    return;
  }

  const q = testQuestions[Math.floor(Math.random()*testQuestions.length)];
  testQ.innerText = q.q;
  testOpts.innerHTML = "";
  q.a.forEach((opt,i)=>{
    const b=document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=opt;
    b.onclick=()=>{ if(i===q.c) score++; tIndex++; nextTest(); };
    testOpts.appendChild(b);
  });
}

/* PRACTICE */
const practiceQs = [
  {q:"He ___ playing.", a:["is","are","am"], c:0},
  {q:"They ___ finished.", a:["has","have","had"], c:1},
  {q:"If I study, I ___ pass.", a:["will","would","did"], c:0}
];

function nextPractice() {
  const q = practiceQs[Math.floor(Math.random()*practiceQs.length)];
  practiceQ.innerText = q.q;
  practiceOpts.innerHTML="";
  q.a.forEach((o,i)=>{
    const b=document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=o;
    b.onclick=()=>alert(i===q.c ? "Correct ✅" : "Wrong ❌");
    practiceOpts.appendChild(b);
  });
}

/* ESSAY */
const titles = [
  "The importance of learning English",
  "My future goals",
  "Technology in daily life"
];

essayTitle.innerText = titles[Math.floor(Math.random()*titles.length)];

function checkEssay() {
  const text = essayText.value;
  if (text.length < 50) {
    essayFeedback.innerText = "Too short. Write more details.";
  } else {
    essayFeedback.innerText =
      "Feedback:\n• Good structure\n• Check verb tenses\n• Watch article usage";
  }
}
