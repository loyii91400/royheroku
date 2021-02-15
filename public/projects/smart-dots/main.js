var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var beginSim = false;

map = new Map(WIDTH, HEIGHT, 10);
goal = new Goal();
start = new Start();
wall = new Wall();
dot = new Dot();

updateCanvas = function(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    goal.drawGoal(map.width, map.height, map.gridNum);
    start.drawStart(map.width, map.height, map.gridNum);
    wall.drawWall(map.width, map.height, map.gridNum);
    if(beginSim){
        dot.update(map.grid[`(${dot.x},${dot.y})`],map.width, map.height, map.gridNum);
    }
    map.drawGrid();
}

canvas.addEventListener('mousemove', function(evt) {
    if(goal.drawingGoal){
        mousePos = getMousePos(canvas, evt);
        updateCanvas();
    }
    if(start.drawingStart){
        mousePos = getMousePos(canvas, evt);
        updateCanvas();
    }
    if(wall.drawingWall){
        mousePos = getMousePos(canvas, evt);
        updateCanvas();
    }
}, false);

canvas.addEventListener('mousedown', function(evt) {
    if(goal.drawingGoal){
        const goalPos = goal.getGoal();
        if (map.grid[`(${goalPos.x},${goalPos.y})`] == 0){
            map.updateGrid(`(${goalPos.x},${goalPos.y})`, 1);
            goal.setDrawingGoal(false);
        }
    }
    if(start.drawingStart){
        const startPos = start.getStart();
        if (map.grid[`(${startPos.x},${startPos.y})`] == 0){
            map.updateGrid(`(${startPos.x},${startPos.y})`, 2);
            start.setDrawingStart(false);
        }
    }
    if(wall.drawingWall){
        const wallPos = wall.getWall();
        if (map.grid[`(${wallPos.x},${wallPos.y})`] == 0){
            map.updateGrid(`(${wallPos.x},${wallPos.y})`, 3);
        } else if(map.grid[`(${wallPos.x},${wallPos.y})`] == 3){
            map.updateGrid(`(${wallPos.x},${wallPos.y})`, 0);
        }
    }
},false)

getMousePos = function(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

goalButtonClicked = function(){
    try {
        const goalPos = goal.getGoal();
        map.updateGrid(`(${goalPos.x},${goalPos.y})`, 0);
    } catch (error) {}
    start.setDrawingStart(false);
    wall.setDrawingWall(false);
    mousePos = {x:0,y:0};
    goal.setDrawingGoal(true);
    updateCanvas();
}

wallButtonClicked = function(){
    start.setDrawingStart(false);
    goal.setDrawingGoal(false);
    mousePos = {x:0,y:0};
    if(wall.drawingWall){
        wall.setDrawingWall(false);
    } else {
        wall.setDrawingWall(true);
    }
    updateCanvas();
}

startButtonClicked = function(){
    try {
        const startPos = start.getStart();
        map.updateGrid(`(${startPos.x},${startPos.y})`, 0);
    } catch (error) {}
    goal.setDrawingGoal(false);
    wall.setDrawingWall(false);
    mousePos = {x:0,y:0};
    start.setDrawingStart(true);
    updateCanvas();
}

beginButtonClicked = async function(){
    if(map.isStart()){
        dot = new Dot();
        const startPos = start.getStart();
        dot.startPos(startPos.x,startPos.y);
    }
    beginSim = true;
    while(beginSim){
        if(dot.dead){
            beginSim = false;
        }
        updateCanvas();
        await sleep(1000/5);
    }
}

sleep = function(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}


gridValueChanged = function(value){
    map.setGridValue(value);
    map.createGrid();
    updateCanvas();
}

init = function(){
    updateCanvas();
    map.createGrid();
}

init();
