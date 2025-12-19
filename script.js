/* ================= PAGE ================= */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ================= AUTH ================= */
function signup() {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return alert("Fill all fields");
  if (localStorage.getItem("acc_" + u)) return alert("User already exists");
  localStorage.setItem("acc_" + u, JSON.stringify({ p }));
  alert("Account created. Now login.");
}

function login() {
  const u = username.value.trim();
  const p = password.value.trim();
  const acc = localStorage.getItem("acc_" + u);
  if (!acc) return alert("Account does not exist");
  if (JSON.parse(acc).p !== p) return alert("Wrong password");
  localStorage.setItem("currentUser", u);
  showPage("testIntro");
}

/* ================= ENGLISH LEVEL TEST (15 QUESTIONS) ================= */

const questions = [
  { q: "She ___ lived here for 5 years.", o: ["has", "have"], c: 0 },
  { q: "If it ___, we will stay home.", o: ["rains", "rained"], c: 0 },
  { q: "I didn’t ___ him yesterday.", o: ["see", "saw"], c: 0 },
  { q: "They ___ finished their work.", o: ["have", "has"], c: 0 },
  { q: "He speaks ___ than me.", o: ["better", "best"], c: 0 },
  { q: "I am interested ___ music.", o: ["in", "on"], c: 0 },
  { q: "She ___ to school yesterday.", o: ["went", "go"], c: 0 },
  { q: "The book ___ written by him.", o: ["was", "is"], c: 0 },
  { q: "We were tired, ___ we left.", o: ["so", "because"], c: 0 },
  { q: "I’ve known her ___ 2020.", o: ["since", "for"], c: 0 },
  { q: "He enjoys ___ English.", o: ["learning", "learn"], c: 0 },
  { q: "This is ___ book.", o: ["my", "mine"], c: 0 },
  { q: "She doesn’t like ___ coffee.", o: ["drinking", "drink"], c: 0 },
  { q: "I ___ never been to Japan.", o: ["have", "has"], c: 0 },
  { q: "If I ___ more time, I would help.", o: ["had", "have"], c: 0 }
];

let qi = 0;
let score = 0;

function startTest() {
  qi = 0;
  score = 0;
  showPage("test");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[qi];
  questionText.innerText = `(${qi + 1}/15) ${q.q}`;
  options.innerHTML = "";

  q.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = text;
    btn.onclick = () => answer(i);
    options.appendChild(btn);
  });
}

function answer(choice) {
  if (choice === questions[qi].c) score++;
  qi++;
  qi < questions.length ? loadQuestion() : finishTest();
}

function finishTest() {
  let level = "A1";
  if (score >= 6) level = "A2";
  if (score >= 10) level = "B1";
  if (score >= 13) level = "B2";

  localStorage.setItem("level", level);
  resultText.innerText =
    `Your English level is ${level} (${score}/15)`;

  showPage("result");
}

/* ================= DASHBOARD ================= */
function loadDashboard() {
  userLevel.innerText = localStorage.getItem("level");
  showPage("dashboard");
}

/* ================= GRAMMAR ================= */
function loadGrammar() {
  const lvl = localStorage.getItem("level");
  grammarContent.innerHTML =
    lvl === "A1" ? `
<b>Present Simple</b><br>
Structure: Subject + verb (+s)<br>
Example: She works here.<br>
Negative: She does not work here.<br>
Question: Does she work here?
` :
    lvl === "A2" ? `
<b>Past Simple</b><br>
Structure: Subject + verb(ed)<br>
Example: I visited London.<br>
Negative: I did not visit London.<br>
Question: Did you visit London?
` :
    lvl === "B1" ? `
<b>Present Perfect</b><br>
Structure: Subject + have/has + past participle<br>
Example: I have finished my homework.<br>
Negative: I have not finished my homework.<br>
Question: Have you finished your homework?
` :
`
<b>Conditionals</b><br>
Structure: If + past simple, would + base verb<br>
Example: If I had time, I would help.
`;
  showPage("grammar");
}

/* ================= PRACTICE ================= */
const practiceQs = [
  { q: "She ___ finished her homework.", o: ["has", "have"], c: 0, why: "She = has" },
  { q: "If I ___ time, I would study more.", o: ["had", "have"], c: 0, why: "Second conditional" },
  { q: "He ___ playing now.", o: ["is", "are"], c: 0, why: "He = is" }
];

let pi = 0;

function loadPractice() {
  pi = 0;
  showPractice();
  showPage("practice");
}

function showPractice() {
  const q = practiceQs[pi];
  practiceQuestion.innerText = q.q;
  practiceOptions.innerHTML = "";

  q.o.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "btn";
    b.innerText = t;
    b.onclick = () => {
      alert(i === q.c ? "Correct ✅" : "Wrong ❌ — " + q.why);
      pi++;
      pi < practiceQs.length ? showPractice() : showPage("dashboard");
    };
    practiceOptions.appendChild(b);
  });
}

/* ================= ESSAY ================= */
function loadEssay() {
  essayTitle.innerText = "Should students learn English at school?";
  essayFeedback.innerText = "";
  showPage("essay");
}

function checkEssay() {
  const text = essayText.value.trim();
  const words = text.split(/\s+/);
  let feedback = [];

  if (words.length < 80) feedback.push("❌ Too short (minimum 80 words)");
  if (!/[.!?]/.test(text)) feedback.push("❌ No punctuation");
  if (text === text.toUpperCase()) feedback.push("❌ All caps detected");

  if (feedback.length === 0)
    feedback.push("✅ Acceptable structure. Review grammar carefully.");

  essayFeedback.innerText = feedback.join("\n");
}

function logout() {
  localStorage.clear();
  showPage("auth");
}
