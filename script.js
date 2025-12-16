/* =====================
   NAVIGATION (WORKING)
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
   A1 GRAMMAR DATA (FULL)
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
        <p>Are you listening?</p>
      `,
      practice: [
        { q: "She ___ working.", o: ["is", "are"], a: 0 }
      ]
    },

    "Have got": {
      lesson: `
        <h3>Have got</h3>
        <p>I have got a car.</p>
        <p>She has got a phone.</p>
      `,
      practice: [
        { q: "He ___ got a dog.", o: ["have", "has"], a: 1 }
      ]
    },

    "Was / were (past of be)": {
      lesson: `
        <h3>Was / were</h3>
        <p>I was tired.</p>
        <p>They were late.</p>
      `,
      practice: [
        { q: "They ___ happy.", o: ["was", "were"], a: 1 }
      ]
    },

    "Past simple: regular & irregular": {
      lesson: `
        <h3>Past simple</h3>
        <p>I worked yesterday.</p>
        <p>I went home.</p>
      `,
      practice: [
        { q: "I ___ home.", o: ["go", "went"], a: 1 }
      ]
    },

    "Imperative": {
      lesson: `
        <h3>Imperative</h3>
        <p>Sit down!</p>
        <p>Don’t talk!</p>
      `,
      practice: [
        { q: "___ quiet!", o: ["Be", "Are"], a: 0 }
      ]
    },

    "Can / can’t": {
      lesson: `
        <h3>Can / can’t</h3>
        <p>I can swim.</p>
        <p>I can’t drive.</p>
      `,
      practice: [
        { q: "I ___ swim.", o: ["can", "can’t"], a: 0 }
      ]
    },

    "Articles: a / an / the": {
      lesson: `
        <h3>Articles</h3>
        <p>a cat</p>
        <p>an apple</p>
        <p>the sun</p>
      `,
      practice: [
        { q: "___ apple", o: ["a", "an"], a: 1 }
      ]
    },

    "There is / there are": {
      lesson: `
        <h3>There is / there are</h3>
        <p>There is a book.</p>
        <p>There are two books.</p>
      `,
      practice: [
        { q: "There ___ two cats.", o: ["is", "are"], a: 1 }
      ]
    }
  }
};

/* =====================
   GRAMMAR + PRACTICE
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
   AUTH (WORKING)
===================== */
loginBtn.onclick = () => openAuth("login");
signupBtn.onclick = () => openAuth("signup");
logoutBtn.onclick = () => {
  localStorage.removeItem("user");
  location.reload();
};

function openAuth(type) {
  authTitle.textContent = type === "login" ? "Login" : "Sign Up";
  authModal.dataset.mode = type;
  authModal.classList.remove("hidden");
}

cancelAuth.onclick = () => authModal.classList.add("hidden");

submitAuth.onclick = () => {
  const u = authUser.value.trim();
  const p = authPass.value.trim();
  if (!u || !p) return alert("Fill all fields");

  if (authModal.dataset.mode === "signup") {
    if (localStorage.getItem("user_" + u))
      return alert("Username exists");
    localStorage.setItem("user_" + u, p);
    alert("Account created");
  } else {
    if (localStorage.getItem("user_" + u) !== p)
      return alert("Wrong login");
    localStorage.setItem("user", u);
    userName.textContent = u;
    loginBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  }
  authModal.classList.add("hidden");
};
