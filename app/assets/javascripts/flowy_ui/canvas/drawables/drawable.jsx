class Drawable {
  constructor(attributes) {
    // Common attributes
    this.x            = attributes.x
    this.y            = attributes.y
    this.width        = attributes.width
    this.height       = attributes.height
    this.strokeColor  = attributes.strokeColor || "#000000"
    this.fillColor    = attributes.fillColor
    this.drawCentered = attributes.center != undefined ? attributes.center : true
  }

  isMouseOver() {
    const { mousePosition, zoom } = this.canvasInformation
    return mousePosition.x / zoom >= this.x &&
           mousePosition.x / zoom <= this.x + this.width &&
           mousePosition.y / zoom >= this.y &&
           mousePosition.y / zoom <= this.y + this.height
  }

  setCanvasInformation(canvasInformation) {
    this.canvasInformation = canvasInformation
  }

  adjust(ctx) {
    // Update the x and y coordinates to take into account panning
    const { isPanning, panPosition } = this.canvasInformation
    this.x = isPanning ? this.x + panPosition.x : this.x
    this.y = isPanning ? this.y + panPosition.y : this.y

    if (this.drawCentered) {
      this.x = this.x - this.width / 2
      this.y = this.y - this.height / 2
    }
  }

  // Used internally by the buffers
  paint(ctx) {
    this.adjust(ctx)
    this.draw(ctx)
  }

  // Implemented by the shapes themselves

  // actually drawing the shape
  draw(ctx) {
    // TODO: Debug remove
    ctx.save()
    ctx.strokeStyle = "#ff0000"
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }

  // knowing when drawable has been clicked upon
  onClick(ctx) {}
}
