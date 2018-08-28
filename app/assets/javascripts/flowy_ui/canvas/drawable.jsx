class Drawable {
  constructor(attributes) {
    // Common attributes
    this.width        = attributes.width
    this.height       = attributes.height
    this.strokeColor  = attributes.strokeColor || "#000000"
    this.fillColor    = attributes.fillColor
    this.drawCentered = attributes.center != undefined ? attributes.center : true
  }

  adjust(ctx) {
    // Used by child classes to readjust parameters
    // like dynamic text width, and stuff like that
  }

  // Used internally by the buffers
  render(ctx, x, y) {
    this.adjust(ctx)

    if (this.drawCentered) {
      this.draw(ctx, x - this.width / 2, y - this.height / 2)
    } else {
      this.draw(ctx, x, y)
    }
  }

  // Implemented by the shapes themselves (actually drawing the shape)
  // draw(ctx, x, y) {}
}