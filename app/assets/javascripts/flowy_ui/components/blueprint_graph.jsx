class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      squary: new Square(200, 200),
    };
  }

  draw() {
    const { canvasId, width, height, } = this.props;
    const { context, squary } = this.state;

    // TODO: Draw the blueprint
    squary.paint(context, 40, 40, "black", "blue");
  }
}
