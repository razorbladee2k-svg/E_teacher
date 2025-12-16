/* NAVIGATION */
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(btn.dataset.page).classList.remove("hidden");
  };
});

/* GRAMMAR + PRACTICE DATA */
const grammarData = {
  A1: {
    "Present simple: am / is / are": {
      lesson: `
        <h3>Present simple: am / is / are</h3>
        <p>I am a student.</p>
        <p>She is happy.</p>
        <p>They are here.</p>
      `,
      practice: [
        { q: "She ___ happy.", o: ["am", "is", "are"], a: 1 }
      ]
    }
  },
  A2: {
    "Present perfect": {
      lesson: `
        <h3>Present perfect</h3>
        <p>have / has + past participle</p>
        <p>I have finished.</p>
      `,
      practice: [
        { q: "I ___ finished.", o: ["have", "had"], a: 0 }
      ]
    }
  }
};

let currentPractice = [];
let practiceIndex = 0;

/* LOAD GRAMMAR */
const levelSelect = document.getElementById("levelSelect");
const lessonList = document.getElementById("lessonList");
const lessonBox = document.getElementById("lessonBox");

levelSelect.onchange = () => {
  lessonList.innerHTML = "";
  lessonBox.innerHTML = "Select a lesson.";
  const level = levelSelect.value;
  if (!grammarData[level]) return;

  Object.keys(grammarData[level]).forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    li.onclick = () => {
      lessonBox.innerHTML = grammarData[level][title].lesson;
      startPractice(grammarData[level][title].practice, title);
    };
    lessonList.appendChild(li);
  });
};

/* PRACTICE */
function startPractice(practice, title) {
  currentPractice = practice;
  practiceIndex = 0;
  document.getElementById("practiceTitle").textContent = "Practice: " + title;
  showPractice();
}

function showPractice() {
  if (!currentPractice.length) return;
  const q = currentPractice[practiceIndex];
  document.getElementById("question").textContent = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  document.getElementById("feedback").textContent = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}

function checkAnswer(i) {
  const q = currentPractice[practiceIndex];
  if (i === q.a) {
    feedback.textContent = "Correct ✔";
  } else {
    feedback.textContent = "Wrong ✘";
    saveMistake(q.q);
  }
}

nextBtn.onclick = () => {
  practiceIndex = (practiceIndex + 1) % currentPractice.length;
  showPractice();
};

/* AUTH SYSTEM */
const authModal = document.getElementById("authModal");
const authTitle = document.getElementById("authTitle");

loginBtn.onclick = () => openAuth("login");
signupBtn.onclick = () => openAuth("signup");
logoutBtn.onclick = logout;

submitAuth.onclick = submitAuthForm;
cancelAuth.onclick = () => authModal.classList.add("hidden");

function openAuth(type) {
  authTitle.textContent = type === "login" ? "Login" : "Sign Up";
  authModal.dataset.mode = type;
  authModal.classList.remove("hidden");
}

function submitAuthForm() {
  const u = authUser.value.trim();
  const p = authPass.value.trim();
  if (!u || !p) return alert("Fill all fields");

  if (authModal.dataset.mode === "signup") {
    if (localStorage.getItem("user_" + u))
      return alert("Username already exists");
    localStorage.setItem("user_" + u, p);
    alert("Account created");
    authModal.classList.add("hidden");
  } else {
    if (localStorage.getItem("user_" + u) === p) {
      localStorage.setItem("loggedUser", u);
      updateUser();
      authModal.classList.add("hidden");
    } else alert("Wrong login");
  }
}

function updateUser() {
  const u = localStorage.getItem("loggedUser");
  if (u) {
    userName.textContent = u;
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  }
}

function logout() {
  localStorage.removeItem("loggedUser");
  location.reload();
}

updateUser();

/* MISTAKES */
function saveMistake(text) {
  const user = localStorage.getItem("loggedUser") || "guest";
  const key = "mistakes_" + user;
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(text);
  localStorage.setItem(key, JSON.stringify(arr));
}
