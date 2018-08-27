class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      square: new Square(300, 300),
      roundedSquare: new RoundedSquare(200, 200, 50),
      ellipse: new Ellipse(250, 100),
      textBox: new TextBox(150, 70, "TextBox", 14),
      blueprintTask1: new BlueprintTask(700, 500, 150, 70, { id: 1, key: "BLUEPRINT_TASK_1" }, 14),
      blueprintTask2: new BlueprintTask(700, 600, 150, 70, { id: 2, key: "BLUEPRINT_TASK_2" }, 14),

      fun: new Ellipse(100, 100),
    };

    this.state = {
      ...this.state,
      blueprintTaskLink: new BlueprintTaskLink(this.state.blueprintTask1, this.state.blueprintTask2)
    }
  }

  draw() {
    const { canvasId, width, height, } = this.props;
    const {
      context, mousePosition, square, roundedSquare, ellipse, textBox,
      blueprintTask1, blueprintTask2, blueprintTaskLink,
      fun
    } = this.state;

    // TODO: Draw the blueprint
    square.draw(context, 400, 400, "black", "blue");
    roundedSquare.draw(context, 400, 400, "black", "green");
    ellipse.draw(context, 400, 400, "black", "red");
    textBox.draw(context, 400, 400, "red", "black", "orange");
    blueprintTask1.draw(context);
    blueprintTask2.draw(context);
    blueprintTaskLink.draw(context);

    fun.draw(context, mousePosition.x, mousePosition.y, "black", "pink");
  }
}
