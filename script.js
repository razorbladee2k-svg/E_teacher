document.addEventListener("DOMContentLoaded",()=>{

/* NAV */
const pages=document.querySelectorAll(".page");
const show=id=>{
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

/* ELEMENTS */
const username=document.getElementById("username");
const password=document.getElementById("password");
const welcome=document.getElementById("welcome");

const grammarBtn=document.getElementById("grammarBtn");
const essayBtn=document.getElementById("essayBtn");
const grammarContent=document.getElementById("grammarContent");

const essayInput=document.getElementById("essayInput");
const essayResult=document.getElementById("essayResult");
const wordCount=document.getElementById("wordCount");
const essayTitle=document.getElementById("essayTitle");

/* DATA */
let USERS=JSON.parse(localStorage.users||"{}");
let currentUser=null;

/* GRAMMAR BY LEVEL */
const GRAMMAR={
  A1:[
    "Present simple: I am, you are",
    "Basic word order",
    "A / An"
  ],
  A2:[
    "Past simple",
    "Comparatives",
    "Countable vs uncountable"
  ],
  B1:[
    "First & second conditional",
    "Present perfect vs past simple",
    "Passive voice"
  ],
  B2:[
    "Mixed conditionals",
    "Advanced passive",
    "Inversion for emphasis"
  ]
};

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
testLevelBtn.onclick=()=>show("levelTest");

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

/* GRAMMAR */
grammarBtn.onclick=()=>{
  const lvl=USERS[currentUser].level;
  grammarContent.innerHTML="";
  GRAMMAR[lvl].forEach(g=>{
    grammarContent.innerHTML+=`<p>• ${g}</p>`;
  });
  show("grammar");
};

/* ESSAY */
essayBtn.onclick=()=>{
  const lvl=USERS[currentUser].level;
  essayTitle.textContent=`Essay practice (${lvl})`;
  essayInput.value="";
  essayResult.classList.add("hidden");
  show("essay");
};

essayInput.oninput=()=>{
  const w=essayInput.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=`${w} words`;
};

checkEssay.onclick=()=>{
  let text=essayInput.value;
  let feedback=[];
  let marked=text;

  if(text.includes("I am agree")){
    marked=marked.replace("I am agree","<span class='incorrect'>I am agree</span>");
    feedback.push("❌ Use 'I agree', not 'I am agree'");
  }
  if(text.includes("didn't went")){
    marked=marked.replace("didn't went","<span class='incorrect'>didn't went</span>");
    feedback.push("❌ Use 'didn't go'");
  }

  if(feedback.length===0){
    feedback.push("✅ Good structure. Minor or no mistakes.");
  }

  essayResult.innerHTML="<b>Feedback:</b><br>"+feedback.join("<br>")+"<hr>"+marked;
  essayResult.classList.remove("hidden");
};

/* BACK */
document.querySelectorAll(".back").forEach(b=>{
  b.onclick=()=>show("hub");
});

/* DARK MODE */
darkToggle.onclick=()=>{
  document.documentElement.classList.toggle("dark");
};

/* LOGO */
goHome.onclick=()=>{
  currentUser?show("hub"):show("auth");
};

});
