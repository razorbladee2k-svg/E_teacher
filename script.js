/* ========= PAGE ========= */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ========= DARK MODE ========= */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ========= AUTH ========= */
let currentUser = null;

function signup() {
  if (!username.value || !password.value) return alert("Fill all fields");
  localStorage.setItem("user_" + username.value, password.value);
  alert("Account created");
}

function login() {
  const saved = localStorage.getItem("user_" + username.value);
  if (saved === password.value) {
    currentUser = username.value;
    show("testIntro");
  } else {
    alert("Wrong login");
  }
}

function logout() {
  currentUser = null;
  show("login");
}

/* ========= TEST ========= */
const testQs = Array.from({ length: 15 }, (_, i) => ({
  q: `Choose the correct sentence (${i + 1})`,
  options: ["Wrong", "Correct", "Incorrect"],
  correct: 1
}));

let tIndex = 0, score = 0;

function startTest() {
  tIndex = 0; score = 0;
  show("test");
  loadTest();
}

function loadTest() {
  const q = testQs[tIndex];
  testQuestion.innerText = q.q;
  testOptions.innerHTML = "";
  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "btn btn-outline";
    b.innerText = o;
    b.onclick = () => { if (i === q.correct) score++; };
    testOptions.appendChild(b);
  });
}

function nextTest() {
  tIndex++;
  if (tIndex >= testQs.length) {
    localStorage.setItem("progress_" + currentUser, JSON.stringify({
      score,
      practiceDone: 0
    }));
    welcome.innerText = `Welcome ${currentUser} (B1)`;
    updateProgress();
    show("dashboard");
  } else {
    loadTest();
  }
}

/* ========= PRACTICE (60 QUESTIONS) ========= */
const basePractice = [
  ["She ___ finished.", ["has","have"], 0, "She = has"],
  ["If it rains, we ___ home.", ["stay","will stay"], 1, "First conditional"],
  ["The book ___ by him.", ["was written","wrote"], 0, "Passive voice"],
  ["I am interested ___ music.", ["in","on"], 0, "Interested + in"],
  ["He speaks ___ than me.", ["better","best"], 0, "Comparative adjective"]
];

while (basePractice.length < 60) {
  basePractice.push(...basePractice.slice(0,5));
}

let practicePool = [];
let pIndex = 0;
let correctCount = 0;

function startPractice() {
  practicePool = basePractice.sort(() => Math.random() - 0.5);
  pIndex = 0;
  correctCount = 0;
  show("practice");
  loadPractice();
}

function loadPractice() {
  const q = practicePool[pIndex];
  practiceQ.innerText = q[0];
  practiceFeedback.innerText = "";
  practiceOpts.innerHTML = "";

  q[1].forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "btn btn-outline";
    b.innerText = opt;
    b.onclick = () => {
      if (i === q[2]) {
        practiceFeedback.innerText = "✅ Good job 👏";
        correctCount++;
      } else {
        practiceFeedback.innerText = "❌ Mistake: " + q[3];
      }
    };
    practiceOpts.appendChild(b);
  });
}

function nextPractice() {
  pIndex++;
  if (pIndex >= practicePool.length) {
    const data = JSON.parse(localStorage.getItem("progress_" + currentUser));
    data.practiceDone += correctCount;
    localStorage.setItem("progress_" + currentUser, JSON.stringify(data));
    updateProgress();
    show("dashboard");
  } else {
    loadPractice();
  }
}

/* ========= PROGRESS ========= */
function updateProgress() {
  const data = JSON.parse(localStorage.getItem("progress_" + currentUser));
  progressInfo.innerText =
    `Practice correct answers: ${data.practiceDone}`;
}

/* ========= ESSAY ========= */
const essayTitles = [
  "Why learning English matters",
  "Technology in education",
  "My future goals"
];

function startEssay() {
  essayTitle.innerText =
    essayTitles[Math.floor(Math.random() * essayTitles.length)];
  essayFeedback.innerText = "";
  essayText.value = "";
  show("essay");
}

function checkEssay() {
  const words = essayText.value.trim().split(/\s+/).length;
  essayFeedback.innerText =
    words < 60
      ? "Essay too short. Add more details."
      : "Good job! Check verb tenses and articles.";
}
