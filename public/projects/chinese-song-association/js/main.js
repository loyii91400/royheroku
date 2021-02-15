window.addEventListener("load", function(event) {
  "use strict";

  // FUNCTIONS
  var click = function(event) {
    var mousePos = getMousePos(document.querySelector("canvas"), event);
    const displayRatio = document.querySelector("canvas").width/game.world.width;
    let widget = controller.click(mousePos, game.world.page.widgets, displayRatio);
    if(typeof(widget) !== 'undefined') {
      widget.run();
    }
  };

  var resize = function(event) {
    display.resize(document.documentElement.clientWidth - 220, document.documentElement.clientHeight - 220, game.world.height / game.world.width);
    display.render();
  };

  var render = function() {
    display.fill(game.world.background_color);

    for(let i = 0; i < game.world.page.widgets.length; i++) {
      display.drawObject(game.world.page.widgets[i]);
    }

    display.render();
  };

  var update = function() {
    game.update();
  };

  var getMousePos = function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  }

  // OBJECTS

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000/30, render, update);

  // INITIALIZE

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  resize();
  engine.start();
  game.world.setup();

  window.addEventListener("click", click);
  window.addEventListener("resize",  resize);
});
