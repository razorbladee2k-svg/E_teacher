/* PAGE NAVIGATION */
function go(page){
  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });
  document.getElementById(page).classList.add("active");
}

/* PRACTICE */
function answer(correct){
  const f = document.getElementById("feedback");
  f.textContent = correct
    ? "✅ Correct!"
    : "❌ Incorrect. Use past simple: had";
}

/* ESSAY */
const essay = document.getElementById("essayText");
const count = document.getElementById("wordCount");

essay.addEventListener("input", ()=>{
  const words = essay.value.trim().split(/\s+/).filter(Boolean).length;
  count.textContent = `${words} words`;
});

function checkEssay(){
  let text = essay.value;
  let errors = [];

  if(text.includes("I am agree")){
    errors.push("❌ Use 'I agree', not 'I am agree'");
  }
  if(text.includes("didn't went")){
    errors.push("❌ Use 'didn't go'");
  }

  document.getElementById("essayFeedback").innerHTML =
    errors.length ? errors.join("<br>") : "✅ Good essay!";
}

/* DARK MODE */
document.getElementById("darkToggle").onclick = ()=>{
  document.body.classList.toggle("dark");
};
