Display = class {
  constructor(canvas) {
    this.buffer = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
  }

  drawRectangle = function(x, y, width, height, color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
  };

  // drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {
  //   this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  // };

  drawObject = function(widget) {
    switch(widget.type){
      case "Title":
        this.buffer.fillStyle = widget.textStyle.color; this.buffer.font = widget.textStyle.size + "px " + widget.textStyle.font; this.buffer.textAlign = "center";
        this.buffer.fillText(widget.text, widget.posX, widget.posY);
        break;
      case "Paragraph":
        this.buffer.fillStyle = widget.textStyle.color; this.buffer.font = widget.textStyle.size + "px " + widget.textStyle.font; this.buffer.textAlign = "center";
        this.wrapText(widget.text, widget.posX, widget.posY, widget.maxWidth, widget.textStyle.size);
        break;
      case "Button":
        this.buffer.fillStyle = "white";
        this.buffer.fillRect(widget.posX, widget.posY , widget.width, widget.height);
        this.buffer.fillStyle = widget.textStyle.color; this.buffer.font = widget.textStyle.size + "px " + widget.textStyle.font; this.buffer.textAlign = "center";
        this.buffer.fillText(widget.text, widget.posX + (widget.width/2), widget.posY + widget.height/2 + widget.textStyle.size/3);
        break;
      case "Countdown":
      this.buffer.fillStyle = widget.textStyle.color; this.buffer.font = widget.textStyle.size + "px " + widget.textStyle.font; this.buffer.textAlign = "center";
      this.buffer.fillText(widget.text, widget.posX, widget.posY);
      break;
    }
  }

  wrapText = function(text, x, y, maxWidth, lineHeight) {
    let words = text.split('');
    let line = '';

    for(var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + ' ';
      var testWidth = this.buffer.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
        this.buffer.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.buffer.fillText(line, x, y);
  }

  fill = function(color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  };

  render = function() {
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
  };

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
