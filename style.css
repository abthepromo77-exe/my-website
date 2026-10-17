/* =========================================================
   ABTHEPROMO ULTRA CSS ENGINE
   ABDUL AHAD • PREMIUM DIGITAL PORTFOLIO
   ========================================================= */

/* =========================
   01. GLOBAL SYSTEM
========================= */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html{
    scroll-behavior:smooth;
    scroll-padding-top:90px;
}

body{
    min-height:100vh;
    overflow-x:hidden;

    font-family:
        Inter,
        Poppins,
        Arial,
        Helvetica,
        sans-serif;

    color:#f5f7ff;

    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(0,238,255,.10),
            transparent 28%
        ),
        radial-gradient(
            circle at 90% 20%,
            rgba(132,80,255,.12),
            transparent 30%
        ),
        radial-gradient(
            circle at 50% 100%,
            rgba(255,0,140,.08),
            transparent 35%
        ),
        #030409;

    line-height:1.6;
}

/* Custom selection */

::selection{
    background:#00eaff;
    color:#020308;
}

/* Scrollbar */

::-webkit-scrollbar{
    width:9px;
}

::-webkit-scrollbar-track{
    background:#030409;
}

::-webkit-scrollbar-thumb{
    background:
        linear-gradient(
            #00eaff,
            #7c3cff,
            #ff2fa3
        );

    border-radius:50px;
}

/* Images */

img{
    max-width:100%;
    display:block;
}

/* Links */

a{
    text-decoration:none;
    color:inherit;
}

/* Buttons */

button,
input,
textarea{
    font-family:inherit;
}


/* =========================
   02. VARIABLES
========================= */

:root{

    --black:#030409;
    --black2:#070912;
    --black3:#0b0f1a;

    --white:#ffffff;
    --text:#f5f7ff;
    --muted:#8e98ad;

    --cyan:#00eaff;
    --blue:#3b82f6;
    --purple:#8b5cf6;
    --violet:#a855f7;
    --pink:#ff2fa3;
    --red:#ff3158;
    --green:#00ff9d;
    --yellow:#ffd83d;

    --glass:
        rgba(255,255,255,.045);

    --glass2:
        rgba(255,255,255,.075);

    --border:
        rgba(255,255,255,.10);

    --border2:
        rgba(0,234,255,.25);

    --shadow:
        0 30px 90px rgba(0,0,0,.45);

    --glow:
        0 0 40px rgba(0,234,255,.20);

    --radius:26px;
}


/* =========================
   03. MAIN BACKGROUND
========================= */

body::before{

    content:"";

    position:fixed;

    inset:0;

    pointer-events:none;

    z-index:-10;

    opacity:.22;

    background-image:

        linear-gradient(
            rgba(255,255,255,.025) 1px,
            transparent 1px
        ),

        linear-gradient(
            90deg,
            rgba(255,255,255,.025) 1px,
            transparent 1px
        );

    background-size:
        55px 55px;

    mask-image:
        linear-gradient(
            to bottom,
            black,
            transparent 90%
        );
}


/* Animated light */

body::after{

    content:"";

    position:fixed;

    width:700px;
    height:700px;

    left:50%;
    top:40%;

    transform:translate(-50%,-50%);

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            rgba(0,234,255,.06),
            transparent 65%
        );

    pointer-events:none;

    z-index:-9;

    animation:
        breathingGlow 8s ease-in-out infinite;
}

@keyframes breathingGlow{

    0%,
    100%{
        transform:
            translate(-50%,-50%)
            scale(1);
    }

    50%{
        transform:
            translate(-50%,-50%)
            scale(1.25);
    }
}


/* =========================
   04. FLOATING ORBS
========================= */

.orb{

    position:fixed;

    border-radius:50%;

    pointer-events:none;

    filter:blur(90px);

    opacity:.13;

    z-index:-5;

    animation:
        orbFloat 12s ease-in-out infinite;
}

.orb.one{

    width:420px;
    height:420px;

    left:-220px;
    top:10%;

    background:var(--cyan);
}

.orb.two{

    width:380px;
    height:380px;

    right:-190px;
    top:40%;

    background:var(--purple);

    animation-delay:-4s;
}

.orb.three{

    width:350px;
    height:350px;

    left:35%;
    bottom:-200px;

    background:var(--pink);

    animation-delay:-8s;
}

@keyframes orbFloat{

    0%,
    100%{
        transform:
            translate3d(0,0,0)
            scale(1);
    }

    50%{
        transform:
            translate3d(0,-60px,0)
            scale(1.15);
    }
}


/* =========================
   05. CONTAINER
========================= */

.container{

    width:min(
        1220px,
        92%
    );

    margin:auto;
}


/* =========================
   06. SECTION
========================= */

section{

    position:relative;

    padding:
        130px
        0;

    overflow:hidden;
}


/* =========================
   07. NAVBAR
========================= */

.navbar{

    position:fixed;

    top:0;
    left:0;

    width:100%;

    z-index:9999;

    padding:18px 0;

    background:
        rgba(3,4,9,.62);

    backdrop-filter:
        blur(25px)
        saturate(160%);

    -webkit-backdrop-filter:
        blur(25px)
        saturate(160%);

    border-bottom:
        1px solid
        rgba(255,255,255,.06);

    transition:.35s ease;
}

.navbar:hover{

    background:
        rgba(3,4,9,.82);

    border-bottom-color:
        rgba(0,234,255,.12);
}

.nav-inner{

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:30px;
}


/* Logo */

.logo{

    position:relative;

    font-size:25px;

    font-weight:950;

    letter-spacing:3px;

    color:white;
}

.logo span{

    background:
        linear-gradient(
            90deg,
            var(--cyan),
            var(--purple),
            var(--pink)
        );

    -webkit-background-clip:text;

    color:transparent;

    text-shadow:none;
}

.logo::after{

    content:"";

    position:absolute;

    width:6px;
    height:6px;

    border-radius:50%;

    right:-12px;
    top:5px;

    background:var(--cyan);

    box-shadow:
        0 0 10px var(--cyan),
        0 0 25px var(--cyan);

    animation:
        blink 1.5s infinite;
}

@keyframes blink{

    0%,
    100%{
        opacity:1;
    }

    50%{
        opacity:.2;
    }
}


/* Navigation */

.nav-links{

    display:flex;

    align-items:center;

    gap:8px;

    list-style:none;
}

.nav-links li{
    position:relative;
}

.nav-links a{

    display:block;

    padding:
        10px
        14px;

    color:#aeb6c9;

    font-size:13px;

    font-weight:600;

    border-radius:10px;

    transition:.3s ease;
}

.nav-links a:hover{

    color:var(--cyan);

    background:
        rgba(0,234,255,.055);

    box-shadow:
        inset 0 0 0 1px
        rgba(0,234,255,.08);

    transform:
        translateY(-2px);
}


/* Mobile menu */

.menu-btn{

    width:45px;
    height:45px;

    display:none;

    align-items:center;
    justify-content:center;

    border:
        1px solid
        var(--border);

    border-radius:13px;

    background:
        rgba(255,255,255,.05);

    color:white;

    cursor:pointer;

    font-size:22px;

    transition:.3s;
}

.menu-btn:hover{

    border-color:var(--cyan);

    color:var(--cyan);

    box-shadow:
        0 0 25px
        rgba(0,234,255,.15);
}


/* =========================
   08. HERO
========================= */

.hero{

    min-height:100vh;

    display:flex;

    align-items:center;

    padding-top:150px;

    position:relative;
}

.hero-grid{

    display:grid;

    grid-template-columns:
        1.15fr
        .85fr;

    align-items:center;

    gap:80px;
}


/* Status badge */

.badge{

    display:inline-flex;

    align-items:center;

    gap:10px;

    padding:
        9px
        15px;

    margin-bottom:25px;

    border:
        1px solid
        rgba(0,234,255,.20);

    border-radius:999px;

    background:
        rgba(0,234,255,.045);

    color:var(--cyan);

    font-size:11px;

    font-weight:800;

    letter-spacing:1.5px;

    box-shadow:
        inset 0 0 20px
        rgba(0,234,255,.025);
}

.dot{

    width:8px;
    height:8px;

    border-radius:50%;

    background:var(--green);

    box-shadow:
        0 0 8px var(--green),
        0 0 20px var(--green);

    animation:
        pulseDot 1.5s infinite;
}

@keyframes pulseDot{

    0%{
        transform:scale(1);
        opacity:1;
    }

    50%{
        transform:scale(1.4);
        opacity:.55;
    }

    100%{
        transform:scale(1);
        opacity:1;
    }
}


/* Hero heading */

.hero h1{

    font-size:
        clamp(
            55px,
            8vw,
            108px
        );

    line-height:.88;

    letter-spacing:
        -6px;

    font-weight:950;

    margin-bottom:30px;
}

.gradient-text{

    background:
        linear-gradient(
            90deg,
            #00eaff 0%,
            #4f8cff 30%,
            #9b5cff 60%,
            #ff2fa3 100%
        );

    background-size:250% auto;

    -webkit-background-clip:text;

    color:transparent;

    animation:
        gradientMove 6s linear infinite;
}

@keyframes gradientMove{

    to{
        background-position:
            250% center;
    }
}

.hero-desc{

    max-width:680px;

    color:var(--muted);

    font-size:18px;

    line-height:1.9;
}

.hero-desc b{

    color:white;
}


/* Hero buttons */

.hero-buttons{

    display:flex;

    align-items:center;

    gap:14px;

    flex-wrap:wrap;

    margin-top:38px;
}

.btn{

    position:relative;

    display:inline-flex;

    align-items:center;

    justify-content:center;

    gap:10px;

    min-height:52px;

    padding:
        0
        23px;

    border:
        1px solid
        var(--border);

    border-radius:14px;

    color:white;

    background:
        rgba(255,255,255,.035);

    font-size:14px;

    font-weight:800;

    overflow:hidden;

    transition:
        transform .35s,
        border-color .35s,
        box-shadow .35s;
}

.btn::before{

    content:"";

    position:absolute;

    inset:0;

    background:
        linear-gradient(
            110deg,
            transparent 25%,
            rgba(255,255,255,.25),
            transparent 75%
        );

    transform:
        translateX(-120%);

    transition:.7s;
}

.btn:hover::before{

    transform:
        translateX(120%);
}

.btn:hover{

    transform:
        translateY(-5px);

    border-color:
        rgba(0,234,255,.35);

    box-shadow:
        0 15px 45px
        rgba(0,0,0,.35);
}

.btn-primary{

    color:#020409;

    border:none;

    background:
        linear-gradient(
            100deg,
            var(--cyan),
            #6f7cff,
            var(--purple)
        );

    box-shadow:
        0 10px 35px
        rgba(0,234,255,.18);
}

.btn-primary:hover{

    color:white;

    box-shadow:
        0 15px 50px
        rgba(0,234,255,.25);
}


/* =========================
   09. HERO CARD
========================= */

.hero-card{

    position:relative;

    min-height:510px;

    display:flex;

    align-items:center;

    justify-content:center;

    border:
        1px solid
        var(--border);

    border-radius:38px;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.08),
            rgba(255,255,255,.018)
        );

    backdrop-filter:
        blur(25px);

    box-shadow:
        var(--shadow);

    overflow:hidden;

    isolation:isolate;
}

.hero-card::before{

    content:"";

    position:absolute;

    width:320px;
    height:320px;

    border-radius:50%;

    background:
        var(--cyan);

    filter:
        blur(110px);

    opacity:.13;

    animation:
        cardGlow 6s ease-in-out infinite;
}

.hero-card::after{

    content:"";

    position:absolute;

    inset:1px;

    border-radius:37px;

    border:
        1px solid
        rgba(255,255,255,.025);

    pointer-events:none;
}

@keyframes cardGlow{

    0%,
    100%{
        transform:scale(1);
    }

    50%{
        transform:scale(1.25);
    }
}


/* Avatar */

.avatar{

    position:relative;

    z-index:5;

    width:225px;
    height:225px;

    display:flex;

    align-items:center;
    justify-content:center;

    border-radius:50%;

    font-size:65px;

    font-weight:950;

    color:var(--cyan);

    background:
        radial-gradient(
            circle,
            rgba(0,234,255,.13),
            rgba(0,0,0,.25)
        );

    border:
        2px solid
        rgba(0,234,255,.65);

    box-shadow:
        0 0 30px
        rgba(0,234,255,.20),

        0 0 100px
        rgba(0,234,255,.10),

        inset 0 0 40px
        rgba(0,234,255,.07);

    animation:
        avatarFloat 5s ease-in-out infinite;
}

@keyframes avatarFloat{

    0%,
    100%{
        transform:translateY(0);
    }

    50%{
        transform:translateY(-15px);
    }
}


/* Floating cards */

.floating{

    position:absolute;

    z-index:10;

    padding:
        12px
        16px;

    border:
        1px solid
        rgba(255,255,255,.11);

    border-radius:13px;

    background:
        rgba(5,7,13,.72);

    backdrop-filter:
        blur(15px);

    color:#dce4f4;

    font-size:12px;

    font-weight:700;

    box-shadow:
        0 15px 40px
        rgba(0,0,0,.25);

    animation:
        floatingCard 5s ease-in-out infinite;
}

.f1{
    top:55px;
    left:30px;
}

.f2{
    top:100px;
    right:30px;
    animation-delay:-1s;
}

.f3{
    bottom:65px;
    left:45px;
    animation-delay:-2s;
}

.f4{
    bottom:45px;
    right:35px;
    animation-delay:-3s;
}

@keyframes floatingCard{

    0%,
    100%{
        transform:
            translateY(0);
    }

    50%{
        transform:
            translateY(-12px);
    }
}


/* =========================
   10. SECTION TITLE
========================= */

.section-title{

    text-align:center;

    max-width:800px;

    margin:
        0 auto
        70px;
}

.section-tag{

    display:inline-block;

    margin-bottom:13px;

    color:var(--cyan);

    font-size:11px;

    font-weight:900;

    letter-spacing:4px;

    text-transform:uppercase;
}

.section-title h2{

    font-size:
        clamp(
            38px,
            5vw,
            68px
        );

    line-height:1;

    letter-spacing:-2px;

    margin-bottom:18px;

    font-weight:950;
}

.section-title p{

    max-width:650px;

    margin:auto;

    color:var(--muted);

    line-height:1.8;
}


/* =========================
   11. CARD SYSTEM
========================= */

.cards{

    display:grid;

    grid-template-columns:
        repeat(3,1fr);

    gap:22px;
}

.card{

    position:relative;

    padding:34px;

    min-height:250px;

    border:
        1px solid
        var(--border);

    border-radius:
        var(--radius);

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.018)
        );

    backdrop-filter:
        blur(18px);

    overflow:hidden;

    transition:
        transform .45s cubic-bezier(.2,.8,.2,1),
        border-color .45s,
        box-shadow .45s;
}

.card::before{

    content:"";

    position:absolute;

    width:180px;
    height:180px;

    top:-120px;
    right:-100px;

    border-radius:50%;

    background:
        var(--cyan);

    filter:blur(80px);

    opacity:0;

    transition:.5s;
}

.card:hover::before{

    opacity:.16;
}

.card:hover{

    transform:
        translateY(-12px);

    border-color:
        rgba(0,234,255,.25);

    box-shadow:
        0 30px 80px
        rgba(0,0,0,.35);
}

.icon{

    width:65px;
    height:65px;

    display:flex;

    align-items:center;
    justify-content:center;

    margin-bottom:25px;

    border-radius:18px;

    background:
        rgba(0,234,255,.055);

    border:
        1px solid
        rgba(0,234,255,.10);

    font-size:29px;

    transition:.4s;
}

.card:hover .icon{

    transform:
        rotate(-5deg)
        scale(1.08);

    border-color:
        rgba(0,234,255,.30);

    box-shadow:
        0 0 30px
        rgba(0,234,255,.12);
}

.card h3{

    font-size:23px;

    margin-bottom:12px;

    position:relative;
}

.card p{

    color:var(--muted);

    line-height:1.8;

    font-size:14px;

    position:relative;
}


/* =========================
   12. ABOUT
========================= */

.about-grid{

    display:grid;

    grid-template-columns:
        .8fr
        1.2fr;

    gap:70px;

    align-items:center;
}

.about-box{

    position:relative;

    min-height:380px;

    display:flex;

    flex-direction:column;

    justify-content:center;

    padding:50px;

    border-radius:35px;

    background:
        linear-gradient(
            145deg,
            rgba(0,234,255,.07),
            rgba(139,92,246,.07)
        );

    border:
        1px solid
        var(--border);

    overflow:hidden;
}

.about-box::before{

    content:"";

    position:absolute;

    width:250px;
    height:250px;

    right:-100px;
    bottom:-120px;

    border-radius:50%;

    background:
        var(--purple);

    filter:blur(90px);

    opacity:.16;
}

.about-big{

    position:relative;

    font-size:100px;

    line-height:1;

    font-weight:950;

    background:
        linear-gradient(
            135deg,
            var(--cyan),
            var(--purple)
        );

    -webkit-background-clip:text;

    color:transparent;

    margin-bottom:15px;
}

.about-box h3{

    position:relative;

    font-size:28px;
}

.about-box p{

    position:relative;

    color:var(--muted);
}

.about-text h2{

    font-size:
        clamp(
            35px,
            4vw,
            55px
        );

    line-height:1.05;

    letter-spacing:-2px;

    margin-bottom:25px;
}

.about-text p{

    color:var(--muted);

    line-height:1.9;

    margin-bottom:18px;
}

.info-list{

    display:grid;

    grid-template-columns:
        repeat(2,1fr);

    gap:14px;

    margin-top:28px;
}

.info{

    padding:18px;

    border:
        1px solid
        var(--border);

    border-radius:15px;

    background:
        rgba(255,255,255,.025);

    transition:.3s;
}

.info:hover{

    transform:
        translateY(-4px);

    border-color:
        rgba(0,234,255,.20);
}

.info small{

    display:block;

    color:#6e778c;

    font-size:10px;

    letter-spacing:1.5px;

    margin-bottom:5px;
}

.info strong{

    font-size:14px;
}


/* =========================
   13. GAMING
========================= */

.gaming-main{

    display:grid;

    grid-template-columns:
        1fr
        1fr;

    gap:24px;
}

.gaming-profile{

    position:relative;

    min-height:330px;

    padding:45px;

    display:flex;

    flex-direction:column;

    justify-content:center;

    border-radius:32px;

    border:
        1px solid
        rgba(255,255,255,.10);

    background:
        radial-gradient(
            circle at 85% 20%,
            rgba(255,70,0,.15),
            transparent 35%
        ),
        linear-gradient(
            145deg,
            rgba(255,70,0,.07),
            rgba(139,92,246,.07)
        );

    overflow:hidden;
}

.gaming-profile::after{

    content:"";

    position:absolute;

    width:350px;
    height:350px;

    right:-200px;
    bottom:-220px;

    border-radius:50%;

    background:
        #ff4800;

    filter:blur(110px);

    opacity:.10;
}

.fire{

    font-size:75px;

    margin-bottom:15px;

    filter:
        drop-shadow(
            0 0 25px
            rgba(255,80,0,.45)
        );

    animation:
        firePulse 2s infinite;
}

@keyframes firePulse{

    0%,
    100%{
        transform:scale(1);
    }

    50%{
        transform:scale(1.08);
    }
}

.gaming-profile h3{

    position:relative;
    z-index:2;

    font-size:40px;

    margin-bottom:10px;
}

.uid{

    position:relative;
    z-index:2;

    color:var(--muted);

    font-size:17px;
}

.uid strong{

    color:var(--cyan);

    letter-spacing:2px;

    text-shadow:
        0 0 20px
        rgba(0,234,255,.25);
}

.stat-grid{

    display:grid;

    grid-template-columns:
        repeat(2,1fr);

    gap:18px;
}

.stat{

    min-height:150px;

    display:flex;

    flex-direction:column;

    justify-content:center;

    padding:28px;

    border:
        1px solid
        var(--border);

    border-radius:22px;

    background:
        var(--glass);

    transition:.35s;
}

.stat:hover{

    transform:
        translateY(-8px);

    border-color:
        rgba(0,234,255,.25);
}

.stat-number{

    font-size:40px;

    font-weight:950;

    color:var(--cyan);

    line-height:1;
}

.stat p{

    color:var(--muted);

    margin-top:9px;

    font-size:13px;
}


/* =========================
   14. AI ZONE
========================= */

.ai-box{

    position:relative;

    padding:
        90px
        50px;

    text-align:center;

    border:
        1px solid
        rgba(139,92,246,.22);

    border-radius:38px;

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(139,92,246,.16),
            transparent 45%
        ),
        rgba(255,255,255,.025);

    overflow:hidden;
}

.ai-box::before{

    content:"";

    position:absolute;

    width:450px;
    height:450px;

    left:50%;
    top:-300px;

    transform:
        translateX(-50%);

    border-radius:50%;

    background:
        var(--purple);

    filter:
        blur(130px);

    opacity:.12;
}

.ai-logo{

    position:relative;

    font-size:80px;

    margin-bottom:20px;

    filter:
        drop-shadow(
            0 0 25px
            rgba(139,92,246,.35)
        );

    animation:
        robotFloat 4s infinite ease-in-out;
}

@keyframes robotFloat{

    0%,
    100%{
        transform:translateY(0)
        rotate(0);
    }

    50%{
        transform:translateY(-10px)
        rotate(2deg);
    }
}

.ai-box h2{

    position:relative;

    font-size:
        clamp(
            40px,
            5vw,
            62px
        );

    margin-bottom:15px;
}

.ai-box p{

    position:relative;

    max-width:720px;

    margin:auto;

    color:var(--muted);

    line-height:1.9;
}


/* =========================
   15. PROJECTS
========================= */

.project{

    min-height:290px;

    display:flex;

    flex-direction:column;

    justify-content:flex-end;
}

.project-number{

    position:absolute;

    top:30px;
    left:32px;

    color:var(--cyan);

    font-size:10px;

    font-weight:900;

    letter-spacing:3px;
}

.project h3{

    font-size:28px;

    margin-bottom:12px;
}


/* =========================
   16. SKILLS
========================= */

.skills{

    width:min(
        900px,
        100%
    );

    margin:auto;
}

.skill{

    margin-bottom:30px;
}

.skill-head{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:10px;

    font-size:14px;

    font-weight:700;
}

.skill-head span:last-child{

    color:var(--cyan);

    font-size:12px;
}

.bar{

    position:relative;

    height:9px;

    border-radius:50px;

    background:
        rgba(255,255,255,.07);

    overflow:hidden;
}

.bar::after{

    content:"";

    position:absolute;

    inset:0;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.06),
            transparent
        );

    transform:
        translateX(-100%);

    animation:
        barShine 3s infinite;
}

@keyframes barShine{

    100%{
        transform:
            translateX(100%);
    }
}

.bar span{

    display:block;

    height:100%;

    width:0;

    border-radius:50px;

    background:
        linear-gradient(
            90deg,
            var(--cyan),
            var(--blue),
            var(--purple)
        );

    box-shadow:
        0 0 15px
        rgba(0,234,255,.25);

    transition:
        width 2s
        cubic-bezier(.2,.8,.2,1);
}


/* =========================
   17. TIMELINE
========================= */

.timeline{

    position:relative;

    max-width:850px;

    margin:auto;
}

.timeline::before{

    content:"";

    position:absolute;

    left:18px;

    top:0;
    bottom:0;

    width:1px;

    background:
        linear-gradient(
            var(--cyan),
            var(--purple),
            transparent
        );
}

.timeline-item{

    position:relative;

    padding-left:65px;

    margin-bottom:55px;
}

.timeline-dot{

    position:absolute;

    left:8px;

    top:5px;

    width:22px;
    height:22px;

    border-radius:50%;

    background:
        var(--cyan);

    border:
        4px solid
        var(--black);

    box-shadow:
        0 0 15px
        var(--cyan),
        0 0 35px
        rgba(0,234,255,.25);
}

.timeline-item h3{

    font-size:23px;

    margin-bottom:8px;
}

.timeline-item p{

    color:var(--muted);

    line-height:1.8;
}


/* =========================
   18. GALLERY
========================= */

.gallery{

    display:grid;

    grid-template-columns:
        repeat(4,1fr);

    gap:16px;
}

.gallery-item{

    position:relative;

    height:230px;

    display:flex;

    align-items:center;

    justify-content:center;

    border:
        1px solid
        var(--border);

    border-radius:22px;

    background:
        linear-gradient(
            135deg,
            rgba(0,234,255,.07),
            rgba(139,92,246,.07)
        );

    overflow:hidden;

    font-size:38px;

    transition:
        transform .45s,
        border-color .45s;
}

.gallery-item::before{

    content:"";

    position:absolute;

    inset:0;

    background:
        radial-gradient(
            circle at center,
            rgba(0,234,255,.12),
            transparent 65%
        );

    opacity:0;

    transition:.4s;
}

.gallery-item:hover::before{

    opacity:1;
}

.gallery-item:hover{

    transform:
        scale(1.035)
        translateY(-6px);

    border-color:
        rgba(0,234,255,.25);
}


/* =========================
   19. ROADMAP
========================= */

.roadmap{

    display:grid;

    grid-template-columns:
        repeat(4,1fr);

    gap:18px;
}

.road{

    position:relative;

    padding:32px;

    min-height:230px;

    border:
        1px solid
        var(--border);

    border-radius:25px;

    background:
        var(--glass);

    overflow:hidden;

    transition:.4s;
}

.road:hover{

    transform:
        translateY(-8px);

    border-color:
        rgba(0,234,255,.25);
}

.road::after{

    content:"";

    position:absolute;

    width:100px;
    height:100px;

    right:-50px;
    bottom:-50px;

    border-radius:50%;

    background:
        var(--purple);

    filter:
        blur(50px);

    opacity:.12;
}

.road span{

    color:var(--cyan);

    font-size:10px;

    font-weight:900;

    letter-spacing:3px;
}

.road h3{

    font-size:24px;

    margin:
        16px
        0
        10px;
}

.road p{

    color:var(--muted);

    line-height:1.7;

    font-size:13px;
}


/* =========================
   20. SOCIAL
========================= */

.social-grid{

    display:grid;

    grid-template-columns:
        repeat(4,1fr);

    gap:18px;
}

.social{

    position:relative;

    padding:30px 20px;

    text-align:center;

    border:
        1px solid
        var(--border);

    border-radius:22px;

    background:
        var(--glass);

    transition:.4s;

    overflow:hidden;
}

.social::before{

    content:"";

    position:absolute;

    left:50%;
    top:0;

    width:80px;
    height:3px;

    transform:
        translateX(-50%);

    background:
        linear-gradient(
            90deg,
            var(--cyan),
            var(--purple)
        );

    opacity:0;

    transition:.4s;
}

.social:hover::before{

    opacity:1;
}

.social:hover{

    transform:
        translateY(-9px);

    border-color:
        rgba(0,234,255,.25);

    box-shadow:
        0 25px 60px
        rgba(0,0,0,.3);
}

.social-icon{

    font-size:35px;

    margin-bottom:13px;

    transition:.4s;
}

.social:hover .social-icon{

    transform:
        scale(1.18)
        rotate(-5deg);
}

.social p{

    color:var(--muted);

    margin-top:6px;

    font-size:12px;
}


/* =========================
   21. CONTACT
========================= */

.contact-box{

    position:relative;

    max-width:950px;

    margin:auto;

    padding:
        80px
        35px;

    text-align:center;

    border:
        1px solid
        var(--border);

    border-radius:38px;

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(0,234,255,.12),
            transparent 48%
        ),
        rgba(255,255,255,.025);

    overflow:hidden;
}

.contact-box::before{

    content:"";

    position:absolute;

    width:500px;
    height:500px;

    left:50%;
    top:-420px;

    transform:
        translateX(-50%);

    border-radius:50%;

    background:
        var(--cyan);

    filter:
        blur(130px);

    opacity:.08;
}

.contact-box > *{

    position:relative;
}

.contact-box h2{

    font-size:
        clamp(
            40px,
            6vw,
            70px
        );

    line-height:1;

    letter-spacing:-3px;

    margin:
        10px
        0
        20px;
}

.contact-box p{

    color:var(--muted);

    margin-bottom:30px;
}


/* =========================
   22. FOOTER
========================= */

footer{

    position:relative;

    padding:
        45px
        0;

    text-align:center;

    border-top:
        1px solid
        rgba(255,255,255,.07);

    background:
        rgba(0,0,0,.18);

    color:#687287;
}

footer strong{

    color:var(--cyan);

    text-shadow:
        0 0 15px
        rgba(0,234,255,.15);
}


/* =========================
   23. REVEAL ANIMATION
========================= */

.reveal{

    opacity:0;

    transform:
        translateY(50px)
        scale(.98);

    filter:
        blur(4px);

    transition:
        opacity .9s ease,
        transform .9s cubic-bezier(.2,.8,.2,1),
        filter .9s ease;
}

.reveal.active{

    opacity:1;

    transform:
        translateY(0)
        scale(1);

    filter:
        blur(0);
}


/* =========================
   24. TOP BUTTON
========================= */

.top-btn{

    position:fixed;

    right:25px;
    bottom:25px;

    width:52px;
    height:52px;

    display:none;

    align-items:center;
    justify-content:center;

    border:
        1px solid
        rgba(0,234,255,.18);

    border-radius:15px;

    background:
        rgba(5,7,13,.82);

    backdrop-filter:
        blur(15px);

    color:var(--cyan);

    cursor:pointer;

    font-size:20px;

    z-index:5000;

    box-shadow:
        0 15px 40px
        rgba(0,0,0,.3);

    transition:.3s;
}

.top-btn:hover{

    transform:
        translateY(-5px);

    border-color:
        var(--cyan);

    box-shadow:
        0 0 30px
        rgba(0,234,255,.15);
}


/* =========================
   25. MOBILE
========================= */

@media(max-width:1000px){

    .hero-grid{

        grid-template-columns:1fr;

        gap:50px;
    }

    .hero-card{

        max-width:700px;

        width:100%;

        margin:auto;
    }

    .about-grid{

        grid-template-columns:1fr;

        gap:40px;
    }

    .gaming-main{

        grid-template-columns:1fr;
    }

    .cards{

        grid-template-columns:
            repeat(2,1fr);
    }

    .roadmap{

        grid-template-columns:
            repeat(2,1fr);
    }

    .social-grid{

        grid-template-columns:
            repeat(2,1fr);
    }

    .gallery{

        grid-template-columns:
            repeat(2,1fr);
    }
}


@media(max-width:760px){

    section{

        padding:
            95px
            0;
    }

    .nav-links{

        position:absolute;

        left:4%;
        right:4%;

        top:78px;

        display:none;

        flex-direction:column;

        align-items:stretch;

        padding:15px;

        border:
            1px solid
            var(--border);

        border-radius:20px;

        background:
            rgba(4,6,11,.97);

        backdrop-filter:
            blur(25px);

        box-shadow:
            0 25px 70px
            rgba(0,0,0,.45);
    }

    .nav-links.show{

        display:flex;
    }

    .nav-links a{

        padding:
            13px
            15px;
    }

    .menu-btn{

        display:flex;
    }

    .hero{

        padding-top:130px;
    }

    .hero h1{

        font-size:
            clamp(
                48px,
                15vw,
                78px
            );

        letter-spacing:
            -4px;
    }

    .hero-desc{

        font-size:15px;
    }

    .hero-card{

        min-height:390px;

        border-radius:28px;
    }

    .avatar{

        width:175px;
        height:175px;

        font-size:50px;
    }

    .floating{

        font-size:10px;

        padding:
            9px
            12px;
    }

    .f1{
        left:15px;
        top:30px;
    }

    .f2{
        right:15px;
        top:70px;
    }

    .f3{
        left:20px;
        bottom:35px;
    }

    .f4{
        right:20px;
        bottom:25px;
    }

    .cards{

        grid-template-columns:1fr;
    }

    .roadmap{

        grid-template-columns:1fr;
    }

    .social-grid{

        grid-template-columns:
            repeat(2,1fr);
    }

    .gallery{

        grid-template-columns:
            repeat(2,1fr);
    }

    .gallery-item{

        height:170px;
    }

    .ai-box{

        padding:
            65px
            20px;
    }

    .contact-box{

        padding:
            65px
            20px;
    }

    .info-list{

        grid-template-columns:1fr;
    }
}


@media(max-width:450px){

    .container{

        width:90%;
    }

    section{

        padding:
            75px
            0;
    }

    .hero-buttons{

        flex-direction:column;

        align-items:stretch;
    }

    .btn{

        width:100%;
    }

    .hero-card{

        min-height:330px;
    }

    .gaming-profile{

        padding:32px 25px;
    }

    .gaming-profile h3{

        font-size:31px;
    }

    .stat-grid{

        grid-template-columns:1fr;
    }

    .social-grid{

        grid-template-columns:1fr;
    }

    .gallery{

        grid-template-columns:1fr;
    }

    .gallery-item{

        height:220px;
    }

    .section-title{

        margin-bottom:45px;
    }

    .section-title h2{

        font-size:38px;
    }

    .about-big{

        font-size:70px;
    }

    .top-btn{

        right:16px;
        bottom:16px;
    }
}


/* =========================
   26. REDUCED MOTION
========================= */

@media(prefers-reduced-motion:reduce){

    *,
    *::before,
    *::after{

        animation-duration:
            .01ms !important;

        animation-iteration-count:
            1 !important;

        scroll-behavior:
            auto !important;

        transition-duration:
            .01ms !important;
    }
}


/* =========================
   27. EXTRA NEON UTILITIES
========================= */

.neon-cyan{

    color:var(--cyan);

    text-shadow:
        0 0 10px
        rgba(0,234,255,.4),

        0 0 30px
        rgba(0,234,255,.15);
}

.neon-purple{

    color:var(--purple);

    text-shadow:
        0 0 10px
        rgba(139,92,246,.4),

        0 0 30px
        rgba(139,92,246,.15);
}

.neon-pink{

    color:var(--pink);

    text-shadow:
        0 0 10px
        rgba(255,47,163,.4),

        0 0 30px
        rgba(255,47,163,.15);
}


/* =========================
   28. EXTRA GLASS
========================= */

.glass{

    background:
        rgba(255,255,255,.04);

    border:
        1px solid
        rgba(255,255,255,.08);

    backdrop-filter:
        blur(20px);

    -webkit-backdrop-filter:
        blur(20px);

    box-shadow:
        0 25px 70px
        rgba(0,0,0,.25);
}


/* =========================
   29. SPECIAL HOVER
========================= */

.glow-hover{

    transition:.4s;
}

.glow-hover:hover{

    box-shadow:
        0 0 0 1px
        rgba(0,234,255,.12),

        0 0 40px
        rgba(0,234,255,.10);
}


/* =========================
   30. END
========================= */
