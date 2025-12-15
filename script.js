function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');
}

// GRAMMAR LESSONS
function loadLesson(topic) {
  const box = document.getElementById("lessonBox");

  const lessons = {
    parts: `
      <h3>Parts of Speech</h3>
      <p>Noun – name of a thing (book)</p>
      <p>Verb – action (run)</p>
      <p>Adjective – describes (big)</p>
      <p>Adverb – how (quickly)</p>
    `,
    tenses: `
      <h3>Tenses</h3>
      <p><b>Present Simple:</b> I work.</p>
      <p><b>Past Simple:</b> I worked.</p>
      <p><b>Future:</b> I will work.</p>
    `,
    articles: `
      <h3>Articles</h3>
      <p><b>a / an</b> – general</p>
      <p><b>the</b> – specific</p>
    `,
    prepositions: `
      <h3>Prepositions</h3>
      <p>in, on, at</p>
      <p>Example: in the room</p>
    `,
    modals: `
      <h3>Modal Verbs</h3>
      <p>can, must, should</p>
    `,
    passive: `
      <h3>Passive Voice</h3>
      <p>Active: She writes a letter.</p>
      <p>Passive: A letter is written.</p>
    `,
    conditionals: `
      <h3>Conditionals</h3>
      <p>If it rains, I will stay home.</p>
    `
  };

  box.innerHTML = lessons[topic];
}
const questions = [
  {
    q: "She ___ to school every day.",
    answers: ["go", "goes", "going"],
    correct: 1
  },
  {
    q: "I ___ a movie yesterday.",
    answers: ["watch", "watched", "watching"],
    correct: 1
  },
  {
    q: "He is ___ engineer.",
    answers: ["a", "an", "the"],
    correct: 1
  }
];

let current = 0;

function loadQuestion() {
  document.getElementById("question").textContent = questions[current].q;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  questions[current].answers.forEach((a, index) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.onclick = () => check(index);
    answersDiv.appendChild(btn);
  });
}

function check(index) {
  const feedback = document.getElementById("feedback");
  if (index === questions[current].correct) {
    feedback.textContent = "Correct ✔";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Wrong ✘";
    feedback.style.color = "red";
  }
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    current = 0;
  }
  loadQuestion();
}

loadQuestion();

