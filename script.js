let currentUser = null;
let currentLevel = null;

const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// NAV
document.getElementById("loginBtn").onclick = () => showPage("loginPage");
document.getElementById("signupBtn").onclick = () => showPage("signupPage");
document.getElementById("darkBtn").onclick = () =>
  document.body.classList.toggle("dark");

// AUTH
function signup() {
  const u = signupUser.value;
  const p = signupPass.value;
  if (!u || !p) return alert("Fill all fields");
  localStorage.setItem("user", JSON.stringify({ u, p }));
  alert("Account created");
  showPage("loginPage");
}

function login() {
  const saved = JSON.parse(localStorage.getItem("user"));
  if (!saved) return alert("No user");
  if (
    loginUser.value === saved.u &&
    loginPass.value === saved.p
  ) {
    currentUser = saved.u;
    showPage("levelPage");
  } else alert("Wrong login");
}

function logout() {
  currentUser = null;
  showPage("loginPage");
}

// LEVEL
function setLevel(level) {
  currentLevel = level;
  welcomeText.innerText = `Welcome ${currentUser} (${level})`;
  showPage("dashboardPage");
}

// GRAMMAR
function openGrammar() {
  grammarList.innerHTML = "";
  const topics = {
    A1: ["Present simple", "There is / are"],
    A2: ["Past simple", "Comparatives"],
    B1: ["Conditionals", "Passive voice"],
    B2: ["Reported speech", "Modal verbs"]
  };
  topics[currentLevel].forEach(t => {
    const li = document.createElement("li");
    li.innerText = t;
    grammarList.appendChild(li);
  });
  showPage("grammarPage");
}

// PRACTICE
let correct = "went";

function openPractice() {
  question.innerText = "I ___ to school yesterday.";
  showPage("practicePage");
}

function checkAnswer() {
  result.innerText =
    answer.value.toLowerCase() === correct
      ? "Correct ✅"
      : "Incorrect ❌";
}

// ESSAY
function openEssay() {
  const topics = [
    "Describe your favorite movie",
    "Why do you want to learn English?",
    "Talk about your future goals"
  ];
  essayTopic.innerText =
    topics[Math.floor(Math.random() * topics.length)];
  showPage("essayPage");
}

essayText.oninput = () => {
  const count = essayText.value.split(/\s+/).filter(Boolean).length;
  wordCount.innerText = `${count} / 150 words`;
};

function submitEssay() {
  alert("Essay submitted (AI checking coming soon)");
}

function goBack() {
  showPage("dashboardPage");
}
