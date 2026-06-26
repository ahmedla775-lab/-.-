const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  const open = navMenu.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "تم إرسال رسالتك بنجاح. سنرد عليك قريبًا.";
  contactForm.reset();
});
