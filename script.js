/* =========================================================
   AB THE PROMO — PERFORMANCE LAB ENGINE
   Works with the Performance Lab HTML.
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const PL = {

    section: document.querySelector("#performance-lab"),

    canvas: document.querySelector("#pl-shader"),
    graph: document.querySelector("#pl-graph"),

    fps: document.querySelector("#pl-fps"),
    frame: document.querySelector("#pl-frame"),

    avg: document.querySelector("#pl-avg"),
    min: document.querySelector("#pl-min"),
    max: document.querySelector("#pl-max"),

    cpuScore: document.querySelector("#pl-cpu-score"),
    cpuBig: document.querySelector("#pl-cpu-big"),

    device: document.querySelector("#pl-device"),
    cores: document.querySelector("#pl-cores"),
    memory: document.querySelector("#pl-memory"),
    screen: document.querySelector("#pl-screen"),

    status: document.querySelector("#pl-status"),
    rating: document.querySelector("#pl-rating"),

    result: document.querySelector("#pl-result-score"),
    resultText: document.querySelector("#pl-result-text"),

    start: document.querySelector("#pl-start"),
    stop: document.querySelector("#pl-stop"),
    reset: document.querySelector("#pl-reset"),

    cpuTest: document.querySelector("#pl-cpu-test"),
    sound: document.querySelector("#pl-sound"),
    volume: document.querySelector("#pl-volume"),
    full: document.querySelector("#pl-full")

};


/* =========================================================
   DEVICE INFO
========================================================= */

function detectDevice() {

    const ua = navigator.userAgent;

    let device = "Desktop";

    if (/Android/i.test(ua)) {
        device = "Android";
    }

    else if (/iPhone|iPad|iPod/i.test(ua)) {
        device = "iPhone / iPad";
    }

    else if (/Windows/i.test(ua)) {
        device = "Windows PC";
    }

    else if (/Mac/i.test(ua)) {
        device = "Mac";
    }

    else if (/Linux/i.test(ua)) {
        device = "Linux";
    }

    PL.device.textContent = device;

    PL.cores.textContent =
        navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency + " Threads"
        : "N/A";

    PL.memory.textContent =
        navigator.deviceMemory
        ? navigator.deviceMemory + " GB"
        : "N/A";

    PL.screen.textContent =
        `${window.screen.width} × ${window.screen.height}`;

}

detectDevice();


/* =========================================================
   WEBGL
========================================================= */

const gl =
    PL.canvas.getContext("webgl2", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance"
    }) ||
    PL.canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance"
    });


/* =========================================================
   SHADER SOURCE
========================================================= */

const vertexSource = `

attribute vec2 a_position;

void main() {

    gl_Position =
        vec4(a_position, 0.0, 1.0);

}

`;


const fragmentSource = `

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_workload;

#define MAX_STEPS 180

float hash(vec3 p) {

    p = fract(
        p * 0.3183099
        + vec3(0.1,0.2,0.3)
    );

    p *= 17.0;

    return fract(
        p.x * p.y * p.z *
        (p.x + p.y + p.z)
    );

}


float noise(vec3 p) {

    vec3 i = floor(p);
    vec3 f = fract(p);

    f = f*f*(3.0-2.0*f);

    return mix(
        mix(
            mix(
                hash(i + vec3(0,0,0)),
                hash(i + vec3(1,0,0)),
                f.x
            ),
            mix(
                hash(i + vec3(0,1,0)),
                hash(i + vec3(1,1,0)),
                f.x
            ),
            f.y
        ),
        mix(
            mix(
                hash(i + vec3(0,0,1)),
                hash(i + vec3(1,0,1)),
                f.x
            ),
            mix(
                hash(i + vec3(0,1,1)),
                hash(i + vec3(1,1,1)),
                f.x
            ),
            f.y
        ),
        f.z
    );

}


float mapScene(vec3 p) {

    float d =
        length(p) - 1.25;

    float n =
        noise(
            p * 2.4 +
            vec3(u_time * .18)
        );

    d +=
        (n - .5)
        * .32;

    return d;

}


void main() {

    vec2 uv =
        (gl_FragCoord.xy * 2.0
        - u_resolution.xy)
        / min(
            u_resolution.x,
            u_resolution.y
        );

    vec2 mouse =
        (u_mouse - .5) * 1.2;

    float ca =
        cos(mouse.x);

    float sa =
        sin(mouse.x);

    mat2 rot =
        mat2(
            ca,-sa,
            sa,ca
        );

    uv = rot * uv;

    vec3 ro =
        vec3(
            0.0,
            0.0,
            3.8
        );

    vec3 rd =
        normalize(
            vec3(
                uv,
                -2.2
            )
        );

    float total = 0.0;

    float glow = 0.0;

    int steps =
        int(
            60.0 +
            u_workload * 110.0
        );

    for(int i=0;i<MAX_STEPS;i++) {

        if(i >= steps)
            break;

        vec3 p =
            ro + rd * total;

        float d =
            mapScene(p);

        glow +=
            exp(
                -abs(d) * 8.0
            ) * .018;

        total +=
            max(
                .012,
                abs(d) * .65
            );

        if(total > 7.0)
            break;

    }

    vec3 col =
        vec3(
            0.01,
            0.005,
            0.03
        );

    col +=
        vec3(
            0.0,
            0.9,
            0.75
        ) * glow;

    col +=
        vec3(
            0.55,
            0.15,
            1.0
        )
        * pow(
            max(
                0.0,
                1.0 - total / 6.0
            ),
            2.0
        );

    col +=
        vec3(
            1.0,
            0.05,
            0.7
        )
        * glow
        * .35;

    float vignette =
        1.0 -
        smoothstep(
            .3,
            1.5,
            length(uv)
        );

    col *=
        .55 +
        vignette * .7;

    gl_FragColor =
        vec4(
            col,
            1.0
        );

}

`;


/* =========================================================
   SHADER HELPERS
========================================================= */

let program = null;
let buffer = null;

let uResolution = null;
let uTime = null;
let uMouse = null;
let uWorkload = null;


function compileShader(type, source) {

    const shader =
        gl.createShader(type);

    gl.shaderSource(
        shader,
        source
    );

    gl.compileShader(shader);

    if (!gl.getShaderParameter(
        shader,
        gl.COMPILE_STATUS
    )) {

        console.error(
            gl.getShaderInfoLog(shader)
        );

        return null;
    }

    return shader;
}


function createProgram() {

    if (!gl) {

        PL.status.textContent =
            "WEBGL NOT AVAILABLE";

        return false;
    }

    const vertex =
        compileShader(
            gl.VERTEX_SHADER,
            vertexSource
        );

    const fragment =
        compileShader(
            gl.FRAGMENT_SHADER,
            fragmentSource
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

    gl.linkProgram(program);

    if (!gl.getProgramParameter(
        program,
        gl.LINK_STATUS
    )) {

        console.error(
            gl.getProgramInfoLog(program)
        );

        return false;
    }

    gl.useProgram(program);

    buffer =
        gl.createBuffer();

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffer
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
            "a_position"
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

    uResolution =
        gl.getUniformLocation(
            program,
            "u_resolution"
        );

    uTime =
        gl.getUniformLocation(
            program,
            "u_time"
        );

    uMouse =
        gl.getUniformLocation(
            program,
            "u_mouse"
        );

    uWorkload =
        gl.getUniformLocation(
            program,
            "u_workload"
        );

    return true;
}

createProgram();


/* =========================================================
   CANVAS SIZE
========================================================= */

function resizeShader() {

    if (!gl)
        return;

    const rect =
        PL.canvas.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    const width =
        Math.max(
            1,
            Math.floor(rect.width * dpr)
        );

    const height =
        Math.max(
            1,
            Math.floor(rect.height * dpr)
        );

    if (
        PL.canvas.width !== width ||
        PL.canvas.height !== height
    ) {

        PL.canvas.width = width;
        PL.canvas.height = height;

    }

    gl.viewport(
        0,
        0,
        PL.canvas.width,
        PL.canvas.height
    );
}

window.addEventListener(
    "resize",
    resizeShader
);

resizeShader();


/* =========================================================
   BENCHMARK STATE
========================================================= */

let running = false;

let animationID = null;

let stressLevel = 1;

let mouseX = .5;
let mouseY = .5;

let previousTime = performance.now();

let frameTimes = [];

let fpsHistory = [];

let minFPS = Infinity;

let maxFPS = 0;


/* =========================================================
   MOUSE / TOUCH
========================================================= */

function updatePointer(clientX, clientY) {

    const rect =
        PL.canvas.getBoundingClientRect();

    mouseX =
        Math.max(
            0,
            Math.min(
                1,
                (clientX - rect.left) /
                rect.width
            )
        );

    mouseY =
        1 -
        Math.max(
            0,
            Math.min(
                1,
                (clientY - rect.top) /
                rect.height
            )
        );
}


PL.canvas.addEventListener(
    "pointermove",
    e => {

        updatePointer(
            e.clientX,
            e.clientY
        );

    }
);


/* =========================================================
   SHADER RENDER
========================================================= */

function renderShader(time) {

    if (!running)
        return;

    resizeShader();

    const now =
        performance.now();

    const delta =
        now - previousTime;

    previousTime = now;

    const fps =
        delta > 0
        ? 1000 / delta
        : 0;

    const safeFPS =
        Math.min(
            240,
            Math.max(
                0,
                fps
            )
        );

    frameTimes.push(delta);

    fpsHistory.push(safeFPS);

    if (frameTimes.length > 100)
        frameTimes.shift();

    if (fpsHistory.length > 100)
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
        fpsHistory.length
        ? fpsHistory.reduce(
            (a,b) => a + b,
            0
        ) / fpsHistory.length
        : 0;


    PL.fps.textContent =
        safeFPS.toFixed(0);

    PL.frame.textContent =
        delta.toFixed(1) + " ms";

    PL.avg.textContent =
        average.toFixed(0);

    PL.min.textContent =
        minFPS === Infinity
        ? "0"
        : minFPS.toFixed(0);

    PL.max.textContent =
        maxFPS.toFixed(0);


    gl.useProgram(program);

    gl.uniform2f(
        uResolution,
        PL.canvas.width,
        PL.canvas.height
    );

    gl.uniform1f(
        uTime,
        time * .001
    );

    gl.uniform2f(
        uMouse,
        mouseX,
        mouseY
    );

    gl.uniform1f(
        uWorkload,
        stressLevel
    );

    gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
    );

    drawGraph();

    animationID =
        requestAnimationFrame(
            renderShader
        );

}


/* =========================================================
   GRAPH
========================================================= */

function drawGraph() {

    const canvas =
        PL.graph;

    const ctx =
        canvas.getContext("2d");

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
            Math.floor(rect.width * dpr)
        );

    const height =
        Math.max(
            1,
            Math.floor(rect.height * dpr)
        );

    if (
        canvas.width !== width ||
        canvas.height !== height
    ) {

        canvas.width = width;
        canvas.height = height;

    }

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(255,255,255,.07)";

    ctx.lineWidth = 1;

    for (
        let y = 0;
        y < height;
        y += height / 5
    ) {

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(width,y);

        ctx.stroke();

    }


    if (fpsHistory.length < 2)
        return;


    /* FPS LINE */

    ctx.beginPath();

    fpsHistory.forEach(
        (fps,index) => {

            const x =
                index /
                (fpsHistory.length - 1) *
                width;

            const normalized =
                Math.min(
                    fps / 144,
                    1
                );

            const y =
                height -
                normalized *
                (height * .85) -
                height * .075;

            if (index === 0)
                ctx.moveTo(x,y);

            else
                ctx.lineTo(x,y);

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
        3;

    ctx.shadowBlur =
        12;

    ctx.shadowColor =
        "#8b5cf6";

    ctx.stroke();

    ctx.shadowBlur = 0;


    /* RATING */

    const avg =
        fpsHistory.reduce(
            (a,b) => a+b,
            0
        ) / fpsHistory.length;

    let rating =
        "LOW";

    if (avg >= 120)
        rating = "ULTRA";

    else if (avg >= 90)
        rating = "HIGH";

    else if (avg >= 60)
        rating = "GOOD";

    else if (avg >= 30)
        rating = "MEDIUM";

    PL.rating.textContent =
        rating;

}


/* =========================================================
   START
========================================================= */

function startBenchmark() {

    if (running)
        return;

    running = true;

    PL.section.classList.add(
        "pl-running"
    );

    PL.section.classList.remove(
        "pl-stopped"
    );

    PL.status.textContent =
        "RUNNING";

    previousTime =
        performance.now();

    if (animationID)
        cancelAnimationFrame(
            animationID
        );

    animationID =
        requestAnimationFrame(
            renderShader
        );

}


/* =========================================================
   STOP
========================================================= */

function stopBenchmark() {

    running = false;

    if (animationID) {

        cancelAnimationFrame(
            animationID
        );

        animationID = null;

    }

    PL.section.classList.remove(
        "pl-running"
    );

    PL.section.classList.add(
        "pl-stopped"
    );

    PL.status.textContent =
        "STOPPED";

}


/* =========================================================
   RESET
========================================================= */

function resetBenchmark() {

    stopBenchmark();

    frameTimes = [];

    fpsHistory = [];

    minFPS = Infinity;

    maxFPS = 0;

    PL.fps.textContent = "0";
    PL.frame.textContent = "0 ms";
    PL.avg.textContent = "0";
    PL.min.textContent = "0";
    PL.max.textContent = "0";

    PL.status.textContent =
        "READY";

    PL.rating.textContent =
        "WAITING";

    PL.cpuScore.textContent =
        "0";

    PL.cpuBig.textContent =
        "0";

    PL.result.textContent =
        "0";

    PL.resultText.textContent =
        "Start a test to see your result.";

    drawGraph();

}


/* =========================================================
   LEVEL BUTTONS
========================================================= */

document
    .querySelectorAll(".pl-level")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".pl-level"
                    )
                    .forEach(
                        b =>
                        b.classList.remove(
                            "active"
                        )
                    );

                button.classList.add(
                    "active"
                );

                stressLevel =
                    Number(
                        button.dataset.level
                    );

            }
        );

    });


/* =========================================================
   BUTTON EVENTS
========================================================= */

PL.start.addEventListener(
    "click",
    startBenchmark
);

PL.stop.addEventListener(
    "click",
    stopBenchmark
);

PL.reset.addEventListener(
    "click",
    resetBenchmark
);


/* =========================================================
   CPU BENCHMARK
========================================================= */

let cpuRunning = false;


async function runCPUTest() {

    if (cpuRunning)
        return;

    cpuRunning = true;

    PL.cpuBig.textContent =
        "...";

    PL.cpuScore.textContent =
        "...";

    const start =
        performance.now();

    let value = 0;

    /*
       Bounded browser workload.
       It is intentionally a benchmark,
       not an attempt to damage the CPU.
    */

    const rounds =
        7000000;

    for (
        let i = 0;
        i < rounds;
        i++
    ) {

        value +=
            Math.sin(i * .0001) *
            Math.cos(i * .00007);

        value +=
            Math.sqrt(
                (i % 1000) + 1
            ) * .00001;

        if (
            i % 250000 === 0
        ) {

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
        performance.now() - start;

    /*
       Higher score = faster execution.
    */

    const score =
        Math.round(
            100000000 /
            Math.max(
                elapsed,
                1
            )
        );

    PL.cpuBig.textContent =
        score.toLocaleString();

    PL.cpuScore.textContent =
        score.toLocaleString();

    cpuRunning = false;

    return score;

}


PL.cpuTest.addEventListener(
    "click",
    runCPUTest
);


/* =========================================================
   AUDIO ENGINE
========================================================= */

let audioContext = null;

let masterGain = null;

let oscillator = null;

let audioRunning = false;


function startSound() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        masterGain =
            audioContext.createGain();

        masterGain.gain.value =
            Number(
                PL.volume.value
            ) / 100;

        masterGain.connect(
            audioContext.destination
        );

    }

    if (audioContext.state === "suspended")
        audioContext.resume();


    if (audioRunning)
        return;


    oscillator =
        audioContext.createOscillator();

    oscillator.type =
        "sawtooth";

    oscillator.frequency.value =
        110;

    oscillator.connect(
        masterGain
    );

    oscillator.start();

    audioRunning = true;

    PL.sound.textContent =
        "■ STOP SOUND";

}


function stopSound() {

    if (!oscillator)
        return;

    try {
        oscillator.stop();
    }

    catch(e) {}

    oscillator.disconnect();

    oscillator = null;

    audioRunning = false;

    PL.sound.textContent =
        "🔊 START SOUND";

}


PL.sound.addEventListener(
    "click",
    () => {

        if (audioRunning)
            stopSound();

        else
            startSound();

    }
);


PL.volume.addEventListener(
    "input",
    () => {

        if (masterGain) {

            masterGain.gain.value =
                Number(
                    PL.volume.value
                ) / 100;

        }

    }
);


/* =========================================================
   FULL TEST
========================================================= */

async function fullTest() {

    resetBenchmark();

    startBenchmark();

    /*
       Let GPU test collect data.
    */

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                6000
            )
    );

    stopBenchmark();

    const cpu =
        await runCPUTest();

    const average =
        fpsHistory.length
        ? fpsHistory.reduce(
            (a,b) => a+b,
            0
        ) / fpsHistory.length
        : 0;


    const gpuScore =
        Math.round(
            Math.min(
                100,
                average / 1.44
            )
        );


    const cpuNormalized =
        Math.min(
            100,
            cpu / 1000
        );


    const finalScore =
        Math.round(
            gpuScore * .6 +
            cpuNormalized * .4
        );


    PL.result.textContent =
        finalScore;


    let message =
        "Entry-level performance.";

    if (finalScore >= 90)
        message =
            "🔥 ULTRA — Excellent performance!";

    else if (finalScore >= 75)
        message =
            "🚀 HIGH — Very strong performance.";

    else if (finalScore >= 55)
        message =
            "⚡ GOOD — Solid everyday performance.";

    else if (finalScore >= 35)
        message =
            "🟡 MEDIUM — Moderate performance.";

    else
        message =
            "🔴 LOW — Performance is limited.";


    PL.resultText.textContent =
        message;

}


PL.full.addEventListener(
    "click",
    fullTest
);


/* =========================================================
   INITIAL GRAPH
========================================================= */

drawGraph();


/* =========================================================
   STOP TEST WHEN PAGE IS HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            running
        ) {

            stopBenchmark();

        }

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        detectDevice();

        resizeShader();

        drawGraph();

    }
);
