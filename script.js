document.addEventListener("DOMContentLoaded",()=>{

const pages=document.querySelectorAll(".page");
window.show=id=>{
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

const username=document.getElementById("username");
const password=document.getElementById("password");
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
const practiceFeedback=document.getElementById("practiceFeedback");

const essayTitle=document.getElementById("essayTitle");
const essayText=document.getElementById("essayText");
const wordCount=document.getElementById("wordCount");
const sendEssay=document.getElementById("sendEssay");
const essayFeedback=document.getElementById("essayFeedback");

let USERS=JSON.parse(localStorage.getItem("users")||"{}");
let currentUser=null;

const GRAMMAR={
  A1:["To be","Present simple"],
  A2:["Past simple","Present perfect"],
  B1:["Conditionals","Passive voice"],
  B2:["Inversion","Advanced modals"]
};

const PRACTICE={
  A1:{q:"She ___ happy.",a:["is","are"],c:0,exp:"'She' is singular → use 'is'."},
  A2:{q:"I ___ finished.",a:["have","had"],c:0,exp:"Present perfect fits a recent result."},
  B1:{q:"If I ___ you.",a:["was","were"],c:1,exp:"Unreal condition → 'were'."},
  B2:{q:"No sooner ___ arrived.",a:["had we","we had"],c:0,exp:"Inversion uses 'had we'."}
};

const TEST=[...Object.values(PRACTICE)];

const ESSAYS={
  A1:["My daily routine"],
  A2:["A memorable trip"],
  B1:["Technology in education"],
  B2:["Is AI changing society?"]
};

/* AUTH */
loginBtn.onclick=()=>{
  const u=username.value.trim();
  const p=password.value.trim();
  if(!USERS[u]||USERS[u].password!==p) return alert("Wrong login");
  currentUser=u;
  show("level");
};

signupBtn.onclick=()=>{
  const u=username.value.trim();
  const p=password.value.trim();
  if(USERS[u]) return alert("User exists");
  USERS[u]={password:p,level:null};
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
      if(i===t.c) score++;
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
  practiceFeedback.classList.add("hidden");
  p.a.forEach((x,i)=>{
    const b=document.createElement("button");
    b.textContent=x;
    b.onclick=()=>{
      practiceFeedback.innerHTML=
        i===p.c
        ? "✅ Correct. "+p.exp
        : "❌ Incorrect. "+p.exp;
      practiceFeedback.classList.remove("hidden");
    };
    answers.appendChild(b);
  });
  show("practice");
};

essayBtn.onclick=()=>{
  const lvl=USERS[currentUser].level;
  essayTitle.textContent=ESSAYS[lvl][0];
  essayFeedback.classList.add("hidden");
  show("essay");
};

essayText.oninput=()=>{
  const w=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=`${w} / 180`;
};

sendEssay.onclick=()=>{
  if(essayText.value.trim().length<40){
    alert("Essay too short");
    return;
  }
  essayFeedback.innerHTML=
    "AI feedback:<br><br>"+
    "• Improve sentence clarity<br>"+
    "• Watch verb tense consistency<br>"+
    "• Add one example<br><br>"+
    "Overall level: Good";
  essayFeedback.classList.remove("hidden");
};

/* BACK */
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("hub"));

});
