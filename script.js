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
  suUser.value = suPass.value = "";
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
  `,
  "Present continuous": `
    <h3>Present continuous</h3>
    <p>I am studying now.</p>
  `
};

Object.keys(grammar).forEach(t => {
  const li = document.createElement("li");
  li.textContent = t;
  li.onclick = () => lessonBox.innerHTML = grammar[t];
  lessonList.appendChild(li);
});
