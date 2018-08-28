class CanvasRenderer extends React.Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }

  state = {
    frameTime: new Date(),
    fpsCounter: 0,
    fpsCurrent: 0,
    fpsStartTime: new Date(),
    mousePosition: {
      x: -1,
      y: -1
    },
    mouseDragging: false,
    mouseDragStartPosition: { x: 0, y: 0 },
    panPosition: { x: 0, y: 0 },
    baseRenderBuffer: [], // Array of drawables
    uiRenderBuffer: [], // Array of drawables
    otherRenderBuffers: [] // Array of render buffers, each with drawables
  }

  constructor(props) {
    super(props)
    this.setupScene = this.setupScene.bind(this)
    this.tick = this.tick.bind(this)
  }

  // Make sure React does not update (only the canvas is rendering, not react)
  // Grande Matos!
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const { canvasId, width, height } = this.props

    const canvas = document.getElementById(canvasId)
    const context = canvas.getContext("2d")
    this.setState({ context: context })

    this.setupEventListeners(canvas)

    canvas.width = width ? width : canvas.parentNode.clientWidth
    canvas.height = height ? height : canvas.parentNode.clientWidth * .75
    this.setState({
      width: canvas.width,
      height: canvas.height,
      fpsText: new Text({ textSize: 14, strokeColor: "#000000", center: false }),
      mouseText: new Text({ textSize: 14, strokeColor: "#000000", center: false })
    })

    requestAnimationFrame(this.tick)
  }

  setupEventListeners(canvas) {
    const comp = this

    canvas.addEventListener('mousemove', function(evt) {
      const rect = canvas.getBoundingClientRect()
      var state = {
        mousePosition: {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        },
        panPosition: comp.state.panPosition
      }
      if (comp.state.mouseDragging) {
        state.panPosition.x += evt.clientX - comp.state.mouseDragStartPosition.x
        state.panPosition.y += evt.clientY - comp.state.mouseDragStartPosition.y

        state.mouseDragStartPosition = { x: evt.clientX, y: evt.clientY }
      }
      comp.setState(state)
    }, false)

    canvas.addEventListener('mousedown', function(evt) {
      comp.setState({
        mouseDragging: true,
        mouseDragStartPosition: { x: evt.clientX, y: evt.clientY }
      })
    }, false)

    canvas.addEventListener('mouseup', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)
  }

  tick() {
    const {
      context,
      width,
      height,
      frameTime,
      fpsCounter,
      fpsCurrent,
      fpsStartTime,
      fpsText,
      mouseText,
      mousePosition,
      mouseDragging,
      panPosition
    } = this.state
    const { canvasId } = this.props
    const now = new Date()

    if (now - fpsStartTime > 1000) {
      this.setState({
        fpsCurrent: fpsCounter+1,
        fpsCounter: 0,
        fpsStartTime: now,
        //panPosition: { x: panPosition.x + 5, y: panPosition.y }
      })
    } else {
      this.setState({ fpsCounter: fpsCounter+1 })
    }

    // Clear
    context.save()
    context.clearRect(0, 0, width, height)

    // Render the buffers
    this.setupScene() // Implemented by the derived classes

    // Draw engine stuff last in the ui buffer
    fpsText.text = "FPS: " + fpsCurrent
    this.addToRenderBuffer("ui", fpsText, 10, 24)
    mouseText.text = "Mouse: " + mousePosition.x + ", " + mousePosition.y + ", dragging: " + mouseDragging
    this.addToRenderBuffer("ui", mouseText, 10, 44)

    // Render the scene
    this.renderScene()

    // Restore
    context.restore()

    // Frame time
    this.setState({ frameTime: new Date() - now })

    requestAnimationFrame(this.tick)
  }

  // Adds a drawable to a render buffer
  addToRenderBuffer(bufferName, drawable, x, y) {
    const { baseRenderBuffer, uiRenderBuffer, otherRenderBuffers, mousePosition } = this.state

    // Override the draw position, if the drawable has none predefined
    drawable.x = x ? x : drawable.x;
    drawable.y = y ? y : drawable.y;
    drawable.mousePosition = mousePosition

    if (bufferName === "base") {
      baseRenderBuffer.push(drawable)
      return
    }

    if (bufferName === "ui") {
      uiRenderBuffer.push(drawable)
      return
    }

    if (!otherRenderBuffers[bufferName]) {
      otherRenderBuffers[bufferName] = []
    }
    otherRenderBuffers[bufferName].push(drawable)
  }

  renderScene() {
    const { baseRenderBuffer, uiRenderBuffer, otherRenderBuffers } = this.state

    this.renderBuffer(baseRenderBuffer)
    for (const i in otherRenderBuffers) {
      this.renderBuffer(otherRenderBuffers[i]);
    }
    this.renderBuffer(uiRenderBuffer, false)

    this.setState({
      baseRenderBuffer: [], // Array of drawables
      uiRenderBuffer: [], // Array of drawables
      otherRenderBuffers: [] // Array of render buffers, each with drawables
    })
  }

  renderBuffer(buffer, pannable = true) {
    const { panPosition } = this.state

    for (const i in buffer) {
      const drawable = buffer[i]
      const position = {
        x: drawable.x,
        y: drawable.y
      }
      if (pannable) {
        position.x += panPosition.x
        position.y += panPosition.y
      }
      drawable.render(this.state.context, position.x, position.y)
    }
  }

  // Extending classes need to implement draw()

  render() {
    return (
      <canvas
        id={this.props.canvasId}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }
}
