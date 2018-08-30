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
    const originalBackgroundColor = this.square.backgroundColor
    if (this.isMouseOver()) {
      this.square.backgroundColor = shadeBlend(-0.1, this.square.backgroundColor)
    }

    // Draw
    super.draw(ctx)

    // Reset fill color
    this.square.backgroundColor = originalBackgroundColor
  }
}
