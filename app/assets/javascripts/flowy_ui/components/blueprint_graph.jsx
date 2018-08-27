class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      square: new Square(200, 200),
      roundedSquare: new RoundedSquare(200, 200, 50),
      ellipse: new Ellipse(300, 200),
      fun: new Ellipse(100, 100),
    };
  }

  draw() {
    const { canvasId, width, height, } = this.props;
    const { context, mousePosition, square, roundedSquare, ellipse, fun } = this.state;

    // TODO: Draw the blueprint
    square.draw(context, 40, 60, "black", "blue");
    roundedSquare.draw(context, 80, 100, "black", "green");
    ellipse.draw(context, 120, 140, "black", "red");


    fun.draw(context, mousePosition.x, mousePosition.y, "black", "pink", true);
  }
}
