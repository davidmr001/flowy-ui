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

  paint(ctx, panPosition) {
    for (const i in this.drawables) {
      const drawable = this.drawables[i]
      const position = {
        x: drawable.x,
        y: drawable.y
      }
      if (this.isPannable) {
        position.x += panPosition.x
        position.y += panPosition.y
      }
      drawable.paint(ctx, position.x, position.y)
    }
  }
}
