let users = JSON.parse(localStorage.users || "{}");
let currentUser = null;
let level = null;

/* NAV */
function go(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/* AUTH */
function login(){
  const u=username.value,p=password.value;
  if(!users[u]||users[u]!==p){alert("Wrong login");return}
  currentUser=u;
  go("level");
}

function signup(){
  const u=username.value,p=password.value;
  if(users[u]){alert("User exists");return}
  users[u]=p;
  localStorage.users=JSON.stringify(users);
  currentUser=u;
  go("level");
}

function logout(){
  currentUser=null;
  go("auth");
}

/* LEVEL */
function setLevel(l){
  level=l;
  go("home");
}

/* GRAMMAR */
const grammar={
A1:["Present simple","To be"],
A2:["Past simple","Present continuous"],
B1:["Conditionals","Passive voice"],
B2:["Mixed conditionals","Reported speech"]
};

function loadGrammar(){
  grammarTitle.textContent=`Grammar (${level})`;
  grammarContent.innerHTML="";
  grammar[level].forEach(g=>{
    grammarContent.innerHTML+=`<div>${g}</div>`;
  });
}
document.getElementById("grammar").addEventListener("click",loadGrammar);

/* PRACTICE */
const questions={
A1:{q:"I ___ a student.",a:["am","are"],c:0},
B1:{q:"If I ___ time, I would go.",a:["have","had"],c:1}
};

function loadPractice(){
  const q=questions[level]||questions.B1;
  question.textContent=q.q;
  answers.innerHTML="";
  feedback.textContent="";
  q.a.forEach((x,i)=>{
    const b=document.createElement("button");
    b.textContent=x;
    b.onclick=()=>feedback.textContent=i===q.c?"✅ Correct":"❌ Incorrect";
    answers.appendChild(b);
  });
}
document.getElementById("practice").addEventListener("click",loadPractice);

/* ESSAY */
essayText.addEventListener("input",()=>{
  const w=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=w+" words";
});

function checkEssay(){
  essayFeedback.innerHTML="AI feedback: structure is OK, watch verb tense.";
  essayTopic.textContent="Topic: Should students study online?";
}
