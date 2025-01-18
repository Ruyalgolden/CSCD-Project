let lineOfSightWidth = 0;
class MonsterPathing {
  constructor() {
    this.nextBlock = 1;
    this.seePlayer = false;
    this.y = 2.5;
    this.blocks = [];
    for (let i = 1; i <= 8; i++) {
      this.blocks.push(document.querySelector("#block" + i));
    }
    this.obj = document.createElement("a-entity");
    this.x = 0;
    this.z = 25;
    this.obj.setAttribute("position", { x: 0, y: 2.5, z: 25 });
    this.obj.setAttribute("height", 5)
    scene.append(this.obj);

    this.lineOfSight = document.createElement("a-box");
    this.lineOfSight.setAttribute("opacity", ".25")
    this.lineOfSight.setAttribute("height", 5)
    this.lineOfSight.setAttribute("position", { x: 0, y: 2.5, z: 0 });
    this.lineOfSight.setAttribute("depth", 5)
    this.lineOfSight.x = 0;
    this.lineOfSight.z = 0;
    this.lineOfSight.setAttribute("side","double")
    this.LoS = 0;
    scene.append(this.lineOfSight);
  }
  move() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (!this.seePlayer) {
        this.blockx = this.blocks[this.nextBlock - 1].object3D.position.x;
        this.blockz = this.blocks[this.nextBlock - 1].object3D.position.z;

        if (distance(this.obj, this.blocks[this.nextBlock - 1]) > 2.5) {
          if (this.x < this.blockx && Math.abs(this.x - this.blockx) > .01) {
            this.x += .01;
            this.lineOfSight.x = this.x + (Math.abs(this.x - this.blockx) / 2);
          } else {
            this.x -= .01;
            this.lineOfSight.x = this.x - (Math.abs(this.x - this.blockx) / 2);
          }
          if (this.z < this.blockz && Math.abs(this.z - this.blockz) > .001) {
            this.z += .01;
            this.lineOfSight.z = this.z + (Math.abs(this.z - this.blockz) / 2);
          } else {
            this.z -= .01;
            this.lineOfSight.z = this.z - (Math.abs(this.z - this.blockz) / 2);
          }
          this.LoS = Math.sqrt(Math.pow(Math.abs(this.blockx - this.x), 2) + Math.pow(Math.abs(this.blockz - this.z), 2));
          this.lineOfSight.setAttribute("width", this.LoS);
          this.lineOfSight.setAttribute("position", { x: this.lineOfSight.x, y: 2.5, z: this.lineOfSight.z });
          this.lineOfSight.object3D.rotation.y = -Math.atan2(Math.abs(this.z - this.blockz), Math.abs(this.x - this.blockx));
        } else {
          this.nextBlock += 1;
          if (this.nextBlock > 8) this.nextBlock = 1;
        }
        if (this.lineOfSight.object3D.rotation.y < 1 && this.lineOfSight.object3D.rotation.y > -1) {
          if (this.obj.object3D.position.x > this.blocks[this.nextBlock - 1].object3D.position.x) {
            if (this.blocks[this.nextBlock - 1].object3D.position.x < camera.object3D.position.x && camera.object3D.position.x < this.obj.object3D.position.x) {
              if (this.blocks[this.nextBlock - 1].object3D.position.z - 2.5 < camera.object3D.position.z && this.blocks[this.nextBlock - 1].object3D.position.z + 2.5 > camera.object3D.position.z) {
                this.seePlayer = true;
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          } else if (this.obj.object3D.position.x < this.blocks[this.nextBlock - 1].object3D.position.x) {
            if (this.blocks[this.nextBlock - 1].object3D.position.x > camera.object3D.position.x && camera.object3D.position.x > this.obj.object3D.position.x) {
              if (this.blocks[this.nextBlock - 1].object3D.position.z - 2.5 < camera.object3D.position.z && this.blocks[this.nextBlock - 1].object3D.position.z + 2.5 > camera.object3D.position.z) {
                this.seePlayer = true;
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          }
        } else {
          if (this.obj.object3D.position.z > this.blocks[this.nextBlock - 1].object3D.position.z) {
            if (this.obj.object3D.position.z > camera.object3D.position.z && camera.object3D.position.z > this.blocks[this.nextBlock - 1].object3D.position.z) {
              if (this.obj.object3D.position.x - 2.5 < camera.object3D.position.x && this.obj.object3D.position.x + 2.5 > camera.object3D.position.x) {
                this.seePlayer = true;
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          } else if (this.obj.object3D.position.z < this.blocks[this.nextBlock - 1].object3D.position.z) {
            if (this.obj.object3D.position.z < camera.object3D.position.z && camera.object3D.position.z < this.blocks[this.nextBlock - 1].object3D.position.z) {
              if (this.obj.object3D.position.x - 2.5 < camera.object3D.position.x && this.obj.object3D.position.x + 2.5 > camera.object3D.position.x) {
                this.seePlayer = true;
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          }
        }
        this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
      } else {
        this.blockx = camera.object3D.position.x;
        this.blockz = camera.object3D.position.z;

        if (distance(this.obj, this.blocks[this.nextBlock - 1]) > 2.5) {
          if (this.x < this.blockx && Math.abs(this.x - this.blockx) > .01) {
            this.x += .0125;
            this.lineOfSight.x = this.x + (Math.abs(this.x - this.blockx) / 2);
          } else {
            this.x -= .0125;
            this.lineOfSight.x = this.x - (Math.abs(this.x - this.blockx) / 2);
          }
          if (this.z < this.blockz && Math.abs(this.z - this.blockz) > .001) {
            this.z += .0125;
            this.lineOfSight.z = this.z + (Math.abs(this.z - this.blockz) / 2);
          } else {
            this.z -= .0125;
            this.lineOfSight.z = this.z - (Math.abs(this.z - this.blockz) / 2);
          }
          if (distance(camera,this.obj) > parseInt(this.lineOfSight.getAttribute("width"))+5) {
            this.closestBlock();
            this.seePlayer = false;
          }
          if (distance(camera,this.obj) < parseInt(this.lineOfSight.getAttribute("width"))) {
            this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
          }
          this.lineOfSight.setAttribute("position", { x: this.lineOfSight.x, y: 2.5, z: this.lineOfSight.z });
          if (camera.object3D.x < this.x) this.lineOfSight.object3D.rotation.y = -Math.atan2(Math.abs(this.z - camera.object3D.position.z), Math.abs(this.x - camera.object3D.position.x));
          else this.lineOfSight.object3D.rotation.y = Math.atan2(Math.abs(this.z - camera.object3D.position.z), Math.abs(this.x - camera.object3D.position.x));
          this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
        }
      }
    }
  }
  closestBlock() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (distance(this.obj, this.blocks[i]) < distance(this.obj, this.blocks[this.nextBlock-1])) {
        this.nextBlock = i+1;
      }
    }
  }
}