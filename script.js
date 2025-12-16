/* =========================
   GRAMMAR DATA (EXTENDABLE)
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
    `,
    "Present continuous": `
      <h3>Present continuous</h3>
      <p>I am studying now.</p>
      <p>She is working.</p>
      <p>Are you listening?</p>
    `
  },

  A2: {
    "Present perfect: form and use": `
      <h3>Present perfect</h3>
      <p>have / has + past participle</p>
      <p>I have finished my homework.</p>
    `,
    "Present perfect or past simple": `
      <h3>Present perfect vs past simple</h3>
      <p>I have seen that movie.</p>
      <p>I saw it last year.</p>
    `
  },

  B1: {
    "Past simple vs present perfect": `
      <h3>Past simple vs present perfect</h3>
      <p>I lived there in 2010.</p>
      <p>I have lived here for five years.</p>
    `
  },

  "B1+": {
    "Present perfect simple vs continuous": `
      <h3>Perfect simple vs continuous</h3>
      <p>I have worked here for years.</p>
      <p>I have been working here all day.</p>
    `
  },

  B2: {
    "Mixed perfect tenses": `
      <h3>Mixed perfect tenses</h3>
      <p>I have lived here since 2015.</p>
      <p>I had lived there before I moved.</p>
    `
  }
};

/* =========================
   LOAD LESSONS
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("levelSelect");
  const lessonList = document.getElementById("lessonList");
  const lessonBox = document.getElementById("lessonBox");

  levelSelect.addEventListener("change", () => {
    lessonList.innerHTML = "";
    lessonBox.innerHTML = "Select a lesson to start.";

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
