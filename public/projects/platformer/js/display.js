Display = class {
  constructor(canvas) {
    this.buffer = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
  }

  drawRectangle = function(x, y, width, height, color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
  };

  drawRect = function(image, source_x, source_y, destination_x, destination_y, width, height) {
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  };

  drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  };

  drawMap = function(image, zone) {
    for (let index = zone.graphicalMap.length - 1; index > -1; -- index) {
      let value         = zone.graphicalMap[index];
      if (value != -1){
        let source_x = ( value % zone.tileSetColumns ) * zone.tileSize;
        let source_y = Math.floor(value / zone.tileSetColumns) * zone.tileSize;
        let destination_x = (index % zone.columns ) * zone.tileSize;
        let destination_y = Math.floor(index / zone.columns ) * zone.tileSize;

        this.buffer.drawImage(image, source_x, source_y, zone.tileSize, zone.tileSize, destination_x, destination_y, zone.tileSize, zone.tileSize);
      }
    }

    // let mapIndex = 0;
    //
    // for(let i = 0; i < zone.rows * zone.tileSize; i += zone.tileSize) {
    //   for(let j = 0; j < zone.columns * zone.tileSize; j += zone.tileSize) {
    //     let tileValue = zone.graphicalMap[mapIndex];
    //     var tile = zone.tiles[tileValue];
    //     this.buffer.fillStyle = tile.color;
    //     this.buffer.fillRect(j, i, zone.tileSize, zone.tileSize);
    //     mapIndex ++;
    //   }
    // }
  }

  fill = function(color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  };

  render = function() { this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); };

  resize = function(width, height, height_width_ratio) {

    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }

    this.context.imageSmoothingEnabled = false;
  };
};
