var ctx = document.getElementById("ctx").getContext("2d");
ctx.font= "30px Arial";
var WIDTH = 500;
var HEIGHT = 500;
var obstacles = {};
obstacles[1] = new Obstacle(200,100,100,20);
obstacles[2] = new Obstacle(0,250,225,20);
obstacles[3] = new Obstacle(275,250,225,20);

goal = new Goal();

population = new Population();
population.getPopulation();

setInterval(function(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  goal.draw();

  for(var key in obstacles){
    obstacles[key].update();
  }

  population.update();
},1000/45)
