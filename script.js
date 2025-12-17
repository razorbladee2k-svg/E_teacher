const pages=document.querySelectorAll(".page");
const show=id=>{
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

let currentUser=null;

const USERS=JSON.parse(localStorage.users||"{}");

const GRAMMAR={
  A1:["To be","Present simple","Present continuous"],
  A2:["Past simple","Present perfect"],
  B1:["Conditionals","Passive voice"],
  B2:["Advanced modals","Inversion"]
};

const PRACTICE={
  A1:[{q:"She ___ happy.",a:["is","are"],c:0}],
  A2:[{q:"I ___ finished.",a:["have","had"],c:0}],
  B1:[{q:"If I ___ you.",a:["was","were"],c:1}]
};

const ESSAY_TOPICS={
  A1:["My daily routine","My family"],
  A2:["A memorable trip","My favorite movie"],
  B1:["Technology in education","Social media pros & cons"],
  B2:["Is AI a threat or opportunity?"]
};

login.onclick=()=>{
  const u=username.value;
  if(!USERS[u]) return alert("User not found");
  currentUser=u;
  show("level");
};

signup.onclick=()=>{
  const u=username.value;
  if(USERS[u]) return alert("User exists");
  USERS[u]={level:null};
  localStorage.users=JSON.stringify(USERS);
  currentUser=u;
  show("level");
};

chooseLevel.onclick=()=>{
  const lvl=prompt("Choose A1 A2 B1 B2");
  USERS[currentUser].level=lvl;
  localStorage.users=JSON.stringify(USERS);
  welcome.textContent=`Welcome ${currentUser} (${lvl})`;
  show("hub");
};

testLevel.onclick=()=>{
  USERS[currentUser].level="B1";
  localStorage.users=JSON.stringify(USERS);
  welcome.textContent=`Welcome ${currentUser} (B1)`;
  show("hub");
};

goGrammar.onclick=()=>{
  const lvl=USERS[currentUser].level;
  grammarList.innerHTML="";
  GRAMMAR[lvl].forEach(g=>{
    const d=document.createElement("div");
    d.textContent=g;
    grammarList.appendChild(d);
  });
  show("grammar");
};

goPractice.onclick=()=>{
  const lvl=USERS[currentUser].level;
  const p=PRACTICE[lvl][0];
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

goEssay.onclick=()=>{
  const lvl=USERS[currentUser].level;
  const t=ESSAY_TOPICS[lvl];
  essayTitle.textContent=t[Math.floor(Math.random()*t.length)];
  show("essay");
};

essayText.oninput=()=>{
  const w=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent=`${w} / 180`;
};

askAI.onclick=()=>{
  aiText.textContent="Focus on sentence structure and verb tense consistency.";
  aiModal.classList.remove("hidden");
};

window.closeAI=()=>aiModal.classList.add("hidden");

document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("hub"));
logout.onclick=()=>location.reload();
