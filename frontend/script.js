/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const apiBase = window.__API_BASE__ || (window.location.hostname === "localhost" ? "http://localhost:3000" : window.location.origin);
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', () => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                loadingScreen.remove();
            }, 400);
        }
    });

    console.log("Portfolio Loaded Successfully");

    /* ===============================
       Smooth Scroll
    =============================== */

    const navLinks = document.querySelectorAll('nav a');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    }

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* ===============================
       Active Navigation
    =============================== */

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ===============================
       Sticky Navbar Shadow
    =============================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.3)";

        }

        else {

            header.style.boxShadow = "none";

        }

    });

    /* Typing animation removed per request.
       Show static heading "Data Analyst" only. */

    const typingElement = document.querySelector(".hero-content h3");
    if (typingElement) {
        typingElement.textContent = "Data Analyst";
    }

    /* ===============================
       Scroll Reveal
    =============================== */

    const revealElements = document.querySelectorAll(

".reveal, .reveal-left, .reveal-right, .project-card, .certificate-card, .gallery-item, .hobby-card, .blog-card"

    );

    function reveal() {

        revealElements.forEach(element => {

            const windowHeight = window.innerHeight;

            const revealTop = element.getBoundingClientRect().top;

            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {

                element.style.opacity = "1";

                element.style.transform = "translateY(0px)";

            }

        });

    }

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform = "translateY(50px)";

        el.style.transition = ".8s";

    });

    window.addEventListener("scroll", reveal);

    reveal();

    /* ===============================
       Project and Certificate Filters
    =============================== */

    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const cards = document.querySelectorAll(
                button.closest('section').id === 'projects' ? '.project-card' : '.certificate-card'
            );

            cards.forEach(card => {

                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {

                    card.classList.remove('hidden');

                }

                else {

                    card.classList.add('hidden');

                }

            });

        });

    });

    /* ===============================
       FAQ Toggle
    =============================== */

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {

        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {

            faqItems.forEach(entry => entry.classList.remove('active'));

            item.classList.add('active');

        });

    });

    /* ===============================
       Contact Form Validation
    =============================== */

    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (form && nameInput && emailInput && messageInput) {

        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            const inputs = [nameInput, emailInput, messageInput];

            let valid = true;

            inputs.forEach(input => {

                if (input.value.trim() === "") {

                    input.style.border = "2px solid red";
                    valid = false;

                }

                else {

                    input.style.border = "2px solid lime";

                }

            });

            if (!valid) {
                formStatus.textContent = "Please fill all fields.";
                return;
            }

            const payload = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            formStatus.textContent = "Saving your message...";

            try {
                const response = await fetch(`${apiBase}/api/messages`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                let data = {};
                try {
                    data = await response.json();
                } catch (jsonError) {
                    data = {};
                }

                if (!response.ok) {
                    throw new Error(data.error || "Unable to save message");
                }

                formStatus.textContent = "Message sent successfully!";
                form.reset();
                inputs.forEach(input => input.style.border = "none");

            } catch (error) {
                formStatus.textContent = "";
            }

        });

    }

    /* ===============================
       Scroll To Top Button
    =============================== */

    const topButton = document.getElementById("back-to-top");

    if (topButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                topButton.classList.add("visible");
            } else {
                topButton.classList.remove("visible");
            }
        });

        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ===============================
       Footer Year
    =============================== */

    const footer = document.querySelector("footer p");

    if (footer) {

        footer.innerHTML =

            `© ${new Date().getFullYear()} Ankit Kumar | All Rights Reserved`;

    }

    /* ===============================
       Project Hover Effect
    =============================== */

    const projects = document.querySelectorAll(".project-card");

    projects.forEach(project => {

        project.addEventListener("mouseenter", () => {

            project.style.transform =

                "translateY(-10px) scale(1.02)";

        });

        project.addEventListener("mouseleave", () => {

            project.style.transform =

                "translateY(0px) scale(1)";

        });

    });

/* ===============================
       Gallery Lightbox
    =============================== */

    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image lightbox');

        const lightboxImg = document.createElement('img');
        const lightboxCaption = document.createElement('p');
        lightboxCaption.className = 'lightbox-caption';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'Close lightbox');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-nav lightbox-prev';
        prevBtn.setAttribute('aria-label', 'Previous image');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-nav lightbox-next';
        nextBtn.setAttribute('aria-label', 'Next image');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxCaption);
        document.body.appendChild(lightbox);

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = (index + galleryItems.length) % galleryItems.length;
            const item = galleryItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.getAttribute('data-caption') || 'Campus Life';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        function showImage(direction) {
            openLightbox(currentIndex + direction);
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        closeBtn.addEventListener('click', closeLightbox);

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(-1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(1);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showImage(-1);
            } else if (e.key === 'ArrowRight') {
                showImage(1);
            }
        });
    }

    /* ===============================
       Theme Toggle
    =============================== */

    const savedTheme = window.PortfolioUtils?.getTheme?.() || 'dark';
    const toggle = document.querySelector('.theme-toggle-nav');

    if (toggle) {
        window.PortfolioUtils?.setTheme?.(savedTheme);
        toggle.innerHTML = savedTheme === 'dark' ? '🌙' : '☀';
        toggle.addEventListener('click', () => {
            const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            window.PortfolioUtils?.setTheme?.(nextTheme);
            toggle.innerHTML = nextTheme === 'dark' ? '🌙' : '☀';
        });
    }

});

/* ==========================================
   END OF FILE
========================================== */