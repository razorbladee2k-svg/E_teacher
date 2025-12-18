const pages = document.querySelectorAll(".page");
const show = id => {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

/* BUTTONS */
grammarBtn.onclick = () => show("grammar");
practiceBtn.onclick = () => show("practice");
essayBtn.onclick = () => show("essay");
logoutBtn.onclick = () => alert("Logged out");

/* BACK BUTTONS */
document.querySelectorAll(".back").forEach(b=>{
  b.onclick = () => show("hub");
});

/* PRACTICE */
document.querySelectorAll(".ans").forEach(btn=>{
  btn.onclick = ()=>{
    document.getElementById("pFeedback").textContent =
      btn.textContent === "had"
      ? "✅ Correct!"
      : "❌ Incorrect. Use past simple.";
  };
});

/* ESSAY */
essayInput.oninput = ()=>{
  const w = essayInput.value.trim().split(/\s+/).filter(Boolean).length;
  wordCount.textContent = `${w} words`;
};

checkEssay.onclick = ()=>{
  let text = essayInput.value;
  let errors = [];

  if(text.includes("I am agree")){
    errors.push("❌ Use 'I agree', not 'I am agree'");
  }

  essayResult.innerHTML =
    errors.length
    ? errors.join("<br>")
    : "✅ Good essay!";
};

/* DARK MODE */
darkToggle.onclick = ()=>{
  document.documentElement.classList.toggle("dark");
};
