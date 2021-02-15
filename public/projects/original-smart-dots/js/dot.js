Dot = class{
  constructor(){
    this.x = WIDTH/2;
    this.y = HEIGHT-20;
    this.speed=15;
    this.dead=false;
    this.brain = new Brain(500);
    this.reachGoal = false;
    this.fitness = 0.0;
    this.isBest = false;
    this.onObstacle = false;
  }

  update = function(){
    if(this.x <= 0 || this.x >= WIDTH-5 || this.y <= 0 || this.y >= HEIGHT-5){
      this.dead = true;
    }
    for(var key in obstacles){
      if(this.x > obstacles[key].x && this.x < obstacles[key].x + obstacles[key].width && this.y>obstacles[key].y && this.y < obstacles[key].y + obstacles[key].height){
        this.dead = true;
        this.onObstacle = true;
      }
    }
    if(this.x >= goal.x && this.x <= goal.x + 5 && this.y >= goal.y && this.y <= goal.y + 5 && this.reachGoal == false){
      this.reachGoal = true;
    }
    this.move();
    this.draw();
  }

  move = function(){
    if(population.gen==1){
      population.minStep = Object.keys(this.brain.directions).length;
    }
    if((this.brain.step < population.minStep) && !this.dead && !this.reachGoal){
      this.x += Math.cos((this.brain.directions[this.brain.step]))* this.speed;
      this.y += Math.sin((this.brain.directions[this.brain.step]))* this.speed;
      if(this.x > WIDTH - 5){
        this.x = WIDTH - 5;
      }
      if(this.x < 0){
        this.x = 0;
      }
      if(this.y > HEIGHT - 5){
        this.y = HEIGHT - 5;
      }
      if(this.y < 0){
        this.y = 0;
      }
      this.brain.step++;
    } else {
      this.dead = true;
    }
  }

  calculateFitness = function(){
    if(this.reachGoal){
      this.fitness = 1.0/16.0 + 10000/(this.brain.step*this.brain.step)
    } else{
    var vx = this.x - goal.x;
    var vy = this.y - goal.y;
    var distanceToGoal= Math.sqrt(vx*vx+vy*vy);
    this.fitness = 1/(distanceToGoal*distanceToGoal);
    if(this.onObstacle){
      this.fitness /= 2;
    }
    }
  }

  draw = function(){
    if(this.isBest){
      ctx.save();
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x,this.y,5,5);
      ctx.restore();
    }else{
      ctx.fillRect(this.x,this.y,5,5);
    }
  }
}
