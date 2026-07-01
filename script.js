const animatedElements = document.querySelectorAll("[data-animate]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

animatedElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  observer.observe(element);
});

const revealVisibleElements = () => {
  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("is-visible");
    }
  });
};

window.addEventListener("load", revealVisibleElements);
window.addEventListener("hashchange", () => {
  window.requestAnimationFrame(revealVisibleElements);
});
