/* =========================================================
   AB THE PROMO
   FUTURISTIC WEBSITE ENGINE
========================================================= */

"use strict";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================================
   DEVICE INFORMATION
========================================================= */

function detectDevice() {

    const ua =
        navigator.userAgent;

    let device =
        "Desktop Browser";


    if (/Android/i.test(ua)) {

        device =
            "Android Device";

    }

    else if (
        /iPhone|iPad|iPod/i.test(ua)
    ) {

        device =
            "Apple Mobile Device";

    }

    else if (/Windows/i.test(ua)) {

        device =
            "Windows PC";

    }

    else if (/Mac/i.test(ua)) {

        device =
            "Mac";

    }

    else if (/Linux/i.test(ua)) {

        device =
            "Linux Device";

    }


    const deviceName =
        document.getElementById(
            "deviceName"
        );

    const cpuCores =
        document.getElementById(
            "cpuCores"
        );

    const memory =
        document.getElementById(
            "deviceMemory"
        );

    const screen =
        document.getElementById(
            "screenInfo"
        );


    if (deviceName)
        deviceName.textContent =
            device;


    if (cpuCores)
        cpuCores.textContent =
            navigator.hardwareConcurrency
            ? navigator.hardwareConcurrency +
              " THREADS"
            : "N/A";


    if (memory)
        memory.textContent =
            navigator.deviceMemory
            ? navigator.deviceMemory +
              " GB"
            : "N/A";


    if (screen)
        screen.textContent =
            `${window.screen.width} × ${window.screen.height}`;

}


detectDevice();


/* =========================================================
   WEBGL SHADER
========================================================= */

const canvas =
    document.getElementById(
        "shaderCanvas"
    );


let gl = null;

if (canvas) {

    gl =
        canvas.getContext(
            "webgl2",
            {
                antialias:false,
                alpha:false,
                powerPreference:
                    "high-performance"
            }
        ) ||

        canvas.getContext(
            "webgl",
            {
                antialias:false,
                alpha:false,
                powerPreference:
                    "high-performance"
            }
        );

}


const vertexShaderSource = `

attribute vec2 position;

void main(){

    gl_Position =
        vec4(
            position,
            0.0,
            1.0
        );

}

`;


const fragmentShaderSource = `

precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform float workload;


float hash(vec3 p){

    p =
        fract(
            p *
            0.3183099
            +
            vec3(
                0.1,
                0.2,
                0.3
            )
        );

    p *= 17.0;

    return fract(
        p.x *
        p.y *
        p.z *
        (
            p.x +
            p.y +
            p.z
        )
    );

}


float noise(vec3 p){

    vec3 i =
        floor(p);

    vec3 f =
        fract(p);

    f =
        f*f*
        (
            3.0 -
            2.0*f
        );

    float a =
        hash(i);

    float b =
        hash(
            i +
            vec3(
                1.0,
                0.0,
                0.0
            )
        );

    float c =
        hash(
            i +
            vec3(
                0.0,
                1.0,
                0.0
            )
        );

    float d =
        hash(
            i +
            vec3(
                1.0,
                1.0,
                0.0
            )
        );

    return mix(
        mix(a,b,f.x),
        mix(c,d,f.x),
        f.y
    );

}


float scene(vec3 p){

    float sphere =
        length(p)
        -
        1.25;

    float n =
        noise(
            p *
            (
                2.0 +
                workload
            )
            +
            time *
            .15
        );

    sphere +=
        (
            n -
            .5
        )
        *
        .38;

    return sphere;

}


void main(){

    vec2 uv =
        (
            gl_FragCoord.xy *
            2.0 -
            resolution
        )
        /
        min(
            resolution.x,
            resolution.y
        );


    vec2 m =
        (
            mouse -
            .5
        );


    float angle =
        m.x *
        1.5;


    float ca =
        cos(angle);

    float sa =
        sin(angle);


    uv =
        mat2(
            ca,-sa,
            sa,ca
        )
        *
        uv;


    vec3 rayOrigin =
        vec3(
            0.0,
            0.0,
            4.0
        );


    vec3 rayDirection =
        normalize(
            vec3(
                uv,
                -2.4
            )
        );


    float depth =
        0.0;

    float glow =
        0.0;


    int steps =
        int(
            60.0 +
            workload *
            25.0
        );


    for(
        int i=0;
        i<130;
        i++
    ){

        if(i >= steps)
            break;


        vec3 p =
            rayOrigin +
            rayDirection *
            depth;


        float distance =
            scene(p);


        glow +=
            exp(
                -abs(distance)
                * 9.0
            )
            *
            .018;


        depth +=
            max(
                .012,
                abs(distance)
                * .65
            );


        if(depth > 7.0)
            break;

    }


    vec3 color =
        vec3(
            .005,
            .002,
            .02
        );


    color +=
        vec3(
            0.0,
            .9,
            .75
        )
        *
        glow;


    color +=
        vec3(
            .55,
            .1,
            1.0
        )
        *
        pow(
            max(
                0.0,
                1.0 -
                depth /
                7.0
            ),
            2.0
        );


    color +=
        vec3(
            1.0,
            .05,
            .6
        )
        *
        glow
        *
        .4;


    float vignette =
        1.0 -
        smoothstep(
            .2,
            1.5,
            length(uv)
        );


    color *=
        .6 +
        vignette;


    gl_FragColor =
        vec4(
            color,
            1.0
        );

}

`;


/* =========================================================
   SHADER SETUP
========================================================= */

let program = null;

let positionBuffer = null;

let resolutionLocation = null;

let timeLocation = null;

let mouseLocation = null;

let workloadLocation = null;


function compileShader(
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


function createShaderProgram() {

    if (!gl)
        return false;


    const vertex =
        compileShader(
            gl.VERTEX_SHADER,
            vertexShaderSource
        );


    const fragment =
        compileShader(
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );


    if (!vertex || !fragment)
        return false;


    program =
        gl.createProgram();


    gl.attachShader(
        program,
        vertex
    );


    gl.attachShader(
        program,
        fragment
    );


    gl.linkProgram(
        program
    );


    if (
        !gl.getProgramParameter(
            program,
            gl.LINK_STATUS
        )
    ) {

        console.error(
            gl.getProgramInfoLog(
                program
            )
        );

        return false;

    }


    gl.useProgram(
        program
    );


    positionBuffer =
        gl.createBuffer();


    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        positionBuffer
    );


    gl.bufferData(
        gl.ARRAY_BUFFER,

        new Float32Array([
            -1,-1,
             1,-1,
            -1, 1,

            -1, 1,
             1,-1,
             1, 1
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


    resolutionLocation =
        gl.getUniformLocation(
            program,
            "resolution"
        );


    timeLocation =
        gl.getUniformLocation(
            program,
            "time"
        );


    mouseLocation =
        gl.getUniformLocation(
            program,
            "mouse"
        );


    workloadLocation =
        gl.getUniformLocation(
            program,
            "workload"
        );


    return true;

}


if (gl) {

    createShaderProgram();

}


/* =========================================================
   SHADER STATE
========================================================= */

let running = false;

let animationFrame = null;

let workload = 1;

let mouseX = .5;

let mouseY = .5;

let previousFrame =
    performance.now();


let fpsHistory = [];

let minFPS = Infinity;

let maxFPS = 0;


/* =========================================================
   CANVAS RESIZE
========================================================= */

function resizeCanvas() {

    if (!gl || !canvas)
        return;


    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    const width =
        Math.max(
            1,
            Math.floor(
                rect.width *
                dpr
            )
        );


    const height =
        Math.max(
            1,
            Math.floor(
                rect.height *
                dpr
            )
        );


    if (
        canvas.width !== width ||
        canvas.height !== height
    ) {

        canvas.width =
            width;

        canvas.height =
            height;

    }


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


/* =========================================================
   POINTER
========================================================= */

function pointerMove(
    clientX,
    clientY
) {

    const rect =
        canvas.getBoundingClientRect();


    mouseX =
        Math.max(
            0,
            Math.min(
                1,
                (
                    clientX -
                    rect.left
                ) /
                rect.width
            )
        );


    mouseY =
        1 -
        Math.max(
            0,
            Math.min(
                1,
                (
                    clientY -
                    rect.top
                ) /
                rect.height
            )
        );

}


if (canvas) {

    canvas.addEventListener(
        "pointermove",
        event => {

            pointerMove(
                event.clientX,
                event.clientY
            );

        }
    );

}


/* =========================================================
   FPS ELEMENTS
========================================================= */

const fpsValue =
    document.getElementById(
        "fpsValue"
    );

const frameValue =
    document.getElementById(
        "frameValue"
    );

const gpuLoad =
    document.getElementById(
        "gpuLoad"
    );

const avgFPS =
    document.getElementById(
        "avgFPS"
    );

const minFPS =
    document.getElementById(
        "minFPS"
    );

const maxFPS =
    document.getElementById(
        "maxFPS"
    );

const performanceRating =
    document.getElementById(
        "performanceRating"
    );

const labStatus =
    document.getElementById(
        "labStatus"
    );


/* =========================================================
   GRAPH
========================================================= */

const graph =
    document.getElementById(
        "performanceGraph"
    );


function drawGraph() {

    if (!graph)
        return;


    const ctx =
        graph.getContext(
            "2d"
        );


    const rect =
        graph.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    graph.width =
        Math.max(
            1,
            Math.floor(
                rect.width *
                dpr
            )
        );


    graph.height =
        Math.max(
            1,
            Math.floor(
                rect.height *
                dpr
            )
        );


    const width =
        graph.width;

    const height =
        graph.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(255,255,255,.07)";

    ctx.lineWidth =
        1;


    for(
        let i=0;
        i<=5;
        i++
    ){

        const y =
            i *
            height /
            5;


        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }


    if(
        fpsHistory.length <
        2
    )
        return;


    /* LINE */

    ctx.beginPath();


    fpsHistory.forEach(
        (
            fps,
            index
        ) => {


            const x =
                index /
                (
                    fpsHistory.length -
                    1
                )
                *
                width;


            const normalized =
                Math.min(
                    fps /
                    144,
                    1
                );


            const y =
                height -
                normalized *
                (
                    height *
                    .85
                ) -
                height *
                .075;


            if(index === 0)
                ctx.moveTo(
                    x,
                    y
                );

            else
                ctx.lineTo(
                    x,
                    y
                );

        }
    );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            0
        );


    gradient.addColorStop(
        0,
        "#00f5d4"
    );


    gradient.addColorStop(
        .5,
        "#8b5cf6"
    );


    gradient.addColorStop(
        1,
        "#ff2cdf"
    );


    ctx.strokeStyle =
        gradient;


    ctx.lineWidth =
        4;


    ctx.shadowBlur =
        15;


    ctx.shadowColor =
        "#8b5cf6";


    ctx.stroke();


    ctx.shadowBlur = 0;


    const average =
        fpsHistory.reduce(
            (a,b) =>
                a + b,
            0
        ) /
        fpsHistory.length;


    let rating =
        "LOW";


    if(average >= 120)
        rating =
            "ULTRA";


    else if(average >= 90)
        rating =
            "HIGH";


    else if(average >= 60)
        rating =
            "GOOD";


    else if(average >= 30)
        rating =
            "MEDIUM";


    performanceRating.textContent =
        rating;


    const graphRating =
        document.getElementById(
            "graphRating"
        );


    if(graphRating)
        graphRating.textContent =
            rating;

}


/* =========================================================
   RENDER
========================================================= */

function render(
    time
) {

    if (!running)
        return;


    resizeCanvas();


    const now =
        performance.now();


    const delta =
        now -
        previousFrame;


    previousFrame =
        now;


    const fps =
        delta > 0
        ? 1000 /
          delta
        : 0;


    const safeFPS =
        Math.min(
            240,
            Math.max(
                0,
                fps
            )
        );


    fpsHistory.push(
        safeFPS
    );


    if(
        fpsHistory.length >
        100
    )
        fpsHistory.shift();


    minFPS =
        Math.min(
            minFPS,
            safeFPS
        );


    maxFPS =
        Math.max(
            maxFPS,
            safeFPS
        );


    const average =
        fpsHistory.reduce(
            (a,b) =>
                a + b,
            0
        ) /
        fpsHistory.length;


    fpsValue.textContent =
        safeFPS.toFixed(0);


    frameValue.textContent =
        delta.toFixed(1)
        +
        " ms";


    avgFPS.textContent =
        average.toFixed(0);


    minFPS.textContent =
        minFPS === Infinity
        ? "0"
        : minFPS.toFixed(0);


    maxFPS.textContent =
        maxFPS.toFixed(0);


    gpuLoad.textContent =
        [
            "LOW",
            "MEDIUM",
            "HIGH",
            "EXTREME"
        ][
            workload -
            1
        ];


    gl.useProgram(
        program
    );


    gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
    );


    gl.uniform1f(
        timeLocation,
        time *
        .001
    );


    gl.uniform2f(
        mouseLocation,
        mouseX,
        mouseY
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


    drawGraph();


    animationFrame =
        requestAnimationFrame(
            render
        );

}


/* =========================================================
   START / STOP / RESET
========================================================= */

const startButton =
    document.getElementById(
        "startTest"
    );

const stopButton =
    document.getElementById(
        "stopTest"
    );

const resetButton =
    document.getElementById(
        "resetTest"
    );


function startBenchmark() {

    if(!gl) {

        labStatus.textContent =
            "WEBGL ERROR";

        return;

    }


    if(running)
        return;


    running = true;


    labStatus.textContent =
        "RUNNING";


    previousFrame =
        performance.now();


    animationFrame =
        requestAnimationFrame(
            render
        );

}


function stopBenchmark() {

    running = false;


    if(animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame =
            null;

    }


    labStatus.textContent =
        "STOPPED";

}


function resetBenchmark() {

    stopBenchmark();


    fpsHistory = [];

    minFPS =
        Infinity;

    maxFPS =
        0;


    fpsValue.textContent =
        "0";


    frameValue.textContent =
        "0 ms";


    avgFPS.textContent =
        "0";


    minFPS.textContent =
        "0";


    maxFPS.textContent =
        "0";


    performanceRating.textContent =
        "READY";


    gpuLoad.textContent =
        "READY";


    labStatus.textContent =
        "READY";


    drawGraph();

}


startButton.addEventListener(
    "click",
    startBenchmark
);


stopButton.addEventListener(
    "click",
    stopBenchmark
);


resetButton.addEventListener(
    "click",
    resetBenchmark
);


/* =========================================================
   STRESS LEVEL
========================================================= */

document
    .querySelectorAll(
        ".level"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".level"
                        )
                        .forEach(
                            item =>
                                item.classList
                                .remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    workload =
                        Number(
                            button.dataset.level
                        );

                }
            );

        }
    );


/* =========================================================
   CPU BENCHMARK
========================================================= */

let cpuTesting =
    false;


const cpuTestButton =
    document.getElementById(
        "cpuTest"
    );


const cpuScore =
    document.getElementById(
        "cpuScore"
    );


async function runCPUTest() {

    if(cpuTesting)
        return;


    cpuTesting =
        true;


    cpuScore.textContent =
        "...";


    const start =
        performance.now();


    let result =
        0;


    const loops =
        6000000;


    for(
        let i=0;
        i<loops;
        i++
    ){

        result +=
            Math.sin(
                i *
                .0001
            )
            *
            Math.cos(
                i *
                .00007
            );


        result +=
            Math.sqrt(
                (
                    i %
                    1000
                ) + 1
            )
            *
            .00001;


        if(
            i %
            200000 ===
            0
        ){

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        0
                    )
            );

        }

    }


    const elapsed =
        performance.now() -
        start;


    const score =
        Math.round(
            100000000 /
            Math.max(
                elapsed,
                1
            )
        );


    cpuScore.textContent =
        score.toLocaleString();


    cpuTesting =
        false;


    return score;

}


cpuTestButton.addEventListener(
    "click",
    runCPUTest
);


/* =========================================================
   AUDIO
========================================================= */

let audioContext =
    null;

let gainNode =
    null;

let oscillator =
    null;

let soundRunning =
    false;


const soundButton =
    document.getElementById(
        "soundButton"
    );


const volumeControl =
    document.getElementById(
        "volumeControl"
    );


function startSound() {

    if(!audioContext){

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        gainNode =
            audioContext.createGain();


        gainNode.gain.value =
            Number(
                volumeControl.value
            ) /
            100;


        gainNode.connect(
            audioContext.destination
        );

    }


    if(
        audioContext.state ===
        "suspended"
    ){

        audioContext.resume();

    }


    oscillator =
        audioContext.createOscillator();


    oscillator.type =
        "sawtooth";


    oscillator.frequency.value =
        110;


    oscillator.connect(
        gainNode
    );


    oscillator.start();


    soundRunning =
        true;


    soundButton.textContent =
        "■ STOP SOUND";

}


function stopSound() {

    if(!oscillator)
        return;


    try {

        oscillator.stop();

    }

    catch(error){}


    oscillator.disconnect();


    oscillator =
        null;


    soundRunning =
        false;


    soundButton.textContent =
        "🔊 START SOUND";

}


soundButton.addEventListener(
    "click",
    () => {

        if(soundRunning)
            stopSound();

        else
            startSound();

    }
);


volumeControl.addEventListener(
    "input",
    () => {

        if(gainNode){

            gainNode.gain.value =
                Number(
                    volumeControl.value
                ) /
                100;

        }

    }
);


/* =========================================================
   FULL TEST
========================================================= */

const fullTestButton =
    document.getElementById(
        "fullTest"
    );


const finalScore =
    document.getElementById(
        "finalScore"
    );


const finalMessage =
    document.getElementById(
        "finalMessage"
    );


async function runFullTest() {

    resetBenchmark();


    startBenchmark();


    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                6000
            )
    );


    stopBenchmark();


    const gpuAverage =
        fpsHistory.length
        ? fpsHistory.reduce(
            (a,b) =>
                a + b,
            0
        ) /
        fpsHistory.length
        : 0;


    const cpu =
        await runCPUTest();


    const gpuScore =
        Math.min(
            100,
            gpuAverage /
            1.44
        );


    const cpuScoreNormalized =
        Math.min(
            100,
            cpu /
            1000
        );


    const score =
        Math.round(
            gpuScore *
            .6
            +
            cpuScoreNormalized *
            .4
        );


    finalScore.textContent =
        score;


    if(score >= 90){

        finalMessage.textContent =
            "🔥 ULTRA PERFORMANCE — Your device handled the benchmark extremely well.";

    }

    else if(score >= 75){

        finalMessage.textContent =
            "🚀 HIGH PERFORMANCE — Very strong browser performance.";

    }

    else if(score >= 55){

        finalMessage.textContent =
            "⚡ GOOD PERFORMANCE — Your device handled the test well.";

    }

    else if(score >= 35){

        finalMessage.textContent =
            "🟡 MEDIUM PERFORMANCE — Moderate performance detected.";

    }

    else {

        finalMessage.textContent =
            "🔴 LOW PERFORMANCE — The workload was demanding for this device.";

    }

}


fullTestButton.addEventListener(
    "click",
    runFullTest
);


/* =========================================================
   OPINION SYSTEM
========================================================= */

const opinionButtons =
    document.querySelectorAll(
        ".opinion-card"
    );


const opinionResult =
    document.getElementById(
        "opinionResult"
    );


opinionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                opinionButtons
                    .forEach(
                        item =>
                            item.classList
                            .remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                const opinion =
                    button.dataset.opinion;


                opinionResult.textContent =
                    `❤️ You selected "${opinion}". Thanks for your opinion!`;

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold:.12
        }
    );


document
    .querySelectorAll(
        ".glass-panel, .skill-card, .project-card, .tool-card"
    )
    .forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(30px)";


            element.style.transition =
                "opacity .8s ease, transform .8s ease";


            revealObserver.observe(
                element
            );

        }
    );


const revealStyle =
    document.createElement(
        "style"
    );


revealStyle.textContent = `

.glass-panel.visible,
.skill-card.visible,
.project-card.visible,
.tool-card.visible{

    opacity:1 !important;

    transform:
        translateY(0)
        !important;

}

`;


document.head.appendChild(
    revealStyle
);


/* =========================================================
   TAB TITLE EFFECT
========================================================= */

let originalTitle =
    document.title;


document.addEventListener(
    "visibilitychange",
    () => {

        if(document.hidden){

            document.title =
                "⚡ Come back — AB THE PROMO";

        }

        else {

            document.title =
                originalTitle;

        }

    }
);


/* =========================================================
   INITIAL
========================================================= */

drawGraph();

detectDevice();


window.addEventListener(
    "load",
    () => {

        resizeCanvas();

        drawGraph();

    }
);


/* =========================================================
   SAFETY:
   STOP GRAPHICS TEST WHEN PAGE IS HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if(
            document.hidden &&
            running
        ){

            stopBenchmark();

        }

    }
);
