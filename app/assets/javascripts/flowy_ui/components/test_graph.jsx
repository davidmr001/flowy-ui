class TestGraph extends Canvas {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      square:  new Square({ x: 300, y: 300, width: 300, height: 300, color: "#ff0000" }),
      square2: new Square({ x: 400, y: 400, width: 300, height: 300, color: "#ff0000", backgroundColor: "#00ff00" }),

      roundedSquare: new RoundedSquare({
        x: 400,
        y: 400,
        width: 200,
        height: 200,
        radius: 50,
        backgroundColor: "#0000ff"
      }),

      ellipse: new Ellipse({ x: 400, y: 400, width: 250, height: 100, color: "#000000", backgroundColor: "#ff0000" }),
      textBox: new TextBox({
        x: 400,
        y: 400,
        width: 150,
        height: 70,
        backgroundColor: "#ff00ff",
        text: "TextBox",
        textSize: 14
      }),

      text: new Text({ x: 600, y: 400, width: 150, height: 70, text: "Simple Text", size: 14, color: "#00ff00" }),

      blueprintTask1: new Task({
        x: 700,
        y: 500,
        width: 100,
        height: 70,
        backgroundColor: "#ffffff",
        textSize: 14,
        task: { id: 1, name: "NORMAL TASK" }
      }),
      blueprintTask2: new Task({
        x: 700,
        y: 600,
        width: 200,
        height: 70,
        backgroundColor: "#ffffff",
        textSize: 14,
        task: { id: 2, name: "COMPLETED TASK", state: "COMPLETED" }
      }),
      blueprintTask3: new Task({
        x: 700,
        y: 700,
        width: 150,
        height: 70,
        backgroundColor: "#ffffff",
        textSize: 14,
        task: { id: 2, name: "ERROR TASK", state: "ERROR" }
      })
    }

    this.state = {
      ...this.state,
      blueprintTaskLink1: new TaskLink({ startTask: this.state.blueprintTask1, endTask: this.state.blueprintTask2 }),
      blueprintTaskLink2: new TaskLink({ startTask: this.state.blueprintTask2, endTask: this.state.blueprintTask3 })
    }
  }

  setupScene() {
    const { canvasId, width, height } = this.props
    const {
      context,  square, roundedSquare, ellipse, textBox, text,
      blueprintTask1, blueprintTask2, blueprintTask3, blueprintTaskLink1, blueprintTaskLink2,
      square2
    } = this.state

    // Add to render buffers
    this.addToBuffer(square, "ui")
    this.addToBuffer(square2)
    this.addToBuffer(roundedSquare)
    this.addToBuffer(ellipse)
    this.addToBuffer(textBox, "ui")
    this.addToBuffer(text, "ui")
    this.addToBuffer(blueprintTask1)
    this.addToBuffer(blueprintTask2)
    this.addToBuffer(blueprintTask3)
    this.addToBuffer(blueprintTaskLink1)
    this.addToBuffer(blueprintTaskLink2)

    // this.addToBuffer(fun, "ui")
  }
}
