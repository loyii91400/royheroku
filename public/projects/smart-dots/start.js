Start = class{
    constructor(){
        this.x;
        this.y;
        this.width;
        this.height;
        this.drawingStart = false;
    }

    drawStart = function(width, height, gridNum){
        if (this.drawingStart) {
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
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x * this.width,this.y * this.height,this.width,this.height);
        ctx.restore();
    }

    getStart = function(){
        return {
            x: this.x,
            y: this.y
        }
    }

    setDrawingStart = function(drawingStart){
        this.drawingStart = drawingStart;
    }

    getRect = function(width, height, gridNum){
        return {
            x : Math.floor(mousePos.x / (width / gridNum)),
            y : Math.floor(mousePos.y / (height / gridNum))
        }
    }
}
