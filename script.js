// Set dynamic year & hide preloader
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', () => {

    const loader = document.getElementById('loader');

    loader.style.opacity = '0';

    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);

});


// Mobile Menu Toggle
const mobileMenuBtn =
    document.getElementById('mobileMenuBtn');

const mobileMenu =
    document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {

    mobileMenu.classList.toggle('hidden');

});


// Clipboard Copy Helper
function copyToClipboard(text) {

    navigator.clipboard.writeText(text)

        .then(() => {

            alert('Copied to clipboard: ' + text);

        })

        .catch(() => {

            const el = document.createElement('textarea');

            el.value = text;

            document.body.appendChild(el);

            el.select();

            document.execCommand('copy');

            document.body.removeChild(el);

            alert('Copied to clipboard: ' + text);

        });

}


// Contact Form Submission
document.getElementById('contactForm').addEventListener(
    'submit',
    (e) => {

        e.preventDefault();

        const feedback =
            document.getElementById('formFeedback');

        feedback.classList.remove('hidden');

        e.target.reset();

        setTimeout(() => {

            feedback.classList.add('hidden');

        }, 4000);

    }
);


// HERO TYPING ANIMATION
const phrases = [
    "AI • Gaming • Graphics • Web",
    "Abdul Ahad — SSC 2K27",
    "Free Fire Gamer & WebGL Dev"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

const typingElem =
    document.getElementById('typingText');


function typeLoop() {

    const currentPhrase =
        phrases[phraseIdx];

    if (isDeleting) {

        typingElem.textContent =
            currentPhrase.substring(0, charIdx--);

    } else {

        typingElem.textContent =
            currentPhrase.substring(0, charIdx++);

    }

    let typeSpeed =
        isDeleting ? 50 : 100;

    if (
        !isDeleting &&
        charIdx === currentPhrase.length + 1
    ) {

        typeSpeed = 2000;
        isDeleting = true;

    }

    else if (
        isDeleting &&
        charIdx === 0
    ) {

        isDeleting = false;

        phraseIdx =
            (phraseIdx + 1) % phrases.length;

        typeSpeed = 500;

    }

    setTimeout(typeLoop, typeSpeed);

}

typeLoop();


// PARTICLE BACKGROUND ENGINE
const pCanvas =
    document.getElementById('particleCanvas');

const pCtx =
    pCanvas.getContext('2d');

let particles = [];


function resizeParticleCanvas() {

    pCanvas.width =
        window.innerWidth;

    pCanvas.height =
        window.innerHeight;

}

window.addEventListener(
    'resize',
    resizeParticleCanvas
);

resizeParticleCanvas();


class Particle {

    constructor() {

        this.x =
            Math.random() *
            pCanvas.width;

        this.y =
            Math.random() *
            pCanvas.height;

        this.size =
            Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.5;

        this.speedY =
            (Math.random() - 0.5) * 0.5;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > pCanvas.width
        ) {

            this.speedX *= -1;

        }

        if (
            this.y < 0 ||
            this.y > pCanvas.height
        ) {

            this.speedY *= -1;

        }

    }


    draw() {

        pCtx.fillStyle =
            'rgba(0,240,255,0.6)';

        pCtx.beginPath();

        pCtx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        pCtx.fill();

    }

}


for (let i = 0; i < 100; i++) {

    particles.push(
        new Particle()
    );

}


function animateParticles() {

    pCtx.clearRect(
        0,
        0,
        pCanvas.width,
        pCanvas.height
    );

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


// =========================================================
// 3D ENGINE
// =========================================================

const canvasContainer =
    document.getElementById('threeCanvas');

let scene;
let camera;
let renderer;
let instancedMesh;

let voxelCount = 5000;
let rotSpeed = 1;

let currentTheme = 'cyber';


const themes = {

    cyber: [
        0x00f0ff,
        0xff007f,
        0x7000ff
    ],

    fire: [
        0xff0000,
        0xff6600,
        0xffff00
    ],

    matrix: [
        0x00ff00,
        0x00cc66,
        0x006600
    ]

};


const dummy =
    new THREE.Object3D();


function init3D() {

    if (!canvasContainer) return;

    scene =
        new THREE.Scene();

    camera =
        new THREE.PerspectiveCamera(
            60,
            canvasContainer.clientWidth /
            canvasContainer.clientHeight,
            0.1,
            1000
        );

    camera.position.z = 55;


    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight
    );

    canvasContainer.appendChild(
        renderer.domElement
    );


    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1
        );

    scene.add(ambient);


    const light =
        new THREE.PointLight(
            0x00f0ff,
            5,
            200
        );

    light.position.set(
        20,
        20,
        30
    );

    scene.add(light);


    buildMeshCluster();


    let isDragging = false;

    let prevMouse = {
        x: 0,
        y: 0
    };


    canvasContainer.addEventListener(
        'mousedown',
        e => {

            isDragging = true;

            prevMouse = {
                x: e.clientX,
                y: e.clientY
            };

        }
    );


    window.addEventListener(
        'mouseup',
        () => {

            isDragging = false;

        }
    );


    canvasContainer.addEventListener(
        'mousemove',
        e => {

            if (!isDragging) return;

            instancedMesh.rotation.y +=
                (e.clientX - prevMouse.x) * 0.005;

            instancedMesh.rotation.x +=
                (e.clientY - prevMouse.y) * 0.005;

            prevMouse = {
                x: e.clientX,
                y: e.clientY
            };

        }
    );


    canvasContainer.addEventListener(
        'touchstart',
        e => {

            if (e.touches.length !== 1) return;

            prevMouse = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

        }
    );


    canvasContainer.addEventListener(
        'touchmove',
        e => {

            if (e.touches.length !== 1) return;

            instancedMesh.rotation.y +=
                (e.touches[0].clientX - prevMouse.x) *
                0.005;

            instancedMesh.rotation.x +=
                (e.touches[0].clientY - prevMouse.y) *
                0.005;

            prevMouse = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

        }
    );


    canvasContainer.addEventListener(
        'wheel',
        e => {

            camera.position.z =
                Math.min(
                    Math.max(
                        camera.position.z +
                        e.deltaY * 0.03,
                        15
                    ),
                    90
                );

        }
    );

}


function buildMeshCluster() {

    if (instancedMesh) {

        scene.remove(
            instancedMesh
        );

        instancedMesh.geometry.dispose();

        instancedMesh.material.dispose();

    }


    const geometry =
        new THREE.BoxGeometry(
            0.8,
            0.8,
            0.8
        );


    const material =
        new THREE.MeshStandardMaterial({
            roughness: 0.2,
            metalness: 0.8
        });


    instancedMesh =
        new THREE.InstancedMesh(
            geometry,
            material,
            voxelCount
        );


    const palette =
        themes[currentTheme];

    const color =
        new THREE.Color();

    const radius = 22;


    for (
        let i = 0;
        i < voxelCount;
        i++
    ) {

        const u =
            Math.random();

        const v =
            Math.random();

        const theta =
            u * 2.0 * Math.PI;

        const phi =
            Math.acos(
                2.0 * v - 1.0
            );

        const r =
            Math.cbrt(
                Math.random()
            ) * radius;


        dummy.position.set(

            r *
            Math.sin(phi) *
            Math.cos(theta),

            r *
            Math.sin(phi) *
            Math.sin(theta),

            r *
            Math.cos(phi)

        );


        dummy.rotation.set(

            Math.random() * Math.PI,

            Math.random() * Math.PI,

            0

        );


        dummy.scale.setScalar(
            0.5 +
            Math.random() * 0.6
        );


        dummy.updateMatrix();


        instancedMesh.setMatrixAt(
            i,
            dummy.matrix
        );


        color.setHex(
            palette[
                Math.floor(
                    Math.random() *
                    palette.length
                )
            ]
        );


        instancedMesh.setColorAt(
            i,
            color
        );

    }


    instancedMesh.instanceMatrix.needsUpdate =
        true;

    if (instancedMesh.instanceColor) {

        instancedMesh.instanceColor.needsUpdate =
            true;

    }


    scene.add(
        instancedMesh
    );

}


// FPS Calculation
let frameCount = 0;
let lastTime = performance.now();
let currentFps = 60;

const fpsDisplay =
    document.getElementById('fpsDisplay');

const ramDisplay =
    document.getElementById('ramDisplay');


// Chart
const ctxGraph =
    document
        .getElementById('fpsChart')
        .getContext('2d');


const fpsChart =
    new Chart(ctxGraph, {

        type: 'line',

        data: {

            labels:
                Array(15).fill(''),

            datasets: [{

                label: 'FPS',

                data:
                    Array(15).fill(60),

                borderColor:
                    '#00f0ff',

                borderWidth: 2,

                fill: false,

                tension: 0.4,

                pointRadius: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                x: {
                    display: false
                },

                y: {

                    min: 0,

                    max: 80,

                    grid: {
                        color:
                            'rgba(255,255,255,0.05)'
                    },

                    ticks: {

                        color: '#888',

                        font: {
                            size: 9
                        }

                    }

                }

            },

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });


function animate3D() {

    requestAnimationFrame(
        animate3D
    );


    if (instancedMesh) {

        instancedMesh.rotation.y +=
            0.002 * rotSpeed;

        instancedMesh.rotation.x +=
            0.001 * rotSpeed;

    }


    renderer.render(
        scene,
        camera
    );


    frameCount++;


    const now =
        performance.now();


    if (
        now >=
        lastTime + 500
    ) {

        currentFps =
            Math.round(
                (
                    frameCount *
                    1000
                ) /
                (
                    now -
                    lastTime
                )
            );


        fpsDisplay.textContent =
            currentFps;


        fpsChart
            .data
            .datasets[0]
            .data
            .shift();


        fpsChart
            .data
            .datasets[0]
            .data
            .push(
                currentFps
            );


        fpsChart.update();


        if (voxelCount > 15000)

            ramDisplay.textContent =
                "High";

        else if (voxelCount > 8000)

            ramDisplay.textContent =
                "Medium";

        else

            ramDisplay.textContent =
                "Low";


        frameCount = 0;

        lastTime = now;

    }

}


// Benchmark Sliders
document
    .getElementById('voxelSlider')
    .addEventListener(
        'input',
        e => {

            voxelCount =
                parseInt(
                    e.target.value
                );

            document
                .getElementById(
                    'voxelCountText'
                )
                .textContent =
                voxelCount.toLocaleString();

            buildMeshCluster();

        }
    );


document
    .getElementById('speedSlider')
    .addEventListener(
        'input',
        e => {

            rotSpeed =
                parseFloat(
                    e.target.value
                );

            document
                .getElementById(
                    'speedText'
                )
                .textContent =
                rotSpeed + 'x';

        }
    );


document
    .querySelectorAll('.themeBtn')
    .forEach(btn => {

        btn.addEventListener(
            'click',
            e => {

                document
                    .querySelectorAll('.themeBtn')
                    .forEach(
                        b =>
                            b.classList.replace(
                                'border-cyan-400',
                                'border-transparent'
                            )
                    );

                e.target.classList.replace(
                    'border-transparent',
                    'border-cyan-400'
                );

                currentTheme =
                    e.target.getAttribute(
                        'data-theme'
                    );

                buildMeshCluster();

            }
        );

    });


window.addEventListener(
    'resize',
    () => {

        if (
            !canvasContainer ||
            !renderer ||
            !camera
        ) return;

        camera.aspect =
            canvasContainer.clientWidth /
            canvasContainer.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            canvasContainer.clientWidth,
            canvasContainer.clientHeight
        );

    }
);


init3D();
animate3D();


// =========================================================
// AI CHATBOT ENGINE
// =========================================================

const aiForm =
    document.getElementById(
        'aiChatForm'
    );

const aiInput =
    document.getElementById(
        'aiInput'
    );

const aiBox =
    document.getElementById(
        'aiChatBox'
    );

let voiceEnabled = false;


document
    .getElementById('voiceToggle')
    .addEventListener(
        'click',
        () => {

            voiceEnabled =
                !voiceEnabled;

            document
                .getElementById(
                    'voiceStatus'
                )
                .textContent =
                voiceEnabled
                    ? "ON"
                    : "OFF";

        }
    );


function speakText(text) {

    if (
        !voiceEnabled ||
        !('speechSynthesis' in window)
    ) return;


    window.speechSynthesis.cancel();


    const cleanText =
        text.replace(
            /<[^>]*>?/gm,
            ''
        );


    const utterance =
        new SpeechSynthesisUtterance(
            cleanText
        );


    utterance.rate = 1.0;


    window.speechSynthesis.speak(
        utterance
    );

}


function getBotResponse(msg) {

    const query =
        msg.toLowerCase();


    if (
        query.includes('uid') ||
        query.includes('freefire') ||
        query.includes('ff')
    ) {

        return "Abdul Ahad's Free Fire UID is <strong>2139735924</strong> (In-game Nickname: ABDUL AHAD).";

    }


    else if (
        query.includes('location') ||
        query.includes('address') ||
        query.includes('tangail')
    ) {

        return "ab the promo is located in <strong>Tangail, Bangladesh</strong>.";

    }


    else if (
        query.includes('contact') ||
        query.includes('phone') ||
        query.includes('call') ||
        query.includes('number')
    ) {

        return "You can call or WhatsApp Abdul Ahad directly at <strong>01944882736</strong> or email <strong>abthepromo2.0@gmail.com</strong>.";

    }


    else if (
        query.includes('fps') ||
        query.includes('lag') ||
        query.includes('boost')
    ) {

        return "To boost game FPS: Close unused background apps, lower graphic settings, keep your device cool, and run our Performance Lab test above to benchmark your GPU capacity.";

    }


    else if (
        query.includes('instagram') ||
        query.includes('social')
    ) {

        return "Follow official Instagram: <a href='https://instagram.com/ab.the_promo' target='_blank' class='text-pink-400 underline'>@ab.the_promo</a>.";

    }


    else {

        return "Thank you for reaching out! For direct queries, call 01944882736 or DM on Instagram @ab.the_promo.";

    }

}


function appendMessage(sender, text) {

    const div =
        document.createElement('div');


    div.className =
        sender === 'user'
            ? 'flex justify-end'
            : 'flex gap-3';


    if (sender === 'user') {

        div.innerHTML = `
            <div class="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%]">
                ${text}
            </div>
        `;

    }

    else {

        div.innerHTML = `

            <div class="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex-shrink-0 flex items-center justify-center text-xs">

                <i class="fa-solid fa-robot"></i>

            </div>

            <div class="bg-slate-900/90 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] text-gray-200 leading-relaxed">

                ${text}

            </div>

        `;

    }


    aiBox.appendChild(div);

    aiBox.scrollTop =
        aiBox.scrollHeight;

}


aiForm.addEventListener(
    'submit',
    e => {

        e.preventDefault();

        const text =
            aiInput.value.trim();

        if (!text) return;

        appendMessage(
            'user',
            text
        );

        aiInput.value = '';


        setTimeout(
            () => {

                const reply =
                    getBotResponse(text);

                appendMessage(
                    'bot',
                    reply
                );

                speakText(
                    reply
                );

            },
            500
        );

    }
);


document
    .querySelectorAll('.quick-prompt')
    .forEach(btn => {

        btn.addEventListener(
            'click',
            () => {

                const promptText =
                    btn.textContent
                        .trim()
                        .replace(
                            /^[^a-zA-Z0-9]+/,
                            ''
                        );

                aiInput.value =
                    promptText;

                aiForm.dispatchEvent(
                    new Event('submit')
                );

            }
        );

    });
