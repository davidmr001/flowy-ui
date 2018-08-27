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
    fpsStartTime: new Date(),
    mousePosition: {
      x: -1,
      y: -1
    }
  }

  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const self = this;
    const { canvasId } = self.props;

    const canvas = document.getElementById(canvasId);
    this.setState({ context: canvas.getContext("2d") });
    canvas.addEventListener('mousemove', function(evt) {
      const rect = canvas.getBoundingClientRect();
      self.setState({
        mousePosition: {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        }
      });
    }, false);

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
    new Text("FPS: " + fpsCurrent, 14).draw(context, 10, 24, "black", false);
    new Text("Mouse: " + this.state.mousePosition.x + ", " + this.state.mousePosition.y, 14).draw(context, 10, 44, "black", false);

    // Restore
    context.restore();

    // Frame time
    this.setState({ frameTime: new Date() - now });

    requestAnimationFrame(this.tick);
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
