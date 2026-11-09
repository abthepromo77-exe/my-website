/* Copy to Clipboard Helper */
function copyText(text) {
    navigator.clipboard.writeText(text);
    alert('Copied: ' + text);
}

/* Chat Modal Control */
function toggleChat() {
    const chat = document.getElementById('chat-modal');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

/* Dynamic AI Helpline Logic */
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');

    // Add User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg msg-user';
    userMsg.innerText = message;
    chatMessages.appendChild(userMsg);
    input.value = '';

    // Auto AI Bot Answer
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'msg msg-ai';
        
        const q = message.toLowerCase();
        if (q.includes('uid') || q.includes('freefire') || q.includes('ff') || q.includes('id')) {
            aiMsg.innerHTML = "Abdul Ahad-এর Free Fire UID: <b>2139735924</b> (Nickname: ABDUL AHAD)।";
        } else if (q.includes('phone') || q.includes('number') || q.includes('কল') || q.includes('ফোন')) {
            aiMsg.innerHTML = "যোগাযোগের ফোন নম্বর: <b>01944882736</b>।";
        } else if (q.includes('gmail') || q.includes('email') || q.includes('মেইল')) {
            aiMsg.innerHTML = "অফিসিয়াল জিমেইল: <b>abthepromo2.0@gmail.com</b>।";
        } else if (q.includes('instagram') || q.includes('ig')) {
            aiMsg.innerHTML = "Instagram Profile: <b>@ab.the_promo</b>।";
        } else if (q.includes('address') || q.includes('tangail') || q.includes('ঠিকানা')) {
            aiMsg.innerHTML = "ঠিকানা: <b>Tangail, Bangladesh</b> (SSC Batch 2K27)।";
        } else if (q.includes('fps') || q.includes('lag') || q.includes('3d')) {
            aiMsg.innerHTML = "৩ডি ভলিউম শেডার টেস্টের মাধ্যমে আপনার ডিভাইসের GPU পারফরম্যান্স যাচাই করা যায়। Slider বাড়িয়ে লোড বাড়াতে পারেন।";
        } else {
            aiMsg.innerHTML = "ধন্যবাদ মেসেজের জন্য! যেকোনো সহযোগিতার জন্য কল করুন 01944882736 অথবা ইমেইল করুন abthepromo2.0@gmail.com-এ।";
        }

        chatMessages.appendChild(aiMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

/* Three.js 3D Volume Shader Performance Tester */
let scene, camera, renderer, instancedMesh, dummy;
let count = 4000;
let rotSpeed = 0.015;
let lastTime = performance.now();
let frameCount = 0;

function init3D() {
    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 45;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    dummy = new THREE.Object3D();
    createVolumeShaderMesh(count);

    // Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 2, 100);
    pointLight1.position.set(15, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff007f, 2, 100);
    pointLight2.position.set(-15, -20, -20);
    scene.add(pointLight2);

    animate();
}

function createVolumeShaderMesh(total) {
    if (instancedMesh) scene.remove(instancedMesh);

    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 90
    });

    instancedMesh = new THREE.InstancedMesh(geometry, material, total);
    const radius = 20;
    const color = new THREE.Color();

    for (let i = 0; i < total; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * radius;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        dummy.position.set(x, y, z);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        dummy.updateMatrix();

        instancedMesh.setMatrixAt(i, dummy.matrix);

        color.setHSL((x + radius) / (2 * radius), 0.9, 0.5);
        instancedMesh.setColorAt(i, color);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
    scene.add(instancedMesh);
}

function animate() {
    requestAnimationFrame(animate);

    if (instancedMesh) {
        instancedMesh.rotation.y += rotSpeed;
        instancedMesh.rotation.x += rotSpeed * 0.5;
    }

    renderer.render(scene, camera);

    // FPS Diagnostic Counter
    frameCount++;
    const now = performance.now();
    if (now >= lastTime + 500) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const fpsCounter = document.getElementById('fps-counter');
        const stressStatus = document.getElementById('stress-status');

        fpsCounter.innerText = `${fps} FPS`;

        if (fps >= 50) {
            fpsCounter.style.color = '#00ff66';
            stressStatus.innerText = 'Status: Excellent GPU Performance';
        } else if (fps >= 30) {
            fpsCounter.style.color = '#ffb700';
            stressStatus.innerText = 'Status: Moderate Load';
        } else {
            fpsCounter.style.color = '#ff0055';
            stressStatus.innerText = 'Status: Stressed / Lagging';
        }

        frameCount = 0;
        lastTime = now;
    }
}

/* Event Listeners */
document.getElementById('particle-slider').addEventListener('input', (e) => {
    count = parseInt(e.target.value);
    createVolumeShaderMesh(count);
});

document.getElementById('speed-slider').addEventListener('input', (e) => {
    rotSpeed = parseFloat(e.target.value);
});

window.addEventListener('resize', () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

window.onload = init3D;
