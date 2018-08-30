class Square extends Drawable {
  draw(ctx) {
    ctx.save()
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    ctx.strokeStyle = this.color
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()

    super.draw(ctx)
  }
}
