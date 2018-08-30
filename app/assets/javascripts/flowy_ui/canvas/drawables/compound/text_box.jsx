class TextBox extends Drawable {
  constructor(attributes) {
    super(attributes)

    this.label = new Text({
      text: attributes.text,
      color: attributes.textColor,
      size: attributes.textSize,
      center: true
    })
    this.square = new RoundedSquare({
      width: attributes.width,
      height: attributes.height,
      backgroundColor: attributes.backgroundColor
    })

    this.addChild(this.square)
    this.addChild(this.label)
  }

  adjust(ctx) {
    // Never forget to call super
    super.adjust(ctx)

    // Adjust box with if text is bigger
    const textWidth = this.label.getTextWidth(ctx)
    if (textWidth > this.width) {
      this.width = textWidth + 20
      this.square.width = this.width
    }
  }

  setText(text) {
    this.label.text = text
  }

  setPosition(x, y) {
    super.setPosition(x, y)

    // Move the text to the center of the square
    this.label.setPosition(
      this.label.x + this.square.width / 2,
      this.label.y + this.square.height / 2
    )
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.square.isMouseOver()
  }
}
