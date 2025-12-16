/* =====================
   NAVIGATION
===================== */
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(btn.dataset.page).classList.remove("hidden");
  };
});

/* =====================
   AUTH (BULLETPROOF)
===================== */
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");

const authModal = document.getElementById("authModal");
const authTitle = document.getElementById("authTitle");
const authUser = document.getElementById("authUser");
const authPass = document.getElementById("authPass");
const submitAuth = document.getElementById("submitAuth");
const cancelAuth = document.getElementById("cancelAuth");

let mode = "login";

/* ALWAYS USE ONE STORAGE OBJECT */
function getUsers() {
  const data = localStorage.getItem("USERS_DB");
  return data ? JSON.parse(data) : {};
}

function saveUsers(users) {
  localStorage.setItem("USERS_DB", JSON.stringify(users));
}

/* OPEN MODAL */
loginBtn.onclick = () => openAuth("login");
signupBtn.onclick = () => openAuth("signup");
cancelAuth.onclick = () => authModal.classList.add("hidden");
logoutBtn.onclick = logout;

function openAuth(type) {
  mode = type;
  authTitle.textContent = type === "login" ? "Login" : "Sign Up";
  authUser.value = "";
  authPass.value = "";
  authModal.classList.remove("hidden");
}

/* SUBMIT */
submitAuth.onclick = () => {
  const username = authUser.value.trim();
  const password = authPass.value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const users = getUsers();

  if (mode === "signup") {
    if (users[username]) {
      alert("Username already exists");
      return;
    }

    users[username] = password;
    saveUsers(users);

    alert("✅ SIGN UP SUCCESSFUL\nUser saved: " + username);
    authModal.classList.add("hidden");
    return;
  }

  if (mode === "login") {
    if (!users[username]) {
      alert("❌ USER DOES NOT EXIST");
      return;
    }

    if (users[username] !== password) {
      alert("❌ WRONG PASSWORD");
      return;
    }

    localStorage.setItem("LOGGED_IN_USER", username);
    updateUserUI();
    authModal.classList.add("hidden");
  }
};

/* UI */
function updateUserUI() {
  const user = localStorage.getItem("LOGGED_IN_USER");
  if (user) {
    userName.textContent = user;
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    userName.textContent = "Guest";
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
}

function logout() {
  localStorage.removeItem("LOGGED_IN_USER");
  updateUserUI();
}

updateUserUI();

/* =====================
   A1 GRAMMAR (SAFE)
===================== */
const grammarData = {
  A1: {
    "Present simple: am / is / are": `
      <h3>Present simple: am / is / are</h3>
      <p>I am a student.</p>
      <p>She is happy.</p>
      <p>They are here.</p>
    `
  }
};

const lessonList = document.getElementById("lessonList");
const lessonBox = document.getElementById("lessonBox");

lessonList.innerHTML = "";
Object.keys(grammarData.A1).forEach(title => {
  const li = document.createElement("li");
  li.textContent = title;
  li.onclick = () => {
    lessonBox.innerHTML = grammarData.A1[title];
  };
  lessonList.appendChild(li);
});
