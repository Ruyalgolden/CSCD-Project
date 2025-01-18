class GateClose {
  constructor (x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = 90;
    this.lx = 90;
    let collider = document.createElement("a-box")
    collider.setAttribute("position", {x:this.x, y:this.y, z:this.z});
    collider.setAttribute("width",15)
    collider.setAttribute("depth", 20)
    collider.setAttribute("opacity", 0)
    collider.setAttribute("id","collider")
    this.collided = false;
    this.playsound = false;
    this.obj = document.createElement("a-entity")
    this.obj.append(collider);
    scene.append(this.obj);
  }
  close() {
    let leftGate = document.getElementById("LeftGate");
    let rightGate = document.getElementById("RightGate");
    if (this.collided) {
      if (this.rx < 180) {
        this.rx = this.rx + 1.5;
        this.lx = this.lx - 1.5;
        leftGate.setAttribute("rotation", {x:0, y:this.lx, z:0})
        rightGate.setAttribute("rotation", {x:0, y:this.rx, z:0})
        this.playSound();
      }
    }
  }
  playSound() {
    if (!this.playsound) {
      let leftGate = document.getElementById("LeftGate");
      // leftGate.components.sound.playSound();
      this.playsound=true;
    }
  }
}
