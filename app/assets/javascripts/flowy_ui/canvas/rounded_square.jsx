class RoundedSquare extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.radius = attributes.radius
  }

  draw(ctx, x, y) {
    ctx.save()
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor
    }
    ctx.strokeStyle = this.strokeColor
    if (typeof this.radius === 'undefined') {
      this.radius = 5
    }
    if (typeof this.radius === 'number') {
      this.radius = { tl: this.radius, tr: this.radius, br: this.radius, bl: this.radius }
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
      for (var side in defaultRadius) {
        this.radius[side] = this.radius[side] || defaultRadius[side]
      }
    }
    ctx.beginPath()
    ctx.moveTo(x + this.radius.tl, y)
    ctx.lineTo(x + this.width - this.radius.tr, y)
    ctx.quadraticCurveTo(x + this.width, y, x + this.width, y + this.radius.tr)
    ctx.lineTo(x + this.width, y + this.height - this.radius.br)
    ctx.quadraticCurveTo(x + this.width, y + this.height, x + this.width - this.radius.br, y + this.height)
    ctx.lineTo(x + this.radius.bl, y + this.height)
    ctx.quadraticCurveTo(x, y + this.height, x, y + this.height - this.radius.bl)
    ctx.lineTo(x, y + this.radius.tl)
    ctx.quadraticCurveTo(x, y, x + this.radius.tl, y)
    ctx.closePath()
    if (this.fillColor) {
      ctx.fill()
    }
    ctx.stroke()
    ctx.restore()
  }
}
