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
    debug: true
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
      fpsText:   new Text({ x: 10, y: 24, textSize: 12, strokeColor: "#000000", center: false }),
      mouseText: new Text({ x: 10, y: 38, textSize: 12, strokeColor: "#000000", center: false }),
      zoomText:  new Text({ x: 10, y: 52, textSize: 12, strokeColor: "#000000", center: false }),
      debugText: new Text({ x: 10, y: 66, textSize: 12, strokeColor: "#000000", center: false }),
    })

    requestAnimationFrame(this.tick)
  }

  onClick(x, y) {
    const { context, painter, panPosition, zoom } = this.state

    // By default return the drawable caught by the painter
    return painter.onClick(x, y, context, panPosition, zoom)
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

  addToBuffer(drawable, options = {}) {
    const { x, y, bufferName } = options
    const { painter, mousePosition, panPosition } = this.state
    painter.addToBuffer(drawable, x, y, bufferName, mousePosition, panPosition)
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
      panPosition,
      zoom,
      zoomText,
      debug,
      debugText,
      painter,
      isSetup
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
    if (!isSetup) {
      this.setupScene() // Implemented by the derived classes

      // TODO: Remove
      painter.addToBuffer(new Button({
        x: 200,
        y: 200,
        width: 100,
        height: 50,
        text: "Button1",
        textSize: 14,
        fillColor: "#00ff00",
        onClick: function() {
          console.log("Clicked")
        }
      }))

      painter.addToBuffer(new CollapsiblePanel({
        x: 400,
        y: 400,
        open: true,
        openDirection: "top",
        button: {
          width: 100,
          height: 50,
          text: "Button1",
          textSize: 14,
          fillColor: "#00ff00"
        },
        panel: {
          width: 200,
          height: 500,
          fillColor: "#ffffff"
        }
      }))

      // Draw engine stuff last in the ui buffer
      painter.addToBuffer(fpsText, "ui")
      painter.addToBuffer(mouseText, "ui")
      painter.addToBuffer(zoomText, "ui")
      painter.addToBuffer(debugText, "ui")

      this.setState({ isSetup: true })
    }

    // Update text
    fpsText.text = "FPS: " + fpsCurrent
    mouseText.text = "Mouse: " + mousePosition.x + ", " + mousePosition.y + ", dragging: " + mouseDragging
    zoomText.text = "Zoom: " + Math.round(zoom * 100) + "%"
    debugText.text = "Debug: " + debug

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
