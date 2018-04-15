var canvas;
var divCanvas;

var currentSelectImg = null;
var pixelArr;


var imgArr = [];



function setup() {
    divCanvas = select('#divCanvas');
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent(divCanvas);

    // This is by default
    frameRate(60);
    // Setting the pixel density to one for now so it can be the same across devices
    window.pixelDensity(1);

    var printBtn = document.querySelector('#printBtn');
    printBtn.addEventListener('click', printMap, false);

    var saveBtn = document.querySelector('#saveBtn');
    saveBtn.addEventListener('click', saveMap, false);

}
/**
 * Build html image elements of the avaible images for a particular layer/category
 * @function buildCollByLayer
 */
function buildCollByLayer(layer) {
    //
    // Found places where they mentioned that this
    //   collectionArea.innerHTML = '';
    // could potentially be slower and that this is faster
    //   while (collectionArea.firstChild) {
    //      collectionArea.removeChild(collectionArea.firstChild);
    //   }
    //
    //
    collectionArea.innerHTML = '';
    gridGraph.resizeCanvas(SIZE_PX, SIZE_PX);
    for (var x = 0; x < imgData.coll.length; x++) {
        if (imgData.coll[x].layer === layer) {
            //cretae div
            var tempDivEle = document.createElement('div');
            tempDivEle.classList.add('tile-item');
            //create inner div
            var tempCardEle = document.createElement('div');
            tempCardEle.classList.add('item-inner');
            //create img
            var tempImgEle = document.createElement('img');
            tempImgEle.classList.add('card-img-top');
            tempImgEle.classList.add('mapMkrColItem');
            tempImgEle.height = SIZE_PX;
            tempImgEle.width = SIZE_PX;
            tempImgEle.id = 'imgIdx-' + x;
            tempImgEle.setAttribute('title', imgData.coll[x].name);

            //insert img src
            gridGraph.image(imgArr[imgData.coll[x].src],
                0, 0,
                SIZE_PX, SIZE_PX,
                imgData.coll[x].x, imgData.coll[x].y,
                imgData.coll[x].width, imgData.coll[x].height);
            //add url to src attr
            tempImgEle.src = gridGraph.elt.toDataURL();

            // var style = "background-position: -"+imgData.coll[x].x+"px -"+imgData.coll[x].y+"px;";
            // tempImgEle.style = style;

            //add event
            tempImgEle.addEventListener('click', collItemSelected);
            //create label
            var tempLblEle = document.createElement('h5');
            tempLblEle.classList.add('card-title');
            var lblText = imgData.coll[x].name;
            tempLblEle.innerHTML = lblText;

            //insert img and label into inner div
            tempCardEle.appendChild(tempImgEle);
            tempCardEle.appendChild(tempLblEle);

            //add inner div to outer div
            tempDivEle.appendChild(tempCardEle);

            //add each div to collection
            collectionArea.appendChild(tempDivEle);
            gridGraph.clear();
        }
    }
    gridGraph.resizeCanvas(canvas.width, canvas.height);
}


function draw() {
    update();
    render();
}

function update() {

    if (drawing) {
        updateCells();
    }
    if (!mouseIsPressed) {
        drawing = false;
    }

    if (rotateTool) {
        var tempCurrentCell = gridCells.getCurrentCell();
        var tempCurrentImg = gridCells.getCurrentImage();
        toolCtx.clearRect(0, 0, toolCanvas.width, toolCanvas.height);

        gridGraph.push();
        gridGraph.translate(toolCanvas.width / 2, toolCanvas.height / 2);
        gridGraph.rotate(rotateToolHeading);
        var rightMiddle = {
            x: (tempCurrentCell.width / 2),
            y: 0
        };
        gridGraph.stroke('rgb(0,255,0)');
        gridGraph.strokeWeight(6);
        gridGraph.line(rightMiddle.x + 6, 0, rightMiddle.x + 50, 0);
        gridGraph.ellipse(rightMiddle.x + 50, 0, 20);
        gridGraph.pop();
        toolCtx.drawImage(gridGraph.elt, 0, 0);
        toolCanvas.classList.remove('mapMkrHide');

        gridGraph.clear();

    }

    if (toolGrabbed) {
        var toolCanvBnds = toolCanvas.getBoundingClientRect();

        //
        // Mouse position based on the tool canvas
        //
        var mousePos = {
            x: (winMouseX - toolCanvBnds.left),
            y: (winMouseY - toolCanvBnds.top)
        };

        //
        // Center mouse click
        //
        mousePos = {
            x: mousePos.x - toolCanvas.width / 2,
            y: mousePos.y - toolCanvas.height / 2
        };

        var a = Math.atan2(mousePos.y, mousePos.x);

        rotateToolHeading = (a > 0 ? a : (2 * PI + a));
        console.log(rotateToolHeading + ' 2');
        gridCells.getCurrentImage().setHeading(rotateToolHeading);
        //rotateToolHandle.x = rotateToolHandle.x * Math.cos(a) - rotateToolHandle.y * Math.sin(a);
        //rotateToolHandle.y = rotateToolHandle.x * Math.sin(a) + rotateToolHandle.y * Math.cos(a);
        rotateToolHandle.x = 82 * Math.cos(rotateToolHeading);
        rotateToolHandle.y = 82 * Math.sin(rotateToolHeading);

        //console.log('angle: ' + a);
        console.log('rotateX: ' + rotateToolHandle.x + ' rotateY: ' + rotateToolHandle.y);

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

function canvasClicked(e) {
    //
    // Code to handle single and double mouse clicks
    //
    var that = this;
    mouseClicks++;
    if (mouseClicks == 1) {
        setTimeout(function () {
            if (mouseClicks == 1) {
                canvasSingleMouseClick.call(this, e);
            }
            else {
                displaySelectedCellImages.call(this, e);
            }
            mouseClicks = 0;
        }, 200);
    }

}


function mouseReleased() {
    /*
    drawing = false;
    gridTreeReset();
    */

    //
    // Should probably put this function inside a mouse release event for the actual body instead because this
    // Event is for the main canvas
    //
    if (toolGrabbed) {
        toolGrabbed = false;
        var tempDeg = degrees(rotateToolHeading);
        if (tempDeg > 270) {
            if ((tempDeg - 270) > 45) {
                rotateToolHeading = 0;
            }
            else {
                rotateToolHeading = radians(270);
            }
        }
        else if (tempDeg > 180) {
            if ((tempDeg - 180) > 45) {
                rotateToolHeading = radians(270);
            }
            else {
                rotateToolHeading = radians(180);
            }
        }
        else if (tempDeg > 90) {
            if ((tempDeg - 90) > 45) {
                rotateToolHeading = radians(180);
            }
            else {
                rotateToolHeading = radians(90);
            }
        }
        else {
            if (tempDeg > 45) {
                rotateToolHeading = radians(90);
            }
            else {
                rotateToolHeading = radians(0);
            }
        }
        rotateToolHandle.x = 82 * Math.cos(rotateToolHeading);
        rotateToolHandle.y = 82 * Math.sin(rotateToolHeading);
        console.log(rotateToolHeading + ' 3');
        gridCells.getCurrentImage().setHeading(rotateToolHeading);
    }
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

