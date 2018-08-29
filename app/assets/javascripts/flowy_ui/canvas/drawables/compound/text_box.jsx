class TextBox extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.text = new Text(attributes)
    this.square = new RoundedSquare(attributes)
  }

  setCanvasInformation(canvasInformation) {
    super.setCanvasInformation(canvasInformation)

    this.text.setCanvasInformation(canvasInformation)
    this.square.setCanvasInformation(canvasInformation)
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

    // Also update information on our components (panning, etc)
    this.square.x = this.x
    this.square.y = this.y
    this.text.x = this.x + this.square.width / 2
    this.text.y = this.y + this.square.height / 2
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.square.isMouseOver()
  }

  draw(ctx) {
    super.draw(ctx)

    this.square.draw(ctx)
    this.text.draw(ctx)
  }
}
