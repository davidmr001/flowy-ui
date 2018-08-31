class TaskStateLegendPanel extends CollapsiblePanel {
  constructor(attributes) {
    super(attributes)
    this.setupContent()
  }

  setupContent() {
    const drawX = this.x
    var drawY = 0
    const spacingY = 40
    states = Object.keys(INSTANCE_TASK_STATES)

    for (var i=0; i < states.length; i++) {
      if (states[i] === "NULL") continue
      this.panel.addChild(
        new TaskStateLegendItem({
          squareWidth: 20,
          squareHeight: 20,
          squareBackgroundColor: INSTANCE_TASK_STATES[states[i]]["backgroundColor"],
          text: states[i],
          textSize: 10,
          center: false,
          offsetX: 20,
          offsetY: drawY + 20
        })
      )
      drawY += spacingY
    }
  }
}
