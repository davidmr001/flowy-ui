class Button extends TextBox {
  constructor(attributes) {
    super(attributes)
    this.onClickCallback = attributes.onClick
  }

  onClick() {
    if (this.onClickCallback) {
      this.onClickCallback()
    }
  }

  draw(ctx) {
    // Detect mouse over
    const originalFillColor = this.square.fillColor
    if (this.isMouseOver()) {
      this.square.fillColor = shadeBlend(-0.1, this.square.fillColor)
    }

    // Draw
    super.draw(ctx)

    // Reset fill color
    this.square.fillColor = originalFillColor
  }
}
