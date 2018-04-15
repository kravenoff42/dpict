var canvas;
var divCanvas;
const canvasX = 900, canvasY = 700;

var drawing, erasing;

var currentSelectImg = null;
var pixelArr;


var imgArr = [];



function setup() {
    divCanvas = select('#divCanvas');
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent(divCanvas);
    
    background(0);
    // This is by default
    frameRate(60);
    // Setting the pixel density to one for now so it can be the same across devices
    window.pixelDensity(1);
    
    drawing = false;
    erasing = false;

    var printBtn = document.querySelector('#printBtn');
    printBtn.addEventListener('click', printMap, false);

    var saveBtn = document.querySelector('#saveBtn');
    saveBtn.addEventListener('click', saveMap, false);

}

function draw() {
    background(0);
    update();
    //render();
}

function update() {

    if (drawing) {
        //updateCells();
    }
    if (!mouseIsPressed) {
        drawing = false;
    }
}

function mousePressed() {

    var cord = {
        x: 0,
        y: 0
    };
    cord.x = mouseX;
    cord.y = mouseY;
    cord.width = 2;
    cord.height = 2;

    // Only looking for a cell if user clicked within the canvas
    //
    if (cord.x < 0 + width &&
        cord.x > 0 &&
        cord.y < 0 + height &&
        cord.y > 0) {
    }
}

function mouseReleased() {

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
    if (!erasing) {
        document.body.style.cursor = 'crosshair';
        erasing = true;
        drawing = false;
    }
    else {
        document.body.style.cursor = 'auto';
        erasing = false;
    }
}

