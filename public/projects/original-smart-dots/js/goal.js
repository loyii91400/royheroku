Goal = class{
  constructor(){
    this.x = WIDTH/2
    this.y = 20
  }

  draw = function(){
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y,5,5);
    ctx.restore();
  }
}
