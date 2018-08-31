class Task extends Button {
  constructor(parent, attributes) {
    super({
      ...attributes,
      text: attributes.task.name + " (" + attributes.task.id + ")"
    })

    this.parent = parent // Parent graph
    this.task = attributes.task
    this.selected = attributes.selected
  }

  onClick() {
    if (!this.selected) {
      this.parent.selectTask(this)
    } else {
      this.setSelected(false)
    }
  }

  setSelected(selected) {
    this.selected = selected
    if (selected) {
      this.openInfoPanel()
    } else {
      this.closeInfoPanel()
    }
  }

  openInfoPanel() {
    if (this.infoPanel) return

    const comp = this
    comp.infoPanel = new TaskDetailPanel({
      x: comp.originalX + comp.width / 2 + 20,
      y: comp.originalY - comp.height / 2,
      width: 300,
      height: 500,
      closeable: true,
      onCloseRequested: comp.setSelected.bind(this, false),
      task: comp.task,
      center: false
    })
    this.parent.addToBuffer(comp.infoPanel, "taskDetails")
  }

  closeInfoPanel() {
    if (!this.infoPanel) return

    this.parent.removeFromBuffer(this.infoPanel, "taskDetails")
    this.infoPanel = null
  }

  drawSelectionStroke(ctx) {
    new RoundedSquare({
      width: this.width + THEME.taskSelectionBorder,
      height: this.height + THEME.taskSelectionBorder,
      color: THEME.taskSelectionLineColor,
      lineWidth: THEME.taskSelectionBorderLineWidth,
      shadow: 0
    }).drawSquare(ctx, this.x - THEME.taskSelectionBorder / 2, this.y - THEME.taskSelectionBorder / 2)
  }

  draw(ctx) {
    // Draw a broader stroke if selected
    if (this.selected) {
      this.drawSelectionStroke(ctx)
    }

    super.draw(ctx)
  }
}
