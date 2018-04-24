var canvas;
var divCanvas;
var printBtn;
var saveBtn;
const canvasX = 900, canvasY = 700;
const toolX = 200;
const borderW = 2;
var brushSize;

var isDrawing, isErasing;

var pixelArr;


var imgArr = [];

var doodle;
var tools;
var brush;

function setup() {
    divCanvas = select('#divCanvas');
    printBtn = document.querySelector('#printBtn');
    saveBtn = document.querySelector('#saveBtn');

    isDrawing = false;
    isErasing = false;
    brushSize = 20;

    canvas = createCanvas(canvasX, canvasY);
    canvas.parent(divCanvas);
    
    // This is by default
    frameRate(90);
    // Setting the pixel density to one for now so it can be the same across devices
    window.pixelDensity(1);
    
    tools = new ToolTray(toolX,canvasY,borderW);
    doodle = new Doodle(canvasX,canvasY,toolX,borderW);
    brush = new Brush(brushSize);
    console.log(brush);
    
    printBtn.addEventListener('click', printMap, false);

    saveBtn.addEventListener('click', saveMap, false);

}

function draw() {
    update();
    render();
}

function update() {
    //console.log('update');
    if (!isDrawing) return;
    if(!doodle.inBounds()) return;
    //console.log('drawing');
    brush.update();
    // if (drawing &&doodle.inBounds()) {
    //     push();
    //     fill(0);
    //     ellipse(mouseX, mouseY,brushSize,brushSize);
    //     pop();
    // }
}

function render(){
    doodle.render();
    tools.render();
}


function mousePressed() {
    brush.lastPos = createVector(mouseX,mouseY);

    isDrawing = true;
    //console.log('drawing true');
    //brush.update();
}

function mouseReleased() {
    isDrawing = false;
        //console.log('drawing false');

}


function printMap() {
    print();
    return false;
}

function saveMap() {
    var gridVis = document.querySelector("#GrdVisOn");
    if (gridVis.classList.contains("hide")) {
        save(canvas, 'myMap.jpg');
    }
    else {
        GRID_LINE_W = 0;
        createGridPoints(gridSize);
        gridCells.update(gridSize, SIZE_PX, GRID_LINE_W);
        gridCells.updateCellsCords(gridX);
        save(canvas, 'myMap.jpg');
        GRID_LINE_W = 2;
        createGridPoints(gridSize);
        gridCells.update(gridSize, SIZE_PX, GRID_LINE_W);
        gridCells.updateCellsCords(gridX);
    }
    return false;
}

function selectEraser() {
    if (!isErasing) {
        document.body.style.cursor = 'crosshair';
        isErasing = true;
        isDrawing = false;
    }
    else {
        document.body.style.cursor = 'auto';
        isErasing = false;
    }
}

