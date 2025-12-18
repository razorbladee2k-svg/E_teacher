const pages = document.querySelectorAll(".page");
let user = null;
let level = null;

// PAGE CONTROL
function show(id) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// TOP BUTTONS
loginBtn.onclick = () => show("loginPage");
signupBtn.onclick = () => show("signupPage");
darkToggle.onclick = () => document.body.classList.toggle("dark");

// AUTH
function signup() {
  if (!signupUser.value || !signupPass.value) return alert("Fill fields");
  localStorage.setItem("user", JSON.stringify({
    u: signupUser.value,
    p: signupPass.value
  }));
  alert("Account created");
  show("loginPage");
}

function login() {
  const saved = JSON.parse(localStorage.getItem("user"));
  if (!saved) return alert("No account");
  if (loginUser.value === saved.u && loginPass.value === saved.p) {
    user = saved.u;
    show("levelPage");
  } else alert("Wrong login");
}

function logout() {
  user = null;
  show("loginPage");
}

function goLogin(){ show("loginPage"); }
function goDashboard(){ show("dashboardPage"); }

// LEVEL
function setLevel(l) {
  level = l;
  welcome.innerText = `Welcome ${user} (${l})`;
  show("dashboardPage");
}

// GRAMMAR
function openGrammar() {
  grammarList.innerHTML = "";
  const data = {
    A1: ["Present simple","There is/are","Articles","Prepositions"],
    A2: ["Past simple","Future (will/going)","Comparatives"],
    B1: ["Conditionals","Passive voice","Relative clauses"],
    B2: ["Reported speech","Modal verbs","Inversion"]
  };
  data[level].forEach(t=>{
    const li=document.createElement("li");
    li.textContent=t;
    grammarList.appendChild(li);
  });
  show("grammarPage");
}

// PRACTICE
const practiceQs = [
  {q:"I ___ to school yesterday.", a:"went"},
  {q:"She has ___ her homework.", a:"done"},
  {q:"If I were you, I ___ study.", a:"would"}
];
let qi = 0;

function openPractice() {
  qi = 0;
  loadPractice();
  show("practicePage");
}

function loadPractice(){
  practiceQuestion.innerText = practiceQs[qi].q;
  practiceResult.innerText = "";
  practiceInput.value = "";
}

function checkPractice(){
  practiceResult.innerText =
    practiceInput.value.toLowerCase() === practiceQs[qi].a
    ? "Correct ✅"
    : "Incorrect ❌";
}

function nextPractice(){
  qi = (qi + 1) % practiceQs.length;
  loadPractice();
}

// ESSAY (AI SIMULATION)
const essayTitles = [
  "Why learning English matters",
  "My future goals",
  "Technology in education",
  "Traveling abroad"
];

function openEssay(){
  essayTitle.innerText =
    essayTitles[Math.floor(Math.random()*essayTitles.length)];
  essayText.value="";
  essayFeedback.innerHTML="";
  updateCount();
  show("essayPage");
}

essayText.oninput = updateCount;

function updateCount(){
  const words = essayText.value.trim().split(/\s+/).filter(Boolean).length;
  essayCount.innerText = `${words} / 150 words`;
}

function checkEssay(){
  const text = essayText.value;
  let feedback = "<b>AI feedback:</b><br>";
  if (text.length < 100) feedback += "• Essay is too short<br>";
  if (!text.includes(".")) feedback += "• Use more sentences<br>";
  if (text.match(/\bi\b/g)) feedback += "• Capitalize 'I'<br>";
  if (feedback === "<b>AI feedback:</b><br>")
    feedback += "• Good job! Minor mistakes only.";
  essayFeedback.innerHTML = feedback;
}
