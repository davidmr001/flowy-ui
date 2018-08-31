class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      center: false
    })

    this.endPointOffsetX = attributes.endX - attributes.x
    this.endPointOffsetY = attributes.endY - attributes.y

    this.mouseOverSpaceX = this.endPointOffsetX === 0 ? 10 : 0
    this.mouseOverSpaceY = this.endPointOffsetY === 0 ? 10 : 0
  }

  //
  // We want to have a little bit of buffer space for mouse over in lines (this.mouseOverSpace)
  //
  isMouseOver() {
    if (!this.canvasInformation) return false

    const { mousePosition, isPanning, zoom, panPosition } = this.canvasInformation
    const zoomFactor = isPanning ? zoom : 1

    const bounds = {
      x0: Math.min(Math.abs(this.x), Math.abs(this.endPointOffsetX + this.x)) - this.mouseOverSpaceX,
      y0: Math.min(Math.abs(this.y), Math.abs(this.endPointOffsetY + this.y)) - this.mouseOverSpaceY,
      x1: Math.max(Math.abs(this.x), Math.abs(this.endPointOffsetX + this.x)) + this.mouseOverSpaceX,
      y1: Math.max(Math.abs(this.y), Math.abs(this.endPointOffsetY + this.y)) + this.mouseOverSpaceY
    }

    return mousePosition.x / zoomFactor >= bounds.x0 &&
           mousePosition.x / zoomFactor <= bounds.x1 &&
           mousePosition.y / zoomFactor >= bounds.y0 &&
           mousePosition.y / zoomFactor <= bounds.y1
  }

  draw(ctx) {
    ctx.save()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.endPointOffsetX, this.y + this.endPointOffsetY)
    ctx.stroke()
    ctx.restore()

    const bounds = {
      x0: Math.min(Math.abs(this.x), Math.abs(this.endPointOffsetX + this.x)) - this.mouseOverSpaceX,
      y0: Math.min(Math.abs(this.y), Math.abs(this.endPointOffsetY + this.y)) - this.mouseOverSpaceY,
      x1: Math.max(Math.abs(this.x), Math.abs(this.endPointOffsetX + this.x)) + this.mouseOverSpaceX,
      y1: Math.max(Math.abs(this.y), Math.abs(this.endPointOffsetY + this.y)) + this.mouseOverSpaceY
    }

    if (this.canvasInformation && this.canvasInformation.debug && this.isMouseOver()) {
      new Square({
        x: bounds.x0,
        y: bounds.y0,
        width: bounds.x1-bounds.x0,
        height: bounds.y1-bounds.y0,
        color: "#ff0000"
      }).draw(ctx)
    }

    super.draw(ctx)
  }
}
