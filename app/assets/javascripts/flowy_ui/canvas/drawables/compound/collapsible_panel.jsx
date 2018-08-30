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
    this.buttonPlacement = attributes.buttonPlacement || "topRight"
    this.spacing = attributes.spacing || 0
  }

  onClick() {
    // Toggle
    this.open = !this.open
  }

  setPosition(x, y) {
    // Never forget to call super
    super.setPosition(x, y)

    const buttonPosition  = { x: x, y: y }

    switch (this.buttonPlacement) {
      case "topRight":
        buttonPosition.x += this.panel.width - this.button.width
        buttonPosition.y -= this.button.height + this.spacing
        break
      case "bottomLeft":
        buttonPosition.y += this.panel.height + this.spacing
        break
      case "bottomRight":
        buttonPosition.x += this.panel.width - this.button.width
        buttonPosition.y += this.panel.height + this.spacing
        break
      default:
      case "topLeft":
        buttonPosition.y -= this.button.height + this.spacing
    }

    this.button.setPosition(buttonPosition.x, buttonPosition.y)
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
    if (this.buttonPlacement === "topLeft" || this.buttonPlacement === "topRight") {
      this.button.draw(ctx)
    }

    if (this.open) {
      this.panel.draw(ctx)
    }

    if (this.buttonPlacement === "bottomLeft" || this.buttonPlacement === "bottomRight") {
      this.button.draw(ctx)
    }
  }
}
