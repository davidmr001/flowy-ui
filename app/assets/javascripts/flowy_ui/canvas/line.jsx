class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      center: false
    })

    this.endX = attributes.endX
    this.endY = attributes.endY

    this.width = this.endX - this.x
    this.height = this.endY - this.y
  }

  draw(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.restore();
  }
}
