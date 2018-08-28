class TextBox extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.text = new Text(attributes)
    this.square = new RoundedSquare(attributes)
  }

  adjust(ctx) {
    // Adjust box with if text is bigger
    const textWidth = this.text.getTextWidth(ctx)
    if (textWidth > this.width) {
      this.width = textWidth + 20
      this.square.width = this.width
    }
  }

  draw(ctx, x, y) {
    this.square.draw(ctx, x, y)
    // Here we need to counteract the centered attribute on the text
    if (this.drawCentered) {
      this.text.draw(ctx, x + this.width / 2, y + this.height / 2)
    } else {
      this.text.draw(ctx, x, y)
    }
  }
}
