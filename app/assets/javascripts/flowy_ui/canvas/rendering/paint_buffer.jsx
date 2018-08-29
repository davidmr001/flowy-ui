class PaintBuffer {
  constructor(name, isPannable = true) {
    this.name = name
    this.isPannable = isPannable
    this.drawables = []
  }

  push(drawable) {
    this.drawables.push(drawable)
  }

  clear() {
    // Clear the buffer
    this.drawables = []
  }

  paint(ctx, mousePosition, panPosition, zoom) {
    for (const i in this.drawables) {
      const drawable = this.drawables[i]

      // Update information about the mouse
      drawable.mousePosition = mousePosition
      drawable.mouseOver = drawable.isMouseOver(mousePosition, this.isPannable, panPosition, zoom)

      // Calculate real position based on pan
      const position = {
        x: drawable.x,
        y: drawable.y
      }
      if (this.isPannable) {
        position.x += panPosition.x
        position.y += panPosition.y
      }

      // Draw the item
      drawable.paint(ctx, position.x, position.y)
    }
  }
}
