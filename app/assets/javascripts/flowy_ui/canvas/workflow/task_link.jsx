class TaskLink extends Line {
  constructor(parent, attributes) {
    super({
      ...attributes,
      isSelectable: true,
      isClickable: true,
      arrow: true
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
      width: 400,
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

  drawCodeIndication(ctx) {
    new Text({
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      text: "C",
      color: THEME.strokeColor
    }).draw(ctx)
  }

  draw(ctx) {
    const originalBackgroundColor = this.color
    const originalLineWidth = this.lineWidth

    // Draw a broader stroke if selected
    if (this.selected) {
      this.color = shadeBlend(0.2, this.color)
      this.lineWidth = THEME.linkSelectionBorderLineWidth
    }

    // Detect mouse over
    if (this.isMouseOver()) {
      this.color = shadeBlend(0.2, this.color)
      this.lineWidth = THEME.linkSelectionBorderLineWidth
    }

    super.draw(ctx)

    // If the link has code, show some indication
    if (this.link.class_source !== "true") {
      this.drawCodeIndication(ctx)
    }

    this.color = originalBackgroundColor
    this.lineWidth = originalLineWidth
  }
}
