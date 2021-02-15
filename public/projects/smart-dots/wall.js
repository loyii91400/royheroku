Wall = class{
    constructor(){
        this.x;
        this.y;
        this.width;
        this.height;
        this.drawingWall = false;
    }

    drawWall = function(width, height, gridNum){
        if (this.drawingWall) {
            const rect = this.getRect(width, height, gridNum);
            this.x = rect.x;
            this.y = rect.y;
            this.width = width / gridNum;
            this.height = height / gridNum;
            this.draw();
        }
    }

    draw = function(){
        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x * this.width,this.y * this.height,this.width,this.height);
        ctx.restore();
    }

    getWall = function(){
        return {
            x: this.x,
            y: this.y
        }
    }

    setDrawingWall = function(drawingWall){
        this.drawingWall = drawingWall;
    }

    getRect = function(width, height, gridNum){
        return {
            x : Math.floor(mousePos.x / (width / gridNum)),
            y : Math.floor(mousePos.y / (height / gridNum))
        }
    }
}
