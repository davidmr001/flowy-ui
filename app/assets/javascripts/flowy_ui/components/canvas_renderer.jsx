class CanvasRenderer extends React.Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  state = {
    frameTime: new Date(),
    fpsCounter: 0,
    fpsCurrent: 0,
    fpsStartTime: new Date()
  }

  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { canvasId } = this.props;

    this.setState({ context: document.getElementById(canvasId).getContext("2d") });

    requestAnimationFrame(this.tick);
  }

  tick() {
    const { context, frameTime, fpsCounter, fpsCurrent, fpsStartTime } = this.state;
    const { canvasId, width, height } = this.props;
    const now = new Date();

    if (now - fpsStartTime > 1000) {
      this.setState({
        fpsCurrent: fpsCounter+1,
        fpsCounter: 0,
        fpsStartTime: now
      })
    } else {
      this.setState({ fpsCounter: fpsCounter+1 })
    }

    // Clear
    context.save();
    context.clearRect(0, 0, width, height);

    // Render children code
    this.draw();

    // Draw FPS
    this.drawText(10, 24, "FPS: " + fpsCurrent);

    // Restore
    context.restore();

    // Frame time
    this.setState({ frameTime: new Date() - now });

    requestAnimationFrame(this.tick);
  }

  drawText(x, y, text, size = 14) {
    const { context } = this.state;

    context.save();
    context.font = size + "pt serif";
    context.fillText(text, x, y);
    context.restore();
  }

  drawCircle(x, y, radius, color) {
    const { context } = this.state;

    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    context.restore();
  }

  drawSquare(x, y, width, height, color, fill = undefined) {
    const { context } = this.state;

    context.save();
    if (fill) {
      context.fillStyle = fill;
      context.fillRect(x, y, width, height);
    }
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
    context.restore();
  }

  // Extending classes need to implement draw()

  render() {
    return (
      <canvas
        id={this.props.canvasId}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
