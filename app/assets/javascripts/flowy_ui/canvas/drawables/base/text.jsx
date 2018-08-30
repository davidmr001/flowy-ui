class Text extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: 100,
      height: attributes.size || THEME.textSize
    })
    this.text = attributes.text
    this.color = attributes.color || THEME.textColor
    this.size = attributes.size || THEME.textSize
  }

  getTextWidth(ctx) {
    ctx.save()
    if (this.drawCentered) {
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
    }
    ctx.font = this.size + "pt mono"
    const width = ctx.measureText(this.text).width
    ctx.restore()
    return width
  }

  drawTextCentered(ctx) {
    ctx.save()
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    this.drawText(ctx, this.x, this.y)
    ctx.restore()
  }

  drawText(ctx) {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.font = this.size + "pt mono"
    ctx.fillText(this.text, this.x, this.y)
    ctx.restore()
  }

  adjust(ctx) {
    // Never forget to call super
    super.adjust(ctx)

    // Override the width based on the text size
    this.width = this.getTextWidth(ctx)
  }

  draw(ctx) {
    if (this.drawCentered) {
      this.drawTextCentered(ctx)
    } else {
      this.drawText(ctx)
    }

    super.draw(ctx)
  }
}
