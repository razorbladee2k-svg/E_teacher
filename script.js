let dark = false;
let testIndex = 0;
let testScore = 0;
let practiceIndex = 0;

const levelTest = [
  { q: "She ___ finished her homework.", a: ["has", "have", "is"], c: 0 },
  { q: "If I ___ time, I would help.", a: ["had", "have", "will have"], c: 0 },
  { q: "He has lived here ___ 2019.", a: ["since", "for", "from"], c: 0 },
  { q: "Passive voice: 'They built the house' → ?", a: [
    "The house was built",
    "The house is build",
    "The house has build"
  ], c: 0 },
  { q: "Choose correct sentence:", a: [
    "She doesn’t like coffee",
    "She don’t like coffee",
    "She not like coffee"
  ], c: 0 },
  { q: "Present perfect structure?", a: [
    "Subject + have/has + V3",
    "Subject + V2",
    "Subject + will + verb"
  ], c: 0 },
  { q: "He speaks ___ than me.", a: ["better", "best", "good"], c: 0 },
  { q: "We were tired ___ we continued.", a: ["but", "because", "so"], c: 0 },
  { q: "Reported speech of: He said 'I am tired'", a: [
    "He said he was tired",
    "He said I am tired",
    "He says he tired"
  ], c: 0 },
  { q: "Correct plural:", a: ["children", "childs", "childes"], c: 0 }
];

const practiceQuestions = [...levelTest];

const essayTopics = [
  "Is English important for your future?",
  "Should students use phones in school?",
  "Advantages of learning a second language",
  "Is online learning effective?"
];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
}

function startTest() {
  testIndex = 0;
  testScore = 0;
  showPage("levelTest");
  loadTest();
}

function loadTest() {
  const q = levelTest[testIndex];
  document.getElementById("testQuestion").innerText = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => {
      if (i === q.c) testScore++;
      testIndex++;
      if (testIndex < levelTest.length) loadTest();
      else finishTest();
    };
    answers.appendChild(btn);
  });
}

function finishTest() {
  let level = testScore < 4 ? "A2" : testScore < 7 ? "B1" : "B2";
  document.getElementById("welcome").innerText =
    `Welcome! Your level: ${level}`;
  showPage("dashboard");
}

function startPractice() {
  practiceIndex = 0;
  showPage("practice");
  loadPractice();
}

function loadPractice() {
  const q = practiceQuestions[practiceIndex];
  document.getElementById("practiceQ").innerText = q.q;
  const answers = document.getElementById("practiceAnswers");
  answers.innerHTML = "";

  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => {
      alert(i === q.c ? "Correct ✔" : `Wrong ✖\nCorrect: ${q.a[q.c]}`);
      practiceIndex++;
      if (practiceIndex < practiceQuestions.length) loadPractice();
      else showPage("dashboard");
    };
    answers.appendChild(btn);
  });
}

function checkEssay() {
  const text = document.getElementById("essayText").value;
  const feedback = document.getElementById("essayFeedback");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (words < 80) {
    feedback.innerText = "❌ Too short. Write at least 80 words.";
    return;
  }

  let issues = [];
  if (!text.match(/[.!?]/)) issues.push("Use punctuation.");
  if (text.split("I").length > 5) issues.push("Avoid repeating 'I' too much.");

  feedback.innerText =
    issues.length === 0
      ? "✔ Good structure. Minor grammar mistakes only."
      : "Issues found:\n• " + issues.join("\n• ");
}

document.getElementById("essayTitle").innerText =
  essayTopics[Math.floor(Math.random() * essayTopics.length)];

document.getElementById("essayText")?.addEventListener("input", e => {
  document.getElementById("wordCount").innerText =
    e.target.value.trim().split(/\s+/).filter(Boolean).length + " words";
});
