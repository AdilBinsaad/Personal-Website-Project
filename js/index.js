// ===== Typing Effect =====
const text = "👋 Hello, I'm Adil";
let index = 0;

function type() {
  if (index < text.length) {
    document.querySelector(".typing").innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 80);
  }
}
type();


// ===== Scroll Reveal =====
function reveal() {
  let elements = document.querySelectorAll(".reveal");

  elements.forEach(el => {
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 50) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);