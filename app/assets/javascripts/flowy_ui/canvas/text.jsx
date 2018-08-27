class Text {
  constructor(text, size) {
    this.text = text;
    this.size = size;
  }

  drawTextCentered = (ctx, x, y, color) => {
    // TODO: Calc text size
    this.drawText(ctx, x, y, color);
  }

  drawText = (ctx, x, y, color) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.font = this.size + "pt serif";
    ctx.fillText(this.text, x, y);
    ctx.restore();
  }

  draw = (ctx, x, y, color, center = true) => {
    if (center) {
      this.drawTextCentered(ctx, x, y, color);
    } else {
      this.drawText(ctx, x, y, color);
    }
  }
}
