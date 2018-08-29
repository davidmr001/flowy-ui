class Text extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.text = attributes.text
    this.textSize = attributes.textSize
    this.width = 100
    this.height = this.textSize
  }

  getTextWidth(ctx) {
    ctx.save()
    if (this.drawCentered) {
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
    }
    ctx.font = this.textSize + "pt serif"
    const width = ctx.measureText(this.text).width
    ctx.restore()
    return width
  }

  drawTextCentered(ctx, x, y) {
    ctx.save()
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    this.drawText(ctx, x, y)
    ctx.restore()
  }

  drawText(ctx, x, y) {
    ctx.save()
    ctx.fillStyle = this.strokeColor
    ctx.font = this.textSize + "pt serif"
    ctx.fillText(this.text, x, y)
    ctx.restore()
  }

  //
  // This particular item overrides the render and not draw because we
  // want to do the centering part in a different way
  //
  paint(ctx, x, y) {
    this.draw(ctx, x, y)
  }

  adjust(ctx) {
    // Override the width based on the text size
    this.width = this.getTextWidth(ctx)
  }

  draw(ctx, x, y) {
    if (this.drawCentered) {
      this.drawTextCentered(ctx, x, y)
    } else {
      this.drawText(ctx, x, y)
    }
  }
}
