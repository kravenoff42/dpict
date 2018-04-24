class Doodle{
    constructor(canX,canY, toolWidth,b){
        this.width = canX - toolWidth;
        this.height = canY;
        this.x = toolWidth;
        this.y = 0;
        this.borderWidth = b;
        this.borderColor = color(0,0,0);
    }
    render(){
        push();
        translate(this.x,this.y);
        strokeWeight(this.borderWidth);
        stroke(this.borderColor);
        noFill();
        rect(0,0,this.width, this.height);
        pop();
    }
    
    inBounds(){
        if(mouseX<this.x+window.brushSize/2||
        mouseX>width||
        mouseY<this.y||
        mouseY>height){
            return false;
        }
        return true;
    }
}