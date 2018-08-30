class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      drawCentered: false
    })

    this.offsetX = attributes.endX - attributes.x
    this.offsetY = attributes.endY - attributes.y

    this.width = this.endX - this.x
    this.height = this.endY - this.y
  }

  draw(ctx, x, y) {
    super.draw(ctx)

    ctx.save();
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.offsetX, y + this.offsetY);
    ctx.stroke();
    ctx.restore();
  }
}
