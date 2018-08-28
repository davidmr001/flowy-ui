class TestGraph extends CanvasRenderer {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      square: new Square({ width: 300, height: 300, strokeColor: "#ff0000" }),
      square2: new Square({ width: 300, height: 300, strokeColor: "#ff0000", fillColor: "#00ff00" }),
      roundedSquare: new RoundedSquare({ width: 200, height: 200, radius: 50, fillColor: "#0000ff" }),
      ellipse: new Ellipse({ width: 250, height: 100, strokeColor: "#000000", fillColor: "#ff0000" }),
      textBox: new TextBox({ width: 150, height: 70, text: "TextBox", textSize: 14, fillColor: "#ffffff" }),
      text: new Text({ width: 150, height: 70, text: "Simple Text", textSize: 14, strokeColor: "#00ff00" }),
      blueprintTask1: new Task({ width: 100, height: 70, textSize: 14, task: { id: 1, name: "NORMAL TASK" } }),
      blueprintTask2: new Task({ width: 200, height: 70, textSize: 14, task: { id: 2, name: "COMPLETED TASK", state: "COMPLETED" } }),
      blueprintTask3: new Task({ width: 150, height: 70, textSize: 14, task: { id: 2, name: "ERROR TASK", state: "ERROR" } }),

      fun: new Ellipse({ width: 13, height: 13, fillColor: "green" }),
    }

    this.state = {
      ...this.state,
      blueprintTaskLink: new TaskLink(this.state.blueprintTask1, this.state.blueprintTask2)
    }
  }

  setupScene() {
    const { canvasId, width, height, } = this.props
    const {
      context, mousePosition, square, roundedSquare, ellipse, textBox, text,
      blueprintTask1, blueprintTask2, blueprintTask3, blueprintTaskLink,
      fun, square2
    } = this.state

    // Add to render buffers
    this.addToRenderBuffer("ui", square, 300, 300)
    this.addToRenderBuffer("base", square2, 400, 400)
    this.addToRenderBuffer("base", roundedSquare, 400, 400)
    this.addToRenderBuffer("base", ellipse, 400, 400)
    this.addToRenderBuffer("ui", textBox, 400, 400)
    this.addToRenderBuffer("ui", text, 600, 400)
    this.addToRenderBuffer("base", blueprintTask1, 700, 500)
    this.addToRenderBuffer("base", blueprintTask2, 700, 600)
    this.addToRenderBuffer("base", blueprintTask3, 700, 700)

    const funPos = fun.mousePosition ? fun.mousePosition : { x: -1, y: -1 }
    this.addToRenderBuffer("ui", fun, funPos.x, funPos.y)

    // blueprintTask1.draw(context, mousePosition.x, mousePosition.y)
    // blueprintTask2.draw(context, mousePosition.x, mousePosition.y)
    // blueprintTask3.draw(context, mousePosition.x, mousePosition.y)
    // blueprintTaskLink.draw(context)

    //fun.draw(context, mousePosition.x, mousePosition.y, "black", "green")
  }
}
