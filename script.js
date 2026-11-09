/* =========================================
   ABDUL AHAD
   ADVANCED PORTFOLIO ENGINE
========================================= */


/* =========================================
   PARTICLES
========================================= */

const particleContainer =
    document.getElementById("particles");

for(let i=0;i<90;i++){

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    particle.style.left =
        Math.random()*100 + "%";

    particle.style.animationDuration =
        (5 + Math.random()*15) + "s";

    particle.style.animationDelay =
        (-Math.random()*15) + "s";

    particle.style.opacity =
        .15 + Math.random()*.6;

    particleContainer.appendChild(
        particle
    );
}


/* =========================================
   SCROLL PROGRESS
========================================= */

const progress =
    document.getElementById(
        "scrollProgress"
    );

window.addEventListener(
    "scroll",
    ()=>{

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement
            .scrollHeight -
            window.innerHeight;

        const percent =
            height > 0
            ? scrollTop / height * 100
            : 0;

        progress.style.width =
            percent + "%";

    },
    {passive:true}
);


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );

menuBtn.addEventListener(
    "click",
    ()=>{
        navMenu.classList.toggle(
            "active"
        );
    }
);

document
.querySelectorAll("#navMenu a")
.forEach(link=>{

    link.addEventListener(
        "click",
        ()=>{
            navMenu.classList.remove(
                "active"
            );
        }
    );

});


/* =========================================
   SCROLL REVEAL
========================================= */

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
                            .add("visible");

                    }

                }
            );

        },
        {
            threshold:.12
        }
    );

document
.querySelectorAll(".reveal")
.forEach(
    element=>
        observer.observe(element)
);


/* =========================================
   BACK TO TOP
========================================= */

const topBtn =
    document.getElementById(
        "topBtn"
    );

window.addEventListener(
    "scroll",
    ()=>{

        if(window.scrollY > 600){

            topBtn.classList.add(
                "show"
            );

        }else{

            topBtn.classList.remove(
                "show"
            );

        }

    },
    {passive:true}
);

topBtn.addEventListener(
    "click",
    ()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
);


/* =========================================
   FPS ENGINE
========================================= */

const fpsValue =
    document.getElementById(
        "fpsValue"
    );

const fpsStatus =
    document.getElementById(
        "fpsStatus"
    );

let frames = 0;

let lastFPSUpdate =
    performance.now();

let currentFPS = 0;

function fpsLoop(time){

    frames++;

    if(
        time -
        lastFPSUpdate
        >= 1000
    ){

        currentFPS =
            frames;

        frames = 0;

        lastFPSUpdate =
            time;

        fpsValue.textContent =
            currentFPS;

        updateFPSStatus(
            currentFPS
        );

        addFPSPoint(
            currentFPS
        );
    }

    requestAnimationFrame(
        fpsLoop
    );
}

requestAnimationFrame(
    fpsLoop
);


/* =========================================
   FPS STATUS
========================================= */

function updateFPSStatus(fps){

    if(fps >= 55){

        fpsStatus.textContent =
            "EXCELLENT";

        fpsStatus.style.color =
            "#00ff9d";

    }
    else if(fps >= 35){

        fpsStatus.textContent =
            "GOOD";

        fpsStatus.style.color =
            "#ffe600";

    }
    else{

        fpsStatus.textContent =
            "HEAVY LOAD";

        fpsStatus.style.color =
            "#ff4d6d";
    }
}


/* =========================================
   FPS GRAPH
========================================= */

const graph =
    document.getElementById(
        "fpsGraph"
    );

const ctx =
    graph.getContext("2d");

let fpsData = [];

function resizeGraph(){

    const ratio =
        window.devicePixelRatio || 1;

    const rect =
        graph.getBoundingClientRect();

    graph.width =
        rect.width * ratio;

    graph.height =
        rect.height * ratio;

    ctx.scale(
        ratio,
        ratio
    );
}

resizeGraph();

window.addEventListener(
    "resize",
    ()=>{
        resizeGraph();
        drawGraph();
    }
);

function addFPSPoint(value){

    fpsData.push(value);

    if(
        fpsData.length > 80
    ){
        fpsData.shift();
    }

    drawGraph();
}

function drawGraph(){

    const width =
        graph.clientWidth;

    const height =
        graph.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(255,255,255,.05)";

    ctx.lineWidth = 1;

    for(
        let i=0;
        i<6;
        i++
    ){

        const y =
            i *
            height / 5;

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


    /* LINE */

    if(fpsData.length < 2)
        return;

    ctx.beginPath();

    fpsData.forEach(
        (value,index)=>{

            const x =
                index *
                width /
                79;

            const safeValue =
                Math.min(
                    value,
                    120
                );

            const y =
                height -
                safeValue /
                120 *
                height;

            if(index === 0){

                ctx.moveTo(
                    x,
                    y
                );

            }else{

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );

    ctx.strokeStyle =
        "#00eaff";

    ctx.lineWidth = 3;

    ctx.shadowBlur = 15;

    ctx.shadowColor =
        "#00eaff";

    ctx.stroke();

    ctx.shadowBlur = 0;

}


/* =========================================
   MEMORY
========================================= */

const memoryValue =
    document.getElementById(
        "memoryValue"
    );

function updateMemory(){

    if(
        performance.memory
    ){

        const used =
            performance
            .memory
            .usedJSHeapSize /
            1024 /
            1024;

        memoryValue.textContent =
            used.toFixed(0) +
            " MB";

    }else{

        memoryValue.textContent =
            "N/A";
    }
}

setInterval(
    updateMemory,
    1000
);

updateMemory();


/* =========================================
   SCREEN INFO
========================================= */

const screenValue =
    document.getElementById(
        "screenValue"
    );

function updateScreen(){

    screenValue.textContent =
        window.innerWidth +
        "×" +
        window.innerHeight;
}

updateScreen();

window.addEventListener(
    "resize",
    updateScreen
);


/* =========================================
   CPU BENCHMARK
========================================= */

const cpuBtn =
    document.getElementById(
        "cpuTest"
    );

const cpuValue =
    document.getElementById(
        "cpuValue"
    );

cpuBtn.addEventListener(
    "click",
    async ()=>{

        cpuBtn.disabled =
            true;

        cpuBtn.textContent =
            "⚡ TESTING...";

        cpuValue.textContent =
            "...";

        await new Promise(
            resolve=>
                setTimeout(
                    resolve,
                    100
                )
        );

        const start =
            performance.now();

        let result = 0;

        const loops =
            20000000;

        for(
            let i=0;
            i<loops;
            i++
        ){

            result +=
                Math.sqrt(i) *
                Math.sin(i) *
                Math.cos(i);

        }

        const elapsed =
            performance.now() -
            start;

        const score =
            Math.round(
                loops /
                elapsed
            );

        cpuValue.textContent =
            score;

        cpuBtn.textContent =
            "⚡ CPU TEST COMPLETE";

        setTimeout(
            ()=>{
                cpuBtn.textContent =
                    "⚡ CPU PERFORMANCE TEST";

                cpuBtn.disabled =
                    false;

            },
            2500
        );

    }
);


/* =========================================
   3D ROTATION CONTROL
========================================= */

const cube =
    document.getElementById(
        "cube"
    );

const rotateBtn =
    document.getElementById(
        "rotateBtn"
    );

let cubeSpeed = 8;

rotateBtn.addEventListener(
    "click",
    ()=>{

        cubeSpeed -= 2;

        if(cubeSpeed <= 0)
            cubeSpeed = 12;

        cube.style.animationDuration =
            cubeSpeed + "s";

    }
);


/* =========================================
   MOUSE PARALLAX
========================================= */

document.addEventListener(
    "mousemove",
    event=>{

        if(
            document.body
            .classList
            .contains("low-mode")
        ){
            return;
        }

        const x =
            (event.clientX /
            window.innerWidth -
            .5);

        const y =
            (event.clientY /
            window.innerHeight -
            .5);

        const scene =
            document.querySelector(
                ".scene"
            );

        if(scene){

            scene.style.transform =
                `rotateX(${-y*5}deg)
                 rotateY(${x*5}deg)`;

        }

    }
);


/* =========================================
   TOUCH RIPPLE
========================================= */

function createTouchEffect(
    x,
    y
){

    const ripple =
        document.createElement(
            "div"
        );

    ripple.style.position =
        "fixed";

    ripple.style.left =
        x + "px";

    ripple.style.top =
        y + "px";

    ripple.style.width =
        "25px";

    ripple.style.height =
        "25px";

    ripple.style.borderRadius =
        "50%";

    ripple.style.border =
        "2px solid #00eaff";

    ripple.style.boxShadow =
        "0 0 25px #00eaff";

    ripple.style.pointerEvents =
        "none";

    ripple.style.zIndex =
        "99999";

    ripple.style.transform =
        "translate(-50%,-50%) scale(.2)";

    ripple.style.transition =
        "transform .7s ease, opacity .7s ease";

    document.body.appendChild(
        ripple
    );

    requestAnimationFrame(
        ()=>{
            ripple.style.transform =
                "translate(-50%,-50%) scale(5)";

            ripple.style.opacity =
                "0";
        }
    );

    setTimeout(
        ()=>{
            ripple.remove();
        },
        750
    );
}

document.addEventListener(
    "click",
    event=>{
        createTouchEffect(
            event.clientX,
            event.clientY
        );
    }
);

document.addEventListener(
    "touchstart",
    event=>{

        const touch =
            event.touches[0];

        createTouchEffect(
            touch.clientX,
            touch.clientY
        );

    },
    {passive:true}
);


/* =========================================
   LOW POWER MODE
========================================= */

const lowModeBtn =
    document.getElementById(
        "lowMode"
    );

lowModeBtn.addEventListener(
    "click",
    ()=>{

        document.body
            .classList
            .toggle(
                "low-mode"
            );

        if(
            document.body
            .classList
            .contains("low-mode")
        ){

            lowModeBtn.textContent =
                "☀️ NORMAL MODE";

        }else{

            lowModeBtn.textContent =
                "🌙 LOW POWER MODE";

        }

    }
);


/* =========================================
   WEBGL VOLUME-SHADER STRESS ENGINE
========================================= */

const stressCanvas =
    document.getElementById(
        "stressCanvas"
    );

const gl =
    stressCanvas.getContext(
        "webgl",
        {
            antialias:false,
            powerPreference:
                "high-performance"
        }
    );

let stressRunning = false;

let stressAnimation;


/* RESIZE */

function resizeStress(){

    stressCanvas.width =
        window.innerWidth;

    stressCanvas.height =
        window.innerHeight;

    if(gl){

        gl.viewport(
            0,
            0,
            stressCanvas.width,
            stressCanvas.height
        );

    }

}

resizeStress();

window.addEventListener(
    "resize",
    resizeStress
);


/* SHADERS */

if(gl){

const vertexSource = `

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

const fragmentSource = `

precision highp float;

uniform float time;
uniform vec2 resolution;

float volume(
    vec3 p
){

    float density = 0.0;

    for(
        int i=0;
        i<45;
        i++
    ){

        p =
            abs(p)
            /
            dot(p,p)
            -
            0.72;

        density +=
            exp(
                -8.0 *
                abs(
                    length(p)
                    -
                    0.45
                )
            );

    }

    return density;
}

void main(){

    vec2 uv =
        (
            gl_FragCoord.xy
            -
            resolution*.5
        )
        /
        resolution.y;

    vec3 ray =
        vec3(
            uv,
            -2.0
        );

    float total = 0.0;

    for(
        int i=0;
        i<100;
        i++
    ){

        ray.z += .035;

        total +=
            volume(
                ray +
                vec3(
                    sin(time*.4),
                    cos(time*.3),
                    time*.1
                )
            )
            * .003;

    }

    vec3 color =
        vec3(
            total*2.0,
            total*.5,
            total*3.0
        );

    gl_FragColor =
        vec4(
            color,
            1.0
        );

}

`;


/* SHADER COMPILER */

function createShader(
    type,
    source
){

    const shader =
        gl.createShader(type);

    gl.shaderSource(
        shader,
        source
    );

    gl.compileShader(
        shader
    );

    return shader;
}


const vertexShader =
    createShader(
        gl.VERTEX_SHADER,
        vertexSource
    );

const fragmentShader =
    createShader(
        gl.FRAGMENT_SHADER,
        fragmentSource
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

gl.linkProgram(
    program
);


/* BUFFER */

const buffer =
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
         1, 1
    ]),
    gl.STATIC_DRAW
);


/* STRESS LOOP */

function stressLoop(time){

    if(!stressRunning)
        return;

    gl.useProgram(
        program
    );

    gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffer
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
            "time"
        );

    const resolutionLocation =
        gl.getUniformLocation(
            program,
            "resolution"
        );


    gl.uniform1f(
        timeLocation,
        time*.001
    );

    gl.uniform2f(
        resolutionLocation,
        stressCanvas.width,
        stressCanvas.height
    );


    gl.drawArrays(
        gl.TRIANGLE_STRIP,
        0,
        4
    );


    stressAnimation =
        requestAnimationFrame(
            stressLoop
        );

}


/* =========================================
   START STRESS
========================================= */

document
.getElementById(
    "startStress"
)
.addEventListener(
    "click",
    ()=>{

        if(!gl){

            alert(
                "WebGL is not supported."
            );

            return;

        }

        if(stressRunning)
            return;

        stressRunning =
            true;

        document.body
            .classList
            .add("stress-mode");

        stressLoop(0);

    }
);


/* =========================================
   STOP STRESS
========================================= */

document
.getElementById(
    "stopStress"
)
.addEventListener(
    "click",
    ()=>{

        stressRunning =
            false;

        cancelAnimationFrame(
            stressAnimation
        );

        document.body
            .classList
            .remove(
                "stress-mode"
            );

        if(gl){

            gl.clearColor(
                0,
                0,
                0,
                0
            );

            gl.clear(
                gl.COLOR_BUFFER_BIT
            );

        }

    }
);


/* =========================================
   INITIAL MESSAGE
========================================= */

console.log(
`
╔════════════════════════════════╗
║       ABDUL AHAD SYSTEM        ║
║          SSC 2K27              ║
║                                ║
║ FPS Monitor       : ACTIVE     ║
║ CPU Benchmark     : READY      ║
║ 3D Engine         : ACTIVE     ║
║ Touch Response    : ACTIVE     ║
║ WebGL Stress      : READY      ║
║ Low Power Mode    : READY      ║
╚════════════════════════════════╝
`
);
