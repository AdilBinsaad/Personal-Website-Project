const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (let el of reveals) {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  }
});