class SourceCodeCard {
  constructor(width, height, code) {
    this.code = code;
    this.width = width;
    this.square = new RoundedSquare(width, height, 10);
  }

  draw(ctx, x, y) {

    this.square.draw(ctx, x, y, "black", "white", false);

    ctx.save();
    ctx.fillStyle = "red";
    ctx.font = "16pt serif";
    ctx.fillText("Source code", x + 10, y + 30);
    ctx.restore();

    ctx.wrapText(this.code, x + 10, y + 50, this.width - 20, 16);
  }
}
