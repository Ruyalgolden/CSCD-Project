let Maze = [
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["xxxx----x----xxxxxxxxxxx----"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["----xxxxxxx----xx----xxxxxxx"],
    ["----x-----------x----x------"], // Anything above this is not shown on graph
    ["----x-----------x----x------"],
    ["----x-----------x-$--x------"],
    ["----x-----------x----x------"],
    ["----x----xxxxxxxxbbbbxxx----"],
    ["----p-----------------------"],
    ["----p-----------------------"],
    ["----p-----------------------"],
    ["----p-----------------------"],
    ["xxxxxxxxxxxxxx----xxxxxxxxxx"],
    ["--------x--------------x----"],
    ["----@---x--------------x-!--"],
    ["--------x--------------x----"],
    ["--------x--------------x----"],
    ["ooooxxxxx----xxxxxx----x----"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["--------x------x------------"],
    ["xxxx----x------x-------x----"],
    ["---------------x-------xxxxx"],
    ["---------------x------------"],
    ["---------------x------------"],
    ["---------------x------------"],
    ["xxxxxxxxxxxxxxxxxxxxxxxx----"],
    ["----l-----------------------"],
    ["-#--l-----------------------"],
    ["----l-----------------------"],
    ["----l-----------------------"]];
// ! to open o
// @ to open l
// # to open b
// $ to open p
class mazeScript {
    constructor() {
        let orangeD = 0;
        let blueD = 0;
        let purpleD = 0;
        let lightBlueD = 0;
        Maze = Maze.reverse();
        for (let i = 43; i > 14; i--) {
            // console.log(i-16)
            for (let j = 31.5; j > -7.5; j--) {
                // console.log(Maze[i-16][0].charAt(j+6.5))
                // console.log(j)
                // console.log(Maze[0][0].charAt(0))
                if (Maze[i - 15][0].charAt(j + 6.5) == "x") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", { x: i, y: 5, z: j })
                    wall.setAttribute("color", "brown")
                    wall.setAttribute("src","#bloody")
                    wall.setAttribute("static-body", "")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "b") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", { x: i, y: 5, z: j })
                    wall.setAttribute("color", "blue")
                    wall.setAttribute("id", "mazeBlueDoor" + blueD)
                    wall.setAttribute("static-body", "")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                    blueD += 1;
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "p") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", { x: i, y: 5, z: j })
                    wall.setAttribute("color", "purple")
                    wall.setAttribute("id", "mazePurpleDoor" + purpleD)
                    wall.setAttribute("static-body", "")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                    purpleD += 1;
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "o") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", { x: i, y: 5, z: j })
                    wall.setAttribute("color", "orange")
                    wall.setAttribute("id", "mazeOrangeDoor" + orangeD)
                    wall.setAttribute("static-body", "")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                    orangeD += 1;
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "l") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", { x: i, y: 5, z: j })
                    wall.setAttribute("color", "#add8e6")
                    wall.setAttribute("id", "mazeLightBlueDoor" + lightBlueD)
                    wall.setAttribute("static-body", "")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                    lightBlueD += 1;
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "!") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", { x: i, y: .5, z: j });
                    key.setAttribute("color", "orange");
                    key.setAttribute("clickable", "");
                    key.setAttribute("id", "mazeOrangeButton");
                    scene.append(key);
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "@") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", { x: i, y: .5, z: j });
                    key.setAttribute("color", "#add8e6");
                    key.setAttribute("clickable", "");
                    key.setAttribute("id", "mazeLightBlueButton");
                    scene.append(key);
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "#") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", { x: i, y: .5, z: j });
                    key.setAttribute("color", "blue");
                    key.setAttribute("clickable", "");
                    key.setAttribute("id", "mazeBlueButton");
                    scene.append(key);
                } else if (Maze[i - 15][0].charAt(j + 6.5) == "$") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", { x: i, y: .5, z: j });
                    key.setAttribute("color", "purple");
                    key.setAttribute("clickable", "");
                    key.setAttribute("id", "mazePurpleButton");
                    scene.append(key);
                }
            }
        }
        document.querySelector("#mazeOrangeButton").addEventListener("click", function () {
            if (distance(document.querySelector("#mazeOrangeButton"), camera) < 5) {
                document.querySelector("#mazeOrangeButton").setAttribute("opacity",0);
                for (let i = 0; i < 4; i++) {
                    document.querySelector("#mazeOrangeDoor"+i).setAttribute("height", "0");
                    document.querySelector("#mazeOrangeDoor"+i).setAttribute("opacity", "0");
                    document.querySelector("#mazeOrangeDoor"+i).removeAttribute("static-body");
                    document.querySelector("#mazeOrangeDoor"+i).setAttribute("position", { x: document.querySelector("#mazeOrangeDoor"+i).object3D.position.x, y: 0, z: document.querySelector("#mazeOrangeDoor"+i).object3D.position.z });
                }
            }
        })
        document.querySelector("#mazeLightBlueButton").addEventListener("click", function () {
            if (distance(document.querySelector("#mazeLightBlueButton"), camera) < 5) {
                document.querySelector("#mazeLightBlueButton").setAttribute("opacity",0);
                for (let i = 0; i < 4; i++) {    
                    document.querySelector("#mazeLightBlueDoor"+i).setAttribute("height", "0");
                    document.querySelector("#mazeLightBlueDoor"+i).setAttribute("opacity", "0");
                    document.querySelector("#mazeLightBlueDoor"+i).removeAttribute("static-body");
                    document.querySelector("#mazeLightBlueDoor"+i).setAttribute("position", { x: document.querySelector("#mazeLightBlueDoor"+i).object3D.position.x, y: 0, z: document.querySelector("#mazeLightBlueDoor"+i).object3D.position.z });
                }
            }
        })
        document.querySelector("#mazeBlueButton").addEventListener("click", function () {
            if (distance(document.querySelector("#mazeBlueButton"), camera) < 5) {
                document.querySelector("#mazeBlueButton").setAttribute("opacity",0);
                for (let i = 0; i < 4; i++) {
                    document.querySelector("#mazeBlueDoor"+i).setAttribute("height", "0");
                    document.querySelector("#mazeBlueDoor"+i).setAttribute("opacity", "0");
                    document.querySelector("#mazeBlueDoor"+i).removeAttribute("static-body");
                    document.querySelector("#mazeBlueDoor"+i).setAttribute("position", { x: document.querySelector("#mazeBlueDoor"+i).object3D.position.x, y: 0, z: document.querySelector("#mazeBlueDoor"+i).object3D.position.z });
                }
            }
        })
        document.querySelector("#mazePurpleButton").addEventListener("click", function () {
            if (distance(document.querySelector("#mazePurpleButton"), camera) < 5) {
                document.querySelector("#mazePurpleButton").setAttribute("opacity",0);
                for (let i = 0; i < 4; i++) {
                    document.querySelector("#mazePurpleDoor"+i).setAttribute("height", "0");
                    document.querySelector("#mazePurpleDoor"+i).setAttribute("opacity", "0");
                    document.querySelector("#mazePurpleDoor"+i).removeAttribute("static-body");
                    document.querySelector("#mazePurpleDoor"+i).setAttribute("position", { x: document.querySelector("#mazePurpleDoor"+i).object3D.position.x, y: 0, z: document.querySelector("#mazePurpleDoor"+i).object3D.position.z });
                    document.querySelector("#shedgate").setAttribute("height", "0");
                    document.querySelector("#shedgate").setAttribute("opacity", "0");
                    document.querySelector("#shedgate").removeAttribute("static-body");
                    document.querySelector("#shedgate").setAttribute("position", { x: document.querySelector("#shedgate").object3D.position.x, y: 0, z: document.querySelector("#shedgate").object3D.position.z });
                }
            }
        })
        
    }
}