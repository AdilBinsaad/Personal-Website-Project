// ===== Typing Effect (safe) =====
const typingEl = document.querySelector(".typing");

if (typingEl) {
  const text = "👋 Hello, I'm Adil";
  let i = 0;

  function type() {
    if (i < text.length) {
      typingEl.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }

  type();
}


// ===== Reveal Effect (safe ทุกหน้า) =====
const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
  function reveal() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // run ตอนโหลดหน้า
}