Brain = class{

constructor(size){
  this.directions = {};
  this.step = 0;
  this.size = size;
}

initialDirections = function(){
  for(let i=0; i<this.size; i++){
    var randomAngle = Math.random() * 2 * Math.PI;
    this.directions[i] = randomAngle;
  }
}

mutate = function(){
  var mutationRate = 0.01;
  for(var key in this.directions){
    var randPicker = Math.random();
    if(randPicker<mutationRate){
      let randomAngle = Math.random() * 2 * Math.PI;
      this.directions[key] = randomAngle;
    }
  }
}
}
