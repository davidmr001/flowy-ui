class Ellipse extends Drawable {
  drawEllipse(ctx, x, y, w, h) {
    ctx.save();
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
    }
    ctx.strokeStyle = this.color;
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    //ctx.closePath(); // not used correctly, see comments (use to close off open path)
    if (this.fillColor) {
      ctx.fill();
    }
    ctx.stroke();
    ctx.restore();
  }

  draw(ctx, x, y) {
    this.drawEllipse(ctx, x, y, this.width, this.height);

    super.draw(ctx)
  }
}
