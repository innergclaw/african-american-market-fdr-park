const animatedElements = document.querySelectorAll("[data-animate]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const eventType = document.querySelector("#event-type");
const waterWaiver = document.querySelector("#water-waiver");
const jumpComb = document.querySelector(".jump-comb");

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

if (eventType && waterWaiver) {
  const syncWaiverRequirement = () => {
    const requiresWaiver = eventType.value === "Water Fight";
    waterWaiver.required = requiresWaiver;
    waterWaiver.closest(".required-check")?.classList.toggle("is-required", requiresWaiver);
  };

  eventType.addEventListener("change", syncWaiverRequirement);
  syncWaiverRequirement();
}

if (jumpComb) {
  const syncJumpComb = () => {
    jumpComb.classList.toggle("is-visible", window.scrollY > 420);
  };

  window.addEventListener("scroll", syncJumpComb, { passive: true });
  window.addEventListener("load", syncJumpComb);
  syncJumpComb();
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
