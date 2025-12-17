document.addEventListener("DOMContentLoaded",()=>{

/* NAV */
const pages=document.querySelectorAll(".page");
window.show=id=>{
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

/* ELEMENTS */
const username=document.getElementById("username");
const loginBtn=document.getElementById("loginBtn");
const signupBtn=document.getElementById("signupBtn");

const chooseLevelBtn=document.getElementById("chooseLevelBtn");
const testLevelBtn=document.getElementById("testLevelBtn");
const levelOptions=document.getElementById("levelOptions");
const levelTest=document.getElementById("levelTest");
const testQ=document.getElementById("testQ");
const testAnswers=document.getElementById("testAnswers");

const welcomeText=document.getElementById("welcomeText");
const grammarBtn=document.getElementById("grammarBtn");
const practiceBtn=document.getElementById("practiceBtn");
const essayBtn=document.getElementById("essayBtn");

const grammarList=document.getElementById("grammarList");
const question=document.getElementById("question");
const answers=document.getElementById("answers");

const essayTitle=document.getElementById("essayTitle");
const essayText=document.getElementById("essayText");
const wordCount=document.getElementById("wordCount");

/* DATA */
let USERS=JSON.parse(localStorage.getItem("users")||"{}");
let currentUser=null;

const GRAMMAR={
  A1:["To be","Present simple"],
  A2:["Past simple","Present perfect"],
  B1:["Conditionals","Passive"],
  B2:["Inversion","Advanced modals"]
};

const PRACTICE={
  A1:{q:"She ___ happy.",a:["is","are"],c:0},
  A2:{q:"I ___ finished.",a:["have","had"],c:0},
  B1:{q:"If I ___ you.",a:["was","were"],c:1},
  B2:{q:"No sooner ___ arrived.",a:["had we","we had"],c:0}
};

const TEST=[
  {q:"She ___ happy.",a:["is","are"],c:0},
  {q:"I ___ finished.",a:["have","had"],c:0},
  {q:"If I ___ you.",a:["was","were"],c:1},
  {q:"No sooner ___ arrived.",a:["had we","we had"],c:0}
];

const ESSAYS={
  A1:["My family"],
  A2:["A memorable trip"],
  B1:["Technology and education"],
  B2:["Is AI changing society?"]
};

/* AUTH */
loginBtn.onclick=()=>{
  const u=username.value.trim();
  if(!USERS[u]) return alert("User not found");
  currentUser=u;
  show("level");
};

signupBtn.onclick=()=>{
  const u=username.value.trim();
  if(USERS[u]) return alert("User exists");
  USERS[u]={level:null};
  localStorage.setItem("users",JSON.stringify(USERS));
  currentUser=u;
  show("level");
};

/* LEVEL */
chooseLevelBtn.onclick=()=>{
  levelOptions.classList.remove("hidden");
  levelTest.classList.add("hidden");
};

document.querySelectorAll(".lvl").forEach(b=>{
  b.onclick=()=>{
    USERS[currentUser].level=b.dataset.lvl;
    localStorage.setItem("users",JSON.stringify(USERS));
    welcomeText.textContent=`Welcome ${currentUser} (${b.dataset.lvl})`;
    show("hub");
  };
});

let idx=0,score=0;
testLevelBtn.onclick=()=>{
  levelOptions.classList.add("hidden");
  levelTest.classList.remove("hidden");
  idx=0;score=0;
  loadTest();
};

function loadTest(){
  const t=TEST[idx];
  testQ.textContent=t.q;
  testAnswers.innerHTML="";
  t.a.forEach((x,i)=>{
    const btn=document.createElement("button");
    btn.textContent=x;
    btn.onclick=()=>{
      if(i===t.c)score++;
      idx++;
      idx<TEST.length?loadTest():finishTest();
    };
    testAnswers.appendChild(btn);
  });
}

function finishTest(){
  const lvl=score<=1?"A1":score==2?"A2":score==3?"B1":"B2";
  USERS[currentUser].level=lvl;
  localStorage.setItem("users",JSON.stringify(USERS));
  welcomeText.textContent=`Welcome ${currentUser} (${lvl})`;
  show("hub");
}

/* HUB */
grammarBtn.onclick=()=>{
  grammarList.innerHTML="";
  GRAMMAR[USERS[currentUser].level].forEach(g=>{
    grammarList.innerHTML+=`<div>${g}</div>`;
  });
  show("grammar");
};

practiceBtn.onclick=()=>{
  const p=PRACTICE[USERS[currentUser].level];
  question.textContent=p.q;
  answers.innerHTML="";
  p.a.forEach((x,i)=>{
    const b=document.createElement("button");
    b.textContent=x;
    b.onclick=()=>alert(i===p.c?"Correct":"Wrong");
    answers.appendChild(b);
  });
  show("practice");
};

essayBtn.onclick=()=>{
  const lvl=USERS[currentUser].level;
  essayTitle.textContent=ESSAYS[lvl][0];
  show("essay");
};

essayText.oninput=()=>{
  const w=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=`${w} / 180`;
};

/* BACK */
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("hub"));

});

