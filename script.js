let page = "home";
let testIndex = 0;
let score = 0;
let practiceIndex = 0;

const card = document.getElementById("card");

const testQuestions = Array.from({ length: 15 }, (_, i) => ({
  q: `Choose the correct sentence (${i + 1})`,
  options: [
    "He go to school every day",
    "He goes to school every day",
    "He going to school every day"
  ],
  answer: 1
}));

const practiceQuestions = Array.from({ length: 50 }, (_, i) => ({
  q: `Practice question ${i + 1}`,
  options: [
    "She have finished",
    "She has finished",
    "She finishing"
  ],
  answer: 1
}));

const grammars = [
  "Present Simple → Subject + verb(s)",
  "Present Perfect → Subject + have/has + past participle",
  "Passive Voice → Subject + be + past participle",
  "Conditionals → If + present, will + verb",
  "Reported Speech → He said (that)..."
];

function toggleDark() {
  document.body.classList.toggle("dark");
}

function showHome() {
  card.innerHTML = `
    <h2>Welcome</h2>
    <button onclick="startTest()">English Level Test</button>
    <button class="outline" onclick="startPractice()">Practice</button>
    <button class="outline" onclick="showGrammar()">Grammar</button>
    <button class="outline" onclick="showEssay()">Essay</button>
  `;
}

function startTest() {
  testIndex = 0;
  score = 0;
  showTest();
}

function showTest() {
  const q = testQuestions[testIndex];
  card.innerHTML = `
    <h3>${q.q}</h3>
    ${q.options.map((o, i) =>
      `<button class="option" onclick="answerTest(${i})">${o}</button>`
    ).join("")}
    <p>${testIndex + 1} / 15</p>
  `;
}

function answerTest(i) {
  if (i === testQuestions[testIndex].answer) score++;
  testIndex++;
  if (testIndex < 15) showTest();
  else showResult();
}

function showResult() {
  let level = "A2";
  if (score >= 9) level = "B1";
  if (score >= 12) level = "B2";
  if (score >= 14) level = "C1";
  localStorage.setItem("level", level);

  card.innerHTML = `
    <h2>Result</h2>
    <p>${score} / 15</p>
    <h3>Your level: ${level}</h3>
    <button onclick="showHome()">Continue</button>
  `;
}

function startPractice() {
  practiceIndex = 0;
  practiceQuestions.sort(() => Math.random() - 0.5);
  showPractice();
}

function showPractice() {
  const q = practiceQuestions[practiceIndex];
  card.innerHTML = `
    <h3>${q.q}</h3>
    ${q.options.map((o, i) =>
      `<button class="option" onclick="answerPractice(${i})">${o}</button>`
    ).join("")}
    <p>${practiceIndex + 1} / 50</p>
  `;
}

function answerPractice(i) {
  const correct = practiceQuestions[practiceIndex].answer;
  document.querySelectorAll(".option").forEach((b, idx) => {
    b.classList.add(idx === correct ? "correct" : "wrong");
  });
  practiceIndex++;
  if (practiceIndex < 50) {
    setTimeout(showPractice, 700);
  } else {
    card.innerHTML = `
      <h2>Good job 🎉</h2>
      <p>You finished practice</p>
      <button onclick="showHome()">Back</button>
    `;
  }
}

function showGrammar() {
  card.innerHTML = `
    <h2>Grammar</h2>
    ${grammars.map(g => `<div>${g}</div>`).join("")}
    <button onclick="showHome()">Back</button>
  `;
}

function showEssay() {
  const titles = [
    "My future goals",
    "The importance of English",
    "A challenge I faced"
  ];
  const title = titles[Math.floor(Math.random() * titles.length)];

  card.innerHTML = `
    <h3>${title}</h3>
    <textarea id="essay"></textarea>
    <button onclick="checkEssay()">Submit</button>
    <button onclick="showHome()">Back</button>
  `;
}

function checkEssay() {
  const text = document.getElementById("essay").value;
  const words = text.trim().split(/\s+/).length;
  card.innerHTML += `
    <p>Word count: ${words}</p>
    <p><b>Feedback:</b> Good effort. Check verb tenses and articles.</p>
  `;
}

showHome();
