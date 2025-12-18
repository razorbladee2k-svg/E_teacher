let level="B1";
let qIndex=0;
const questions=[
  "Choose the correct sentence:",
  "Which tense fits: I ___ lived here for years",
  "Present Perfect structure is?"
];

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

function login(){
  showPage("level");
}

function setLevel(l){
  level=l;
  document.getElementById("welcome").innerText=`Welcome (${level})`;
  showPage("dashboard");
}

function answer(){
  qIndex=(qIndex+1)%questions.length;
  document.getElementById("qText").innerText=questions[qIndex];
}

document.getElementById("qText")?.innerText=questions[0];

const titles=[
  "Is technology good for students?",
  "Should school be online?",
  "Advantages of learning English"
];

document.getElementById("essayTitle").innerText=
  titles[Math.floor(Math.random()*titles.length)];

document.getElementById("essayText")?.addEventListener("input",e=>{
  let words=e.target.value.trim().split(/\s+/).filter(Boolean);
  document.getElementById("count").innerText=
    `${words.length} / 180 words`;
});

function checkEssay(){
  alert("AI feedback coming soon (API ready)");
}
