class Canvas extends React.Component {
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
    mouseDragPosition: { x: 0, y: 0 },
    mouseDragStartPosition: { x: 0, y: 0 },
    panPosition: { x: 0, y: 0 },
    zoom: 1,
    debug: false
  }

  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }

  // Make sure React does not update (only the canvas is rendering, not react)
  // Grande Matos!
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const comp = this
    const { canvasId, width, height } = this.props

    const canvas = document.getElementById(canvasId)
    const context = canvas.getContext("2d")
    this.setState({ context: context })

    this.eventListener = new EventListener(this, canvas)

    canvas.width = width ? width : canvas.parentNode.clientWidth
    canvas.height = height ? height : canvas.parentNode.clientWidth * .75

    this.setState({
      painter:   new Painter(this),
      isSetup:   false,
      width:     canvas.width,
      height:    canvas.height,
      fpsText:   new Text({ x: 10, y: 24, textSize: 10, center: false }),
      mouseText: new Text({ x: 10, y: 38, textSize: 10, center: false }),
      zoomText:  new Text({ x: 10, y: 52, textSize: 10, center: false }),
      debugButton: new Button({
        x: 10,
        y: 66,
        width: 50,
        height: 30,
        textColor: "#ffffff",
        textSize: 10,
        backgroundColor: "#F34213",
        center: false,
        onClick: function() {
          comp.setState({ debug: !comp.state.debug })
        }
      })
    }, function() {
      requestAnimationFrame(comp.tick)
    })
  }

  onClick(x, y) {
    const { context, painter, panPosition, zoom } = this.state
    painter.onClick(x, y, context, panPosition, zoom)
  }

  onMouseDown(x ,y) {
    const { context, painter, panPosition, zoom } = this.state
    painter.onMouseDown(x, y, context, panPosition, zoom)
  }

  onMouseUp(x, y) {
    const { context, painter, panPosition, zoom } = this.state
    painter.onMouseUp(x, y, context, panPosition, zoom)
  }

  onZoom(value) {
    var newZoom = this.state.zoom + value
    if (newZoom > 1.5) { newZoom = 1.5 }
    if (newZoom < 0.5) { newZoom = 0.5 }
    this.setState({ zoom: newZoom })
  }

  getInformation() {
    const { mousePosition, panPosition, zoom, debug } = this.state
    return {
      mousePosition: mousePosition,
      panPosition: panPosition,
      zoom: zoom,
      debug: debug
    }
  }

  createBuffer(bufferName) {
    // Calling get will create a buffer, if it doesnt exist
    this.state.painter.getBuffer(bufferName)
  }

  addToBuffer(drawable, bufferName = "base") {
    this.state.painter.addToBuffer(drawable, bufferName)
  }

  removeFromBuffer(drawable, bufferName = "base") {
    this.state.painter.removeFromBuffer(drawable, bufferName)
  }

  calculateFps(time) {
    const { fpsStartTime, fpsCounter } = this.state

    if (time - fpsStartTime > 1000) {
      this.setState({
        fpsCurrent: fpsCounter+1,
        fpsCounter: 0,
        fpsStartTime: time,
        //panPosition: { x: panPosition.x + 5, y: panPosition.y }
      })
    } else {
      this.setState({ fpsCounter: fpsCounter+1 })
    }
  }

  addDebugElementsToScene() {
    const { fpsText, mouseText, zoomText, debugButton } = this.state

    // Draw engine stuff last in the ui buffer
    this.addToBuffer(fpsText, "ui")
    this.addToBuffer(mouseText, "ui")
    this.addToBuffer(zoomText, "ui")
    this.addToBuffer(debugButton, "ui")
  }

  updateDebugInfo() {
    const {
      fpsText, mouseText, zoomText, debugButton, fpsCurrent,
      mousePosition, mouseDragging, zoom, debug
    } = this.state

    fpsText.text = "FPS: " + fpsCurrent
    mouseText.text = "Mouse: " + mousePosition.x + ", " + mousePosition.y + ", dragging: " + mouseDragging
    zoomText.text = "Zoom: " + Math.round(zoom * 100) + "%"
    debugButton.setText("Debug: " + debug)
  }

  tick() {
    const { context, width, height, painter, isSetup, mousePosition, panPosition, zoom } = this.state
    const { canvasId } = this.props
    const now = new Date()

    this.calculateFps(now)

    // Clear
    context.save()
    context.clearRect(0, 0, width, height)

    // Render the buffers
    if (!isSetup) {
      this.setupScene() // Implemented by the derived classes
      this.addDebugElementsToScene()
      this.setState({ isSetup: true })
    }

    // Update text
    this.updateDebugInfo()

    // Render the scene
    painter.paint(context, mousePosition, panPosition, zoom)

    // Restore
    context.restore()

    // Frame time
    this.setState({ frameTime: new Date() - now })

    requestAnimationFrame(this.tick)
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
