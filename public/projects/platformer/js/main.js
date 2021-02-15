AssetManager = class {
  constructor() {
    this.tile_set_image = undefined;
    this.playerTiles = undefined;
  }

  requestJSON = function(url, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener("load", function(event) {
      callback(JSON.parse(this.responseText));
    }, { once:true });

    request.open("GET", url);
    request.send();
  }

  requestImage = function(url, callback) {
    this.tile_set_image = new Image();

    this.tile_set_image.addEventListener("load", function(event) {
      callback();
    }, { once : true});

    this.tile_set_image.src = url;
  }

  requestPlayerTiles = function(url, callback) {
    this.playerTiles = new Image();

    this.playerTiles.addEventListener("load", function(event) {
      callback();
    }, { once : true});

    this.playerTiles.src = url;
  }
}

window.addEventListener("load", function(event) {
  "use strict";

  const ZONE_PREFIX = "zone";
  const ZONE_SUFFIX = ".json";

  // FUNCTIONS

  var keyDownUp = function(event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function(event) {
    display.resize(document.documentElement.clientWidth - 220, document.documentElement.clientHeight - 220, game.world.height / game.world.width);
    display.render();
  };

  var render = function() {
    display.fill(game.world.background_color);
    display.drawMap(assetManager.tile_set_image, game.world.zone);

    let frame = game.world.player.animator.frame_value;

    display.drawObject(assetManager.playerTiles,
    game.world.player.frames[frame].x, game.world.player.frames[frame].y,
    game.world.player.x + Math.floor(game.world.player.width * 0.5 - game.world.player.frames[frame].width * 0.5) + game.world.player.frames[frame].offset_x,
    game.world.player.y + game.world.player.frames[frame].offset_y, game.world.player.frames[frame].width, game.world.player.frames[frame].height);


    display.render();
  };

  var update = function() {
    if (controller.left.active) { game.world.player.moveLeft();  }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }

    game.update();

    if(game.world.door) {
      engine.stop();

      assetManager.requestJSON(ZONE_PREFIX + game.world.door.destinationZone + ZONE_SUFFIX, (zone) => {
        game.world.setup(zone);
        assetManager.requestImage("defaultMap.png", () => {
          engine.start();
        });
      });
      return;
    }
  };

  // OBJECTS

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000/30, render, update);
  var assetManager = new AssetManager();

  // INITIALIZE

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  assetManager.requestJSON(ZONE_PREFIX + game.world.zoneID + ZONE_SUFFIX, (zone) => {
    game.world.setup(zone);
    assetManager.requestImage("defaultMap.png", () => {
      assetManager.requestPlayerTiles("playerSprite.png", () => {
        resize();
        engine.start();
      });
    });
  })

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup",   keyDownUp);
  window.addEventListener("resize",  resize);
});
