let lineOfSightWidth = 0;
class MonsterPathing {
  constructor() {
    this.nextBlock = 1;
    this.seePlayer = false;
    this.hit = false;
    this.y = 0;
    this.inMain = false;
    this.blocks = [];
    for (let i = 1; i <= 8; i++) {
      this.blocks.push(document.querySelector("#block" + i));
    }
    this.obj = document.createElement("a-entity");
    this.x = 0;
    this.z = 25;
    this.obj.setAttribute("position", { x: 0, y: 0, z: 25 });
    this.obj.setAttribute("scale", { x: 3, y: 3, z: 3 })
    this.obj.setAttribute("gltf-model", "#monster")
    this.obj.setAttribute("animation-mixer", "clip:Walk")
    this.obj.setAttribute("sound", "src:#monsterRoar;loop:false;volume:10")
    let sound1 = document.createElement("a-entity");
    sound1.setAttribute("sound", "src:#monsterMove;loop:true;volume:5")
    sound1.setAttribute("id", "monsterSound1")
    let sound2 = document.createElement("a-entity");
    sound2.setAttribute("sound", "src:#monsterAttack;loop:false;volume:10")
    sound2.setAttribute("id", "monsterAttackSound")
    this.obj.append(sound1)
    this.obj.append(sound2)
    scene.append(this.obj);

    this.lineOfSight = document.createElement("a-box");
    this.lineOfSight.setAttribute("opacity", "0")
    this.lineOfSight.setAttribute("height", 5)
    this.lineOfSight.setAttribute("position", { x: 0, y: 2.5, z: 0 });
    this.lineOfSight.setAttribute("depth", 5)
    this.lineOfSight.x = 0;
    this.lineOfSight.z = 0;
    this.lineOfSight.setAttribute("side", "double")
    this.LoS = 0;
    this.switch = true;
    scene.append(this.lineOfSight);
  }
  move() {
    if (-7.5 < camera.object3D.position.x && camera.object3D.position.x < 12.5 && 22.5 < camera.object3D.position.z && camera.object3D.position.z < 47.5) {
      this.inMain = true;
    } else if (7.5 < camera.object3D.position.x && camera.object3D.position.x < 42.5 && 32.5 < camera.object3D.position.z && camera.object3D.position.z < 37.5) {
      this.inMain = true;
    } else {
      this.inMain = false;
    }
    for (let i = 0; i < this.blocks.length; i++) {
      this.obj.setAttribute("look-at", "#block" + this.nextBlock)
      if (!this.seePlayer) {
        this.hit = false;
        this.obj.setAttribute("animation-mixer", "clip:Walk")
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
          this.switch = true;
        }
        if (this.lineOfSight.object3D.rotation.y < 1 && this.lineOfSight.object3D.rotation.y > -1) {
          if (this.obj.object3D.position.x > this.blocks[this.nextBlock - 1].object3D.position.x) {
            if (this.blocks[this.nextBlock - 1].object3D.position.x < camera.object3D.position.x && camera.object3D.position.x < this.obj.object3D.position.x) {
              if (this.blocks[this.nextBlock - 1].object3D.position.z - 2.5 < camera.object3D.position.z && this.blocks[this.nextBlock - 1].object3D.position.z + 2.5 > camera.object3D.position.z) {
                this.seePlayer = true;
                this.obj.components.sound.playSound();
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          } else if (this.obj.object3D.position.x < this.blocks[this.nextBlock - 1].object3D.position.x) {
            if (this.blocks[this.nextBlock - 1].object3D.position.x > camera.object3D.position.x && camera.object3D.position.x > this.obj.object3D.position.x) {
              if (this.blocks[this.nextBlock - 1].object3D.position.z - 2.5 < camera.object3D.position.z && this.blocks[this.nextBlock - 1].object3D.position.z + 2.5 > camera.object3D.position.z) {
                this.seePlayer = true;
                this.obj.components.sound.playSound();
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          }
        } else {
          if (this.obj.object3D.position.z > this.blocks[this.nextBlock - 1].object3D.position.z) {
            if (this.obj.object3D.position.z > camera.object3D.position.z && camera.object3D.position.z > this.blocks[this.nextBlock - 1].object3D.position.z) {
              if (this.obj.object3D.position.x - 2.5 < camera.object3D.position.x && this.obj.object3D.position.x + 2.5 > camera.object3D.position.x) {
                this.seePlayer = true;
                this.obj.components.sound.playSound();
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          } else if (this.obj.object3D.position.z < this.blocks[this.nextBlock - 1].object3D.position.z) {
            if (this.obj.object3D.position.z < camera.object3D.position.z && camera.object3D.position.z < this.blocks[this.nextBlock - 1].object3D.position.z) {
              if (this.obj.object3D.position.x - 2.5 < camera.object3D.position.x && this.obj.object3D.position.x + 2.5 > camera.object3D.position.x) {
                this.seePlayer = true;
                this.obj.components.sound.playSound();
                this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
              }
            }
          }
        }
        this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
      } else {
        this.blockx = camera.object3D.position.x;
        this.blockz = camera.object3D.position.z;
        if (!this.hit) {
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
          }
          if (distance(camera, this.obj) > parseInt(this.lineOfSight.getAttribute("width")) + 5) {
            this.closestBlock();
          } else if (distance(camera, this.obj) < 3) {
            console.log("hit")
            this.hit = true;
            hp -= 25;
            document.getElementById("monsterAttackSound").components.sound.playSound();
            this.obj.setAttribute("animation-mixer", "clip:Idle")
            setTimeout(() => { this.closestBlock() }, 3000);
          } else if (!this.inMain) {
            this.closestBlock();
          }
          if (distance(camera, this.obj) < parseInt(this.lineOfSight.getAttribute("width"))) {
            this.lineOfSight.setAttribute("width", Math.sqrt(Math.pow(Math.abs(camera.object3D.position.x - this.x), 2) + Math.pow(Math.abs(camera.object3D.position.z - this.z), 2)))
          }
          this.obj.setAttribute("look-at", "#camera")
          this.lineOfSight.setAttribute("position", { x: this.lineOfSight.x, y: 2.5, z: this.lineOfSight.z });
          if (camera.object3D.x < this.x) this.lineOfSight.object3D.rotation.y = -Math.atan2(Math.abs(this.z - camera.object3D.position.z), Math.abs(this.x - camera.object3D.position.x));
          else this.lineOfSight.object3D.rotation.y = Math.atan2(Math.abs(this.z - camera.object3D.position.z), Math.abs(this.x - camera.object3D.position.x));
          this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
        }
      }
    }
  }
  closestBlock() {
    this.obj.setAttribute("look-at", "#camera")
    this.seePlayer = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if (distance(this.obj, this.blocks[i]) < distance(this.obj, this.blocks[this.nextBlock - 1])) {
        this.nextBlock = i + 1;
      }
    }
  }
}