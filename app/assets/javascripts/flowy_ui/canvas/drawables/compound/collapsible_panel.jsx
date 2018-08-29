class CollapsiblePanel extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: attributes.panel.width,
      height: attributes.panel.height
    })

    this.square = new RoundedSquare({
      ...attributes.panel,
      x: attributes.x,
      y: attributes.y
    })
    this.button = new Button({
      ...attributes.button,
      x: attributes.x,
      y: attributes.y,
      onClick: this.onClickCallback
    })

    // TODO: Fix the callback and position

    // this.open = attributes.open || false
    this.open = attributes.open || false
    this.openDirection = attributes.openDirection
  }

  setCanvasInformation(canvasInformation) {
    super.setCanvasInformation(canvasInformation)

    this.square.setCanvasInformation(canvasInformation)
    this.button.setCanvasInformation(canvasInformation)
  }

  adjust(ctx) {
    // Never forget to call super
    super.adjust(ctx)

    // Also update information on our components (panning, etc)
    this.square.x = this.x
    this.square.y = this.y
    // this.button.x = this.x + this.button.width / 2
    // this.button.y = this.y + this.square.height
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.button.isMouseOver()
  }

  onClickCallback() {
    console.log("open: " + this.open)
    // Toggle
    this.open = !this.open
  }

  draw(ctx) {
    super.draw(ctx)

    if (this.open) {
      this.square.draw(ctx)

      // TODO: Draw contents
    }
    this.button.draw(ctx)
  }
}
