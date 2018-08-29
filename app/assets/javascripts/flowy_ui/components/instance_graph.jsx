class InstanceGraph extends BaseGraph {
  constructor(props) {
    super(props)
    this.taskClass = InstanceTask
    this.linkClass = TaskLink
  }

  setupScene() {
    super.setupScene()
    this.buildLegend()
  }

  buildLegend() {
    states = Object.keys(INSTANCE_TASK_STATES)
    x = 1180
    startY = 800 - (states.length * 40)
    spacingY = 40

    y = startY

    for (var i=0; i < states.length; i++) {
      this.addToBuffer(
        new Square({
          x: x,
          y: y,
          width: 20,
          height: 20,
          fillColor: INSTANCE_TASK_STATES[states[i]]["fillColor"]
        }),
        { bufferName: "ui" }
      )

      this.addToBuffer(
        new Text({
          text: states[i],
          x: x + 20,
          y: y + 5,
          center: false
        }),
        { bufferName: "ui" }
      )
      y = y + spacingY;
    }

  }
}
