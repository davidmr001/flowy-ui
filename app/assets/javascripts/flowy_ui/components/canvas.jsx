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
        state.panPosition.x += evt.clientX - comp.state.mouseDragPosition.x
        state.panPosition.y += evt.clientY - comp.state.mouseDragPosition.y

        state.mouseDragPosition = { x: evt.clientX, y: evt.clientY }
      }
      comp.setState(state)
    }, false)

    canvas.addEventListener('mousedown', function(evt) {
      comp.setState({
        mouseDragging: true,
        mouseDragPosition: { x: evt.clientX, y: evt.clientY },
        mouseDragStartPosition: { x: evt.clientX, y: evt.clientY }
      })
    }, false)

    canvas.addEventListener('mouseup', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)

    canvas.addEventListener('mouseenter', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)

    canvas.addEventListener('mouseleave', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)

    canvas.addEventListener('click', function(evt) {
      if (comp.state.mouseDragStartPosition.x != evt.clientX ||
          comp.state.mouseDragStartPosition.y != evt.clientY) {
        evt.preventDefault()
        return // Means we dragged, so no clicky
      }
      const rect = canvas.getBoundingClientRect()
      comp.onClick(evt.clientX - rect.left, evt.clientY - rect.top)
    }, false)
  }

  onClick(x, y) {
    const { context, panPosition } = this.state

    //console.log("Click at " + x + ", " + y)
    return this.state.painter.onClick(x, y, context, panPosition)
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
    painter.addToBuffer(fpsText, 10, 24, "ui", mousePosition, panPosition)
    mouseText.text = "Mouse: " + mousePosition.x + ", " + mousePosition.y + ", dragging: " + mouseDragging
    painter.addToBuffer(mouseText, 10, 44, "ui", mousePosition, panPosition)

    // Render the scene
    painter.paint(context, panPosition)

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
