class TextBox extends Drawable {
  constructor(attributes) {
    super(attributes)

    this.square = new RoundedSquare({
      width: attributes.width,
      height: attributes.height,
      backgroundColor: attributes.backgroundColor || "#ffffff"
    })
    this.label = new Text({
      text: attributes.text,
      color: attributes.textColor,
      size: attributes.textSize,
      center: true,
      offsetX: attributes.width / 2,
      offsetY: attributes.height / 2
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

      // Update the text offset to take into account a larger square
      this.label.offsetX = this.square.width / 2
      this.label.offsetY = this.square.height / 2
    }
  }

  setText(text) {
    this.label.text = text
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.square.isMouseOver()
  }
}
