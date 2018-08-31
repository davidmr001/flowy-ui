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
        onClick: attributes.onCloseRequested,
        offsetX: attributes.width - 30
      })
      this.addChild(this.closeButton)
    }
  }
}
