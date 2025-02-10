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
    constructor () {
        Maze = Maze.reverse();
        for (let i = 43; i > 14; i--) {
            // console.log(i-16)
            for (let j = 31.5; j > -7.5; j--) {
                // console.log(Maze[i-16][0].charAt(j+6.5))
                // console.log(j)
                // console.log(Maze[0][0].charAt(0))
                if (Maze[i-15][0].charAt(j+6.5) == "x") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", {x:i, y:5, z:j})
                    wall.setAttribute("src","#texture")
                    wall.setAttribute("color","brown")
                    wall.setAttribute("static-body","")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i-15][0].charAt(j+6.5) == "b") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", {x:i, y:5, z:j})
                    wall.setAttribute("color","blue")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i-15][0].charAt(j+6.5) == "p") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", {x:i, y:5, z:j})
                    wall.setAttribute("color","purple")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i-15][0].charAt(j+6.5) == "o") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", {x:i, y:5, z:j})
                    wall.setAttribute("color","orange")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i-15][0].charAt(j+6.5) == "l") {
                    let wall = document.createElement("a-box");
                    wall.setAttribute("position", {x:i, y:5, z:j})
                    wall.setAttribute("color","#add8e6")
                    wall.setAttribute("height", 10);
                    scene.append(wall);
                } else if (Maze[i-15][0].charAt(j+6.5) == "#") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", {x:i,y:5,z:j});
                    key.setAttribute("color", "orange");
                } else if (Maze[i-15][0].charAt(j+6.5) == "@") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", {x:i,y:5,z:j});
                    key.setAttribute("color", "#add8e6");
                } else if (Maze[i-15][0].charAt(j+6.5) == "#") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", {x:i,y:5,z:j});
                    key.setAttribute("color", "blue");
                } else if (Maze[i-15][0].charAt(j+6.5) == "$") {
                    let key = document.createElement("a-box");
                    key.setAttribute("position", {x:i,y:5,z:j});
                    key.setAttribute("color", "purple");
                }
            }
        }
    }
}