document.getElementById("year").textContent = new Date().getFullYear();

/* language toggle */
const html = document.documentElement;
const body = document.body;
const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
let currentLang = "ar";

function applyLanguage(lang) {
  currentLang = lang;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  body.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });

  langLabel.textContent = lang === "ar" ? "EN" : "AR";
  document.title = lang === "ar"
    ? "شركة الدمشقي للمقاولات وإدارة المشاريع"
    : "Al-Dimashqi Contracting & Project Management";
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "ar" ? "en" : "ar");
});

/* mobile menu */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileNav.classList.remove("open"));
});

/* reveal on scroll */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* gallery lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

document.querySelectorAll(".gallery-card").forEach(card => {
  card.addEventListener("click", () => {
    const title = currentLang === "ar" ? card.dataset.titleAr : card.dataset.titleEn;
    lightboxImage.src = card.dataset.full;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-lightbox]").forEach(el => {
  el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});
