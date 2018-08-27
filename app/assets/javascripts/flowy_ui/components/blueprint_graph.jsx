class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      square: new Square(300, 300),
      roundedSquare: new RoundedSquare(200, 200, 50),
      ellipse: new Ellipse(250, 100),
      textBox: new TextBox(150, 70, "Vote Pedro", 14),

      fun: new Ellipse(100, 100),
    };
  }

  draw() {
    const { canvasId, width, height, } = this.props;
    const { context, mousePosition, square, roundedSquare, ellipse, textBox, fun } = this.state;

    // TODO: Draw the blueprint
    square.draw(context, 400, 400, "black", "blue");
    roundedSquare.draw(context, 400, 400, "black", "green");
    ellipse.draw(context, 400, 400, "black", "red");
    textBox.draw(context, 400, 400, "red", "black", "orange");

    fun.draw(context, mousePosition.x, mousePosition.y, "black", "pink");
  }
}
