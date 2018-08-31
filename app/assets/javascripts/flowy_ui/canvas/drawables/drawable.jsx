class Drawable {
  constructor(attributes) {
    // Common attributes
    this.x            = attributes.x
    this.y            = attributes.y
    this.originalX    = attributes.x
    this.originalY    = attributes.y
    this.offsetX      = attributes.offsetX || 0,
    this.offsetY      = attributes.offsetY || 0,
    this.width        = attributes.width
    this.height       = attributes.height
    this.color        = attributes.color || THEME.textColor
    this.drawCentered = attributes.center != undefined ? attributes.center : true
    this.isClickable  = attributes.isClickable || false
    this.kids         = []
  }

  isMouseOver() {
    if (!this.canvasInformation) return false

    const { mousePosition, isPanning, zoom } = this.canvasInformation
    const zoomFactor = isPanning ? zoom : 1

    return mousePosition.x / zoomFactor >= this.x &&
           mousePosition.x / zoomFactor <= this.x + this.width &&
           mousePosition.y / zoomFactor >= this.y &&
           mousePosition.y / zoomFactor <= this.y + this.height
  }

  addChild(drawable) {
    this.kids.push(drawable)
  }

  removeChild(drawable) {
    var index = this.kids.indexOf(drawable);
    if (index > -1) {
      this.kids.splice(index, 1);
    }
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
    this.x = x + this.offsetX
    this.y = y + this.offsetY
    for (const i in this.kids) {
      this.kids[i].setPosition(this.x, this.y)
    }
  }

  // Used internally by the buffers
  paint(ctx) {
    this.adjust(ctx)
    this.draw(ctx)
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
