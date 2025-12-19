/* ========= PAGE CONTROL ========= */
function show(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* ========= DARK MODE ========= */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ========= AUTH ========= */
let currentUser = null;

function signup() {
  if (!username.value || !password.value)
    return alert("Fill all fields");
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

/* ========= TEST (15 QUESTIONS) ========= */
const testBase = [
  { q:"She ___ already finished.", o:["has","have"], c:0 },
  { q:"If it rains, we ___ home.", o:["stay","will stay"], c:1 },
  { q:"The book ___ by him.", o:["was written","wrote"], c:0 },
  { q:"I have lived here ___ 2020.", o:["since","for"], c:0 },
  { q:"He is ___ than me.", o:["taller","tallest"], c:0 }
];

let testQs = [];
let tIndex = 0;
let score = 0;

function startTest() {
  testQs = [];
  while (testQs.length < 15) {
    testQs.push(
      testBase[Math.floor(Math.random()*testBase.length)]
    );
  }
  tIndex = 0;
  score = 0;
  show("test");
  loadTest();
}

function loadTest() {
  const q = testQs[tIndex];
  testQuestion.innerText = `Q${tIndex+1}: ${q.q}`;
  testOptions.innerHTML = "";
  q.o.forEach((opt,i)=>{
    const b = document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=opt;
    b.onclick=()=>{
      if(i===q.c) score++;
      tIndex++;
      if(tIndex>=testQs.length){
        welcome.innerText =
          `Welcome ${currentUser} (${score}/15)`;
        localStorage.setItem(
          "progress_"+currentUser,
          JSON.stringify({ practice:0 })
        );
        updateProgress();
        show("dashboard");
      } else {
        loadTest();
      }
    };
    testOptions.appendChild(b);
  });
}

/* ========= PRACTICE (LOCKED ANSWERS) ========= */
const practiceBase = [
  ["She ___ to school every day.",["go","goes"],1,"Third person + s"],
  ["They ___ finished.",["has","have"],1,"Plural → have"],
  ["The cake ___ by her.",["was made","made"],0,"Passive voice"],
  ["If I study, I ___ pass.",["will","would"],0,"First conditional"],
  ["He is ___ than me.",["better","best"],0,"Comparative"]
];

while(practiceBase.length < 60){
  practiceBase.push(...practiceBase.slice(0,5));
}

let practiceQs = [];
let pIndex = 0;
let answered = false;

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function startPractice() {
  practiceQs = shuffle([...practiceBase]);
  pIndex = 0;
  show("practice");
  loadPractice();
}

function loadPractice() {
  answered = false;
  const q = practiceQs[pIndex];
  practiceQ.innerText = `Question ${pIndex+1}: ${q[0]}`;
  practiceFeedback.innerText = "";
  practiceOpts.innerHTML = "";

  q[1].forEach((opt,i)=>{
    const b=document.createElement("button");
    b.className="btn btn-outline";
    b.innerText=opt;
    b.onclick=()=>{
      if(answered) return;
      answered=true;
      [...practiceOpts.children].forEach(x=>x.disabled=true);
      if(i===q[2]){
        practiceFeedback.innerText="✅ Good job!";
      } else {
        practiceFeedback.innerText=
          `❌ Mistake. Correct: ${q[1][q[2]]} (${q[3]})`;
      }
    };
    practiceOpts.appendChild(b);
  });
}

function nextPractice() {
  if(!answered) return alert("Answer first 🙂");
  pIndex++;
  if(pIndex>=practiceQs.length){
    practiceQ.innerText="🎉 Practice finished!";
    practiceOpts.innerHTML="";
    practiceFeedback.innerText="Great work!";
    return;
  }
  loadPractice();
}

/* ========= ESSAY ========= */
const essayTitles=[
  "Why learning English matters",
  "Technology in education",
  "My future goals"
];

function startEssay() {
  essayTitle.innerText =
    essayTitles[Math.floor(Math.random()*essayTitles.length)];
  essayText.value="";
  essayFeedback.innerText="";
  show("essay");
}

function checkEssay() {
  const words = essayText.value.trim().split(/\s+/).length;
  essayFeedback.innerText =
    words<60
    ? "Essay too short. Add more ideas."
    : "Good job! Check verb tenses and articles.";
}

/* ========= PROGRESS ========= */
function updateProgress() {
  progressInfo.innerText="Practice progress saved";
}
