let users = JSON.parse(localStorage.users || "{}");
let currentUser = null;

function go(page){
  if(page !== "auth" && !currentUser){
    alert("Please log in first");
    return;
  }
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}

/* AUTH */
function login(){
  const u = username.value.trim();
  const p = password.value.trim();
  if(!users[u] || users[u] !== p){
    alert("Wrong username or password");
    return;
  }
  currentUser = u;
  go("home");
}

function signup(){
  const u = username.value.trim();
  const p = password.value.trim();
  if(users[u]){
    alert("User already exists");
    return;
  }
  users[u] = p;
  localStorage.users = JSON.stringify(users);
  currentUser = u;
  go("home");
}

function logout(){
  currentUser = null;
  go("auth");
}

/* PRACTICE */
function answer(correct){
  feedback.textContent = correct ? "✅ Correct!" : "❌ Incorrect. Review conditionals.";
}

/* ESSAY */
essayText.addEventListener("input", ()=>{
  const words = essayText.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent = `${words} words`;
});

function checkEssay(){
  let text = essayText.value;
  let issues = [];

  if(text.includes("I am agree")){
    issues.push("❌ Use 'I agree'");
  }
  if(text.length < 80){
    issues.push("❌ Essay is too short");
  }

  essayFeedback.innerHTML =
    issues.length
    ? "<b>AI feedback:</b><br>" + issues.join("<br>")
    : "✅ Good structure and grammar!";
}

/* DARK MODE */
darkToggle.onclick = ()=>{
  document.body.classList.toggle("dark");
};
