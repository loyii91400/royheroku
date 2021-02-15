Map = class{
    constructor(width, height, gridNum){
        this.width = width;
        this.height = height;
        this.gridNum = gridNum;
        this.grid = {};
    }

    drawGrid = function(){
        const widthSpacing = this.width / this.gridNum;
        const heightSpacing = this.height / this.gridNum;

        let i = 0;
        while ( i < this.width ) {
            i += widthSpacing;
            ctx.fillRect(i,0,1,this.height);
        }
        let j = 0;
        while ( j < this.height ) {
            j += heightSpacing;
            ctx.fillRect(0,j,this.width,1);
        }
        this.drawRects();
    }

    drawRects = function(){
        for(let i = 0; i < this.gridNum; i++){
            for(let j = 0; j < this.gridNum; j++){
                let flagx = (i==0) ? 0 : 1;
                let flagy = (j==0) ? 0 : 1;
                if(this.grid[`(${i},${j})`] == 1) {
                    ctx.save();
                    ctx.fillStyle = 'red';
                    ctx.fillRect(i * this.width / this.gridNum + flagx, j * this.height / this.gridNum + flagy,this.width / this.gridNum-flagx, this.height / this.gridNum-flagy);
                    ctx.restore();
                } else if(this.grid[`(${i},${j})`] == 2) {
                    ctx.save();
                    ctx.fillStyle = 'green';
                    ctx.fillRect(i * this.width / this.gridNum+flagx, j * this.height / this.gridNum+flagy ,this.width / this.gridNum-flagx, this.height / this.gridNum-flagy);
                    ctx.restore();
                } else if(this.grid[`(${i},${j})`] == 3) {
                    ctx.save();
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(i * this.width / this.gridNum+flagx, j * this.height / this.gridNum+flagy ,this.width / this.gridNum-flagx, this.height / this.gridNum-flagy);
                    ctx.restore();
                }
            }
        }
    }

    isStart = function(){
        for(let i = 0; i < this.gridNum; i++){
            for(let j = 0; j < this.gridNum; j++){
                if(this.grid[`(${i},${j})`] == 2){
                    return true;
                }
            }
        }
        return false;
    }

    setGridValue = function(value){
        this.gridNum = value;
    }

    createGrid = function(){
        for(let i = -1; i <= this.gridNum; i++){
            for(let j = -1; j <= this.gridNum; j++){
                if(i == -1 || j == -1 || i == this.gridNum || j == this.gridNum){
                    this.grid[`(${i},${j})`] = 3;
                } else {
                    this.grid[`(${i},${j})`] = 0;
                }
            }
        }
    }

    updateGrid = function(coords, value) {
        this.grid[coords] = value;
    }
}
