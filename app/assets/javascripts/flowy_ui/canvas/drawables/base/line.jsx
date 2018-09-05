class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      color: attributes.color || THEME.strokeColor,
      center: false
    })

    this.lineWidth = attributes.lineWidth || 1
    this.lineCap = attributes.lineCap || "round"
    this.width = attributes.endX - attributes.x
    this.height = attributes.endY - attributes.y
    this.arrow = attributes.arrow
    this.arrowAngle = attributes.arrowAngle || 15
    this.arrowAngle = this.arrowAngle * Math.PI / 180
    this.arrowLength = attributes.arrowLength || 20
    this.arrowBackgroundColor = attributes.arrowBackgroundColor || THEME.strokeColor

    if (attributes.isSelectable) {
      this.selectionCircle = new Ellipse({
        width: 30,
        height: 30,
        color: this.color,
        backgroundColor: THEME.panelBackgroundColor,
        offsetX: this.width / 2 - 15,
        offsetY: this.height / 2 - 15
      })
      this.addChild(this.selectionCircle)
    }
  }

  isMouseOver() {
    if (this.selectionCircle) {
      return this.selectionCircle.isMouseOver()
    }
  }

  drawArrow(ctx) {
    // Calculate the angled lines required
    var endPoint = {
      x: this.x + this.width,
      y: this.y + this.height
    }
    var targetPoint1 = {
      x: this.width * Math.cos(this.arrowAngle) - this.height * Math.sin(this.arrowAngle),
      y: this.height * Math.cos(this.arrowAngle) + this.width * Math.sin(this.arrowAngle)
    }
    var targetPoint2 = {
      x: this.width * Math.cos(-this.arrowAngle) - this.height * Math.sin(-this.arrowAngle),
      y: this.height * Math.cos(-this.arrowAngle) + this.width * Math.sin(-this.arrowAngle)
    }
    const normalVector1 = normalizeVector(targetPoint1)
    const normalVector2 = normalizeVector(targetPoint2)
    targetPoint1 = {
      x: endPoint.x - normalVector1.x * this.arrowLength,
      y: endPoint.y - normalVector1.y * this.arrowLength,
    }
    targetPoint2 = {
      x: endPoint.x - normalVector2.x * this.arrowLength,
      y: endPoint.y - normalVector2.y * this.arrowLength,
    }

    ctx.save()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.lineCap = 'round'
    ctx.fillStyle = this.arrowBackgroundColor
    ctx.beginPath()
    ctx.moveTo(targetPoint1.x, targetPoint1.y)
    ctx.lineTo(targetPoint2.x, targetPoint2.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.lineTo(targetPoint1.x, targetPoint1.y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  draw(ctx) {
    ctx.save()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.width, this.y + this.height)
    ctx.stroke()
    ctx.restore()

    if (this.arrow) {
      this.drawArrow(ctx)
    }

    if (this.selectionCircle) {
      this.selectionCircle.draw(ctx)
    }

    if (this.canvasInformation && this.canvasInformation.debug && this.isMouseOver()) {
      new Square({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        color: "#ff0000"
      }).draw(ctx)
    }

    super.draw(ctx)
  }
}
