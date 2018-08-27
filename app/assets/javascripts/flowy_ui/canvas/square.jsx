class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawSquareCentered = (ctx, x, y, color, fill = null) => {
    this.drawSquare(ctx, x-this.width/2, y-this.height/2, color, fill);
  }

  drawSquare = (ctx, x, y, color, fill = null) => {
    ctx.save();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, this.width, this.height);
    }
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, this.width, this.height);
    ctx.restore();
  }

  draw = (ctx, x, y, color, fill = null, center = true) => {
    if (center) {
      this.drawSquareCentered(ctx, x, y, color, fill);
    } else {
      this.drawSquare(contenxt, x, y, color, fill);
    }
  }
}
