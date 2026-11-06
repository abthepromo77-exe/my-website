"use strict";

/* =====================================================
   AB THE PROMO — SCRIPT.JS
   Works with the previous CSS
===================================================== */


/* ===============================
   1. DOM READY
================================ */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

    initTyping();
    initReveal();
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initCounters();
    initContactForm();
    initCurrentYear();
    initImageFallback();

});


/* ===============================
   2. TYPING EFFECT
================================ */

function initTyping() {

    const element =
        document.querySelector(".typing") ||
        document.querySelector("#typing");

    if (!element) return;

    const words = [
        "AI Assistant",
        "Graphics Designer",
        "Web Developer",
        "Free Fire Gamer",
        "Digital Creator",
        "AB THE PROMO"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function type() {

        const word = words[wordIndex];

        if (!deleting) {

            element.textContent =
                word.substring(0, letterIndex + 1);

            letterIndex++;

            if (letterIndex === word.length) {

                deleting = true;

                setTimeout(type, 1500);
                return;
            }

        } else {

            element.textContent =
                word.substring(0, letterIndex - 1);

            letterIndex--;

            if (letterIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;
            }
        }

        setTimeout(
            type,
            deleting ? 55 : 95
        );
    }

    type();
}


/* ===============================
   3. SCROLL REVEAL
================================ */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".card, .skill-card, .project-card, .about-card"
        );

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });
}


/* ===============================
   4. NAVBAR ACTIVE LINK
================================ */

function initNavbar() {

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    if (!links.length || !sections.length)
        return;

    function updateNavbar() {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 180;

            if (
                window.scrollY >= top
            ) {
                current =
                    section.id;
            }

        });

        links.forEach(link => {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute("href");

            if (
                href === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );

    updateNavbar();
}


/* ===============================
   5. SMOOTH SCROLL
================================ */

function initSmoothScroll() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");

                if (
                    id === "#" ||
                    id.length < 2
                ) {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) return;

                event.preventDefault();

                const offset = 90;

                window.scrollTo({

                    top:
                        target.offsetTop -
                        offset,

                    behavior:
                        "smooth"
                });

            }
        );
    });
}


/* ===============================
   6. BACK TO TOP
================================ */

function initBackToTop() {

    let button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) {

        button =
            document.createElement(
                "button"
            );

        button.className =
            "back-to-top";

        button.innerHTML = "↑";

        document.body.appendChild(
            button
        );
    }

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );
            }

        },
        {
            passive: true
        }
    );

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );
}


/* ===============================
   7. COUNTER ANIMATION
================================ */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    )
                        return;

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.counter
                        );

                    let start = 0;

                    const duration = 1500;

                    const startTime =
                        performance.now();

                    function animate(time) {

                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );

                        start =
                            Math.floor(
                                progress *
                                target
                            );

                        counter.textContent =
                            start.toLocaleString();

                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                animate
                            );

                        }

                    }

                    requestAnimationFrame(
                        animate
                    );

                    observer.unobserve(
                        counter
                    );

                });

            }
        );

    counters.forEach(counter =>
        observer.observe(counter)
    );
}


/* ===============================
   8. CONTACT FORM
================================ */

function initContactForm() {

    const form =
        document.querySelector(
            ".contact-form"
        ) ||
        document.querySelector(
            "#contactForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const inputs =
                form.querySelectorAll(
                    "input, textarea"
                );

            let valid = true;

            inputs.forEach(input => {

                if (
                    input.hasAttribute(
                        "required"
                    ) &&
                    input.value.trim() === ""
                ) {

                    valid = false;

                    input.style.borderColor =
                        "#ff3864";

                } else {

                    input.style.borderColor =
                        "";
                }

            });

            if (!valid) {

                showMessage(
                    "Please fill in all required fields."
                );

                return;
            }

            showMessage(
                "Message submitted successfully 🚀"
            );

            form.reset();

        }
    );
}


/* ===============================
   9. MESSAGE / TOAST
================================ */

function showMessage(message) {

    let toast =
        document.querySelector(
            ".ab-toast"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.className =
            "ab-toast";

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);
}


/* ===============================
   10. CURRENT YEAR
================================ */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });
}


/* ===============================
   11. IMAGE ERROR PROTECTION
================================ */

function initImageFallback() {

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.5";

            }
        );

    });
}


/* ===============================
   12. ONLINE / OFFLINE STATUS
================================ */

window.addEventListener(
    "online",
    () => {

        showMessage(
            "You are back online 🌐"
        );

    }
);

window.addEventListener(
    "offline",
    () => {

        showMessage(
            "You are currently offline."
        );

    }
);


/* ===============================
   13. KEYBOARD SHORTCUT
================================ */

document.addEventListener(
    "keydown",
    event => {

        /*
         Press H to go Home
        */

        if (
            event.key.toLowerCase() === "h" &&
            !event.target.matches(
                "input, textarea"
            )
        ) {

            window.location.hash =
                "#home";
        }

    }
);


/* ===============================
   14. CONSOLE BRANDING
================================ */

console.log(
    "%c AB THE PROMO ",
    "background:#8b5cf6;color:white;font-size:22px;font-weight:bold;padding:10px 20px;border-radius:10px;"
);

console.log(
    "%c Abdul Ahad • AI Assistant • Graphics Designer • Gamer ",
    "color:#00f5d4;font-size:13px;font-weight:bold;"
);

console.log(
    "%c Website successfully loaded 🚀 ",
    "color:#ff2cdf;font-size:14px;font-weight:bold;"
);
