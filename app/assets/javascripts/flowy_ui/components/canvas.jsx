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
    painter: new Painter()
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

    this.eventListener = new EventListener(this, canvas)

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

  onClick(x, y) {
    const { context, panPosition, zoom } = this.state

    // By default return the drawable caught by the painter
    return this.state.painter.onClick(x, y, context, panPosition, zoom)
  }

  onZoom(value) {
    this.setState({ zoom: this.state.zoom + value })
    console.log("zoom: " + this.state.zoom)
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
      painter
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
    painter.clear()

    // Render the buffers
    this.setupScene() // Implemented by the derived classes

    // Draw engine stuff last in the ui buffer
    fpsText.text = "FPS: " + fpsCurrent
    painter.addToBuffer(fpsText, 10, 24, "ui")
    mouseText.text = "Mouse: " + mousePosition.x + ", " + mousePosition.y + ", dragging: " + mouseDragging
    painter.addToBuffer(mouseText, 10, 44, "ui")

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
