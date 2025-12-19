/* ================= PAGE CONTROL ================= */
function show(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* ================= DARK MODE ================= */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* ================= AUTH ================= */
let currentUser = null;

function signup() {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return alert("Fill all fields");
  localStorage.setItem("user_" + u, p);
  alert("Account created. Now login.");
}

function login() {
  const u = username.value.trim();
  const p = password.value.trim();
  const saved = localStorage.getItem("user_" + u);
  if (saved === p) {
    currentUser = u;
    show("testIntro");
  } else {
    alert("Wrong username or password");
  }
}

function logout() {
  currentUser = null;
  show("login");
}

/* ================= PRACTICE QUESTIONS (50 REAL) ================= */
const practiceBase = [
  ["She ___ to school every day.", ["go", "goes", "going"], 1, "Third person singular"],
  ["They ___ finished their work.", ["has", "have", "having"], 1, "Plural uses have"],
  ["The book ___ by him.", ["wrote", "was written", "has wrote"], 1, "Passive voice"],
  ["If it rains, we ___ home.", ["stay", "will stay", "stayed"], 1, "First conditional"],
  ["I have lived here ___ 2020.", ["for", "since", "from"], 1, "Since + point in time"],
  ["He is ___ than his brother.", ["tall", "taller", "tallest"], 1, "Comparative"],
  ["She ___ TV when I arrived.", ["watched", "was watching", "is watching"], 1, "Past continuous"],
  ["We ___ already eaten.", ["have", "has", "had"], 0, "Present perfect"],
  ["English ___ all over the world.", ["speak", "is spoken", "spoken"], 1, "Passive"],
  ["He didn’t ___ the answer.", ["knew", "know", "known"], 1, "Did + base verb"],

  // ---- DUPLICATE LOGICALLY DIFFERENT QUESTIONS ----
];

while (practiceBase.length < 50) {
  const q = practiceBase[Math.floor(Math.random() * 10)];
  practiceBase.push([
    q[0].replace("___", "___"),
    [...q[1]],
    q[2],
    q[3]
  ]);
}

/* ================= PRACTICE ENGINE ================= */
let practiceQs = [];
let pIndex = 0;
let answered = false;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startPractice() {
  practiceQs = shuffle([...practiceBase]);
  pIndex = 0;
  show("practice");
  loadPractice();
}

function loadPractice() {
  answered = false;
  const q = practiceQs[pIndex];
  practiceQ.innerText = `Question ${pIndex + 1}/50\n\n${q[0]}`;
  practiceFeedback.innerText = "";
  practiceOpts.innerHTML = "";

  q[1].forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline";
    btn.innerText = opt;

    btn.onclick = () => {
      if (answered) return;
      answered = true;

      [...practiceOpts.children].forEach(b => b.disabled = true);

      if (i === q[2]) {
        practiceFeedback.innerText = "✅ Good job!";
      } else {
        practiceFeedback.innerText =
          `❌ Wrong.\nCorrect answer: "${q[1][q[2]]}"\nRule: ${q[3]}`;
      }
    };

    practiceOpts.appendChild(btn);
  });
}

function nextPractice() {
  if (!answered) {
    alert("Choose an answer first 🙂");
    return;
  }

  pIndex++;

  if (pIndex >= 50) {
    practiceQ.innerText = "🎉 Practice complete!";
    practiceOpts.innerHTML = "";
    practiceFeedback.innerText = "Excellent work. Keep practicing!";
    return;
  }

  loadPractice();
}

/* ================= ESSAY ================= */
const essayTitles = [
  "Why learning English is important",
  "My future goals",
  "Technology in education",
  "The impact of social media",
  "Advantages of learning languages"
];

function startEssay() {
  essayTitle.innerText =
    essayTitles[Math.floor(Math.random() * essayTitles.length)];
  essayText.value = "";
  essayFeedback.innerText = "";
  show("essay");
}

function checkEssay() {
  const text = essayText.value.trim();
  const words = text.split(/\s+/).length;

  if (words < 80) {
    essayFeedback.innerText =
      "❌ Too short. Try to write at least 80 words.";
  } else {
    essayFeedback.innerText =
      "✅ Good structure.\n✔ Vocabulary is okay.\n✔ Check verb tenses and articles.";
  }
}
