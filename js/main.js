// js/main.js
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('header nav a');
    const langSwitcherButton = document.getElementById('lang-switcher');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            menuButton.classList.toggle('open'); // For hamburger animation
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith("#")) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                     // Close mobile menu if open after clicking a nav link
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        menuButton.classList.remove('open');
                        menuButton.setAttribute('aria-expanded', 'false');
                        mobileMenu.setAttribute('aria-hidden', 'true');
                    }
                }
            }
        });
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }); // Trigger when 15% visible for smoother appearance

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Active Navigation Link Styling
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach(link => {
        const linkPath = (link.getAttribute('href') || "").split("/").pop();
        // Handle root path for index.html explicitly
        const isActive = (linkPath === currentPath) || (currentPath === "index.html" && (linkPath === "" || linkPath === "index.html"));
        if (isActive) {
            link.classList.add('nav-link-active');
        } else {
            link.classList.remove('nav-link-active');
        }
    });

    // Language Switcher
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    function setLanguage(lang) {
        if (lang === 'fa') {
            htmlEl.lang = 'fa';
            htmlEl.dir = 'rtl';
            bodyEl.classList.add('rtl-active'); // For global RTL specific styles
            if(langSwitcherButton) langSwitcherButton.textContent = 'EN';
            // Add logic to swap text content here if you had translations
        } else { // Default to English
            htmlEl.lang = 'en';
            htmlEl.dir = 'ltr';
            bodyEl.classList.remove('rtl-active');
            if(langSwitcherButton) langSwitcherButton.textContent = 'FA';
            // Add logic to swap text content here
        }
        localStorage.setItem('preferredLang', lang);
    }

    if (langSwitcherButton) {
        langSwitcherButton.addEventListener('click', () => {
            const currentLang = htmlEl.lang === 'fa' ? 'en' : 'fa';
            setLanguage(currentLang);
        });
    }

    // Load preferred language from localStorage
    const preferredLang = localStorage.getItem('preferredLang') || 'en'; // Default to English
    setLanguage(preferredLang);


    // Sticky header effect (optional: change style on scroll)
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); // Add a class to style the scrolled header, e.g. slightly darker bg
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
