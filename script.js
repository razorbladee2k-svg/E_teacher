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

/* LOGIN */
function login() {
  const user = document.getElementById("username").value;
  if (!user) return alert("Enter username");
  localStorage.setItem("user", user);
  document.getElementById("welcome").innerText =
    "Welcome " + user;
  startTest();
}

/* LOGOUT */
function logout() {
  showPage("login");
}

/* TEST */
const testQuestions = [
  { q: "She ___ to school every day.", a: ["go", "goes", "going"], c: 1 },
  { q: "I have ___ dinner.", a: ["eat", "eaten", "eating"], c: 1 },
  { q: "If it rains, we ___ home.", a: ["stay", "will stay", "stayed"], c: 1 },
  { q: "The book ___ by him.", a: ["wrote", "was written", "write"], c: 1 },
  { q: "He is ___ than me.", a: ["tall", "taller", "tallest"], c: 1 },
  { q: "I didn’t ___ her.", a: ["saw", "see", "seen"], c: 1 },
  { q: "She speaks ___ .", a: ["fluent", "fluently", "fluency"], c: 1 },
  { q: "We were late ___ traffic.", a: ["because", "because of", "so"], c: 1 },
  { q: "You ___ smoke here.", a: ["mustn't", "don't", "won't"], c: 0 },
  { q: "I wish I ___ taller.", a: ["am", "was", "were"], c: 2 }
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
  document.getElementById("testQuestion").innerText = q.q;
  document.getElementById("testOptions").innerHTML =
    q.a.map((o, i) =>
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
const practiceQuestions = Array.from({ length: 30 }, (_, i) => ({
  q: `Practice question ${i + 1}`,
  a: ["Wrong", "Correct", "Wrong"],
  c: 1
}));

let practiceIndex = 0;

function startPractice() {
  practiceIndex = 0;
  practiceQuestions.sort(() => Math.random() - 0.5);
  showPage("practice");
  loadPractice();
}

function loadPractice() {
  const q = practiceQuestions[practiceIndex];
  document.getElementById("practiceQuestion").innerText = q.q;
  document.getElementById("practiceOptions").innerHTML =
    q.a.map((o, i) =>
      `<button onclick="answerPractice(${i})">${o}</button>`
    ).join("");
  document.getElementById("practiceFeedback").innerText = "";
}

function answerPractice(i) {
  document.getElementById("practiceFeedback").innerText =
    i === practiceQuestions[practiceIndex].c
      ? "✅ Good job!"
      : "❌ Wrong answer";
}

function nextPractice() {
  practiceIndex++;
  if (practiceIndex < practiceQuestions.length) {
    loadPractice();
  } else {
    document.getElementById("practiceQuestion").innerText =
      "🎉 Practice completed!";
    document.getElementById("practiceOptions").innerHTML = "";
  }
}

/* ESSAY */
const essayTitles = [
  "Why learning English is important",
  "My future goals",
  "Technology in education"
];

document.getElementById("essayTitle").innerText =
  essayTitles[Math.floor(Math.random() * essayTitles.length)];

function checkEssay() {
  const text = document.getElementById("essayText").value;
  const words = text.trim().split(/\s+/).length;
  document.getElementById("essayFeedback").innerText =
    words < 50
      ? "Essay too short."
      : "Good job! Check grammar and tenses.";
}
