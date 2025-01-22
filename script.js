let scene, camera, gateCloser, monster, ball;
let greenKey = false;
window.onload = function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  camera.components.sound.playSound();
  gateCloser = new GateClose(0, 0, -15)
  ball = new puzzle1Ball();
  monster = new MonsterPathing;
  new platformRotate();
  loop();
}
function loop() {
  if (distance(document.querySelector("#collider"), camera) < 7.5) {
    gateCloser.collided = true;
  }
  if (distance(document.getElementById("ballSpawnPlate"), camera) < 1 && ball.spawned == false) {
    console.log("Ball Spawned!")
    ball.respawn();
    ball.spawned = true;
  }
  if (distance(document.querySelector("#ball"+ball.currentBall),document.querySelector("#deadBall")) < 1 && ball.spawned == true) {
    console.log("Ball can respawn!")
    ball.spawned = false;
  }
  if (distance(document.querySelector("#ball"+ball.currentBall),document.querySelector("#win")) < 1) {
    console.log("Ball in!")
    greenKey = true;
    document.querySelector("#greenKey").setAttribute("opacity",1)
  }
  updateFlashlight()
  gateCloser.close()
  monster.move()
  window.requestAnimationFrame(loop);
}

function updateFlashlight(){
  let flashlight = document.querySelector("#flashlight")
  let angle = camera.object3D.rotation.y + Math.PI;
  let x = 1.5 * Math.sin(angle) + camera.object3D.position.x;
  let z = 1.5 * Math.cos(angle) + camera.object3D.position.z;
  // console.log(z)
  flashlight.setAttribute("position",{x:x,y:1,z:z});
  //Rotate the box instead of the spot light
  flashlight.object3D.rotation.y = angle + Math.PI;
  if (z < 0) {
    flashlight.object3D.rotation.x = (camera.object3D.rotation.x * 1.5);
  } else {
    flashlight.object3D.rotation.x = -(camera.object3D.rotation.x * 1.5);
  }
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}