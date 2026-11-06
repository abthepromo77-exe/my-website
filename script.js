/* =========================================
   AB THE PROMO
   TANGAIL 3D BATTLE ROYALE
========================================= */

const game = document.getElementById("game");

let scene;
let camera;
let renderer;
let player;

let bots = [];
let bullets = [];
let walls = [];

let running = false;
let currentGun = "MP40";

let hp = 100;
let kills = 0;
let ammo = 30;

let zoneRadius = 100;
let zoneTimer = 120;

let keys = {};

let lastTime = performance.now();
let frameCounter = 0;
let fps = 0;

const guns = {

  MP40:{
    damage:12,
    speed:.8,
    ammo:30,
    color:0xff4444
  },

  UMP:{
    damage:16,
    speed:1,
    ammo:30,
    color:0x44aaff
  },

  AWM:{
    damage:100,
    speed:1.8,
    ammo:5,
    color:0xffffff
  },

  M82B:{
    damage:130,
    speed:2,
    ammo:5,
    color:0xffcc44
  }

};


/* =========================================
   START GAME
========================================= */

document.getElementById("startGame")
.addEventListener("click",()=>{

  document.getElementById("lobby").style.display="none";

  init();

  setTimeout(()=>{
    document.getElementById("loading").style.display="none";
  },700);

});


/* =========================================
   THREE.JS
========================================= */

function init(){

  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x07101b);

  scene.fog = new THREE.Fog(
    0x07101b,
    50,
    500
  );


  camera = new THREE.PerspectiveCamera(
    70,
    innerWidth / innerHeight,
    .1,
    1000
  );

  camera.position.set(
    0,
    7,
    12
  );


  renderer = new THREE.WebGLRenderer({
    antialias:true,
    powerPreference:"high-performance"
  });

  renderer.setSize(
    innerWidth,
    innerHeight
  );

  renderer.setPixelRatio(
    Math.min(devicePixelRatio,1.5)
  );

  game.appendChild(
    renderer.domElement
  );


  /* LIGHT */

  const ambient =
    new THREE.HemisphereLight(
      0x9fc9ff,
      0x101020,
      1.2
    );

  scene.add(ambient);


  const sun =
    new THREE.DirectionalLight(
      0xffffff,
      1.5
    );

  sun.position.set(
    100,
    150,
    80
  );

  scene.add(sun);


  createMap();

  createPlayer();

  createBots(10);

  createZone();

  running=true;

  animate();

  startZone();

}


/* =========================================
   MAP
========================================= */

function createMap(){

  const groundGeo =
    new THREE.PlaneGeometry(
      500,
      500
    );

  const groundMat =
    new THREE.MeshStandardMaterial({
      color:0x1d432b,
      roughness:1
    });

  const ground =
    new THREE.Mesh(
      groundGeo,
      groundMat
    );

  ground.rotation.x=-Math.PI/2;

  scene.add(ground);


  /* ROADS */

  for(let i=-3;i<=3;i++){

    const roadGeo =
      new THREE.BoxGeometry(
        500,
        .08,
        7
      );

    const roadMat =
      new THREE.MeshStandardMaterial({
        color:0x292929
      });

    const road =
      new THREE.Mesh(
        roadGeo,
        roadMat
      );

    road.position.z=i*45;

    scene.add(road);
  }


  /* HOUSES */

  for(let i=0;i<70;i++){

    const x =
      (Math.random()-.5)*420;

    const z =
      (Math.random()-.5)*420;

    if(
      Math.abs(x)<30 &&
      Math.abs(z)<30
    ) continue;

    createHouse(x,z);
  }


  /* TREES */

  for(let i=0;i<150;i++){

    const x =
      (Math.random()-.5)*460;

    const z =
      (Math.random()-.5)*460;

    createTree(x,z);
  }

}


/* =========================================
   HOUSE
========================================= */

function createHouse(x,z){

  const group =
    new THREE.Group();


  const body =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        9,
        6,
        8
      ),
      new THREE.MeshStandardMaterial({
        color:
          new THREE.Color()
          .setHSL(
            Math.random(),
            .35,
            .35
          )
      })
    );

  body.position.y=3;

  group.add(body);


  const roof =
    new THREE.Mesh(
      new THREE.ConeGeometry(
        7,
        3,
        4
      ),
      new THREE.MeshStandardMaterial({
        color:0x4a2020
      })
    );

  roof.position.y=7;

  roof.rotation.y=Math.PI/4;

  group.add(roof);

  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);

}


/* =========================================
   TREE
========================================= */

function createTree(x,z){

  const tree =
    new THREE.Group();


  const trunk =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        .7,
        1,
        5,
        8
      ),
      new THREE.MeshStandardMaterial({
        color:0x704020
      })
    );

  trunk.position.y=2.5;

  tree.add(trunk);


  const crown =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        3.5,
        8,
        8
      ),
      new THREE.MeshStandardMaterial({
        color:0x126b36
      })
    );

  crown.position.y=6;

  tree.add(crown);


  tree.position.set(
    x,
    0,
    z
  );

  scene.add(tree);

}


/* =========================================
   PLAYER
========================================= */

function createPlayer(){

  player =
    new THREE.Group();


  const body =
    new THREE.Mesh(
      new THREE.CapsuleGeometry(
        1,
        2,
        5,
        8
      ),
      new THREE.MeshStandardMaterial({
        color:0x00aaff
      })
    );

  body.position.y=2;

  player.add(body);


  const head =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .75,
        12,
        12
      ),
      new THREE.MeshStandardMaterial({
        color:0xffc59c
      })
    );

  head.position.y=4;

  player.add(head);


  player.position.set(
    0,
    0,
    0
  );

  scene.add(player);

}


/* =========================================
   BOTS
========================================= */

function createBots(count){

  for(let i=0;i<count;i++){

    const bot =
      new THREE.Group();


    const body =
      new THREE.Mesh(
        new THREE.CapsuleGeometry(
          1,
          2,
          5,
          8
        ),
        new THREE.MeshStandardMaterial({
          color:0xff3344
        })
      );

    body.position.y=2;

    bot.add(body);


    const head =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          .7,
          10,
          10
        ),
        new THREE.MeshStandardMaterial({
          color:0xffb08a
        })
      );

    head.position.y=4;

    bot.add(head);


    bot.position.set(
      (Math.random()-.5)*180,
      0,
      (Math.random()-.5)*180
    );

    bot.userData.hp=100;
    bot.userData.speed=.015+Math.random()*.02;
    bot.userData.nextShot=Date.now()+2000;

    scene.add(bot);

    bots.push(bot);

  }

}


/* =========================================
   ZONE
========================================= */

function createZone(){

  const geometry =
    new THREE.RingGeometry(
      zoneRadius-1,
      zoneRadius,
      96
    );

  const material =
    new THREE.MeshBasicMaterial({
      color:0xff1744,
      transparent:true,
      opacity:.8,
      side:THREE.DoubleSide
    });

  const ring =
    new THREE.Mesh(
      geometry,
      material
    );

  ring.rotation.x=-Math.PI/2;

  ring.position.y=.1;

  ring.name="ZONE";

  scene.add(ring);

}


function startZone(){

  setInterval(()=>{

    if(!running) return;

    zoneTimer--;

    document.getElementById(
      "zoneTimer"
    ).textContent=zoneTimer;

    if(zoneTimer<=0){

      zoneRadius=Math.max(
        15,
        zoneRadius-10
      );

      zoneTimer=60;

      const zone =
        scene.getObjectByName("ZONE");

      if(zone){

        zone.scale.set(
          zoneRadius/100,
          zoneRadius/100,
          zoneRadius/100
        );

      }

    }

    const distance =
      Math.sqrt(
        player.position.x**2+
        player.position.z**2
      );

    if(distance>zoneRadius){

      hp-=1;

      updateHUD();

      if(hp<=0){
        endGame();
      }

    }

  },1000);

}


/* =========================================
   WEAPONS
========================================= */

document
.querySelectorAll("[data-gun]")
.forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      currentGun =
        button.dataset.gun;

      ammo =
        guns[currentGun].ammo;

      document.getElementById(
        "weaponName"
      ).textContent=currentGun;

      updateHUD();

    }
  );

});


/* =========================================
   SHOOT
========================================= */

document
.getElementById("shootBtn")
.addEventListener(
  "click",
  shoot
);


function shoot(){

  if(!running) return;

  if(ammo<=0){

    ammo=guns[currentGun].ammo;

  }

  ammo--;

  updateHUD();


  const direction =
    new THREE.Vector3(
      0,
      0,
      -1
    );

  direction.applyQuaternion(
    camera.quaternion
  );


  const bullet =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .12,
        6,
        6
      ),
      new THREE.MeshBasicMaterial({
        color:
          guns[currentGun].color
      })
    );


  bullet.position.copy(
    camera.position
  );

  bullet.userData.direction =
    direction;

  bullet.userData.life=100;

  scene.add(bullet);

  bullets.push(bullet);

}


/* =========================================
   GLOO WALL
========================================= */

document
.getElementById("wallBtn")
.addEventListener(
  "click",
  createWall
);


function createWall(){

  const wall =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        6,
        4,
        .5
      ),
      new THREE.MeshStandardMaterial({
        color:0x55ccff,
        transparent:true,
        opacity:.65
      })
    );


  wall.position.copy(
    player.position
  );

  wall.position.z-=5;

  scene.add(wall);

  walls.push(wall);

}


/* =========================================
   CAR
========================================= */

let car=null;

document
.getElementById("carBtn")
.addEventListener(
  "click",
  ()=>{

    if(car){

      player.position.copy(
        car.position
      );

      return;

    }

    car =
      new THREE.Group();


    const body =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          5,
          1.5,
          8
        ),
        new THREE.MeshStandardMaterial({
          color:0xff1744,
          metalness:.4,
          roughness:.3
        })
      );

    body.position.y=1.5;

    car.add(body);


    const cabin =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          3.5,
          1.5,
          3
        ),
        new THREE.MeshStandardMaterial({
          color:0x111827,
          transparent:true,
          opacity:.8
        })
      );

    cabin.position.y=2.8;

    car.add(cabin);


    car.position.copy(
      player.position
    );

    car.position.z-=8;

    scene.add(car);

  }
);


/* =========================================
   SCOPE
========================================= */

let scoped=false;

document
.getElementById("scopeBtn")
.addEventListener(
  "click",
  ()=>{

    scoped=!scoped;

    document.getElementById(
      "scopeBtn"
    ).textContent=
      scoped?"ON":"OFF";

    camera.fov=
      scoped?25:70;

    camera.updateProjectionMatrix();

  }
);


/* =========================================
   MOVEMENT
========================================= */

window.addEventListener(
  "keydown",
  e=>{
    keys[e.key.toLowerCase()]=true;
  }
);

window.addEventListener(
  "keyup",
  e=>{
    keys[e.key.toLowerCase()]=false;
  }
);


function movePlayer(delta){

  if(!player) return;

  const speed =
    18*delta;

  if(keys["w"] || keys["arrowup"])
    player.position.z-=speed;

  if(keys["s"] || keys["arrowdown"])
    player.position.z+=speed;

  if(keys["a"] || keys["arrowleft"])
    player.position.x-=speed;

  if(keys["d"] || keys["arrowright"])
    player.position.x+=speed;


  camera.position.x =
    player.position.x;

  camera.position.z =
    player.position.z+12;

  camera.lookAt(
    player.position.x,
    2,
    player.position.z
  );

}


/* =========================================
   BULLETS
========================================= */

function updateBullets(){

  for(let i=bullets.length-1;i>=0;i--){

    const bullet=bullets[i];

    bullet.position.add(
      bullet.userData.direction
      .clone()
      .multiplyScalar(.8)
    );

    bullet.userData.life--;

    for(let j=bots.length-1;j>=0;j--){

      const bot=bots[j];

      if(
        bullet.position.distanceTo(
          bot.position
        )<2.5
      ){

        bot.userData.hp -=
          guns[currentGun].damage;

        bullet.userData.life=0;

        if(bot.userData.hp<=0){

          scene.remove(bot);

          bots.splice(j,1);

          kills++;

          document.getElementById(
            "kills"
          ).textContent=kills;

          document.getElementById(
            "alive"
          ).textContent=
            bots.length+1;

        }

        break;

      }

    }


    if(bullet.userData.life<=0){

      scene.remove(bullet);

      bullets.splice(i,1);

    }

  }

}


/* =========================================
   BOT AI
========================================= */

function updateBots(){

  bots.forEach(bot=>{

    const distance =
      bot.position.distanceTo(
        player.position
      );


    if(distance<80){

      bot.lookAt(
        player.position.x,
        2,
        player.position.z
      );

      bot.translateZ(
        bot.userData.speed
      );


      if(
        Date.now()>
        bot.userData.nextShot
      ){

        if(distance<35){

          hp-=5;

          updateHUD();

          bot.userData.nextShot =
            Date.now()+1500;

          if(hp<=0){
            endGame();
          }

        }

      }

    }else{

      bot.rotation.y += .01;

      bot.translateZ(
        bot.userData.speed
      );

    }

  });

}


/* =========================================
   HUD
========================================= */

function updateHUD(){

  document.getElementById(
    "hp"
  ).textContent=Math.max(0,hp);

  document.getElementById(
    "ammo"
  ).textContent=ammo;

}


/* =========================================
   FPS
========================================= */

function updateFPS(){

  frameCounter++;

  const now=performance.now();

  if(now-lastTime>=1000){

    fps=frameCounter;

    frameCounter=0;

    lastTime=now;

    document.getElementById(
      "fps"
    ).textContent=fps;

  }

}


/* =========================================
   MAIN LOOP
========================================= */

function animate(){

  if(!running) return;

  requestAnimationFrame(
    animate
  );

  const now =
    performance.now();

  const delta =
    Math.min(
      (now-lastTime)/1000,
      .05
    );

  movePlayer(delta);

  updateBullets();

  updateBots();

  updateFPS();

  renderer.render(
    scene,
    camera
  );

}


/* =========================================
   GAME OVER
========================================= */

function endGame(){

  running=false;

  document.getElementById(
    "finalKills"
  ).textContent=kills;

  document.getElementById(
    "gameOver"
  ).style.display="flex";

}


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
  "resize",
  ()=>{

    if(!camera || !renderer)
      return;

    camera.aspect =
      innerWidth/innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);
