class BlueprintGraph extends CanvasRenderer {
  draw() {
    const { canvasId, width, height, } = this.props;
    const { context } = this.state;

    context.save();
    context.translate(100, 100);
    context.fillStyle = "#F00";
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }
}
