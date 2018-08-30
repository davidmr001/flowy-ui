class Task extends Button {
  constructor(attributes) {
    super({
      ...attributes,
      text: attributes.task.name + " (" + attributes.task.id + ")"
    })

    this.task = attributes.task
    this.selected = attributes.selected

    // this.on = true
    // this.startTime = new Date()

    this.mouseOverColor = this.fillColor

    if (this.task.class_source) {
      this.sourceCodeCard = new SourceCodeCard(300, 300, this.task.class_source)
    }

    // this.animating = this.task.state == "ERROR"
    // this.animationPulse = 500 // ms
  }

  // swapColorsIfAnimating() {
  //   const now = new Date()
  //   if (now - this.startTime > this.animationPulse) {
  //     this.startTime = now
  //     if (this.on) {
  //       this.textColor = "black"
  //       this.fillColor = "white"
  //     } else {
  //       this.setColorsFromState()
  //     }
  //     this.on = !this.on
  //   }
  // }

  //
  // Shades a color by a percentage, or mixes two colors
  //

  drawSelectionStroke(ctx) {
    // new Ellipse({
    //   strokeColor: "#22aa22",
    //   lineWidth: 10
    // }).drawEllipse(ctx, this.x-20, this.y-20, this.width+40, this.height+40)

    new RoundedSquare({
      width: this.width + 10,
      height: this.height + 10,
      strokeColor: "#bbddbb",
      lineWidth: 10,
      shadow: 0
    }).drawSquare(ctx, this.x - 5, this.y - 5)

    // ctx.save()
    // ctx.strokeStyle = "#005500"
    // ctx.lineWidth = 15
    // ctx.strokeRect(this.x, this.y, this.width, this.height)
    // ctx.restore()
  }

  draw(ctx) {
    // if (this.animating) {
    //   this.swapColorsIfAnimating()
    // }

    // Adjust box with if text is bigger
    // const textWidth = this.text.getTextWidth(ctx)
    // if (textWidth > this.width) {
    //   this.width  = textWidth + 20
    // }

    // Detect mouse over
    const originalBackgroundColor = this.square.backgroundColor
    if (this.mouseOver) {
      this.square.backgroundColor = shadeBlend(-0.1, this.square.backgroundColor)
    }

    // Draw a broader stroke if selected
    if (this.selected) {
      this.drawSelectionStroke(ctx)
    }

    super.draw(ctx)

    this.square.backgroundColor = originalBackgroundColor

    // if (isMouseOver && this.sourceCodeCard) {
    //   this.sourceCodeCard.draw(ctx, mouseX + 50, mouseY)
    // }
  }
}
