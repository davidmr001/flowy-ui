class Square extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.backgroundColor = attributes.backgroundColor
  }

  draw(ctx) {
    ctx.save()
    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()

    super.draw(ctx)
  }
}
