class Text {
  constructor(text, size) {
    this.text = text;
    this.size = size;
  }

  getTextWidth(ctx) {
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = this.size + "pt serif";
    const width = ctx.measureText(this.text).width;
    ctx.restore();
    return width;
  }

  drawTextCentered(ctx, x, y, color) {
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    this.drawText(ctx, x, y, color);
    ctx.restore();
  }

  drawText(ctx, x, y, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = this.size + "pt serif";
    ctx.fillText(this.text, x, y);
    ctx.restore();
  }

  draw(ctx, x, y, color, center = false) {
    if (center) {
      this.drawTextCentered(ctx, x, y, color);
    } else {
      this.drawText(ctx, x, y, color);
    }
  }
}
