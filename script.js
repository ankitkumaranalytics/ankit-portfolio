/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Loaded Successfully");

    /* ===============================
       Smooth Scroll
    =============================== */

    const navLinks = document.querySelectorAll('nav a');

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

    /* ===============================
       Typing Animation
    =============================== */

    const typingElement = document.querySelector(".hero-content h3");

    const words = [

        "Data Analyst",

        "SQL Developer",

        "Power BI Developer",

        "Python Programmer"

    ];

    let wordIndex = 0;

    let letterIndex = 0;

    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent = currentWord.substring(0, letterIndex);

            letterIndex++;

            if (letterIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        }

        else {

            typingElement.textContent = currentWord.substring(0, letterIndex);

            letterIndex--;

            if (letterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length)

                    wordIndex = 0;

            }

        }

        setTimeout(typeEffect, deleting ? 50 : 120);

    }

    typeEffect();

    /* ===============================
       Scroll Reveal
    =============================== */

    const revealElements = document.querySelectorAll(

        ".card, .project, .certificate"

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
                button.closest('section').id === 'projects' ? '.project' : '.certificate'
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

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = form.querySelectorAll("input, textarea");

            let valid = true;

            inputs.forEach(input => {

                if (input.value.trim() === "") {

                    input.style.border =

                        "2px solid red";

                    valid = false;

                }

                else {

                    input.style.border =

                        "2px solid lime";

                }

            });

            if (valid) {

                alert("Message Sent Successfully!");

                form.reset();

            }

            else {

                alert("Please fill all fields.");

            }

        });

    }

    /* ===============================
       Scroll To Top Button
    =============================== */

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.style.position = "fixed";

    topButton.style.bottom = "30px";

    topButton.style.right = "30px";

    topButton.style.width = "50px";

    topButton.style.height = "50px";

    topButton.style.borderRadius = "50%";

    topButton.style.border = "none";

    topButton.style.background = "#38bdf8";

    topButton.style.fontSize = "22px";

    topButton.style.cursor = "pointer";

    topButton.style.display = "none";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500)

            topButton.style.display = "block";

        else

            topButton.style.display = "none";

    });

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

    const projects = document.querySelectorAll(".project");

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
       Dark Mode Toggle
    =============================== */

    const toggle = document.createElement("button");

    toggle.innerHTML = "🌙";

    toggle.style.position = "fixed";

    toggle.style.top = "20px";

    toggle.style.right = "20px";

    toggle.style.width = "45px";

    toggle.style.height = "45px";

    toggle.style.border = "none";

    toggle.style.borderRadius = "50%";

    toggle.style.cursor = "pointer";

    document.body.appendChild(toggle);

    let dark = true;

    toggle.addEventListener("click", () => {

        dark = !dark;

        if (dark) {

            document.body.style.background = "#0f172a";

            document.body.style.color = "#fff";

            toggle.innerHTML = "🌙";

        }

        else {

            document.body.style.background = "#ffffff";

            document.body.style.color = "#111";

            toggle.innerHTML = "☀";

        }

    });

});

/* ==========================================
   END OF FILE
========================================== */