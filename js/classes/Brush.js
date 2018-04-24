class Brush{
    constructor(size){
        this.width = size;
        this.height = size;
        this.shape = "circle";
        this.color = color(0,0,0);
        this.lastPos = createVector(mouseX,mouseY);
        this.currentPos = createVector(mouseX,mouseY);
    }
    render(x,y){
        push();
        translate(x,y);
        
        switch(this.shape){
            case 'circle':
                noStroke();
                strokeCap(ROUND);
                fill(this.color);
                ellipse(0,0,this.width,this.height);
                pop();
                break;
            case 'square':
                noStroke();
                fill(this.color);
                break;
            case 'line':
                strokeWeight(2);
                stroke(this.color);
                break;
            case 'diagonal':
                strokeWeight(2);
                stroke(this.color);
                break;
            case 'spray':
                strokeWeight(2);
                stroke(this.color);

                for(let i = 0,len=10;i<len;i++){
                    random(-this.size, this.size)
                    let angle = map(i, 0, this.total, 0, TWO_PI);
                    let r = this.r + this.offset[i];
                    let x = r * cos(angle);
                    let y = r * sin(angle);
                    point(x,y);
                    point()
                }
                break;
        }
        
    }
    update(){
        let x, y;
        
        this.currentPos = createVector(mouseX,mouseY);
        let dist = this.lastPos.dist(this.currentPos);
        let angle = this.lastPos.angleBetween(this.currentPos);
        console.log('dist: '+dist);
        console.log('angle: '+angle);
        
        for (var i = 1; i < dist+1; i+=.1) {
        x = this.lastPos.x + sin(angle);
        y = this.lastPos.y + cos(angle);
        //console.log('render')
        this.render(x, y);
        }
        
        this.lastPos = this.currentPos.copy();
    }

}

// v1.dist(v2)
// function distanceBetween(point1, point2) {
//   return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
// }
// v1.angleBetween(v2)
// function angleBetween(point1, point2) {
//   return Math.atan2( point2.x - point1.x, point2.y - point1.y );
// }

////getting canvas let el = document.getElementById('c');
// var ctx = el.getContext('2d');
// ctx.lineJoin = ctx.lineCap = 'round';

// var isDrawing, lastPoint;

// el.onmousedown = function(e) {
//   isDrawing = true;
//   lastPoint = { x: e.clientX, y: e.clientY };
// };

// el.onmousemove = function(e) {
//   if (!isDrawing) return;
  
  
// };

// el.onmouseup = function() {
//   isDrawing = false;
// };