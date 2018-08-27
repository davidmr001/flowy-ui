class RoundedSquare {
  constructor(width, height, curvature) {
    this.width = width;
    this.height = height;
    this.curvature = curvature;
  }

  drawRoundRectCentered = (ctx, x, y, width, height, radius, color, fill) => {
    this.drawRoundRect(ctx, x-width/2, y-height/2, width, height, radius, color, fill);
  }

  drawRoundRect = (ctx, x, y, width, height, radius, color, fill) => {
    ctx.save();
    if (fill) {
      ctx.fillStyle = fill;
    }
    ctx.strokeStyle = color;
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    ctx.stroke();
    ctx.restore();
  }

  draw = (ctx, x, y, color, fill = null, center = true) => {
    if (center) {
      this.drawRoundRectCentered(ctx, x, y, this.width, this.height, this.curvature, color, fill);
    } else {
      this.drawRoundRect(ctx, x, y, this.width, this.height, this.curvature, color, fill);
    }
  }
}
