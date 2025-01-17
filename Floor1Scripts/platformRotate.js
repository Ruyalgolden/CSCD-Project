class platformRotate {
  constructor() {
    this.platforms = [];
    for (let i = 1; i <= 4; i++) {
      this.platforms.push(document.querySelector("#platBall" + i));
      document.querySelector("#button" + i).addEventListener("click", () => {
        if (distance(camera,document.querySelector("#puzzle1")) < 15) {
          this.rotate(i);
        }
      })
    }
  }
  rotate (platformNum) {
    this.platforms[platformNum-1].setAttribute("rotation", {x:this.platforms[platformNum-1].object3D.rotation.x * (180/Math.PI)+7.5,y:90,z:90})
  }
}