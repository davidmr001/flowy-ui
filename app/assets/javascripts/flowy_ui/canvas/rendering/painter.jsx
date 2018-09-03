class Painter {
  constructor(canvas) {
    this.canvas = canvas

    this.baseBuffer   = new PaintBuffer("base")
    this.uiBuffer     = new PaintBuffer("ui", false),
    this.otherBuffers = {} // Hash of render buffers (name, and buffer)

    this.drawablesToAdd = {}
    this.drawablesToRemove = {}
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

  onClick(x, y) {
    this.findAndTriggerEventInDrawables("onClick")
  }

  onMouseDown(x, y) {
    this.findAndTriggerEventInDrawables("onMouseDown")
  }

  onMouseUp(x, y) {
    this.findAndTriggerEventInDrawables("onMouseUp", true)
  }

  findAndTriggerEventInDrawables(eventFunction, applyToAll = false) {
    var buffers = this.getBuffers()
    for (const i in buffers) {
      const buffer = buffers[i]
      for (const j in buffer.drawables) {
        this.triggerMouseEventIfApplicable(buffer.drawables[j], eventFunction, applyToAll)
      }
    }
  }

  triggerMouseEventIfApplicable(drawable, eventFunction, applyToAll) {
    if (applyToAll || drawable.isClickable && drawable.isMouseOver()) {
      drawable[eventFunction]()
    }
    for (const i in drawable.kids) {
      this.triggerMouseEventIfApplicable(drawable.kids[i], eventFunction, applyToAll)
    }
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
    // Delay adding drawables to the next frame to prevent artifacts when adding
    // in runtime
    if (!this.drawablesToAdd[bufferName]) {
      this.drawablesToAdd[bufferName] = []
    }
    this.drawablesToAdd[bufferName].push(drawable)
  }

  removeFromBuffer(drawable, bufferName = "base") {
    // Delay adding drawables to the next frame to prevent artifacts when adding
    // in runtime
    if (!this.drawablesToRemove[bufferName]) {
      this.drawablesToRemove[bufferName] = []
    }
    this.drawablesToRemove[bufferName].push(drawable)
  }

  paint(context) {
    const canvasInformation = this.canvas.getInformation()

    context.save()
    context.scale(canvasInformation.zoom, canvasInformation.zoom)

    // Draw all buffers except UI
    const buffers = this.getBuffers()
    for (const i in buffers) {
      if (buffers[i] === this.uiBuffer) {
        continue
      }
      buffers[i].paint(
        context,
        { ...canvasInformation, isPanning: buffers[i].isPannable }
      )
    }
    context.restore()

    // Draw ui outside of scaling
    this.uiBuffer.paint(
      context,
      { ...canvasInformation, isPanning: this.uiBuffer.isPannable }
    )

    this.addOrRemoveDrawables()
  }

  addOrRemoveDrawables() {
    const comp = this

    // Add new drawables after each frame
    Object.keys(comp.drawablesToAdd).forEach(function(bufferName, index) {
      const buffer = comp.getBuffer(bufferName)
      const drawables = comp.drawablesToAdd[bufferName]
      for (const i in drawables) {
        buffer.add(drawables[i], bufferName);
      }
    });
    comp.drawablesToAdd = {}

    // Remove drawables after each frame
    Object.keys(comp.drawablesToRemove).forEach(function(bufferName, index) {
      const buffer = comp.getBuffer(bufferName)
      const drawables = comp.drawablesToRemove[bufferName]
      for (const i in drawables) {
        buffer.remove(drawables[i], bufferName);
      }
    });
    comp.drawablesToRemove = {}
  }
}
