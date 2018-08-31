class TaskStateLegendItem extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      width: attributes.squareWidth,
      height: attributes.squareHeight
    })

    this.square = new Square({
      width: attributes.squareWidth,
      height: attributes.squareHeight,
      backgroundColor: attributes.squareBackgroundColor
    })
    this.text = new Text({
      text: attributes.text,
      color: attributes.textColor,
      size: attributes.textSize,
      center: false,
      offsetX: 30,
      offsetY: 15
    })

    this.addChild(this.square)
    this.addChild(this.text)
  }
}
