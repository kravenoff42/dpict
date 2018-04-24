class ToolTray{
    constructor(w,h,b){
        this.x = 0;
        this.y = 0;
        this.borderWidth = b;
        this.borderColor = color(0,0,0);
        this.width = w;
        this.height = h;
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
}