class TaskStateLegendItem extends Drawable {
  constructor(attributes) {
    super(attributes)

    this.square = new Square(attributes.square)
    this.text = new Text(attributes.text)

    this.addChild(this.square)
    this.addChild(this.text)
  }

  setPosition(x, y) {
    super.setPosition(x, y)

    this.text.setPosition(x + 30, y + 15)
  }
}
