class Task extends Button {
  constructor(parent, attributes) {
    super({
      ...attributes,
      text: attributes.task.name + " (" + attributes.task.id + ")"
    })

    this.parent = parent // Parent graph
    this.task = attributes.task
    this.selected = attributes.selected

    if (this.task.class_source) {
      this.sourceCodeCard = new SourceCodeCard(300, 300, this.task.class_source)
    }
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
      width: 300,
      height: 500,
      closeable: true,
      onCloseRequested: comp.closeInfoPanel.bind(this),
      task: comp.task,
      offsetX: this.width + 20
    })
    comp.addChild(comp.infoPanel)
  }

  closeInfoPanel() {
    this.removeChild(this.infoPanel)
    this.infoPanel = null
  }

  drawSelectionStroke(ctx) {
    new RoundedSquare({
      width: this.width + THEME.taskSelectionBorder,
      height: this.height + THEME.taskSelectionBorder,
      color: THEME.highlightColor,
      lineWidth: THEME.taskSelectionBorderLineWidth,
      shadow: 0
    }).drawSquare(ctx, this.x - THEME.taskSelectionBorder / 2, this.y - THEME.taskSelectionBorder / 2)
  }

  draw(ctx) {
    // Detect mouse over
    const originalBackgroundColor = this.square.backgroundColor
    if (this.mouseOver) {
      this.square.backgroundColor = shadeBlend(-0.1, this.square.backgroundColor)
    }

    // Draw a broader stroke if selected
    if (this.selected) {
      this.drawSelectionStroke(ctx)
    }

    super.draw(ctx)

    if (this.infoPanel) {
      this.infoPanel.draw(ctx)
    }

    this.square.backgroundColor = originalBackgroundColor
  }
}
