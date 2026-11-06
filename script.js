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
/* =====================================================
   AB THE PROMO — PERFORMANCE LAB ENGINE
===================================================== */

(() => {

    const canvas =
        document.getElementById("shaderCanvas");

    if (!canvas) return;

    const gl =
        canvas.getContext("webgl2", {
            antialias: false,
            powerPreference: "high-performance"
        }) ||
        canvas.getContext("webgl", {
            antialias: false,
            powerPreference: "high-performance"
        });

    const fpsValue =
        document.getElementById("fpsValue");

    const frameTime =
        document.getElementById("frameTime");

    const avgFPS =
        document.getElementById("avgFPS");

    const liveFPS =
        document.getElementById("liveFPS");

    const liveFrameTime =
        document.getElementById("liveFrameTime");

    const rating =
        document.getElementById(
            "performanceRating"
        );

    const status =
        document.getElementById(
            "webglStatus"
        );

    const graph =
        document.getElementById(
            "performanceGraph"
        );

    const graphCtx =
        graph.getContext("2d");

    let running = false;

    let animationFrame;

    let lastTime = performance.now();

    let fpsFrames = 0;

    let fpsTimer = performance.now();

    let currentFPS = 0;

    let fpsHistory = [];

    let mouseX = 0;

    let mouseY = 0;

    let rotationX = 0;

    let rotationY = 0;

    let workload = 1;


    /* ==========================================
       DEVICE INFORMATION
    ========================================== */

    const cores =
        navigator.hardwareConcurrency ||
        "Unknown";

    document.getElementById(
        "cpuCores"
    ).textContent =
        cores;

    document.getElementById(
        "screenInfo"
    ).textContent =
        `${screen.width} × ${screen.height}`;

    document.getElementById(
        "memoryInfo"
    ).textContent =
        navigator.deviceMemory
            ? `${navigator.deviceMemory} GB`
            : "N/A";

    document.getElementById(
        "deviceName"
    ).textContent =
        navigator.userAgent.includes(
            "Mobile"
        )
            ? "Mobile Device"
            : "Desktop / PC";


    /* ==========================================
       WEBGL CHECK
    ========================================== */

    if (!gl) {

        status.textContent =
            "WebGL NOT AVAILABLE";

        status.style.color =
            "#ff3864";

        return;
    }

    status.textContent =
        "WEBGL READY";

    status.style.color =
        "#00f5d4";


    /* ==========================================
       SHADER
    ========================================== */

    const vertexShaderSource = `

        attribute vec2 position;

        void main() {

            gl_Position =
                vec4(position, 0.0, 1.0);

        }

    `;


    const fragmentShaderSource = `

        precision highp float;

        uniform float u_time;

        uniform vec2 u_resolution;

        uniform vec2 u_mouse;

        uniform float u_workload;


        float map(vec3 p) {

            float sphere =
                length(p) - 0.8;

            float wave =
                sin(
                    p.x * 7.0 +
                    u_time * 1.5
                ) * 0.06;

            wave +=
                cos(
                    p.y * 9.0 -
                    u_time * 1.2
                ) * 0.06;

            return sphere + wave;

        }


        vec3 getNormal(vec3 p) {

            float e = 0.002;

            return normalize(
                vec3(
                    map(p + vec3(e,0,0))
                    - map(p - vec3(e,0,0)),

                    map(p + vec3(0,e,0))
                    - map(p - vec3(0,e,0)),

                    map(p + vec3(0,0,e))
                    - map(p - vec3(0,0,e))
                )
            );

        }


        void main() {

            vec2 uv =
                (
                    gl_FragCoord.xy
                    -
                    0.5 *
                    u_resolution
                )
                /
                u_resolution.y;


            vec3 ro =
                vec3(
                    0.0,
                    0.0,
                    3.2
                );


            vec3 rd =
                normalize(
                    vec3(
                        uv,
                        -1.5
                    )
                );


            float angle =
                u_mouse.x * 1.5;


            float cs =
                cos(angle);

            float sn =
                sin(angle);


            rd.xz =
                mat2(
                    cs, -sn,
                    sn, cs
                ) * rd.xz;


            float t = 0.0;

            float glow = 0.0;

            vec3 hit = vec3(0.0);


            for (
                int i = 0;
                i < 160;
                i++
            ) {

                vec3 p =
                    ro + rd * t;

                float d =
                    map(p);

                glow +=
                    0.001 /
                    (
                        0.01 +
                        abs(d)
                    );

                if (
                    abs(d) < 0.002
                ) {

                    hit = p;

                    break;
                }

                t += d * 0.65;

                if (t > 6.0)
                    break;

            }


            vec3 color =
                vec3(
                    0.005,
                    0.008,
                    0.025
                );


            if (length(hit) > 0.0) {

                vec3 normal =
                    getNormal(hit);

                vec3 light =
                    normalize(
                        vec3(
                            2.0,
                            3.0,
                            4.0
                        )
                    );

                float diffuse =
                    max(
                        dot(
                            normal,
                            light
                        ),
                        0.0
                    );


                float rim =
                    pow(
                        1.0 -
                        max(
                            dot(
                                normal,
                                -rd
                            ),
                            0.0
                        ),
                        3.0
                    );


                color =
                    vec3(
                        0.12,
                        0.35,
                        1.0
                    )
                    *
                    diffuse;


                color +=
                    vec3(
                        0.8,
                        0.05,
                        1.0
                    )
                    *
                    rim;

            }


            color +=
                vec3(
                    0.02,
                    0.4,
                    0.7
                )
                * glow
                * 0.04;


            gl_FragColor =
                vec4(
                    color,
                    1.0
                );

        }

    `;


    /* ==========================================
       SHADER COMPILER
    ========================================== */

    function createShader(
        type,
        source
    ) {

        const shader =
            gl.createShader(type);

        gl.shaderSource(
            shader,
            source
        );

        gl.compileShader(shader);

        if (
            !gl.getShaderParameter(
                shader,
                gl.COMPILE_STATUS
            )
        ) {

            console.error(
                gl.getShaderInfoLog(
                    shader
                )
            );

            return null;
        }

        return shader;
    }


    const vertexShader =
        createShader(
            gl.VERTEX_SHADER,
            vertexShaderSource
        );

    const fragmentShader =
        createShader(
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );


    const program =
        gl.createProgram();

    gl.attachShader(
        program,
        vertexShader
    );

    gl.attachShader(
        program,
        fragmentShader
    );

    gl.linkProgram(program);

    gl.useProgram(program);


    /* ==========================================
       FULLSCREEN QUAD
    ========================================== */

    const buffer =
        gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffer
    );

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,

            -1,  1,
             1, -1,
             1,  1
        ]),
        gl.STATIC_DRAW
    );


    const position =
        gl.getAttribLocation(
            program,
            "position"
        );

    gl.enableVertexAttribArray(
        position
    );

    gl.vertexAttribPointer(
        position,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );


    const timeLocation =
        gl.getUniformLocation(
            program,
            "u_time"
        );

    const resolutionLocation =
        gl.getUniformLocation(
            program,
            "u_resolution"
        );

    const mouseLocation =
        gl.getUniformLocation(
            program,
            "u_mouse"
        );

    const workloadLocation =
        gl.getUniformLocation(
            program,
            "u_workload"
        );


    /* ==========================================
       CANVAS RESIZE
    ========================================== */

    function resizeCanvas() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            canvas.clientWidth * dpr;

        canvas.height =
            canvas.clientHeight * dpr;

        gl.viewport(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();


    /* ==========================================
       MOUSE + TOUCH
    ========================================== */

    function movePointer(x, y) {

        mouseX =
            (x / window.innerWidth)
            * 2 - 1;

        mouseY =
            (y / window.innerHeight)
            * 2 - 1;

        rotationX =
            mouseY;

        rotationY =
            mouseX;
    }


    canvas.addEventListener(
        "mousemove",
        e => {

            movePointer(
                e.clientX,
                e.clientY
            );

        }
    );


    canvas.addEventListener(
        "touchmove",
        e => {

            if (!e.touches.length)
                return;

            movePointer(
                e.touches[0].clientX,
                e.touches[0].clientY
            );

        },
        {
            passive: true
        }
    );


    /* ==========================================
       RENDER
    ========================================== */

    function render(time) {

        if (!running)
            return;

        const seconds =
            time * 0.001;


        gl.uniform1f(
            timeLocation,
            seconds
        );

        gl.uniform2f(
            resolutionLocation,
            canvas.width,
            canvas.height
        );

        gl.uniform2f(
            mouseLocation,
            rotationY,
            rotationX
        );

        gl.uniform1f(
            workloadLocation,
            workload
        );


        gl.drawArrays(
            gl.TRIANGLES,
            0,
            6
        );


        updateFPS(time);

        animationFrame =
            requestAnimationFrame(
                render
            );
    }


    /* ==========================================
       FPS
    ========================================== */

    function updateFPS(time) {

        fpsFrames++;

        const delta =
            time - fpsTimer;

        if (delta >= 500) {

            currentFPS =
                Math.round(
                    fpsFrames /
                    (delta / 1000)
                );

            const ms =
                currentFPS > 0
                    ? 1000 / currentFPS
                    : 0;

            fpsValue.textContent =
                currentFPS;

            liveFPS.textContent =
                currentFPS;

            avgFPS.textContent =
                currentFPS;

            frameTime.textContent =
                ms.toFixed(1);

            liveFrameTime.textContent =
                `${ms.toFixed(1)} ms`;

            graphFPS.textContent =
                `${currentFPS} FPS`;

            fpsHistory.push(
                currentFPS
            );

            if (
                fpsHistory.length > 80
            ) {

                fpsHistory.shift();

            }

            drawGraph();

            updateRating(
                currentFPS
            );

            fpsFrames = 0;

            fpsTimer = time;
        }

        lastTime = time;
    }


    /* ==========================================
       PERFORMANCE GRAPH
    ========================================== */

    function drawGraph() {

        const width =
            graph.clientWidth;

        const height =
            graph.clientHeight;

        const dpr =
            window.devicePixelRatio || 1;

        graph.width =
            width * dpr;

        graph.height =
            height * dpr;

        graphCtx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        graphCtx.clearRect(
            0,
            0,
            width,
            height
        );


        graphCtx.beginPath();

        graphCtx.strokeStyle =
            "#8b5cf6";

        graphCtx.lineWidth = 3;


        fpsHistory.forEach(
            (value, index) => {

                const x =
                    (index /
                    Math.max(
                        fpsHistory.length - 1,
                        1
                    )) *
                    width;

                const normalized =
                    Math.min(
                        value / 144,
                        1
                    );

                const y =
                    height -
                    normalized *
                    height;

                if (index === 0) {

                    graphCtx.moveTo(
                        x,
                        y
                    );

                } else {

                    graphCtx.lineTo(
                        x,
                        y
                    );
                }

            }
        );

        graphCtx.stroke();
    }


    /* ==========================================
       RATING
    ========================================== */

    function updateRating(fps) {

        let result;

        if (fps >= 120) {

            result = "ULTRA";

        } else if (fps >= 90) {

            result = "EXCELLENT";

        } else if (fps >= 60) {

            result = "GOOD";

        } else if (fps >= 30) {

            result = "MEDIUM";

        } else {

            result = "LOW";
        }

        rating.textContent =
            result;
    }


    /* ==========================================
       START / STOP / RESET
    ========================================== */

    document
        .getElementById(
            "startShader"
        )
        ?.addEventListener(
            "click",
            () => {

                if (running)
                    return;

                running = true;

                fpsTimer =
                    performance.now();

                fpsFrames = 0;

                animationFrame =
                    requestAnimationFrame(
                        render
                    );

            }
        );


    document
        .getElementById(
            "stopShader"
        )
        ?.addEventListener(
            "click",
            () => {

                running = false;

                cancelAnimationFrame(
                    animationFrame
                );

            }
        );


    document
        .getElementById(
            "resetShader"
        )
        ?.addEventListener(
            "click",
            () => {

                running = false;

                cancelAnimationFrame(
                    animationFrame
                );

                fpsHistory = [];

                currentFPS = 0;

                fpsValue.textContent = "0";

                avgFPS.textContent = "0";

                liveFPS.textContent = "0";

                frameTime.textContent = "0";

                liveFrameTime.textContent =
                    "0 ms";

                rating.textContent =
                    "READY";

                graphCtx.clearRect(
                    0,
                    0,
                    graph.width,
                    graph.height
                );

            }
        );


    /* ==========================================
       PERFORMANCE LEVEL
    ========================================== */

    document.querySelectorAll(
        "[data-level]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                workload =
                    Number(
                        button.dataset.level
                    );

                const description =
                    document.getElementById(
                        "modeDescription"
                    );

                const messages = {

                    1:
                        "Light workload — safe for normal testing.",

                    2:
                        "Medium workload — balanced graphics test.",

                    3:
                        "Heavy workload — higher GPU load.",

                    4:
                        "Extreme workload — may cause high load and heat."
                };

                description.textContent =
                    messages[workload];

            }
        );

    });


    /* ==========================================
       CPU TEST
    ========================================== */

    const cpuButton =
        document.getElementById(
            "cpuTestButton"
        );

    const cpuProgress =
        document.getElementById(
            "cpuProgress"
        );

    const cpuResult =
        document.getElementById(
            "cpuResult"
        );

    const cpuScore =
        document.getElementById(
            "cpuScore"
        );


    cpuButton?.addEventListener(
        "click",
        async () => {

            cpuButton.disabled = true;

            cpuResult.textContent =
                "TESTING...";

            let score = 0;

            const start =
                performance.now();

            const duration =
                3000;


            while (
                performance.now() -
                start <
                duration
            ) {

                for (
                    let i = 0;
                    i < 250000;
                    i++
                ) {

                    score +=
                        Math.sqrt(i) *
                        Math.sin(i);

                }

                const elapsed =
                    performance.now() -
                    start;

                const progress =
                    Math.min(
                        elapsed /
                        duration *
                        100,
                        100
                    );

                cpuProgress.style.width =
                    `${progress}%`;

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            0
                        )
                );
            }


            const elapsed =
                performance.now() -
                start;


            const final =
                Math.round(
                    100000000 /
                    Math.max(
                        elapsed,
                        1
                    )
                );


            cpuScore.textContent =
                final;

            cpuResult.textContent =
                `${final} POINTS`;

            cpuButton.disabled =
                false;

        }
    );


    /* ==========================================
       GAMING SOUND
    ========================================== */

    const soundButton =
        document.getElementById(
            "soundButton"
        );

    let audioContext;

    soundButton?.addEventListener(
        "click",
        () => {

            audioContext =
                audioContext ||
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.type =
                "sawtooth";

            oscillator.frequency.value =
                220;

            gain.gain.value =
                0.08;

            oscillator.connect(
                gain
            );

            gain.connect(
                audioContext.destination
            );

            oscillator.start();

            oscillator.frequency.exponentialRampToValueAtTime(
                880,
                audioContext.currentTime + 0.4
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.5
            );

            oscillator.stop(
                audioContext.currentTime + 0.5
            );

        }
    );


    /* ==========================================
       FULL TEST
    ========================================== */

    document
        .getElementById(
            "fullTest"
        )
        ?.addEventListener(
            "click",
            () => {

                workload = 3;

                running = true;

                fpsTimer =
                    performance.now();

                fpsFrames = 0;

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame =
                    requestAnimationFrame(
                        render
                    );

                document
                    .getElementById(
                        "finalScore"
                    )
                    .textContent =
                    "TESTING...";

                setTimeout(
                    () => {

                        const score =
                            Math.round(
                                Math.min(
                                    currentFPS *
                                    0.7 +
                                    (Number(
                                        cpuScore.textContent
                                    ) || 0) *
                                    0.3,
                                    999
                                )
                            );

                        document
                            .getElementById(
                                "finalScore"
                            )
                            .textContent =
                            `${score} / 999`;

                        document
                            .getElementById(
                                "finalMessage"
                            )
                            .textContent =
                            `Current graphics performance: ${currentFPS} FPS`;

                    },
                    7000
                );

            }
        );

})();
