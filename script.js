/* PAGE CONTROL */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* DARK MODE */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* AUTH SYSTEM */
let currentUser = null;

function signup() {
  const user = signupUser.value.trim();
  const pass = signupPass.value.trim();

  if (!user || !pass) return alert("Fill all fields");

  if (localStorage.getItem("user_" + user)) {
    return alert("User already exists");
  }

  localStorage.setItem("user_" + user, pass);
  alert("Account created. Please login.");
  showPage("login");
}

function login() {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();

  const saved = localStorage.getItem("user_" + user);
  if (!saved) return alert("User does not exist");
  if (saved !== pass) return alert("Wrong password");

  currentUser = user;
  welcome.innerText = "Welcome " + user;
  startTest();
}

function logout() {
  currentUser = null;
  showPage("login");
}

/* TEST (10 QUESTIONS) */
const testQuestions = [
  { q:"She ___ to school every day.", a:["go","goes","going"], c:1 },
  { q:"I have ___ dinner.", a:["eat","eaten","eating"], c:1 },
  { q:"If it rains, we ___ home.", a:["stay","will stay","stayed"], c:1 },
  { q:"The book ___ by him.", a:["wrote","was written","write"], c:1 },
  { q:"He is ___ than me.", a:["tall","taller","tallest"], c:1 },
  { q:"I didn’t ___ her.", a:["saw","see","seen"], c:1 },
  { q:"She speaks ___ .", a:["fluent","fluently","fluency"], c:1 },
  { q:"We were late ___ traffic.", a:["because","because of","so"], c:1 },
  { q:"You ___ smoke here.", a:["mustn't","don't","won't"], c:0 },
  { q:"I wish I ___ taller.", a:["am","was","were"], c:2 }
];

let testIndex = 0;
let score = 0;

function startTest() {
  testIndex = 0;
  score = 0;
  showPage("test");
  loadTest();
}

function loadTest() {
  const q = testQuestions[testIndex];
  testQuestion.innerText = q.q;
  testOptions.innerHTML =
    q.a.map((o,i)=>
      `<button onclick="answerTest(${i})">${o}</button>`
    ).join("");
}

function answerTest(i) {
  if (i === testQuestions[testIndex].c) score++;
}

function nextTest() {
  testIndex++;
  if (testIndex < testQuestions.length) {
    loadTest();
  } else {
    showPage("dashboard");
  }
}

/* PRACTICE – 30 QUESTIONS */
const practiceQuestions = Array.from({length:30},(_,i)=>({
  q:`Practice question ${i+1}`,
  a:["Wrong","Correct","Wrong"],
  c:1
}));

let practiceIndex = 0;

function startPractice() {
  practiceIndex = 0;
  practiceQuestions.sort(()=>Math.random()-0.5);
  showPage("practice");
  loadPractice();
}

function loadPractice() {
  const q = practiceQuestions[practiceIndex];
  practiceQuestion.innerText = q.q;
  practiceOptions.innerHTML =
    q.a.map((o,i)=>
      `<button onclick="answerPractice(${i})">${o}</button>`
    ).join("");
  practiceFeedback.innerText="";
}

function answerPractice(i) {
  practiceFeedback.innerText =
    i===practiceQuestions[practiceIndex].c
      ? "✅ Good job!"
      : "❌ Wrong answer";
}

function nextPractice() {
  practiceIndex++;
  if (practiceIndex < practiceQuestions.length) {
    loadPractice();
  } else {
    practiceQuestion.innerText = "🎉 Practice completed!";
    practiceOptions.innerHTML = "";
  }
}

/* ESSAY */
const essayTitles = [
  "Why learning English is important",
  "My future goals",
  "Technology in education"
];

essayTitle.innerText =
  essayTitles[Math.floor(Math.random()*essayTitles.length)];

function checkEssay() {
  const text = essayText.value.trim();
  const words = text.split(/\s+/).length;
  essayFeedback.innerText =
    words < 50
      ? "Essay too short."
      : "Good job! Check grammar and tenses.";
}
