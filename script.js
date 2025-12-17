const pages = document.querySelectorAll(".page");
const navs = document.querySelectorAll(".nav");

const levels = ["A1","A2","B1","B2","C1"];
const essayRules = {
  A1:[60,80], A2:[80,120], B1:[150,180], B2:[200,250], C1:[280,350]
};

let mode = "login";

function show(id){
  pages.forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

navs.forEach(b=>b.onclick=()=>show(b.dataset.page));

theme.onclick=()=>document.body.classList.toggle("dark");

login.onclick=()=>{mode="login"; authTitle.textContent="Login"; show("authPage");}
signup.onclick=()=>{mode="signup"; authTitle.textContent="Sign Up"; show("authPage");}

submitAuth.onclick=()=>{
  const u=user.value.trim();
  if(!u) return alert("Username required");
  const db=JSON.parse(localStorage.users||"{}");
  if(mode==="signup"){ if(db[u])return alert("Exists"); db[u]={level:"A1", essays:[]}; }
  else if(!db[u]) return alert("Not found");
  localStorage.users=JSON.stringify(db);
  localStorage.currentUser=u;
  logout.classList.remove("hidden");
  login.classList.add("hidden");
  signup.classList.add("hidden");
  renderLevels();
  show("dashboard");
}

logout.onclick=()=>{
  localStorage.removeItem("currentUser");
  show("home");
}

document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("home"));

function renderLevels(){
  levelsDiv.innerHTML="";
  levels.forEach(l=>{
    const d=document.createElement("div");
    d.className="card";
    d.textContent=l;
    d.onclick=()=>{
      const db=JSON.parse(localStorage.users);
      db[currentUser()].level=l;
      localStorage.users=JSON.stringify(db);
      loadEssayInfo();
      show("grammar");
    };
    levelsDiv.appendChild(d);
  });
}

function currentUser(){return localStorage.currentUser;}

function loadEssayInfo(){
  const db=JSON.parse(localStorage.users);
  const lvl=db[currentUser()].level;
  const [min,max]=essayRules[lvl];
  essayInfo.textContent=`Your level: ${lvl}. Required words: ${min}-${max}`;
}

essayText.oninput=()=>{
  const words=essayText.value.trim().split(/\s+/).filter(Boolean).length;
  count.textContent=`Words: ${words}`;
}

saveEssay.onclick=()=>{
  const db=JSON.parse(localStorage.users);
  const lvl=db[currentUser()].level;
  const words=essayText.value.trim().split(/\s+/).length;
  const [min,max]=essayRules[lvl];
  if(words<min||words>max) return alert("Word count not valid for your level");
  db[currentUser()].essays.push({text:essayText.value,time:new Date().toLocaleString()});
  localStorage.users=JSON.stringify(db);
  alert("Essay saved");
}

show("home");
