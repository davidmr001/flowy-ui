class Square extends Drawable {
  draw(ctx, x, y) {
    ctx.save()
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor
      ctx.fillRect(x, y, this.width, this.height)
    }
    ctx.strokeStyle = this.color
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }
}
