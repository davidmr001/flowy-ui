class PaintBuffer {
  constructor(name, isPannable = true) {
    this.name = name
    this.isPannable = isPannable
    this.drawables = []
  }

  push(drawable) {
    this.drawables.push(drawable)
  }

  remove(drawable) {
    var index = this.drawables.indexOf(drawable);
    if (index > -1) {
      this.drawables.splice(index, 1);
    }
  }

  clear() {
    // Clear the buffer
    this.drawables = []
  }

  paint(ctx, canvasInfo) {
    for (const i in this.drawables) {
      var drawable = this.drawables[i]
      drawable.setCanvasInformation(canvasInfo)
      drawable.paint(ctx)
    }
  }
}
