document.addEventListener("DOMContentLoaded", () => {

  /* PAGE SWITCH */
  function showPage(id) {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
  }

  /* MAIN BUTTONS */
  goGrammar.onclick = () => showPage("grammar");
  goPractice.onclick = () => showPage("practice");

  signupBtn.onclick = () => showPage("signup");
  loginBtn.onclick = () => showPage("login");

  /* AUTH */
  function getUsers() {
    return JSON.parse(localStorage.getItem("USERS") || "{}");
  }

  function saveUsers(users) {
    localStorage.setItem("USERS", JSON.stringify(users));
  }

  signupSubmit.onclick = () => {
    const u = suUser.value.trim();
    const p = suPass.value.trim();
    if (!u || !p) return alert("Fill all fields");

    const users = getUsers();
    if (users[u]) return alert("Username exists");

    users[u] = p;
    saveUsers(users);
    alert("Account created");
    showPage("login");
  };

  loginSubmit.onclick = () => {
    const u = liUser.value.trim();
    const p = liPass.value.trim();
    const users = getUsers();

    if (!users[u] || users[u] !== p)
      return alert("Wrong login");

    localStorage.setItem("LOGGED", u);
    updateAuthUI();
    showPage("main");
  };

  logoutBtn.onclick = () => {
    localStorage.removeItem("LOGGED");
    updateAuthUI();
  };

  function updateAuthUI() {
    const u = localStorage.getItem("LOGGED");
    if (u) {
      userName.textContent = u;
      signupBtn.classList.add("hidden");
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    } else {
      userName.textContent = "";
      signupBtn.classList.remove("hidden");
      loginBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
    }
  }

  updateAuthUI();

  /* GRAMMAR DATA */
  const grammar = {
    B1: [
      "Present simple vs present continuous",
      "Past simple vs present perfect",
      "Present perfect simple vs continuous",
      "Past simple, past continuous, past perfect",
      "First and second conditional",
      "Modal verbs of obligation",
      "Reported speech",
      "Passive voice",
      "Gerund or infinitive"
    ]
  };

  document.querySelectorAll("[data-level]").forEach(btn => {
    btn.onclick = () => {
      grammarList.innerHTML = "";
      const level = btn.dataset.level;

      if (!grammar[level]) {
        grammarList.innerHTML = "<li>No grammar added yet</li>";
        return;
      }

      grammar[level].forEach(topic => {
        const li = document.createElement("li");
        li.textContent = topic;
        grammarList.appendChild(li);
      });
    };
  });

});
