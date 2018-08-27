class TextBox {
  constructor(width, height, text, textSize) {
    this.square = new Square(width, height);
    this.text = new Text(text, textSize);
  }

  draw = (ctx, x, y, textColor, squareStrokeColor, squareFillColor, centered = true) => {
    this.square.draw(ctx, x, y, squareStrokeColor, squareFillColor, centered);
    this.text.draw(ctx, x, y, textColor, centered);
  }
}
