Controller = class {
  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
  }

  keyDownUp = function(type, key_code) {
    var down = (type == "keydown") ? true : false;

    switch(key_code) {
      case 37: this.left.getInput(down);  break;
      case 38: this.up.getInput(down);    break;
      case 39: this.right.getInput(down);
    }
  };
};

ButtonInput = class {
  constructor() {
    this.active = this.down = false;
  }

  getInput = function(down) {
    if (this.down != down) this.active = down;
    this.down = down;
  }
};
