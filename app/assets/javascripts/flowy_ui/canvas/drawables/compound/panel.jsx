class Panel extends RoundedSquare {
  constructor(attributes) {
    super({
      ...attributes,
      backgroundColor: attributes.backgroundColor || "#ffffff"
    })
    this.closeable = attributes.closeable || false

    if (this.closeable) {
      const comp = this
      this.closeButton = new Button({
        width: 30,
        height: 30,
        text: "X",
        onClick: attributes.onCloseRequested
      })
      this.addChild(this.closeButton)
    }
  }

  setPosition(x, y) {
    super.setPosition(x, y)

    // Move close button
    if (this.closeButton) {
      this.closeButton.setPosition(
        x + this.width - this.closeButton.width,
        y
      )
    }
  }
}
