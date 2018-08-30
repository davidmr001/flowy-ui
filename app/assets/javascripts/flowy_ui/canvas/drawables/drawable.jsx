class Drawable {
  constructor(attributes) {
    // Common attributes
    this.x            = attributes.x
    this.y            = attributes.y
    this.originalX    = attributes.x
    this.originalY    = attributes.y
    this.width        = attributes.width
    this.height       = attributes.height
    this.strokeColor  = attributes.strokeColor || "#434343"
    this.drawCentered = attributes.center != undefined ? attributes.center : true
    this.kids         = []
  }

  isMouseOver() {
    // TODO: Solve this... zoom cannot be used in isMouseOver if buffer is not pannable (i.e UI)

    const { mousePosition, zoom } = this.canvasInformation
    return mousePosition.x / zoom >= this.x &&
           mousePosition.x / zoom <= this.x + this.width &&
           mousePosition.y / zoom >= this.y &&
           mousePosition.y / zoom <= this.y + this.height
  }

  addChild(drawable) {
    this.kids.push(drawable)
  }

  setCanvasInformation(canvasInformation) {
    this.canvasInformation = canvasInformation
    for (const i in this.kids) {
      this.kids[i].setCanvasInformation(canvasInformation)
    }
  }

  adjust(ctx) {
    // Update the x and y coordinates to take into account panning
    const { isPanning, panPosition } = this.canvasInformation
    var x = isPanning ? this.originalX + panPosition.x : this.originalX
    var y = isPanning ? this.originalY + panPosition.y : this.originalY

    if (this.drawCentered) {
      x -= this.width / 2
      y -= this.height / 2
    }

    this.setPosition(x, y)
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
    for (const i in this.kids) {
      this.kids[i].setPosition(x, y)
    }
  }

  // Used internally by the buffers
  paint(ctx) {
    this.adjust(ctx)
    this.draw(ctx)

    // Debug info
    if (this.canvasInformation.debug && this.isMouseOver()) {
      ctx.save()
      ctx.strokeStyle = "#ff0000"
      ctx.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2)
      ctx.restore()

      drawDebugText(ctx, Math.round(this.x) + "," + Math.round(this.y), this.x, this.y-10)
      drawDebugText(ctx, Math.round(this.x + this.width) + "," + Math.round(this.y + this.height), (this.x + this.width), (this.y + this.height)-10)
    }
  }

  // Implemented by the shapes themselves

  // actually drawing the shape (overriden by children)
  draw(ctx) {
    for (const i in this.kids) {
      this.kids[i].draw(ctx)
    }
  }

  // knowing when drawable has been clicked upon
  onClick(ctx) {}
}
