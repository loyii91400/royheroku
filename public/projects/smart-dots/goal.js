Goal = class{
    constructor(){
        this.x;
        this.y;
        this.width;
        this.height;
        this.drawingGoal = false;
    }

    drawGoal = function(width, height, gridNum){
        if (this.drawingGoal) {
            const rect = this.getRect(width, height, gridNum);
            this.x = rect.x;
            this.y = rect.y;
            this.width = width / gridNum;
            this.height = height / gridNum;
            this.draw();
        }
        // try {
        //     this.draw();
        // } catch (error) {
        //     ctx.restore();
        // }
    }

    draw = function(){
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * this.width,this.y * this.height,this.width,this.height);
        ctx.restore();
    }

    getGoal = function(){
        return {
            x: this.x,
            y: this.y
        }
    }

    setDrawingGoal = function(drawingGoal){
        this.drawingGoal = drawingGoal;
    }

    getRect = function(width, height, gridNum){
        return {
            x : Math.floor(mousePos.x / (width / gridNum)),
            y : Math.floor(mousePos.y / (height / gridNum))
        }
    }
}
