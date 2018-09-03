class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      color: attributes.color || THEME.strokeColor,
      center: false
    })

    this.lineWidth = attributes.lineWidth || 1
    this.width = attributes.endX - attributes.x
    this.height = attributes.endY - attributes.y

    if (attributes.isSelectable) {
      this.selectionCircle = new Ellipse({
        width: 30,
        height: 30,
        color: this.color,
        backgroundColor: THEME.panelBackgroundColor,
        offsetX: this.width / 2 - 15,
        offsetY: this.height / 2 - 15
      })
      this.addChild(this.selectionCircle)
    }
  }

  isMouseOver() {
    if (this.selectionCircle) {
      return this.selectionCircle.isMouseOver()
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.width, this.y + this.height)
    ctx.stroke()
    ctx.restore()

    if (this.selectionCircle) {
      this.selectionCircle.draw(ctx)
    }

    if (this.canvasInformation && this.canvasInformation.debug && this.isMouseOver()) {
      new Square({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        color: "#ff0000"
      }).draw(ctx)
    }

    super.draw(ctx)
  }
}
