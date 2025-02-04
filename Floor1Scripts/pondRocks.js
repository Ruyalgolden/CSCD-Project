class pondRocks {
    constructor(x,y,z) {
        this.obj = document.createElement("a-dodecahedron");
        this.x = x;
        this.y = y;
        this.z = z;
        this.obj.setAttribute("position",{x:this.x,y:this.y,z:this.z})
        this.obj.setAttribute("color", "gray")
        scene.append(this.obj);
    }
}