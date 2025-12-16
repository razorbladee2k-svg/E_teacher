document.addEventListener("DOMContentLoaded", () => {

  function showPage(id) {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
  }

  // MAIN BUTTONS
  document.getElementById("grammarBtn").onclick = () => showPage("grammar");
  document.getElementById("practiceBtn").onclick = () => showPage("practice");

  // TOP AUTH BUTTONS
  document.getElementById("signupBtn").onclick = () => showPage("signup");
  document.getElementById("loginBtn").onclick = () => showPage("login");

  // BACK BUTTONS
  document.getElementById("backFromGrammar").onclick = () => showPage("main");
  document.getElementById("backFromPractice").onclick = () => showPage("main");
  document.getElementById("backFromSignup").onclick = () => showPage("main");
  document.getElementById("backFromLogin").onclick = () => showPage("main");

  // GRAMMAR DATA
  const grammar = {
    B1: [
      "Present simple vs present continuous",
      "Past simple vs present perfect",
      "Present perfect simple vs continuous",
      "Past simple, past continuous, past perfect",
      "First and second conditional",
      "Modal verbs",
      "Passive voice",
      "Reported speech",
      "Gerund or infinitive"
    ]
  };

  document.querySelectorAll(".levelBtn").forEach(btn => {
    btn.onclick = () => {
      const level = btn.dataset.level;
      const list = document.getElementById("grammarList");
      list.innerHTML = "";

      if (!grammar[level]) {
        list.innerHTML = "<li>No grammar added yet</li>";
        return;
      }

      grammar[level].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
    };
  });

});
