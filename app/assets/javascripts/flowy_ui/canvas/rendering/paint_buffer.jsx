class PaintBuffer {
  constructor(name, isPannable = true) {
    this.name = name
    this.isPannable = isPannable
    this.drawables = []
  }

  add(drawable) {
    // console.log("Adding " + drawable.constructor.name + " to buffer " + this.name)
    this.drawables.push(drawable)
  }

  remove(drawable) {
    // console.log("Removing " + drawable.constructor.name + " to buffer " + this.name)
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

      this.drawDebugInformation(ctx, drawable, canvasInfo)
    }
  }

  drawDebugInformation(ctx, drawable, canvasInformation) {
    if (!canvasInformation.debug) return

    // Debug info
    if (drawable.isMouseOver()) {
      ctx.save()
      ctx.strokeStyle = "#ff0000"
      ctx.strokeRect(drawable.x-1, drawable.y-1, drawable.width+2, drawable.height+2)
      ctx.restore()

      drawDebugText(
        ctx,
        Math.round(drawable.x) + "," + Math.round(drawable.y),
        drawable.x,
        drawable.y-10
      )
      drawDebugText(
        ctx,
        Math.round(drawable.x + drawable.width) + "," + Math.round(drawable.y + drawable.height),
        (drawable.x + drawable.width),
        (drawable.y + drawable.height)-10
      )
    }

    // Draw debug info for children as well
    for (const i in drawable.kids) {
      this.drawDebugInformation(ctx, drawable.kids[i], canvasInformation)
    }
  }
}
