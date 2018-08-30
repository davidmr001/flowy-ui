class Line extends Drawable {
  constructor(attributes) {
    super({
      ...attributes,
      center: false
    })

    this.offsetX = attributes.endX - attributes.x
    this.offsetY = attributes.endY - attributes.y

    this.width = this.endX - this.x
    this.height = this.endY - this.y
  }

  draw(ctx) {
    ctx.save()
    ctx.strokeStyle = this.strokeColor
    ctx.lineWidth = this.lineWidth
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.offsetX, this.y + this.offsetY)
    ctx.stroke()
    ctx.restore()

    super.draw(ctx)
  }
}
