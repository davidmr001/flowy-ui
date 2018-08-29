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

  paint(ctx) {
    for (const i in this.drawables) {
      var drawable = this.drawables[i]
      drawable.paint(ctx)
    }
  }
}
