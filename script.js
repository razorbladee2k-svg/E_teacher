const pages = document.querySelectorAll(".page");

function show(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* AUTH */
function signup() {
  localStorage.setItem(user.value, pass.value);
  alert("Account created");
}

function login() {
  if (localStorage.getItem(user.value) === pass.value) {
    startIntro();
  } else alert("Wrong login");
}

function logout() {
  show("auth");
}

function startIntro() {
  show("testIntro");
}

/* TEST */
let tIndex = 0, score = 0;
const testQs = Array.from({ length: 15 }, (_, i) => ({
  q: `Question ${i + 1}: Choose correct`,
  o: ["Correct", "Wrong A", "Wrong B"],
  a: 0
}));

function startTest() {
  tIndex = 0; score = 0;
  show("test");
  nextTest();
}

function nextTest() {
  if (tIndex >= testQs.length) return finishTest();
  const q = testQs[tIndex];
  testQ.innerText = q.q;
  testOpts.innerHTML = "";
  q.o.forEach((x, i) => {
    let b = document.createElement("button");
    b.className = "btn";
    b.innerText = x;
    b.onclick = () => {
      if (i === q.a) score++;
      tIndex++; nextTest();
    };
    testOpts.appendChild(b);
  });
}

function finishTest() {
  let level = "A1";
  if (score >= 5) level = "A2";
  if (score >= 8) level = "B1";
  if (score >= 11) level = "B2";
  if (score >= 14) level = "C1";
  welcome.innerText = `Welcome ${user.value} (${level})`;
  show("dash");
}

/* NAV */
function goDash(){ show("dash"); }
function goHome(){ show("auth"); }

/* PRACTICE */
let pIndex = 0;
const practiceQs = Array.from({ length: 50 }, (_, i) => ({
  q: `Practice question ${i+1}`,
  o: ["Correct", "Wrong"],
  a: 0
}));

function startPractice() {
  pIndex = 0;
  show("practice");
  showPractice();
}

function showPractice() {
  const q = practiceQs[pIndex];
  pQ.innerText = q.q;
  pOpts.innerHTML = "";
  q.o.forEach((x,i)=>{
    let b=document.createElement("button");
    b.className="btn";
    b.innerText=x;
    b.onclick=()=>{ pIndex++; showPractice(); };
    pOpts.appendChild(b);
  });
}

function nextPractice() {
  if (pIndex < practiceQs.length-1) {
    pIndex++; showPractice();
  }
}

/* ESSAY */
const titles = [
  "Is technology making us lazy?",
  "Should school be online?",
  "Is social media good or bad?"
];

function startEssay() {
  essayTitle.innerText = titles[Math.floor(Math.random()*titles.length)];
  essayText.value = "";
  essayFB.innerText = "";
  show("essay");
}

function checkEssay() {
  const words = essayText.value.split(/\s+/).length;
  wc.innerText = `${words} words`;
  if (words < 80)
    essayFB.innerText = "Too short. Develop ideas more.";
  else
    essayFB.innerText =
      "Good structure. Check verb tenses, articles, and sentence variety.";
}
