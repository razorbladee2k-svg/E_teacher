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
const loginBtn=document.getElementById("loginBtn");
const signupBtn=document.getElementById("signupBtn");

const welcome=document.getElementById("welcome");
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

const adviceBox=document.getElementById("adviceBox");

/* DATA */
let USERS=JSON.parse(localStorage.users||"{}");
let currentUser=null;

const GRAMMAR={
  B1:[
    {
      title:"First Conditional",
      rule:"If + present, will + verb",
      example:"If it rains, I will stay home.",
      mistake:"❌ If it will rain, I will stay home."
    },
    {
      title:"Passive Voice",
      rule:"be + past participle",
      example:"The letter was sent.",
      mistake:"❌ The letter was send."
    }
  ]
};

const PRACTICE={
  B1:{q:"If I ___ more time, I would help.",a:["have","had"],c:1,exp:"Unreal condition → use past simple."}
};

const ESSAYS={
  B1:["Technology and education"]
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
  USERS[u]={password:p,level:"B1"};
  localStorage.users=JSON.stringify(USERS);
  currentUser=u;
  show("level");
};

/* LEVEL */
document.querySelectorAll(".lvl").forEach(b=>{
  b.onclick=()=>{
    USERS[currentUser].level=b.dataset.lvl;
    localStorage.users=JSON.stringify(USERS);
    welcome.textContent=`Welcome ${currentUser} (${b.dataset.lvl})`;
    show("hub");
  };
});

/* HUB */
grammarBtn.onclick=()=>{
  grammarList.innerHTML="";
  GRAMMAR[USERS[currentUser].level].forEach(g=>{
    grammarList.innerHTML+=`
      <div class="grammar-card">
        <h3>${g.title}</h3>
        <p><b>Rule:</b> ${g.rule}</p>
        <p><b>Example:</b> ${g.example}</p>
        <p class="mistake">${g.mistake}</p>
      </div>`;
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
        i===p.c?"✅ Correct. "+p.exp:"❌ Incorrect. "+p.exp;
      practiceFeedback.classList.remove("hidden");
    };
    answers.appendChild(b);
  });
  show("practice");
};

essayBtn.onclick=()=>{
  essayTitle.textContent=ESSAYS[USERS[currentUser].level][0];
  essayFeedback.classList.add("hidden");
  show("essay");
};

/* ESSAY CHECKER */
essayText.oninput=()=>{
  const w=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=`${w} / 180`;
};

sendEssay.onclick=()=>{
  const t=essayText.value;
  let f=[];
  if(t.length<80) f.push("Essay is too short.");
  if(t.includes("I am agree")) f.push("❌ 'I am agree' → 'I agree'");
  if(t.includes("didn't went")) f.push("❌ 'didn't went' → 'didn't go'");
  if(!/[A-Z]/.test(t[0])) f.push("Start with a capital letter.");
  if(f.length===0) f.push("Good work. Minor mistakes only.");
  essayFeedback.innerHTML="<b>AI feedback:</b><br>"+f.join("<br>");
  essayFeedback.classList.remove("hidden");
};

/* BACK */
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("hub"));

/* DARK MODE */
document.getElementById("darkToggle").onclick=()=>{
  document.documentElement.classList.toggle("dark");
};

/* ADVICE */
const tips=[
  "Practice daily for 10 minutes.",
  "Mistakes mean progress.",
  "Write first, correct later.",
  "Grammar improves with use."
];
let i=0;
setInterval(()=>{
  adviceBox.textContent="Tip: "+tips[i++%tips.length];
},5000);

});
