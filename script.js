/* ============================================================
   ABTHEPROMO — ULTRA JAVASCRIPT ENGINE
   ABDUL AHAD • 2026
   ============================================================ */

"use strict";

/* ============================================================
   01. GLOBAL SETTINGS
============================================================ */

const APP = {

    name: "ABTHEPROMO",

    owner: "Abdul Ahad",

    uid: "2139735924",

    phone: "01944882736",

    instagram: "@ab.the_promo",

    location: "Tangail, Bangladesh",

    version: "2.0.0",

    debug: false

};


/* ============================================================
   02. DOM HELPERS
============================================================ */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* ============================================================
   03. APPLICATION STATE
============================================================ */

const state = {

    menuOpen: false,

    currentSection: "home",

    scrollY: 0,

    loaded: false,

    cursorEnabled: false,

    particlesEnabled: true,

    reducedMotion:
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

};


/* ============================================================
   04. SAFE LOG
============================================================ */

function log(...args){

    if(APP.debug){

        console.log(
            "[ABTHEPROMO]",
            ...args
        );

    }

}


/* ============================================================
   05. PAGE LOADER
============================================================ */

function createLoader(){

    if(document.querySelector("#pageLoader")){
        return;
    }

    const loader =
        document.createElement("div");

    loader.id = "pageLoader";

    loader.innerHTML = `

        <div class="loader-inner">

            <div class="loader-logo">
                ABTHEPROMO
            </div>

            <div class="loader-line">
                <span></span>
            </div>

            <div class="loader-text">
                INITIALIZING DIGITAL WORLD...
            </div>

        </div>

    `;

    Object.assign(
        loader.style,
        {

            position:"fixed",

            inset:"0",

            zIndex:"999999",

            display:"flex",

            alignItems:"center",

            justifyContent:"center",

            background:"#030409",

            transition:
                "opacity .7s ease, visibility .7s ease"

        }
    );

    document.body.appendChild(loader);

}


function removeLoader(){

    const loader =
        $("#pageLoader");

    if(!loader) return;

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    setTimeout(()=>{

        loader.remove();

    },800);

}


/* ============================================================
   06. MOBILE NAVIGATION
============================================================ */

function initMobileMenu(){

    const menuBtn =
        $("#menuBtn");

    const nav =
        $("#navLinks");

    if(!menuBtn || !nav){

        log("Mobile menu elements not found.");

        return;

    }

    function toggleMenu(){

        state.menuOpen =
            !state.menuOpen;

        nav.classList.toggle(
            "show",
            state.menuOpen
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(state.menuOpen)
        );

        menuBtn.innerHTML =
            state.menuOpen
                ? "✕"
                : "☰";

    }


    menuBtn.addEventListener(
        "click",
        toggleMenu
    );


    $$("#navLinks a")
        .forEach(link=>{

            link.addEventListener(
                "click",
                ()=>{

                    state.menuOpen = false;

                    nav.classList.remove("show");

                    menuBtn.innerHTML = "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    document.addEventListener(
        "keydown",
        event=>{

            if(
                event.key === "Escape" &&
                state.menuOpen
            ){

                state.menuOpen = false;

                nav.classList.remove("show");

                menuBtn.innerHTML = "☰";

            }

        }
    );

}


/* ============================================================
   07. NAVBAR SCROLL EFFECT
============================================================ */

function initNavbar(){

    const navbar =
        $(".navbar");

    if(!navbar) return;


    function update(){

        if(window.scrollY > 40){

            navbar.classList.add(
                "scrolled"
            );

            navbar.style.padding =
                "11px 0";

        }else{

            navbar.classList.remove(
                "scrolled"
            );

            navbar.style.padding =
                "";

        }

    }


    window.addEventListener(
        "scroll",
        update,
        {passive:true}
    );

    update();

}


/* ============================================================
   08. ACTIVE NAVIGATION
============================================================ */

function initActiveNavigation(){

    const sections =
        $$("section[id]");

    const links =
        $$("#navLinks a");

    if(!sections.length) return;


    const observer =
        new IntersectionObserver(
            entries=>{

                entries.forEach(
                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            state.currentSection =
                                entry.target.id;


                            links.forEach(
                                link=>{

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );

                                    link.classList.toggle(
                                        "active",
                                        href ===
                                        `#${entry.target.id}`
                                    );

                                }
                            );

                        }

                    }
                );

            },
            {
                threshold:0.35
            }
        );


    sections.forEach(
        section=>
            observer.observe(section)
    );

}


/* ============================================================
   09. SMOOTH INTERNAL LINKS
============================================================ */

function initSmoothLinks(){

    $$('a[href^="#"]')
        .forEach(link=>{

            link.addEventListener(
                "click",
                event=>{

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if(
                        !id ||
                        id === "#"
                    ){

                        return;

                    }

                    const target =
                        document.querySelector(
                            id
                        );

                    if(!target){

                        return;

                    }

                    event.preventDefault();

                    const offset = 80;

                    const top =
                        target.getBoundingClientRect()
                        .top +
                        window.scrollY -
                        offset;

                    window.scrollTo({

                        top,

                        behavior:
                            state.reducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });

}


/* ============================================================
   10. SCROLL REVEAL
============================================================ */

function initReveal(){

    const elements =
        $$(".reveal");

    if(!elements.length) return;


    if(state.reducedMotion){

        elements.forEach(
            element=>
                element.classList.add(
                    "active"
                )
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries=>{

                entries.forEach(
                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            entry.target
                                .classList
                                .add("active");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        element=>
            observer.observe(element)
    );

}


/* ============================================================
   11. STAGGER CARDS
============================================================ */

function initCardStagger(){

    const groups = [

        ".cards",

        ".stat-grid",

        ".roadmap",

        ".social-grid",

        ".gallery"

    ];


    groups.forEach(
        selector=>{

            $$(selector)
                .forEach(group=>{

                    const children =
                        [...group.children];

                    children.forEach(
                        (child,index)=>{

                            child.style.transitionDelay =
                                `${index * 70}ms`;

                        }
                    );

                });

        }
    );

}


/* ============================================================
   12. SKILL BARS
============================================================ */

function initSkillBars(){

    const bars =
        $$(".bar span");

    if(!bars.length) return;


    const observer =
        new IntersectionObserver(
            entries=>{

                entries.forEach(
                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            const width =
                                entry.target
                                .dataset
                                .width;

                            if(width){

                                entry.target.style.width =
                                    width;

                            }

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:.5
            }
        );


    bars.forEach(
        bar=>
            observer.observe(bar)
    );

}


/* ============================================================
   13. NUMBER COUNTER
============================================================ */

function animateNumber(
    element,
    target,
    duration = 1800
){

    if(
        state.reducedMotion
    ){

        element.textContent =
            target;

        return;

    }


    const start = 0;

    const startTime =
        performance.now();


    function update(currentTime){

        const elapsed =
            currentTime -
            startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        const value =
            Math.floor(
                start +
                (target - start) *
                eased
            );


        element.textContent =
            value.toLocaleString();


        if(progress < 1){

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* ============================================================
   14. STATS OBSERVER
============================================================ */

function initCounters(){

    const counters =
        $$("[data-counter]");

    if(!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries=>{

                entries.forEach(
                    entry=>{

                        if(
                            entry.isIntersecting
                        ){

                            const value =
                                Number(
                                    entry.target
                                    .dataset
                                    .counter
                                );


                            if(
                                Number.isFinite(
                                    value
                                )
                            ){

                                animateNumber(
                                    entry.target,
                                    value
                                );

                            }


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:.6
            }
        );


    counters.forEach(
        counter=>
            observer.observe(counter)
    );

}


/* ============================================================
   15. TYPING ENGINE
============================================================ */

class TypeWriter{

    constructor(
        element,
        words,
        speed = 90,
        pause = 1600
    ){

        this.element = element;

        this.words = words;

        this.speed = speed;

        this.pause = pause;

        this.wordIndex = 0;

        this.charIndex = 0;

        this.deleting = false;

        this.timer = null;

    }


    start(){

        if(!this.element){
            return;
        }

        this.tick();

    }


    tick(){

        const word =
            this.words[
                this.wordIndex
            ];


        if(!this.deleting){

            this.charIndex++;

        }else{

            this.charIndex--;

        }


        this.element.textContent =
            word.substring(
                0,
                this.charIndex
            );


        let delay =
            this.deleting
                ? this.speed / 2
                : this.speed;


        if(
            !this.deleting &&
            this.charIndex ===
            word.length
        ){

            delay = this.pause;

            this.deleting = true;

        }


        if(
            this.deleting &&
            this.charIndex === 0
        ){

            this.deleting = false;

            this.wordIndex =
                (
                    this.wordIndex + 1
                ) %
                this.words.length;

            delay = 500;

        }


        this.timer =
            setTimeout(
                ()=>this.tick(),
                delay
            );

    }


    stop(){

        clearTimeout(
            this.timer
        );

    }

}


/* ============================================================
   16. AUTO TYPE TARGET
============================================================ */

function initTyping(){

    const target =
        $("#typingText");

    if(!target){

        log(
            "Add id='typingText' to enable typing effect."
        );

        return;

    }


    const writer =
        new TypeWriter(
            target,

            [
                "Digital Creator",
                "Gamer",
                "AI Explorer",
                "Graphics Designer",
                "Web Developer",
                "ABTHEPROMO"
            ],

            80,

            1300
        );


    writer.start();

}


/* ============================================================
   17. BACK TO TOP
============================================================ */

function initBackToTop(){

    let button =
        $("#topBtn");


    if(!button){

        button =
            document.createElement(
                "button"
            );

        button.id = "topBtn";

        button.className =
            "top-btn";

        button.textContent =
            "↑";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            button
        );

    }


    function update(){

        if(
            window.scrollY >
            650
        ){

            button.style.display =
                "flex";

        }else{

            button.style.display =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        update,
        {passive:true}
    );


    button.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:
                    state.reducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );


    update();

}


/* ============================================================
   18. PARTICLE SYSTEM
============================================================ */

class ParticleEngine{

    constructor(){

        this.canvas = null;

        this.ctx = null;

        this.particles = [];

        this.count = 75;

        this.mouse = {

            x:null,

            y:null,

            radius:130

        };

        this.animation = null;

    }


    create(){

        if(
            state.reducedMotion ||
            !state.particlesEnabled
        ){

            return;

        }


        this.canvas =
            document.createElement(
                "canvas"
            );

        this.canvas.id =
            "particleCanvas";


        Object.assign(
            this.canvas.style,
            {

                position:"fixed",

                inset:"0",

                width:"100%",

                height:"100%",

                pointerEvents:"none",

                zIndex:"-1",

                opacity:".35"

            }
        );


        document.body.appendChild(
            this.canvas
        );


        this.ctx =
            this.canvas.getContext(
                "2d"
            );


        this.resize();

        this.generate();

        this.bind();

        this.animate();

    }


    resize(){

        if(!this.canvas) return;

        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        this.canvas.width =
            window.innerWidth *
            ratio;

        this.canvas.height =
            window.innerHeight *
            ratio;


        this.ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

    }


    generate(){

        this.particles = [];

        for(
            let i = 0;
            i < this.count;
            i++
        ){

            this.particles.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                vx:
                    (Math.random()-.5)
                    * .35,

                vy:
                    (Math.random()-.5)
                    * .35,

                size:
                    Math.random() *
                    1.8 +
                    .5,

                alpha:
                    Math.random() *
                    .6 +
                    .15

            });

        }

    }


    bind(){

        window.addEventListener(
            "resize",
            ()=>{
                this.resize();
            }
        );


        window.addEventListener(
            "mousemove",
            event=>{

                this.mouse.x =
                    event.clientX;

                this.mouse.y =
                    event.clientY;

            },
            {passive:true}
        );


        window.addEventListener(
            "mouseleave",
            ()=>{
                this.mouse.x = null;
                this.mouse.y = null;
            }
        );

    }


    update(){

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        this.particles.forEach(
            p=>{

                p.x += p.vx;

                p.y += p.vy;


                if(
                    p.x < 0 ||
                    p.x > width
                ){

                    p.vx *= -1;

                }


                if(
                    p.y < 0 ||
                    p.y > height
                ){

                    p.vy *= -1;

                }


                if(
                    this.mouse.x !== null
                ){

                    const dx =
                        p.x -
                        this.mouse.x;

                    const dy =
                        p.y -
                        this.mouse.y;

                    const distance =
                        Math.sqrt(
                            dx*dx +
                            dy*dy
                        );


                    if(
                        distance <
                        this.mouse.radius
                    ){

                        const force =
                            (
                                this.mouse.radius -
                                distance
                            ) /
                            this.mouse.radius;


                        const angle =
                            Math.atan2(
                                dy,
                                dx
                            );


                        p.x +=
                            Math.cos(angle) *
                            force *
                            1.4;

                        p.y +=
                            Math.sin(angle) *
                            force *
                            1.4;

                    }

                }

            }
        );

    }


    draw(){

        if(!this.ctx) return;

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        this.ctx.clearRect(
            0,
            0,
            width,
            height
        );


        this.particles.forEach(
            p=>{

                this.ctx.beginPath();

                this.ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );

                this.ctx.fillStyle =
                    `rgba(0,234,255,${p.alpha})`;

                this.ctx.fill();

            }
        );

    }


    animate(){

        this.update();

        this.draw();

        this.animation =
            requestAnimationFrame(
                ()=>this.animate()
            );

    }


    destroy(){

        cancelAnimationFrame(
            this.animation
        );

        this.canvas?.remove();

    }

}


/* ============================================================
   19. CURSOR GLOW
============================================================ */

function initCursorGlow(){

    if(
        state.reducedMotion ||
        window.innerWidth < 900
    ){

        return;

    }


    const glow =
        document.createElement(
            "div"
        );

    glow.id =
        "cursorGlow";


    Object.assign(
        glow.style,
        {

            position:"fixed",

            width:"280px",

            height:"280px",

            borderRadius:"50%",

            pointerEvents:"none",

            zIndex:"-2",

            transform:
                "translate(-50%,-50%)",

            background:
                "radial-gradient(circle,rgba(0,234,255,.09),transparent 65%)",

            filter:
                "blur(20px)",

            opacity:"0",

            transition:
                "opacity .3s ease"

        }
    );


    document.body.appendChild(
        glow
    );


    window.addEventListener(
        "mousemove",
        event=>{

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

            glow.style.opacity =
                "1";

        },
        {passive:true}
    );


    state.cursorEnabled =
        true;

}


/* ============================================================
   20. CARD TILT
============================================================ */

function initCardTilt(){

    if(
        state.reducedMotion ||
        window.innerWidth < 900
    ){

        return;

    }


    const cards =
        $$(".card");


    cards.forEach(
        card=>{

            card.addEventListener(
                "mousemove",
                event=>{

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            x /
                            rect.width -
                            .5
                        ) * 6;


                    const rotateX =
                        (
                            .5 -
                            y /
                            rect.height
                        ) * 6;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-10px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                ()=>{

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* ============================================================
   21. MAGNETIC BUTTONS
============================================================ */

function initMagneticButtons(){

    if(
        state.reducedMotion ||
        window.innerWidth < 900
    ){

        return;

    }


    const buttons =
        $$(".btn");


    buttons.forEach(
        button=>{

            button.addEventListener(
                "mousemove",
                event=>{

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        (
                            rect.left +
                            rect.width / 2
                        );

                    const y =
                        event.clientY -
                        (
                            rect.top +
                            rect.height / 2
                        );


                    button.style.transform =
                        `translate(
                            ${x * .08}px,
                            ${y * .08}px
                        )`;

                }
            );


            button.addEventListener(
                "mouseleave",
                ()=>{

                    button.style.transform =
                        "";

                }
            );

        }
    );

}


/* ============================================================
   22. COPY UID
============================================================ */

function initCopyUID(){

    const uidElements =
        $$(".uid strong");


    uidElements.forEach(
        element=>{

            element.style.cursor =
                "pointer";

            element.title =
                "Click to copy UID";


            element.addEventListener(
                "click",
                async()=>{

                    const uid =
                        element.textContent
                        .trim();


                    try{

                        await navigator.clipboard
                            .writeText(uid);

                        showToast(
                            "Free Fire UID copied 🔥"
                        );

                    }catch(error){

                        showToast(
                            `UID: ${uid}`
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   23. TOAST SYSTEM
============================================================ */

function showToast(message){

    let toast =
        $("#abToast");


    if(!toast){

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "abToast";


        Object.assign(
            toast.style,
            {

                position:"fixed",

                left:"50%",

                bottom:"30px",

                transform:
                    "translate(-50%,20px)",

                zIndex:"100000",

                padding:
                    "13px 20px",

                border:
                    "1px solid rgba(0,234,255,.25)",

                borderRadius:"14px",

                background:
                    "rgba(5,8,15,.90)",

                backdropFilter:
                    "blur(20px)",

                color:"#eafcff",

                fontSize:"13px",

                fontWeight:"700",

                boxShadow:
                    "0 20px 60px rgba(0,0,0,.45)",

                opacity:"0",

                transition:
                    "opacity .3s ease, transform .3s ease"

            }
        );


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.opacity =
        "1";

    toast.style.transform =
        "translate(-50%,0)";


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(
            ()=>{

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translate(-50%,20px)";

            },
            2500
        );

}


/* ============================================================
   24. COPY PHONE
============================================================ */

function initPhoneCopy(){

    const phoneLinks =
        $$('a[href^="tel:"]');


    phoneLinks.forEach(
        link=>{

            link.addEventListener(
                "contextmenu",
                async event=>{

                    event.preventDefault();

                    try{

                        await navigator.clipboard
                            .writeText(
                                APP.phone
                            );

                        showToast(
                            "Phone number copied 📞"
                        );

                    }catch(error){

                        showToast(
                            APP.phone
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   25. IMAGE FALLBACK
============================================================ */

function initImageFallback(){

    $$("img")
        .forEach(
            image=>{

                image.addEventListener(
                    "error",
                    ()=>{

                        image.style.display =
                            "none";

                        log(
                            "Image failed:",
                            image.src
                        );

                    }
                );

            }
        );

}


/* ============================================================
   26. LAZY IMAGES
============================================================ */

function initLazyImages(){

    $$("img[data-src]")
        .forEach(
            image=>{

                const observer =
                    new IntersectionObserver(
                        entries=>{

                            entries.forEach(
                                entry=>{

                                    if(
                                        entry.isIntersecting
                                    ){

                                        image.src =
                                            image.dataset
                                            .src;

                                        image.removeAttribute(
                                            "data-src"
                                        );

                                        observer.unobserve(
                                            image
                                        );

                                    }

                                }
                            );

                        }
                    );


                observer.observe(
                    image
                );

            }
        );

}


/* ============================================================
   27. GALLERY LIGHTBOX
============================================================ */

function initLightbox(){

    const images =
        $$(".gallery-item img");


    if(!images.length){

        return;

    }


    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "imageLightbox";


    Object.assign(
        overlay.style,
        {

            position:"fixed",

            inset:"0",

            zIndex:"100000",

            display:"none",

            alignItems:"center",

            justifyContent:"center",

            padding:"30px",

            background:
                "rgba(0,0,0,.88)",

            backdropFilter:
                "blur(15px)"

        }
    );


    const preview =
        document.createElement(
            "img"
        );


    Object.assign(
        preview.style,
        {

            maxWidth:"95vw",

            maxHeight:"90vh",

            objectFit:"contain",

            borderRadius:"18px",

            boxShadow:
                "0 30px 100px rgba(0,0,0,.6)"

        }
    );


    overlay.appendChild(
        preview
    );


    document.body.appendChild(
        overlay
    );


    images.forEach(
        image=>{

            image.style.cursor =
                "zoom-in";


            image.addEventListener(
                "click",
                ()=>{

                    preview.src =
                        image.src;

                    overlay.style.display =
                        "flex";

                }
            );

        }
    );


    overlay.addEventListener(
        "click",
        ()=>{

            overlay.style.display =
                "none";

        }
    );


    document.addEventListener(
        "keydown",
        event=>{

            if(
                event.key === "Escape"
            ){

                overlay.style.display =
                    "none";

            }

        }
    );

}


/* ============================================================
   28. SCROLL PROGRESS
============================================================ */

function initScrollProgress(){

    const progress =
        document.createElement(
            "div"
        );

    progress.id =
        "scrollProgress";


    Object.assign(
        progress.style,
        {

            position:"fixed",

            top:"0",

            left:"0",

            width:"0%",

            height:"3px",

            zIndex:"10001",

            background:
                "linear-gradient(90deg,#00eaff,#8b5cf6,#ff2fa3)",

            boxShadow:
                "0 0 15px rgba(0,234,255,.45)",

            pointerEvents:"none"

        }
    );


    document.body.appendChild(
        progress
    );


    function update(){

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement
            .scrollHeight -
            window.innerHeight;


        const percent =
            height > 0
                ? (
                    scrollTop /
                    height
                ) * 100
                : 0;


        progress.style.width =
            `${percent}%`;

    }


    window.addEventListener(
        "scroll",
        update,
        {passive:true}
    );


    update();

}


/* ============================================================
   29. DIGITAL CLOCK
============================================================ */

function initClock(){

    const clock =
        $("#digitalClock");


    if(!clock){

        return;

    }


    function update(){

        const now =
            new Date();


        clock.textContent =
            now.toLocaleTimeString(
                "en-BD",
                {
                    hour:"2-digit",
                    minute:"2-digit",
                    second:"2-digit"
                }
            );

    }


    update();

    setInterval(
        update,
        1000
    );

}


/* ============================================================
   30. CURRENT YEAR
============================================================ */

function initYear(){

    $$("[data-year]")
        .forEach(
            element=>{

                element.textContent =
                    new Date()
                    .getFullYear();

            }
        );

}


/* ============================================================
   31. PARALLAX
============================================================ */

function initParallax(){

    if(
        state.reducedMotion ||
        window.innerWidth < 900
    ){

        return;

    }


    const elements =
        $$(".parallax");


    if(!elements.length){

        return;

    }


    let ticking = false;


    function update(){

        const scroll =
            window.scrollY;


        elements.forEach(
            element=>{

                const speed =
                    Number(
                        element.dataset.speed
                    ) || .2;


                element.style.transform =
                    `translate3d(
                        0,
                        ${scroll * speed}px,
                        0
                    )`;

            }
        );


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        ()=>{

            if(!ticking){

                requestAnimationFrame(
                    update
                );

                ticking = true;

            }

        },
        {passive:true}
    );

}


/* ============================================================
   32. EASTER EGG
============================================================ */

function initEasterEgg(){

    let sequence = "";

    const secret =
        "ahad";


    document.addEventListener(
        "keydown",
        event=>{

            if(
                event.key.length !== 1
            ){

                return;

            }


            sequence +=
                event.key.toLowerCase();


            if(
                sequence.length >
                secret.length
            ){

                sequence =
                    sequence.slice(
                        -secret.length
                    );

            }


            if(
                sequence === secret
            ){

                showToast(
                    "🔥 ABTHEPROMO MODE ACTIVATED!"
                );


                document.body
                    .classList
                    .add(
                        "promo-mode"
                    );


                setTimeout(
                    ()=>{
                        document.body
                            .classList
                            .remove(
                                "promo-mode"
                            );
                    },
                    5000
                );

            }

        }
    );

}


/* ============================================================
   33. PERFORMANCE MODE
============================================================ */

function initPerformanceMode(){

    const memory =
        navigator.deviceMemory || 4;


    if(
        memory <= 2 ||
        window.innerWidth < 500
    ){

        state.particlesEnabled =
            false;

        log(
            "Low-power mode enabled."
        );

    }

}


/* ============================================================
   34. ONLINE/OFFLINE
============================================================ */

function initConnectionStatus(){

    function status(){

        if(
            navigator.onLine
        ){

            log(
                "Internet connection available."
            );

        }else{

            showToast(
                "You are currently offline."
            );

        }

    }


    window.addEventListener(
        "online",
        ()=>{
            showToast(
                "Connection restored ⚡"
            );
        }
    );


    window.addEventListener(
        "offline",
        ()=>{
            showToast(
                "You are offline."
            );
        }
    );


    status();

}


/* ============================================================
   35. VISIBILITY API
============================================================ */

function initVisibility(){

    document.addEventListener(
        "visibilitychange",
        ()=>{

            if(
                document.hidden
            ){

                document.title =
                    "Come back • ABTHEPROMO";

            }else{

                document.title =
                    "ABTHEPROMO — Abdul Ahad";

            }

        }
    );

}


/* ============================================================
   36. CONSOLE BRANDING
============================================================ */

function initConsole(){

    console.clear();

    console.log(
        "%c ABTHEPROMO ",
        `
        background:#00eaff;
        color:#030409;
        font-size:22px;
        font-weight:900;
        padding:8px 15px;
        border-radius:8px;
        `
    );

    console.log(
        `
        Abdul Ahad
        Gaming UID: ${APP.uid}
        Instagram: ${APP.instagram}
        Location: ${APP.location}

        Welcome to the ABTHEPROMO digital world.
        `
    );

}


/* ============================================================
   37. KEYBOARD SHORTCUTS
============================================================ */

function initKeyboard(){

    document.addEventListener(
        "keydown",
        event=>{

            /* Home */

            if(
                event.key === "Home" &&
                !event.ctrlKey &&
                !event.shiftKey &&
                !event.altKey
            ){

                if(
                    document.activeElement.tagName
                    === "BODY"
                ){

                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }

            }


            /* Ctrl + K */

            if(
                event.ctrlKey &&
                event.key.toLowerCase()
                === "k"
            ){

                event.preventDefault();

                const contact =
                    $("#contact");

                if(contact){

                    contact.scrollIntoView({
                        behavior:"smooth"
                    });

                }

            }

        }
    );

}


/* ============================================================
   38. INIT ALL
============================================================ */

function initApp(){

    log(
        "Starting ABTHEPROMO engine..."
    );


    initPerformanceMode();

    createLoader();

    initMobileMenu();

    initNavbar();

    initActiveNavigation();

    initSmoothLinks();

    initReveal();

    initCardStagger();

    initSkillBars();

    initCounters();

    initTyping();

    initBackToTop();

    initScrollProgress();

    initCursorGlow();

    initCardTilt();

    initMagneticButtons();

    initCopyUID();

    initPhoneCopy();

    initImageFallback();

    initLazyImages();

    initLightbox();

    initClock();

    initYear();

    initParallax();

    initEasterEgg();

    initConnectionStatus();

    initVisibility();

    initKeyboard();

    initConsole();


    /* Particle engine */

    const particles =
        new ParticleEngine();

    particles.create();


    state.loaded = true;


    setTimeout(
        removeLoader,
        900
    );


    log(
        "ABTHEPROMO engine ready."
    );

}


/* ============================================================
   39. START
============================================================ */

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initApp
    );

}else{

    initApp();

}


/* ============================================================
   40. OPTIONAL HTML ELEMENTS
============================================================ */

/*

Typing effect:

<span id="typingText"></span>


Counter:

<span data-counter="500">0</span>


Digital clock:

<div id="digitalClock"></div>


Lazy image:

<img data-src="profile.jpg" alt="Abdul Ahad">


Parallax:

<div class="parallax" data-speed="0.2">
    Content
</div>

*/


/* ============================================================
   END OF ABTHEPROMO JAVASCRIPT ENGINE
============================================================ */
