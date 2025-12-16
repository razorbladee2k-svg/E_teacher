/* =====================
   NAVIGATION
===================== */
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(btn.dataset.page).classList.remove("hidden");
  });
});

/* =====================
   A1 GRAMMAR DATA
===================== */
const grammarData = {
  A1: {
    "Present simple: am / is / are": {
      lesson: `
        <h3>Present simple: am / is / are</h3>
        <p>I am a student.</p>
        <p>She is happy.</p>
        <p>They are at school.</p>
      `,
      practice: [
        { q: "She ___ happy.", o: ["am", "is", "are"], a: 1 }
      ]
    },

    "Present simple: I do / I don’t / Do I?": {
      lesson: `
        <h3>Present simple</h3>
        <p>I work every day.</p>
        <p>I don’t work on Sunday.</p>
        <p>Do you work here?</p>
      `,
      practice: [
        { q: "___ you like coffee?", o: ["Do", "Does"], a: 0 }
      ]
    },

    "Present continuous": {
      lesson: `
        <h3>Present continuous</h3>
        <p>I am studying now.</p>
        <p>She is working.</p>
      `,
      practice: [
        { q: "She ___ working.", o: ["is", "are"], a: 0 }
      ]
    }
  }
};

/* =====================
   LOAD A1 GRAMMAR
===================== */
const lessonList = document.getElementById("lessonList");
const lessonBox = document.getElementById("lessonBox");

Object.keys(grammarData.A1).forEach(title => {
  const li = document.createElement("li");
  li.textContent = title;
  li.onclick = () => {
    lessonBox.innerHTML = grammarData.A1[title].lesson;
    startPractice(grammarData.A1[title].practice, title);
  };
  lessonList.appendChild(li);
});

/* =====================
   PRACTICE
===================== */
let currentPractice = [];
let index = 0;

function startPractice(practice, title) {
  currentPractice = practice;
  index = 0;
  document.getElementById("practiceTitle").textContent =
    "Practice: " + title;
  showQuestion();
}

function showQuestion() {
  if (!currentPractice.length) return;
  const q = currentPractice[index];
  question.textContent = q.q;
  answers.innerHTML = "";
  feedback.textContent = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      feedback.textContent =
        i === q.a ? "Correct ✔" : "Wrong ✘";
    };
    answers.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  index = (index + 1) % currentPractice.length;
  showQuestion();
};

/* =====================
   AUTH SYSTEM (FIXED)
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

let authMode = "login";

loginBtn.onclick = () => openAuth("login");
signupBtn.onclick = () => openAuth("signup");
logoutBtn.onclick = logout;
cancelAuth.onclick = () => authModal.classList.add("hidden");

function openAuth(mode) {
  authMode = mode;
  authTitle.textContent = mode === "login" ? "Login" : "Sign Up";
  authUser.value = "";
  authPass.value = "";
  authModal.classList.remove("hidden");
}

submitAuth.onclick = () => {
  const username = authUser.value.trim();
  const password = authPass.value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  const userKey = "user_" + username;

  if (authMode === "signup") {
    if (localStorage.getItem(userKey)) {
      alert("Username already exists");
      return;
    }
    localStorage.setItem(userKey, password);
    alert("Account created. Now log in.");
    authModal.classList.add("hidden");
    return;
  }

  if (authMode === "login") {
    const savedPass = localStorage.getItem(userKey);
    if (savedPass === null) {
      alert("User does not exist");
      return;
    }
    if (savedPass !== password) {
      alert("Wrong password");
      return;
    }

    localStorage.setItem("loggedUser", username);
    updateUserUI();
    authModal.classList.add("hidden");
  }
};

function updateUserUI() {
  const u = localStorage.getItem("loggedUser");
  if (u) {
    userName.textContent = u;
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
  localStorage.removeItem("loggedUser");
  updateUserUI();
}

/* RESTORE LOGIN ON REFRESH */
updateUserUI();
