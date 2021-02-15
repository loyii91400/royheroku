Population = class{
  constructor(){
    this.dotList = {};
    this.allDotsDead = false;
    this.minStep = 0;
    this.allDotsDead = false;
    this.gen = 1;
  }

  update = function(){
    this.drawGen();
    this.allDotsDead = this.checkAllDotsDead();
    if(this.allDotsDead){
      for(var key in this.dotList){
        this.dotList[key].calculateFitness()
      }
      this.naturalSelection();
      for(var key in this.dotList){
        if(this.dotList[key].isBest == false){
          this.dotList[key].brain.mutate();
        }
      }
      this.allDotsDead=false;
    }
    for(var key in this.dotList){
      this.dotList[key].update();
    }
  }

  drawGen = function(){
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillText(`${this.gen}`,WIDTH/2-10,HEIGHT/2);
    ctx.restore();
  }

  getPopulation = function(){
    for(let i=0; i<100; i++){
      this.dotList[i] = new Dot();
      this.dotList[i].brain.initialDirections();
    }
  }

  checkAllDotsDead = function(){
    for(var key in this.dotList){
      if(this.dotList[key].dead === false){
        return false;
      }
    }
    return true;
  }

  naturalSelection = function(){
    var newDotList = {};
    for(var key in this.dotList){
      if(key==99){
        parent = this.getChampDot();
        let baby = new Dot();
        Object.assign(baby.brain.directions, parent.brain.directions);
        baby.isBest = true;
        newDotList[key] = baby;
      }else{
        parent = this.getParentDot();
        let baby = new Dot();
        Object.assign(baby.brain.directions, parent.brain.directions);
        newDotList[key] = baby;
      }
    }
    this.dotList = newDotList;
    this.gen ++;
  }
  getParentDot = function(){
    var fitnessSum = 0;
    for(var key in this.dotList){
      fitnessSum += this.dotList[key].fitness;
    }
    var randPicker = Math.random()*fitnessSum;
    var runningSum = 0;
    for(var key in this.dotList){
      runningSum += this.dotList[key].fitness;
      if(runningSum >= randPicker){
        return this.dotList[key];
      }
    }
  }

  mutate = function(){
    for(var key in this.dotList){
      this.dotList[key].brain.mutate();
    }
  }

  getChampDot = function(){
    let maxFitness = 0;
    let maxIndex = 0;
    for(var key in this.dotList){
      if(this.dotList[key].fitness > maxFitness){
        maxFitness = this.dotList[key].fitness;
        maxIndex = key;
      }
    }
    if(this.dotList[maxIndex].reachGoal){
      this.minStep = this.dotList[maxIndex].brain.step;
    }
    return this.dotList[maxIndex];
  }
}
