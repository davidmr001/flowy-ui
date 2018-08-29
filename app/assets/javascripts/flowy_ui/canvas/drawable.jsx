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

  isMouseOver(mousePosition, bufferIsPannable, panPosition, zoom) {
    const position = {
      x: this.x,
      y: this.y
    }
    if (bufferIsPannable) {
      position.x += panPosition.x
      position.y += panPosition.y
    }
    return mousePosition.x / zoom >= position.x - this.width / 2 &&
           mousePosition.x / zoom <= position.x + this.width / 2 &&
           mousePosition.y / zoom >= position.y - this.height / 2 &&
           mousePosition.y / zoom <= position.y + this.height / 2
  }

  adjust(ctx) {
    // Used by child classes to readjust parameters
    // like dynamic text width, and stuff like that
  }

  // Used internally by the buffers
  paint(ctx, x, y) {
    this.adjust(ctx)

    if (this.drawCentered) {
      this.draw(ctx, x - this.width / 2, y - this.height / 2)
    } else {
      this.draw(ctx, x, y)
    }
  }

  // Implemented by the shapes themselves

  // actually drawing the shape
  draw(ctx, x, y) {}

  // knowing when drawable has been clicked upon
  onClick(ctx) {
    // console.log(this.constructor.name)
  }
}
