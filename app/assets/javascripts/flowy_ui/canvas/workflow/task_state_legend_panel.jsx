class TaskStateLegendPanel extends CollapsiblePanel {
  constructor(attributes) {
    super(attributes)
    this.setupContent()
  }

  setPosition(x, y) {
    super.setPosition(x, y)

    // Draw the states in the proper positions
    const drawX = x
    var drawY = y
    const spacingY = 40

    for (const i in this.panel.kids) {
      const legendItem = this.panel.kids[i]

      // The close button is also a child, so skip that one
      if (legendItem === this.panel.closeButton) continue

      legendItem.setPosition(drawX + 20, drawY + 20)
      drawY += spacingY;
    }
  }

  setupContent() {
    states = Object.keys(INSTANCE_TASK_STATES)
    for (var i=0; i < states.length; i++) {
      if (states[i] === "NULL") continue
      this.panel.addChild(
        new TaskStateLegendItem({
          x: this.x,
          y: this.y,
          squareWidth: 20,
          squareHeight: 20,
          squareBackgroundColor: INSTANCE_TASK_STATES[states[i]]["backgroundColor"],
          text: states[i],
          textSize: 10,
          center: false
        })
      )
    }
  }
}
