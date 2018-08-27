class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      square: new Square(200, 200),
      roundedSquare: new RoundedSquare(200, 200, 50),
      ellipse: new Ellipse(300, 200),
    };
  }

  draw() {
    const { canvasId, width, height, } = this.props;
    const { context, square, roundedSquare, ellipse } = this.state;

    // TODO: Draw the blueprint
    square.draw(context, 40, 40, "black", "blue");
    roundedSquare.draw(context, 80, 80, "black", "green");
    ellipse.draw(context, 120, 120, "black", "red");
  }
}
