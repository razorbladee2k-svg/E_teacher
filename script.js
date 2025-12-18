function go(page){
  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });
  document.getElementById(page).classList.add("active");
}

/* PRACTICE */
function answer(correct){
  document.getElementById("feedback").textContent =
    correct ? "✅ Correct!" : "❌ Incorrect. Try again.";
}

/* ESSAY */
const essay = document.getElementById("essayText");
const wc = document.getElementById("wordCount");

essay.addEventListener("input", ()=>{
  const words = essay.value.trim().split(/\s+/).filter(Boolean).length;
  wc.textContent = `${words} words`;
});

function checkEssay(){
  let text = essay.value;
  let errors = [];

  if(text.includes("I am agree")){
    errors.push("❌ Use 'I agree'");
  }

  document.getElementById("essayFeedback").innerHTML =
    errors.length ? errors.join("<br>") : "✅ Good writing!";
}

/* DARK MODE */
document.getElementById("darkToggle").onclick = ()=>{
  document.body.classList.toggle("dark");
};
