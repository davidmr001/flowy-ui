class BlueprintGraph extends CanvasRenderer {
  draw() {
    const { canvasId, width, height, } = this.props;
    const { context } = this.state;

    // TODO: Draw the blueprint

    this.drawSquare(50, 50, 100, 100, "black", "green");
    this.drawSquare(150, 150, 100, 100, "red");
  }
}
