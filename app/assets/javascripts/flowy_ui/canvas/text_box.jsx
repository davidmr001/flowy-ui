class TextBox {
  constructor(width, height, text, textSize) {
    this.text = new Text(text, textSize);
    this.square = new RoundedSquare(width, height, 10);
  }

  draw(ctx, x, y, textColor, squareStrokeColor, squareFillColor, centered = true) {
    // Adjust box with if text is bigger
    const textWidth = this.text.getTextWidth(ctx)
    if (textWidth > this.square.width) {
      this.square.width  = textWidth + 20;
      this.width = this.square.width; // For children
    }

    this.square.draw(ctx, x, y, squareStrokeColor, squareFillColor, centered);
    this.text.draw(ctx, x, y, textColor, centered);
  }
}
