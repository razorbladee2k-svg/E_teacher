document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".navBtn");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const auth = document.getElementById("auth");
  const authTitle = document.getElementById("authTitle");
  const authUser = document.getElementById("authUser");
  const authPass = document.getElementById("authPass");
  const authSubmit = document.getElementById("authSubmit");

  const themeToggle = document.getElementById("themeToggle");

  let authMode = "login";

  function showPage(id){
    pages.forEach(p => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  navBtns.forEach(b=>{
    b.onclick = ()=> showPage(b.dataset.page);
  });

  themeToggle.onclick = ()=>{
    document.body.classList.toggle("theme-dark");
  };

  loginBtn.onclick = ()=>{
    authMode = "login";
    authTitle.textContent = "Log in";
    showPage("auth");
  };

  signupBtn.onclick = ()=>{
    authMode = "signup";
    authTitle.textContent = "Sign up";
    showPage("auth");
  };

  authSubmit.onclick = ()=>{
    const u = authUser.value.trim();
    const p = authPass.value.trim();
    if(!u || !p) return alert("Fill all fields");

    const db = JSON.parse(localStorage.getItem("users") || "{}");

    if(authMode === "signup"){
      if(db[u]) return alert("User exists");
      db[u] = { essays: [], level:"A1" };
    }else{
      if(!db[u]) return alert("User not found");
    }

    localStorage.setItem("users", JSON.stringify(db));
    localStorage.setItem("currentUser", u);

    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");

    showPage("dashboard");
  };

  logoutBtn.onclick = ()=>{
    localStorage.removeItem("currentUser");
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    showPage("home");
  };

  document.querySelectorAll(".backBtn").forEach(b=>{
    b.onclick = ()=> showPage("home");
  });

  showPage("home");
});
