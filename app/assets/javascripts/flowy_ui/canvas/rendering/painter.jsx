class Painter {
  constructor(canvas) {
    this.canvas = canvas

    this.baseBuffer   = new PaintBuffer("base")
    this.uiBuffer     = new PaintBuffer("ui", false),
    this.otherBuffers = {} // Hash of render buffers (name, and buffer)

    this.renderingInformation = {}
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

  onClick(x, y, context) {
    // Go through all drawables in all buffers and notify them if they get the click
    // Only the top most drawable will get the click
    const mousePosition = { x: x, y: y }
    var drawableClicked = null
    var hit = null

    var buffers = this.getBuffers()
    for (const i in buffers) {
      // TODO: Remove UI exception for clicks
      if (buffers[i] === this.uiBuffer) {
        continue
      }
      hit = this.checkClickInBuffer(buffers[i])
      if (hit) { drawableClicked = hit }
    }

    if (drawableClicked) {
      drawableClicked.onClick(context)
      return drawableClicked
    }

    return null
  }

  checkClickInBuffer(buffer) {
    var hit = null
    for (const i in buffer.drawables) {
      const drawable = buffer.drawables[i]
      if (drawable.isMouseOver()) {
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
  addToBuffer(drawable, bufferName = "base") {
    const buffer = this.getBuffer(bufferName)

    // Store canvas info in the drawable (like mouse position, zoom, etc)
    drawable.setCanvasInformation({
      ...this.canvas.getInformation(),
      isPanning: buffer.isPannable
    })

    buffer.push(drawable)
  }

  paint(context, mousePosition, panPosition, zoom) {
    // const canvasInformation = {
    //   mousePosition: mousePosition,
    //   panPosition: panPosition,
    //   zoom: zoom
    // }

    context.save()
    context.scale(zoom, zoom)

    // Draw all buffers except UI
    const buffers = this.getBuffers()
    for (const i in buffers) {
      if (buffers[i] === this.uiBuffer) {
        continue
      }
      buffers[i].paint(context)
    }
    context.restore()

    // Draw ui outside of scaling
    this.uiBuffer.paint(context)
  }
}
