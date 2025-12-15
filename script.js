/* =========================
   PAGE NAVIGATION
========================= */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');
}

/* =========================
   GRAMMAR LESSONS
========================= */
function loadLesson(topic) {
  const box = document.getElementById("lessonBox");

  const lessons = {
    parts: `
      <h3>Parts of Speech</h3>
      <ul>
        <li><b>Noun</b> – name of a person, place, or thing</li>
        <li><b>Verb</b> – action or state</li>
        <li><b>Adjective</b> – describes a noun</li>
        <li><b>Adverb</b> – describes a verb</li>
        <li><b>Pronoun</b> – replaces a noun</li>
      </ul>
    `,
    tenses: `
      <h3>Tenses</h3>
      <p><b>Present Simple:</b> I work every day.</p>
      <p><b>Present Continuous:</b> I am working now.</p>
      <p><b>Past Simple:</b> I worked yesterday.</p>
      <p><b>Future:</b> I will work tomorrow.</p>
    `,
    articles: `
      <h3>Articles</h3>
      <p><b>a / an</b> – used for non-specific nouns</p>
      <p><b>the</b> – used for specific nouns</p>
      <p>Example: I saw <b>a</b> dog. <b>The</b> dog was big.</p>
    `,
    prepositions: `
      <h3>Prepositions</h3>
      <p>

