class Text {
  constructor(text, size) {
    this.text = text;
    this.size = size;
  }

  draw = (context, x, y, color, center) => {
    context.save();
    context.strokeStyle = color;
    context.font = this.size + "pt serif";
    context.fillText(this.text, x, y);
    context.restore();
  }
}
