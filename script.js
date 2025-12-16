document.addEventListener("DOMContentLoaded", () => {

  /* NAVIGATION */
  document.querySelectorAll("nav button").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".page").forEach(p =>
        p.classList.add("hidden")
      );
      document.getElementById(btn.dataset.page).classList.remove("hidden");
    };
  });

  /* AUTH STORAGE */
  function getUsers() {
    return JSON.parse(localStorage.getItem("USERS") || "{}");
  }

  function saveUsers(users) {
    localStorage.setItem("USERS", JSON.stringify(users));
  }

  /* CLEAR AUTOFILL */
  ["suUser","suPass","liUser","liPass"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  /* SIGN UP */
  signupSubmit.onclick = () => {
    const u = suUser.value.trim();
    const p = suPass.value.trim();
    if (!u || !p) return alert("Fill all fields");

    const users = getUsers();
    if (users[u]) return alert("Username exists");

    users[u] = p;
    saveUsers(users);

    alert("Account created. Now login.");
    suUser.value = "";
    suPass.value = "";
  };

  /* LOGIN */
  loginSubmit.onclick = () => {
    const u = liUser.value.trim();
    const p = liPass.value.trim();
    const users = getUsers();

    if (!users[u]) return alert("User does not exist");
    if (users[u] !== p) return alert("Wrong password");

    localStorage.setItem("LOGGED", u);
    updateUI();
    alert("Logged in");
  };

  /* LOGOUT */
  logoutBtn.onclick = () => {
    localStorage.removeItem("LOGGED");
    updateUI();
  };

  /* UI STATE */
  function updateUI() {
    const u = localStorage.getItem("LOGGED");
    if (u) {
      userName.textContent = u;
      logoutBtn.classList.remove("hidden");
    } else {
      userName.textContent = "Guest";
      logoutBtn.classList.add("hidden");
    }
  }

  updateUI();

  /* A1 GRAMMAR */
  const grammar = {
    "Present simple: am / is / are": `
      <h3>Present simple: am / is / are</h3>
      <p>I am a student.</p>
      <p>She is happy.</p>
      <p>They are here.</p>
    `,
    "Present simple: I do / I don’t / Do I?": `
      <h3>Present simple</h3>
      <p>I work every day.</p>
      <p>I don’t work on Sunday.</p>
      <p>Do you work here?</p>
    `,
    "Present continuous": `
      <h3>Present continuous</h3>
      <p>I am studying now.</p>
      <p>She is working.</p>
    `,
    "Have got": `
      <h3>Have got</h3>
      <p>I have got a car.</p>
      <p>She has got a phone.</p>
    `,
    "Was / were": `
      <h3>Was / were</h3>
      <p>I was tired.</p>
      <p>They were late.</p>
    `
  };

  Object.keys(grammar).forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    li.onclick = () => lessonBox.innerHTML = grammar[title];
    lessonList.appendChild(li);
  });

});
