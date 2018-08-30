class CollapsiblePanel extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: attributes.panelWidth,
      height: attributes.panelHeight
    })

    this.panel = new RoundedSquare({
      width:           attributes.panelWidth,
      height:          attributes.panelHeight,
      backgroundColor: attributes.panelBackgroundColor
    })
    this.button = new Button({
      width:           attributes.buttonWidth,
      height:          attributes.buttonHeight,
      text:            attributes.buttonText,
      textSize:        attributes.buttonTextSize,
      backgroundColor: attributes.buttonBackgroundColor,
    })

    this.addChild(this.panel)
    this.addChild(this.button)
    const content = this.setupContent(attributes)
    if (content) {
      this.panel.addChild(content)
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

    // Move the button to the bottom of the panel
    // Propagate to children
    this.button.setPosition(
      this.button.x + this.button.width / 2,
      this.button.y + this.panel.height + 5
    )
  }

  setupContent(attributes) {
    // Extending components should return a drawable here to be included
    // as a child of panel
  }

  // // Compound drawables need to override isMouseOver
  isMouseOver() {
    return this.button.isMouseOver()
  }

  draw(ctx) {
    if (this.open) {
      this.panel.draw(ctx)
    }
    this.button.draw(ctx)
  }
}
