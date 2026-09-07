(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active navigation state on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id], #hero"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(function (link) {
      var href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", href === currentId);
    });
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var scrollTicking = false;
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        setActiveLink();
        toggleBackToTop();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  setActiveLink();
  toggleBackToTop();

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".service-item, .process-step, .solution-card, .why-item, .timeline-item, .market-item, .contact-method, .founder-card"
  );

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
