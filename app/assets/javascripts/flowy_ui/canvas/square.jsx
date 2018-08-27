class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw = (context, x, y, color, fill) => {
    context.save();
    if (fill) {
      context.fillStyle = fill;
      context.fillRect(x, y, this.width, this.height);
    }
    context.strokeStyle = color;
    context.strokeRect(x, y, this.width, this.height);
    context.restore();
  }
}
