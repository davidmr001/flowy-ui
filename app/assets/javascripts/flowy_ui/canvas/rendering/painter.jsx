class Painter {
  constructor() {
    this.baseBuffer   = new PaintBuffer("base")
    this.uiBuffer     = new PaintBuffer("ui", false),
    this.otherBuffers = {} // Hash of render buffers (name, and buffer)
  }

  getBuffer(bufferName) {
    if (bufferName == "ui") {
      return this.uiBuffer
    }
    if (bufferName == "base") {
      return this.baseBuffer
    }
    if (!this.otherBuffers[bufferName]) {
      this.otherBuffers[bufferName] = new PaintBuffer(bufferName)
    }
    return this.otherBuffers[bufferName]
  }

  getBuffers() {
    var buffers = []
    buffers.push(this.baseBuffer)
    for (const i in this.otherBuffers) {
      buffers.push(this.otherBuffers[i])
    }
    buffers.push(this.uiBuffer)
    return buffers
  }

  onClick(x, y, context, panPosition, zoom) {
    // Go through all drawables in all buffers and notify them if they get the click
    // Only the top most drawable will get the click
    const mousePosition = { x: x, y: y }
    var drawableClicked = null
    var hit = null

    var buffers = this.getBuffers()
    for (const i in buffers) {
      hit = this.checkClickInBuffer(buffers[i], mousePosition, panPosition, zoom)
      if (hit) { drawableClicked = hit }
    }

    if (drawableClicked) {
      drawableClicked.onClick(context)
      return drawableClicked
    }

    return null
  }

  checkClickInBuffer(buffer, mousePosition, panPosition, zoom) {
    var hit = null
    for (const i in buffer.drawables) {
      const drawable = buffer.drawables[i]
      if (drawable.isMouseOver(mousePosition, buffer.isPannable, panPosition, zoom)) {
        hit = drawable
      }
    }
    return hit
  }

  clear() {
    // Clear buffers
    this.baseBuffer.clear()
    for (const i in this.otherBuffers) {
      this.otherBuffers[i].clear()
    }
    this.uiBuffer.clear()
  }

  // Adds a drawable to a render buffer
  addToBuffer(drawable, x, y, bufferName = "base") {
    const buffer = this.getBuffer(bufferName)

    // Override the draw position, if the drawable has none predefined
    drawable.x = x ? x : drawable.x;
    drawable.y = y ? y : drawable.y;

    buffer.push(drawable)
  }

  paint(context, mousePosition, panPosition, zoom) {
    context.save()
    context.scale(zoom, zoom);

    // TODO: Draw all buffers except UI
    const buffers = this.getBuffers()
    for (const i in buffers) {
      buffers[i].paint(context, mousePosition, panPosition, zoom);
    }

    context.restore()

    // TODO: Draw ui
  }
}
