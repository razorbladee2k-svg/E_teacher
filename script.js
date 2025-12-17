const pages=document.querySelectorAll(".page");
const navBtns=document.querySelectorAll(".navBtn");

function show(id){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* LOGO = HOME */
logo.onclick=()=>show("home");

/* NAV */
navBtns.forEach(b=>{
  b.onclick=()=>{
    show(b.dataset.page);
    if(b.dataset.page==="dashboard") renderLevels();
    if(b.dataset.page==="grammar") renderGrammar();
    if(b.dataset.page==="practice") renderPractice();
  };
});

/* DARK MODE */
themeBtn.onclick=()=>document.body.classList.toggle("dark");

/* AUTH */
let mode="login";
loginBtn.onclick=()=>{mode="login";authTitle.textContent="Login";show("auth");}
signupBtn.onclick=()=>{mode="signup";authTitle.textContent="Sign Up";show("auth");}

authSubmit.onclick=()=>{
  const u=authUser.value.trim();
  if(!u)return alert("Username required");
  const db=JSON.parse(localStorage.users||"{}");
  if(mode==="signup"){if(db[u])return alert("Exists");db[u]={level:"A1"};}
  else if(!db[u]) return alert("Not found");
  localStorage.users=JSON.stringify(db);
  localStorage.currentUser=u;
  logoutBtn.classList.remove("hidden");
  loginBtn.classList.add("hidden");
  signupBtn.classList.add("hidden");
  show("dashboard");
};

logoutBtn.onclick=()=>{
  localStorage.removeItem("currentUser");
  logoutBtn.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  signupBtn.classList.remove("hidden");
  show("home");
};

document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show("home"));

/* DASHBOARD */
function renderLevels(){
  levels.innerHTML="";
  ["A1","A2","B1","B2","C1"].forEach(l=>{
    const d=document.createElement("div");
    d.className="card";
    d.textContent=l;
    d.onclick=()=>{
      const db=JSON.parse(localStorage.users);
      db[currentUser()].level=l;
      localStorage.users=JSON.stringify(db);
      show("grammar");
    };
    levels.appendChild(d);
  });
}

/* GRAMMAR */
function renderGrammar(){
  grammarTitle.textContent="Grammar Topics";
  grammarList.innerHTML="";
  ["Tenses","Conditionals","Passive"].forEach(g=>{
    const d=document.createElement("div");
    d.textContent=g;
    grammarList.appendChild(d);
  });
}

/* PRACTICE */
function renderPractice(){
  question.textContent="Choose the correct answer:";
  answers.innerHTML="";
  ["Answer A","Answer B"].forEach(a=>{
    const b=document.createElement("button");
    b.className="btn primary";
    b.textContent=a;
    answers.appendChild(b);
  });
}

function currentUser(){return localStorage.currentUser}

show("home");
