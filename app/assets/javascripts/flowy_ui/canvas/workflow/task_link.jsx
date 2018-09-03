class TaskLink extends Line {
  constructor(parent, attributes) {
    super({
      ...attributes,
      isSelectable: true,
      isClickable: true
    })

    this.selected = attributes.selected
    this.parent = parent
    this.link = attributes.link
  }

  onClick() {
    if (!this.selected) {
      this.parent.selectLink(this)
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
    comp.infoPanel = new LinkDetailPanel({
      x: comp.originalX + comp.width / 2,
      y: comp.originalY + comp.height / 2,
      width: 350,
      height: 150,
      closeable: true,
      onCloseRequested: comp.setSelected.bind(this, false),
      link: comp.link,
      center: false
    })
    this.parent.addToBuffer(comp.infoPanel, "taskLinkDetails")
  }

  closeInfoPanel() {
    if (!this.infoPanel) return

    this.parent.removeFromBuffer(this.infoPanel, "taskLinkDetails")
    this.infoPanel = null
  }

  drawSelectionStroke(ctx) {
    new Line({
      x: this.x,
      y: this.y,
      endX: this.x + this.width,
      endY: this.y + this.height,
      color: THEME.linkSelectionLineColor,
      lineWidth: THEME.linkSelectionBorderLineWidth,
    }).draw(ctx)
  }

  draw(ctx) {
    // Draw a broader stroke if selected
    if (this.selected) {
      this.drawSelectionStroke(ctx)
    }

    // Detect mouse over
    const originalBackgroundColor = this.color
    const originalLineWidth = this.lineWidth
    if (this.isMouseOver()) {
      this.color = shadeBlend(0.75, this.color)
      this.lineWidth = 5
    }

    super.draw(ctx)

    this.color = originalBackgroundColor
    this.lineWidth = originalLineWidth
  }
}
