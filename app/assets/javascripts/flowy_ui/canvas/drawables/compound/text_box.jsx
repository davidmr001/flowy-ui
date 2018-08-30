class TextBox extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.text = new Text(attributes)
    this.square = new RoundedSquare(attributes)
    this.addChild(this.square)
    this.addChild(this.text)
  }

  adjust(ctx) {
    // Never forget to call super
    super.adjust(ctx)

    // Adjust box with if text is bigger
    const textWidth = this.text.getTextWidth(ctx)
    if (textWidth > this.width) {
      this.width = textWidth + 20
      this.square.width = this.width
    }
  }

  setPosition(x, y) {
    super.setPosition(x, y)

    // Move the text to the center of the square
    this.text.setPosition(
      this.text.x + this.square.width / 2,
      this.text.y + this.square.height / 2
    )
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.square.isMouseOver()
  }
}
