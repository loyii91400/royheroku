Game = class {
  constructor(row = 9 , column = 18, tilesize = 16){
    this.world = new World(row, column, tilesize);
  }

  update = function() {
    this.world.update();
  };
};

World = class {
  constructor(row, column, tileSize) {
    this.background_color = "#FED8B1";

    this.friction = 0.9;
    this.gravity = 2;

    this.player = new Player(8,15,0,113,15);

    this.zoneID = "00";

    this.zone = new Zone();

    this.height = row * tileSize;
    this.width = column * tileSize;

    this.collider = new Collider();

    this.door = undefined;
  }

  setup = function(zone) {
    this.zone.setValues(zone);

    if (this.door) {
      if (this.door.destinationX != -1) {
        this.player.setCenterX (this.door.destinationX);
        this.player.setOldCenterX(this.door.destinationX);
      }
      if (this.door.destinationY != -1) {
        this.player.setCenterY (this.door.destinationY);
        this.player.setOldCenterY(this.door.destinationY);
      }
      this.door = undefined;
    }
  }

  collideObject = function(object) {
    if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
    else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
    if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
    else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

    let top;
    let left;
    let right;
    let bottom;
    let value;

    top = Math.floor(object.getTop() / this.zone.tileSize);
    left = Math.floor(object.getLeft() / this.zone.tileSize);
    value = this.zone.collisionMap[top * this.zone.columns + left];
    this.collider.collide(value, object, left * this.zone.tileSize, top * this.zone.tileSize, this.zone.tileSize);

    top    = Math.floor(object.getTop() / this.zone.tileSize);
    right  = Math.floor(object.getRight() / this.zone.tileSize) != this.zone.columns ? Math.floor(object.getRight()  / this.zone.tileSize) : this.zone.columns-1;
    value  = this.zone.collisionMap[top * this.zone.columns + right];
    this.collider.collide(value, object, right * this.zone.tileSize, top * this.zone.tileSize, this.zone.tileSize);

    bottom = Math.floor(object.getBottom() / this.zone.tileSize) != this.zone.rows ? Math.floor(object.getBottom() / this.zone.tileSize) : this.zone.rows - 1;
    left   = Math.floor(object.getLeft() / this.zone.tileSize);
    value  = this.zone.collisionMap[bottom * this.zone.columns + left];
    this.collider.collide(value, object, left * this.zone.tileSize, bottom * this.zone.tileSize, this.zone.tileSize);

    bottom = Math.floor(object.getBottom() / this.zone.tileSize) != this.zone.rows ? Math.floor(object.getBottom() / this.zone.tileSize) : this.zone.rows - 1;
    right  = Math.floor(object.getRight() / this.zone.tileSize) != this.zone.columns ? Math.floor(object.getRight()  / this.zone.tileSize) : this.zone.columns-1;
    value  = this.zone.collisionMap[bottom * this.zone.columns + right];
    this.collider.collide(value, object, right * this.zone.tileSize, bottom * this.zone.tileSize, this.zone.tileSize);
  };

  update = function() {
    this.player.updatePosition(this.gravity, this.friction);

    this.collideObject(this.player);

    for(let index = this.zone.doors.length - 1; index > -1; -- index) {
      let door = this.zone.doors[index];

      if (door.collideObject(this.player)) {
        this.door = door;
      };
    }

    this.player.updateAnimation();
  }
}

Zone = class {
  constructor() {
    this.graphicalMap;
    this.collisionMap;
    this.columns;
    this.rows;
    this.tileSize;
    this.doors = new Array();
    this.zone_id;
    this.tileSet;
    this.tileSetColumns;
  }

  setValues = function(zone) {
    this.graphicalMap = zone.graphical_map;
    this.collisionMap = zone.collision_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.tileSize = zone.tileSize;
    this.zone_id = zone.id;
    this.tileSet = zone.tileSet;
    this.tileSetColumns = zone.tileSetColumns;

    for (let i = 0; i < zone.doors.length; i++) {
      this.doors[i] = new Door();
      this.doors[i].setValues(zone.doors[i]);
    }
  }
}

// Interactable = class extends Object {
//   constructor(width, height, startX, startY) {
//     super(width, height, startX, startY);
//   }
//
//
// }

Object = class {
  constructor(width, height, startX, startY) {
    this.width = width;
    this.height = height;
    this.x = startX;
    this.y = startY;
  }

  getCenterX = function()  { return this.x + this.width  * 0.5; };
  getCenterY = function()  { return this.y + this.height * 0.5; };
  getBottom = function() { return this.y + this.height; };
  getLeft = function() { return this.x; };
  getRight = function() { return this.x + this.width; };
  getTop = function() { return this.y; };
  setCenterX = function(x) { this.x = x - this.width  * 0.5; };
  setCenterY = function(y) { this.y = y - this.height * 0.5; };
  setBottom = function(y) { this.y = y - this.height; };
  setLeft = function(x) { this.x = x; };
  setRight = function(x) { this.x = x - this.width; };
  setTop = function(y) { this.y = y; };
}

MovingObject = class extends Object {
  constructor(width, height, startX, startY, velocity_max) {
    super(width, height, startX, startY)
    this.velocity_max = velocity_max;
    this.oldX = startX;
    this.oldY = startY;
    this.direction_x = 1;
  }

  getOldCenterX = function()  { return this.x_old + this.width * 0.5; };
  getOldCenterY = function()  { return this.y_old + this.height * 0.5; };
  getOldBottom = function() { return this.oldY + this.height };
  getOldLeft = function() { return this.oldX; };
  getOldRight = function() { return this.oldX + this.width; };
  getOldTop = function() { return this.oldY; };
  setOldCenterX = function(x) { this.x_old = x - this.width * 0.5; };
  setOldCenterY = function(y) { this.y_old = y - this.height * 0.5; };
  setOldBottom = function(y) { this.y_old = y - this.height; };
  setOldLeft = function(x) { this.x_old = x; };
  setOldRight = function(x) { this.x_old = x - this.width; };
  setOldTop = function(y) { this.y_old = y; };
}

Door = class extends Object {
  consturctor() {
    this.destinationZone;
    this.destinationX;
    this.destinationY;
  }

  setValues = function(door) {
    this.x = door.x;
    this.y = door.y;
    this.width = door.width;
    this.height = door.height;
    this.destinationZone = door.destination_zone;
    this.destinationX = door.destination_x;
    this.destinationY = door.destination_y;
  }

  collideObject = function(object) {
    let center_x = object.getCenterX();
    let center_y = object.getCenterY();

    if (center_x < this.getLeft() || center_x > this.getRight() ||
         center_y < this.getTop()  || center_y > this.getBottom() ) return false;

    return true;
 }
}

Player = class extends MovingObject {
  constructor(width, height, startX, startY, velocity_max) {
    super(width, height, startX, startY, velocity_max);
    this.color = "#ff0000";
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.frames = [
      new Frame(0, 0, 8, 15, 0, 0),
      new Frame(8, 0, 8, 15, 0, 0),
      new Frame(16, 0, 8, 15, 0, 0),
      new Frame(24, 0, 8, 15, 0, 0),
      new Frame(32, 0, 8, 15, 0, 0),
      new Frame(40, 0, 8, 15, 0, 0),
      new Frame(48, 0, 8, 15, 0, 0),
      new Frame(56, 0, 8, 15, 0, 0),
      new Frame(64, 0, 8, 15, 0, 0),
      new Frame(72, 0, 8, 15, 0, 0)
    ];
    this.frameSets = {
      "idle-left": [5, 8, 9, 8, 5],
      "idle-right": [0, 3, 4, 3, 0],
      "move-left": [5, 6, 5, 7],
      "move-right": [0, 1, 0, 2],
    };
    this.animator = new Animator(this.frameSets["idle-right"], 5);
  }

  jump = function() {
    if (this.velocity_y <= 0) {
      if (!this.jumping) {
        this.jumping = true;
        this.velocity_y -= 13;
      }
    }
  };

  moveLeft = function() {
    this.velocity_x -= 0.55;
    this.direction_x = -1;
  };
  moveRight = function() {
    this.velocity_x += 0.55;
    this.direction_x = 1;
  };

  updateAnimation = function() {
    if (this.direction_x < 0) {
      if (this.velocity_x < -0.1) this.animator.changeFrameSet(this.frameSets["move-left"], "loop", 3);
      else this.animator.changeFrameSet(this.frameSets["idle-left"], "loop", 5);
    } else if (this.direction_x > 0) {
      if (this.velocity_x > 0.1) this.animator.changeFrameSet(this.frameSets["move-right"], "loop", 3);
      else this.animator.changeFrameSet(this.frameSets["idle-right"], "loop", 5);
    }
    this.animator.animate();
  }

  updatePosition = function(gravity, friction) {
    this.oldX = this.x;
    this.oldY = this.y;
    this.velocity_y += gravity;

    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x += this.velocity_x;
    this.y += this.velocity_y;
  };
}

Collider = class {
  collide = function(value, object, tile_x, tile_y, tile_size) {
    switch(value) {
      case 1: this.collidePlatformTop(object, tile_y); break;
      case 2: this.collidePlatformRight(object, tile_x + tile_size); break;
      case 3: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break;
      case 4: this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 5: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 7: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 8: this.collidePlatformLeft(object, tile_x); break;
      case 9: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformLeft(object, tile_x); break;
      case 10: if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break;
      case 12: if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 13: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 14: if (this.collidePlatformLeft(object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 15: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
    }
  }

  collidePlatformLeft = function(object, tile_left) {
    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
      object.setRight(tile_left);
      object.velocity_x = 0;
      return true;
    }
    return false;
  }

  collidePlatformRight = function(object, tile_right) {
    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;
    }
    return false;
  }

  collidePlatformTop = function(object, tile_top) {
    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
      object.setBottom(tile_top);
      object.velocity_y = 0;
      object.jumping    = false;
      return true;
    }
    return false;
  }

  collidePlatformBottom = function(object, tile_bottom) {
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.velocity_y = 0;
      return true;
    }
    return false;
  }
}

Frame = class {
  constructor(x, y, width, height, offset_x, offset_y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
  }
}

Animator = class {
  constructor(frame_set, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frame_set = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode = "loop";
  }

  animate = function() {
    switch(this.mode) {
      case "loop" : this.loop(); break;
      case "pause": break;
    }
  }

  changeFrameSet = function(frame_set, mode, delay = 10, frame_index = 0) {
    if (this.frame_set === frame_set) { return; }

    this.count = 0;
    this.delay = delay;
    this.frame_set = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode = mode;
  }

  loop = function() {
    this.count ++;

    while(this.count > this.delay) {
      this.count -= this.delay;

      this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

      this.frame_value = this.frame_set[this.frame_index];
    }
  }
}
