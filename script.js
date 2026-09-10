document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (nav.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }

    const currentYear = document.getElementById("currentYear");
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
        if (!backToTop) return;
        backToTop.classList.toggle("show", window.scrollY > 500);
    });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
        if (!header) return;
        header.style.boxShadow = window.scrollY > 30
            ? "0 8px 30px rgba(15, 23, 42, 0.08)"
            : "none";
    });

    const revealElements = document.querySelectorAll(
        ".service-card, .solution-card, .process-step, " +
        ".highlight-card, .stat-card, .industry-list div, " +
        ".contact-card, .timeline-item"
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", function () {
        let currentSection = "";
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + currentSection);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - 75;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });
});
