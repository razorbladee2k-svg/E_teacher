/* =====================
   PAGE CONTROL
===================== */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome() {
  show("testIntro");
}

/* =====================
   DARK MODE
===================== */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* =====================
   AUTH (LOCAL)
===================== */
let currentUser = null;

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
  if (localStorage.getItem(u) === p) {
    currentUser = u;
    welcome.innerText = `Welcome ${u} (B1)`;
    show("testIntro");
  } else {
    alert("Wrong login");
  }
}

function logout() {
  currentUser = null;
  show("login");
}

/* =====================
   LEVEL TEST (15 Q)
===================== */
const testQuestions = Array.from({ length: 15 }, (_, i) => ({
  q: `Question ${i + 1}: Choose correct sentence`,
  options: ["Wrong form", "Correct form", "Incorrect form"],
  correct: 1
}));

let tIndex = 0;
let score = 0;

function startTest() {
  tIndex = 0;
  score = 0;
  show("test");
  loadTest();
}

function loadTest() {
  const q = testQuestions[tIndex];
  testQuestion.innerText = q.q;
  testOptions.innerHTML = "";
  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "btn btn-outline";
    b.innerText = o;
    b.onclick = () => {
      if (i === q.correct) score++;
    };
    testOptions.appendChild(b);
  });
}

function nextTest() {
  tIndex++;
  if (tIndex >= testQuestions.length) {
    welcome.innerText = `Welcome ${currentUser} (B1)`;
    show("dashboard");
    return;
  }
  loadTest();
}

/* =====================
   PRACTICE (50 RANDOM)
===================== */
const practiceQuestions = Array.from({ length: 50 }, (_, i) => ({
  q: `Practice ${i + 1}: Choose correct answer`,
  options: ["Wrong", "Correct", "Wrong"],
  correct: 1,
  explain: "Grammar rule applied correctly"
}));

let pIndex = 0;
let pool = [];

function startPractice() {
  pool = [...practiceQuestions].sort(() => Math.random() - 0.5);
  pIndex = 0;
  show("practice");
  loadPractice();
}

function loadPractice() {
  const q = pool[pIndex];
  practiceQ.innerText = q.q;
  practiceOpts.innerHTML = "";
  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "btn btn-outline";
    b.innerText = o;
    b.onclick = () => {
      practiceQ.innerText =
        i === q.correct ? "✅ Good job!" : `❌ Mistake: ${q.explain}`;
    };
    practiceOpts.appendChild(b);
  });
}

function nextPractice() {
  pIndex++;
  if (pIndex >= pool.length) {
    practiceQ.innerText = "🎉 Practice finished!";
    practiceOpts.innerHTML = "";
    return;
  }
  loadPractice();
}

/* =====================
   ESSAY
===================== */
const essayTitles = [
  "Is technology good for education?",
  "Advantages of learning English",
  "Social media pros and cons"
];

function startEssay() {
  essayTitle.innerText =
    essayTitles[Math.floor(Math.random() * essayTitles.length)];
  essayText.value = "";
  essayFeedback.innerText = "";
  show("essay");
}

function checkEssay() {
  const words = essayText.value.trim().split(/\s+/).length;
  wordCount.innerText = `${words} words`;
  essayFeedback.innerText =
    words < 50
      ? "⚠ Essay too short. Expand ideas."
      : "✅ Good structure. Watch verb tenses and articles.";
}
