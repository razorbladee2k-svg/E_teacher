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
