class RoundedSquare extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.radius = attributes.radius || THEME.roundRadius
    this.color = attributes.color || THEME.strokeColor
    this.backgroundColor = attributes.backgroundColor
    this.lineWidth = attributes.lineWidth || 1
    this.shadow = attributes.shadow === 0 ? false : (attributes.shadow || THEME.shadowSize)
  }

  drawSquare(ctx, x, y) {
    ctx.save()

    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor
    }

    if (typeof this.radius === 'number') {
      this.radius = { tl: this.radius, tr: this.radius, br: this.radius, bl: this.radius }
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
      for (var side in defaultRadius) {
        this.radius[side] = this.radius[side] || defaultRadius[side]
      }
    }

    ctx.strokeStyle = this.color
    if (this.lineWidth) {
      ctx.lineWidth = this.lineWidth
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

    if (this.shadow) {
      ctx.shadowBlur = this.shadow;
      ctx.shadowColor = shadeBlend(-0.25, this.backgroundColor);
      ctx.shadowOffsetX = THEME.shadowOffsetX
      ctx.shadowOffsetY = THEME.shadowOffsetY
    }

    if (this.backgroundColor) {
      ctx.fill()
    }
    if (this.color) {
      ctx.stroke()
    }

    ctx.restore()
  }

  draw(ctx) {
    this.drawSquare(ctx, this.x, this.y)

    super.draw(ctx)
  }
}
