class TaskStateLegendPanel extends CollapsiblePanel {
  setPosition(x, y) {
    super.setPosition(x, y)

    // Draw the states in the proper positions
    const drawX = x
    var drawY = y
    const spacingY = 40

    for (const i in this.itemsPanel.kids) {
      const legendItem = this.itemsPanel.kids[i]
      legendItem.setPosition(drawX + 20, drawY + 20)
      drawY += spacingY;
    }
  }

  setupContent(attributes) {
    this.itemsPanel = new Panel({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    })

    states = Object.keys(INSTANCE_TASK_STATES)
    for (var i=0; i < states.length; i++) {
      this.itemsPanel.addChild(
        new TaskStateLegendItem({
          x: this.x,
          y: this.y,
          square: {
            width: 20,
            height: 20,
            fillColor: INSTANCE_TASK_STATES[states[i]]["fillColor"]
          },
          text: {
            text: states[i],
            textSize: attributes.contentTextSize,
            center: false
          }
        })
      )
    }

    return this.itemsPanel
  }
}
