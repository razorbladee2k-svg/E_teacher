let currentQuestion = 0;
let score = 0;

const questions = [
  { q: "She ___ lived here for five years.", o: ["has", "have", "is"], a: 0 },
  { q: "If I ___ more time, I would help you.", o: ["have", "had", "will have"], a: 1 },
  { q: "They ___ to London last year.", o: ["go", "went", "gone"], a: 1 },
  { q: "He doesn’t like ___ early.", o: ["wake", "waking", "wakes"], a: 1 },
  { q: "This is the ___ movie I’ve seen.", o: ["most interesting", "more interesting", "interesting"], a: 0 },
  { q: "I didn’t have ___ money.", o: ["enough", "too", "very"], a: 0 },
  { q: "She speaks ___ than him.", o: ["more confidently", "confident", "confidence"], a: 0 },
  { q: "The letter ___ yesterday.", o: ["sent", "was sent", "has send"], a: 1 },
  { q: "You ___ smoke here.", o: ["mustn’t", "don’t", "won’t"], a: 0 },
  { q: "I wish I ___ taller.", o: ["am", "was", "were"], a: 2 },
  { q: "We were late ___ traffic.", o: ["because", "because of", "so"], a: 1 },
  { q: "She’s ___ person I know.", o: ["the kindest", "kinder", "kind"], a: 0 },
  { q: "He asked where I ___ from.", o: ["am", "was", "were"], a: 1 },
  { q: "English is spoken ___.", o: ["worldwide", "world", "word"], a: 0 },
  { q: "I’ve never ___ sushi.", o: ["eat", "ate", "eaten"], a: 2 }
];

// shuffle questions
questions.sort(() => Math.random() - 0.5);

function startTest() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("card").innerHTML = `
    <h2>Question ${currentQuestion + 1} / ${questions.length}</h2>
    <p class="question">${q.q}</p>
    <div class="options">
      ${q.o.map((opt, i) =>
        `<button class="btn btn-outline" onclick="answer(${i})">${opt}</button>`
      ).join("")}
    </div>
  `;
}

function answer(choice) {
  if (choice === questions[currentQuestion].a) score++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let level = "A2";
  if (score >= 9) level = "B1";
  if (score >= 12) level = "B2";
  if (score >= 14) level = "C1";

  document.getElementById("card").innerHTML = `
    <h2>Your Result</h2>
    <p><b>${score} / ${questions.length}</b> correct</p>
    <h3>Your level: ${level}</h3>
    <button class="btn" onclick="location.reload()">Restart</button>
  `;
}

function toggleDark() {
  document.body.classList.toggle("dark");
}
