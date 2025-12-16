/* =========================
   NAVIGATION
========================= */
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;
    document.querySelectorAll(".page").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(page).classList.remove("hidden");
  });
});

/* =========================
   GRAMMAR DATA
========================= */
const grammarData = {
  A1: {
    "Present simple: am / is / are": `
      <h3>Present simple: am / is / are</h3>
      <p>I am a student.</p>
      <p>She is happy.</p>
      <p>They are at school.</p>
    `,
    "Present simple: I do / I don’t / Do I?": `
      <h3>Present simple</h3>
      <p>I do my homework every day.</p>
      <p>I don’t like coffee.</p>
      <p>Do you live here?</p>
    `
  },

  A2: {
    "Present perfect: form and use": `
      <h3>Present perfect</h3>
      <p>have / has + past participle</p>
      <p>I have finished my homework.</p>
    `
  },

  B1: {
    "Past simple vs present perfect": `
      <h3>Past simple vs present perfect</h3>
      <p>I lived there in 2010.</p>
      <p>I have lived here for five years.</p>
    `
  }
};

/* =========================
   LOAD GRAMMAR
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("levelSelect");
  const lessonList = document.getElementById("lessonList");
  const lessonBox = document.getElementById("lessonBox");

  levelSelect.addEventListener("change", () => {
    lessonList.innerHTML = "";
    lessonBox.innerHTML = "Select a lesson.";

    const level = levelSelect.value;
    if (!grammarData[level]) return;

    Object.keys(grammarData[level]).forEach(title => {
      const li = document.createElement("li");
      li.textContent = title;
      li.onclick = () => {
        lessonBox.innerHTML = grammarData[level][title];
      };
      lessonList.appendChild(li);
    });
  });
});
