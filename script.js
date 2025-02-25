let scene, camera, gateCloser, monster, ball, mazeRun;
let greenKey = false;
let hasGreenKey = true;
let hp = 100;
let battery = 100;
let batteryRemove = false;
let batteryOn = true;
let soundplaying = false;
let canTurnOffLight = true;
let mazeComplete = false;
let code = "";
let grayCrystalObtained = false;
window.onload = function () {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  gateCloser = new GateClose(0, 0, -15)
  ball = new puzzle1Ball();
  monster = new MonsterPathing;
  new platformRotate();
  for (let z = 0; z >= -35; z--) {
    new pondRocks(-10 + z, 0, -20)
  }
  for (let z = 1; z < 40; z++) {
    new pondRocks(-10, 0, -20 + z)
    new pondRocks(-45, 0, -20 + z)
  }
  for (let z = 0; z >= -35; z--) {
    new pondRocks(-10 + z, 0, 20)
  }
  console.log(document.querySelector("#greenDoor"))
  document.querySelector("#greenDoor").addEventListener("click", function () {
    if (hasGreenKey) {
      document.querySelector("#greenDoor").setAttribute("position", { x: 0, y: -20, z: 0 });
    }
  })
  document.querySelector("#greenKey").addEventListener("click", function () {
    if (greenKey) {
      hasGreenKey = true;
      document.querySelector("#greenKey").setAttribute("opacity", 0)
    }
  })
  document.querySelector("#redkey").addEventListener("click", function () {
    document.querySelector("#redkey").setAttribute("opacity", 0);
    document.querySelector("#redDoor").setAttribute("position", { x: 0, y: -20, z: 0 });
    mazeComplete = true;
  })
  document.querySelector("#door1").addEventListener("click", function () {
    let door = document.getElementById("door1");
    door.components.sound.playSound();
    code += "1";
  })
  document.querySelector("#door2").addEventListener("click", function () {
    let door = document.getElementById("door2");
    door.components.sound.playSound();
    code += "2";
  })
  document.querySelector("#door3").addEventListener("click", function () {
    let door = document.getElementById("door3");
    door.components.sound.playSound();
    code += "3";
  })
  document.querySelector("#door4").addEventListener("click", function () {
    let door = document.getElementById("door4");
    door.components.sound.playSound();
    code += "4";
  })
  document.querySelector("#door5").addEventListener("click", function () {
    let door = document.getElementById("door5");
    door.components.sound.playSound();
    code += "5";
  })
  document.querySelector("#door6").addEventListener("click", function () {
    let door = document.getElementById("door6");
    door.components.sound.playSound();
    code += "6";
  })
  mazeRun = new mazeScript();
  loop();
}
function loop() {
  if (code.length == 3) {
    if (code == "516" && mazeComplete) {
      code = "";
      grayCrystalObtained = true;
      playGrayCrystal();
    } else {
      hp -= 5;
      code = "";
    }
  }
  if (!soundplaying) {
    setTimeout(function () {
      document.getElementById("monsterSound1").components.sound.playSound();
    }, 2000)
    soundplaying = true;
  }
  if (distance(document.querySelector("#collider"), camera) < 7.5) {
    gateCloser.collided = true;
  }
  if (distance(document.getElementById("ballSpawnPlate"), camera) < 1 && ball.spawned == false) {
    console.log("Ball Spawned!")
    ball.respawn();
    ball.spawned = true;
  }
  if (distance(document.querySelector("#ball" + ball.currentBall), document.querySelector("#deadBall")) < 1 && ball.spawned == true) {
    console.log("Ball can respawn!")
    ball.spawned = false;
  }
  if (distance(document.querySelector("#ball" + ball.currentBall), document.querySelector("#win")) < 1 && !greenKey) {
    console.log("Ball in!")
    greenKey = true;
    document.querySelector("#greenKey").setAttribute("opacity", 1)
  }
  document.querySelector("#hp").setAttribute("value", `HP : ${hp}`)
  window.addEventListener("keydown", function (e) {
    if (e.key == "g") {
      if (canTurnOffLight) {
        if (batteryOn) {
          console.log("Light Turned Off")
          flashlight.setAttribute("light", "type: spot; angle: 45;decay:.75;distance:1")
          batteryOn = !batteryOn;
        } else {
          console.log("Light Turned On")
          flashlight.setAttribute("light", "type: spot; angle: 45;decay:.75;distance:30")
          batteryOn = !batteryOn;
        }
        canTurnOffLight = false;
        setTimeout(function () {
          canTurnOffLight = true
        }, 2000)
      }
    }
  })
  if (battery > 0 && batteryOn) updateFlashlight()
  else if (battery == 0) {
    flashlight.setAttribute("light", "type: spot; angle: 45;decay:.75;distance:1")
  }
  if (hp <= 0) camera.setAttribute("wasd-controls", "enabled:false")
  gateCloser.close()
  monster.move()
  window.requestAnimationFrame(loop);
}

function updateFlashlight() {
  let flashlight = document.querySelector("#flashlight")
  flashlight.setAttribute("light", "type: spot; angle: 45;decay:.75;distance:30")
  let angle = camera.object3D.rotation.y + Math.PI;
  let x = 1.5 * Math.sin(angle) + camera.object3D.position.x;
  let z = 1.5 * Math.cos(angle) + camera.object3D.position.z;
  flashlight.setAttribute("position", { x: x, y: 1, z: z });
  //Rotate the box instead of the spot light
  flashlight.object3D.rotation.y = angle + Math.PI;
  if (z < 0) {
    flashlight.object3D.rotation.x = (camera.object3D.rotation.x * 1.5);
  } else {
    flashlight.object3D.rotation.x = -(camera.object3D.rotation.x * 1.5);
  }
  if (!batteryRemove) {
    batteryRemove = true
    setTimeout(function () {
      if (batteryOn) battery -= 1;
      document.querySelector("#battery").setAttribute("value", `Battery : ${battery}%`)
      batteryRemove = false;
    }, 3000)
  }

}

function distance(obj1, obj2) {
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
  return d;
}
function playGrayCrystal() {
  document.getElementById("camera").setAttribute("active", false);
  document.getElementById("cutsceneCamera").setAttribute("active", true);
  document.getElementById("grayLight").setAttribute("intensity", "1");
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .1);
  }, 100)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .2);
  }, 200)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .3);
  }, 300)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .4);
  }, 400)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .5);
  }, 500)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .6);
  }, 600)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .7);
  }, 700)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .8);
  }, 800)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", .9);
  }, 900)
  setTimeout(function () {
    document.getElementById("grayCrystal").setAttribute("opacity", 1);
  }, 1000)
  setTimeout(function () {
    document.getElementById("camera").setAttribute("active", true);
    document.getElementById("cutsceneCamera").setAttribute("active", false);
  }, 4000)
}