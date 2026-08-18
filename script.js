// ===============================
// FRY BROS - JAVASCRIPT PRINCIPAL
// ===============================


// Año automático del footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// Navbar cambia al hacer scroll
const navbar = document.querySelector(".navbar");

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


// Animaciones al aparecer elementos en pantalla
const animatedElements = document.querySelectorAll(
  ".section-label, .section h2, .section-description, .service-card, .quote-placeholder, .gallery-placeholder, .contact-section p"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

animatedElements.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});


// Pequeño efecto de movimiento en las tarjetas
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    // En pantallas táctiles no aplicamos el efecto
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    card.style.transform =
      `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
