Obstacle = class{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update = function(){
    this.drawObstacle();
  }

  drawObstacle = function(){
    ctx.save();
    ctx.fillStyle="green";
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.restore();
  }
}
