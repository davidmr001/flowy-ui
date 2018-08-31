class CollapsiblePanel extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: attributes.panelWidth,
      height: attributes.panelHeight
    })

    this.open = attributes.open || false
    this.openDirection = attributes.openDirection
    this.buttonPlacement = attributes.buttonPlacement || "topRight"
    this.spacing = attributes.spacing || 0

    const comp = this

    this.panel = new Panel({
      width:           attributes.panelWidth,
      height:          attributes.panelHeight,
      backgroundColor: attributes.panelBackgroundColor
    })
    const buttonOffset = this.calculateButtonOffset(attributes.buttonWidth, attributes.buttonHeight)
    this.button = new Button({
      width:           attributes.buttonWidth,
      height:          attributes.buttonHeight,
      text:            attributes.buttonText,
      textSize:        attributes.buttonTextSize,
      backgroundColor: attributes.buttonBackgroundColor,
      onClick:         comp.toggle.bind(comp),
      offsetX:         buttonOffset.x,
      offsetY:         buttonOffset.y
    })

    this.addChild(this.panel)
    this.addChild(this.button)
  }

  calculateButtonOffset(buttonWidth, buttonHeight) {
    switch (this.buttonPlacement) {
      case "topRight":
        return {
          x: this.panel.width - buttonWidth,
          y: - buttonHeight - this.spacing
        }
        break
      case "bottomLeft":
        return {
          x: 0,
          y: this.panel.height + this.spacing
        }
        break
      case "bottomRight":
        return {
          x: this.panel.width - buttonWidth,
          y: this.panel.height + this.spacing
        }
        break
      default:
      case "topLeft":
        return {
          x: 0,
          y: - buttonHeight - this.spacing
        }
    }
    return { x: 0, y: 0 }
  }

  toggle() {
    // Toggle
    this.open = !this.open
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
