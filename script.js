document.addEventListener("DOMContentLoaded",()=>{

const pages=document.querySelectorAll(".page");
const show=id=>{
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

/* ELEMENTS */
const username=document.getElementById("username");
const password=document.getElementById("password");
const loginBtn=document.getElementById("loginBtn");
const signupBtn=document.getElementById("signupBtn");
const logoutBtn=document.getElementById("logoutBtn");

const chooseLevelBtn=document.getElementById("chooseLevelBtn");
const testLevelBtn=document.getElementById("testLevelBtn");

const testQ=document.getElementById("testQ");
const testAnswers=document.getElementById("testAnswers");
const testFeedback=document.getElementById("testFeedback");

const welcome=document.getElementById("welcome");

/* DATA */
let USERS=JSON.parse(localStorage.users||"{}");
let currentUser=null;

const TEST=[
  {q:"I ___ finished my work.",a:["have","has","had"],c:0},
  {q:"She didn’t ___ yesterday.",a:["went","go","gone"],c:1},
  {q:"If I were you, I ___ study more.",a:["will","would","am"],c:1},
  {q:"The letter ___ yesterday.",a:["is sent","was sent","has send"],c:1}
];

/* AUTH */
loginBtn.onclick=()=>{
  const u=username.value.trim();
  const p=password.value.trim();
  if(!USERS[u]||USERS[u].password!==p) return alert("Wrong login");
  currentUser=u;
  show("start");
};

signupBtn.onclick=()=>{
  const u=username.value.trim();
  const p=password.value.trim();
  if(USERS[u]) return alert("User exists");
  USERS[u]={password:p,level:null};
  localStorage.users=JSON.stringify(USERS);
  currentUser=u;
  show("start");
};

logoutBtn.onclick=()=>{
  currentUser=null;
  show("auth");
};

/* START */
chooseLevelBtn.onclick=()=>show("levelSelect");
testLevelBtn.onclick=()=>{
  show("levelTest");
  startTest();
};

/* LEVEL SELECT */
document.querySelectorAll(".lvl").forEach(btn=>{
  btn.onclick=()=>{
    const lvl=btn.dataset.lvl;
    USERS[currentUser].level=lvl;
    localStorage.users=JSON.stringify(USERS);
    welcome.textContent=`Welcome ${currentUser} (${lvl})`;
    show("hub");
  };
});

/* TEST */
let idx=0,score=0;

function startTest(){
  idx=0; score=0;
  loadQ();
}

function loadQ(){
  const t=TEST[idx];
  testQ.textContent=`Q${idx+1}. ${t.q}`;
  testAnswers.innerHTML="";
  testFeedback.classList.add("hidden");

  t.a.forEach((ans,i)=>{
    const b=document.createElement("button");
    b.textContent=ans;
    b.onclick=()=>{
      if(i===t.c){
        score++;
        testFeedback.textContent="✅ Correct";
        testFeedback.className="feedback correct";
      }else{
        testFeedback.innerHTML=`❌ Incorrect. Correct: <b>${t.a[t.c]}</b>`;
        testFeedback.className="feedback incorrect";
      }
      testFeedback.classList.remove("hidden");
      setTimeout(()=>{
        idx++;
        idx<TEST.length?loadQ():finishTest();
      },1200);
    };
    testAnswers.appendChild(b);
  });
}

function finishTest(){
  const lvl=score<=1?"A1":score===2?"A2":score===3?"B1":"B2";
  USERS[currentUser].level=lvl;
  localStorage.users=JSON.stringify(USERS);
  welcome.textContent=`Welcome ${currentUser} (${lvl})`;
  show("hub");
}

/* BACK */
document.querySelectorAll(".back").forEach(b=>{
  b.onclick=()=>show("start");
});

/* DARK MODE */
document.getElementById("darkToggle").onclick=()=>{
  document.documentElement.classList.toggle("dark");
};

/* LOGO HOME */
document.getElementById("goHome").onclick=()=>{
  currentUser?show("hub"):show("auth");
};

});
