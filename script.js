```javascript
const canvas = document.getElementById("shader");
const gl = canvas.getContext("webgl");

const fpsText = document.getElementById("fps");
const frameText = document.getElementById("frame");
const quality = document.getElementById("quality");
const heavyBtn = document.getElementById("heavyBtn");

let scale = .8;
let heavy = false;
let frame = 0;
let lastTime = performance.now();
let fpsFrames = 0;
let fpsTime = performance.now();

let pointerX = 0;
let pointerY = 0;

function resize(){

    canvas.width = innerWidth * scale;
    canvas.height = innerHeight * scale;

    gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

addEventListener("resize",resize);

quality.onchange=()=>{
    scale=parseFloat(quality.value);
    resize();
};

resize();

const vertexShaderSource=`

attribute vec2 position;

void main(){

    gl_Position=vec4(position,0.0,1.0);

}
`;

const fragmentShaderSource=`

precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform float qualityLevel;
uniform float heavyMode;

#define MAX_STEPS 95

float hash(vec3 p){

    p=fract(p*0.3183099+.1);
    p*=17.0;

    return fract(
        p.x*p.y*p.z*(p.x+p.y+p.z)
    );
}

float noise(vec3 p){

    vec3 i=floor(p);
    vec3 f=fract(p);

    f=f*f*(3.0-2.0*f);

    return mix(
        mix(
            mix(hash(i+vec3(0,0,0)),
                hash(i+vec3(1,0,0)),f.x),

            mix(hash(i+vec3(0,1,0)),
                hash(i+vec3(1,1,0)),f.x),

            f.y
        ),

        mix(
            mix(hash(i+vec3(0,0,1)),
                hash(i+vec3(1,0,1)),f.x),

            mix(hash(i+vec3(0,1,1)),
                hash(i+vec3(1,1,1)),f.x),

            f.y
        ),

        f.z
    );
}

float fbm(vec3 p){

    float v=0.0;
    float a=.5;

    for(int i=0;i<5;i++){

        v+=a*noise(p);
        p*=2.03;
        a*=.5;

    }

    return v;
}

void main(){

    vec2 uv=gl_FragCoord.xy/resolution.xy;

    uv=uv*2.0-1.0;

    uv.x*=resolution.x/resolution.y;

    vec3 ro=vec3(0.0,0.0,-4.5);

    vec3 rd=normalize(
        vec3(
            uv,
            1.7
        )
    );

    rd.x+=mouse.x*.18;
    rd.y+=mouse.y*.18;

    float total=0.0;

    vec3 color=vec3(0.0);

    float steps=float(MAX_STEPS);

    for(int i=0;i<95;i++){

        float fi=float(i);

        if(fi>=steps) break;

        vec3 p=ro+rd*(fi*.055);

        float d=length(p);

        float cloud=
            fbm(
                p*1.25+
                vec3(
                    time*.035,
                    -time*.025,
                    time*.02
                )
            );

        float density=
            smoothstep(
                .75,
                .1,
                d
            )*cloud;

        float glow=
            exp(-d*1.7);

        color+=density*
            vec3(
                .18+glow*.25,
                .03+glow*.18,
                .55+glow*.45
            )*.045;

        if(heavyMode>.5){

            color+=
                noise(p*3.0+time)*
                vec3(.0,.08,.13)*
                .018;
        }

        total+=density*.035;

    }

    float center=
        exp(
            -length(uv)*3.0
        );

    color+=vec3(
        .02,
        .10,
        .15
    )*center;

    color+=vec3(
        .08,
        .02,
        .25
    )*pow(center,3.0);

    color*=1.0+total*1.8;

    gl_FragColor=
        vec4(
            color,
            1.0
        );

}
`;

function shader(type,source){

    const s=gl.createShader(type);

    gl.shaderSource(s,source);
    gl.compileShader(s);

    if(!gl.getShaderParameter(
        s,
        gl.COMPILE_STATUS
    )){
        console.error(
            gl.getShaderInfoLog(s)
        );
    }

    return s;
}

const program=gl.createProgram();

gl.attachShader(
    program,
    shader(
        gl.VERTEX_SHADER,
        vertexShaderSource
    )
);

gl.attachShader(
    program,
    shader(
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    )
);

gl.linkProgram(program);
gl.useProgram(program);

const buffer=gl.createBuffer();

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

const position=gl.getAttribLocation(
    program,
    "position"
);

gl.enableVertexAttribArray(position);

gl.vertexAttribPointer(
    position,
    2,
    gl.FLOAT,
    false,
    0,
    0
);

const resolutionLocation=
    gl.getUniformLocation(
        program,
        "resolution"
    );

const timeLocation=
    gl.getUniformLocation(
        program,
        "time"
    );

const mouseLocation=
    gl.getUniformLocation(
        program,
        "mouse"
    );

const heavyLocation=
    gl.getUniformLocation(
        program,
        "heavyMode"
    );

canvas.addEventListener(
    "pointermove",
    e=>{

        pointerX=
            e.clientX/innerWidth*2-1;

        pointerY=
            -(e.clientY/innerHeight*2-1);

    }
);

canvas.addEventListener(
    "touchmove",
    e=>{

        const t=e.touches[0];

        pointerX=
            t.clientX/innerWidth*2-1;

        pointerY=
            -(t.clientY/innerHeight*2-1);

    },
    {passive:true}
);

heavyBtn.onclick=()=>{

    heavy=!heavy;

    heavyBtn.textContent=
        heavy
        ? "🔥 HEAVY GPU MODE: ON"
        : "🔥 HEAVY GPU MODE: OFF";

};

function render(now){

    frame++;

    const seconds=now/1000;

    gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
    );

    gl.uniform1f(
        timeLocation,
        seconds
    );

    gl.uniform2f(
        mouseLocation,
        pointerX,
        pointerY
    );

    gl.uniform1f(
        heavyLocation,
        heavy?1:0
    );

    gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
    );

    fpsFrames++;

    if(now-fpsTime>=500){

        const fps=
            Math.round(
                fpsFrames*1000/
                (now-fpsTime)
            );

        fpsText.textContent=fps;

        frameText.textContent=frame;

        fpsFrames=0;
        fpsTime=now;
    }

    requestAnimationFrame(render);

}

requestAnimationFrame(render);


/* =========================
   AI CHAT
========================= */

const chat=document.getElementById("chat");
const prompt=document.getElementById("prompt");
const send=document.getElementById("send");

function addMessage(text,type){

    const msg=document.createElement("div");

    msg.className=
        "msg "+
        (type==="user"?"user":"bot");

    const icon=
        type==="user"
        ?"👤"
        :"🤖";

    const bubble=
        document.createElement("div");

    bubble.textContent=text;

    const span=
        document.createElement("span");

    span.textContent=icon;

    msg.appendChild(span);
    msg.appendChild(bubble);

    chat.appendChild(msg);

    chat.scrollTop=chat.scrollHeight;
}

async function sendMessage(){

    const text=
        prompt.value.trim();

    if(!text)return;

    addMessage(text,"user");

    prompt.value="";

    addMessage(
        "Thinking... ⏳",
        "bot"
    );

    const loading=
        chat.lastElementChild;

    try{

        const response=
            await fetch(
                "/api/chat",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":
                            "application/json"
                    },
                    body:JSON.stringify({
                        message:text
                    })
                }
            );

        const data=
            await response.json();

        loading.remove();

        if(!response.ok){

            throw new Error(
                data.error ||
                "AI request failed"
            );
        }

        addMessage(
            data.reply,
            "bot"
        );

    }catch(error){

        loading.remove();

        addMessage(
            "❌ AI connection error: "+
            error.message+
            "\n\nCheck that your backend is running.",
            "bot"
        );
    }
}

send.onclick=sendMessage;

prompt.addEventListener(
    "keydown",
    e=>{

        if(
            e.key==="Enter" &&
            !e.shiftKey
        ){

            e.preventDefault();

            sendMessage();

        }

    }
);

function quick(text){

    prompt.value=text;

    sendMessage();

}

function clearChat(){

    chat.innerHTML="";

    addMessage(
        "Chat cleared. Ready again 🚀",
        "bot"
    );

}


/* VOICE */

document.getElementById(
    "voice"
).onclick=()=>{

    const Recognition=
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if(!Recognition){

        alert(
            "Voice recognition is not supported."
        );

        return;
    }

    const recognition=
        new Recognition();

    recognition.lang="bn-BD";

    recognition.start();

    recognition.onresult=e=>{

        prompt.value=
            e.results[0][0].transcript;

    };

};
```9
