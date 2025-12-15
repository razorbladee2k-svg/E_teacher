function showSection(sectionId) {
  document.querySelectorAll('.content').forEach(section => {
    section.classList.add('hidden');
  });

  document.getElementById(sectionId).classList.remove('hidden');
}

function checkAnswer(correct) {
  const result = document.getElementById("result");

  if (correct) {
    result.textContent = "Correct! Good job 🎉";
    result.style.color = "green";
  } else {
    result.textContent = "Wrong. Try again ❌";
    result.style.color = "red";
  }
}
