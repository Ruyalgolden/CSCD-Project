class puzzle1Ball {
  constructor () {
    this.spawned=true;
    this.currentBall = 0;
    this.respawn();
  }
  respawn() {
    console.log("Ball Spawned!")
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("position", {x:3, y:8.5, z:50});
    this.obj.setAttribute("radius",.5);
    this.obj.setAttribute("dynamic-body","")
    this.currentBall+=1;
    this.obj.setAttribute("id","ball"+this.currentBall)
    scene.append(this.obj)
  }
}