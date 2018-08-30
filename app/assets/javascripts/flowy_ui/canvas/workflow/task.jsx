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
  //       this.color = "black"
  //       this.backgorundColor = "white"
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
    new RoundedSquare({
      width: this.width + THEME.taskSelectionBorder,
      height: this.height + THEME.taskSelectionBorder,
      color: THEME.highlightColor,
      lineWidth: THEME.taskSelectionBorderLineWidth,
      shadow: 0
    }).drawSquare(ctx, this.x - THEME.taskSelectionBorder / 2, this.y - THEME.taskSelectionBorder / 2)
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
