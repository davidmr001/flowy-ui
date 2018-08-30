class CollapsiblePanel extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: attributes.panel.width,
      height: attributes.panel.height
    })

    this.square = new RoundedSquare(attributes.panel)
    this.button = new Button(attributes.button)

    this.addChild(this.square)
    this.addChild(this.button)
    const content = this.setupContent(attributes)
    if (content) {
      this.square.addChild(content)
    }

    this.open = attributes.open || false
    this.openDirection = attributes.openDirection
  }

  onClick() {
    // Toggle
    this.open = !this.open
  }

  setPosition(x, y) {
    // Never forget to call super
    super.setPosition(x, y)

    // Move the button to the bottom of the square
    // Propagate to children
    this.button.setPosition(
      this.button.x + this.button.width / 2,
      this.button.y + this.square.height
    )
  }

  setupContent(attributes) {
    // Extending components should return a drawable here to be included
    // as a child of square
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.button.isMouseOver()
  }

  draw(ctx) {
    if (this.open) {
      this.square.draw(ctx)
    }
    this.button.draw(ctx)
  }
}
