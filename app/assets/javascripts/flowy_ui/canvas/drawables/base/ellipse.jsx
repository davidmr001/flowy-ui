class Ellipse extends Drawable {
  constructor(attributes) {
    super(attributes)
    this.backgroundColor = attributes.backgroundColor
    this.lineWidth = attributes.lineWidth
  }

  drawEllipse(ctx, x, y, w, h) {
    ctx.save()
    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor
    }
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.lineWidth
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2       // y-middle

    ctx.beginPath()
    ctx.moveTo(x, ym)
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
    ctx.closePath() // not used correctly, see comments (use to close off open path)
    if (this.backgroundColor) {
      ctx.fill()
    }
    ctx.stroke()
    ctx.restore()
  }

  draw(ctx) {
    this.drawEllipse(ctx, this.x, this.y, this.width, this.height)

    super.draw(ctx)
  }
}
