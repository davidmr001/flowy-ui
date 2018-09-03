class Button extends TextBox {
  constructor(attributes) {
    super({
      ...attributes,
      color: attributes.color || THEME.buttonStrokeColor,
      isClickable: true
    })
    this.onClickCallback = attributes.onClick
  }

  onClick() {
    if (this.onClickCallback) {
      this.onClickCallback()
    }
  }

  onMouseDown() {
    this.mousePressed = true
  }

  onMouseUp() {
    this.mousePressed = false
  }

  draw(ctx) {
    const originalBackgroundColor = this.square.backgroundColor

    // Detect mouse over
    if (this.mousePressed) {
      this.square.backgroundColor = shadeBlend(-0.2, this.square.backgroundColor)
    } else if (this.isMouseOver()) {
      this.square.backgroundColor = shadeBlend(-0.1, this.square.backgroundColor)
    }

    // Draw
    super.draw(ctx)

    // Reset fill color
    this.square.backgroundColor = originalBackgroundColor
  }
}
