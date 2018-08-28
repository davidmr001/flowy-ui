class TaskLink {
  constructor(startTask, endTask) {
    this.startTask = startTask;
    this.endTask = endTask;
  }

  draw(ctx) {
    // Figure out the connection points and draw the arrow lines
    const startX = this.startTask.x;
    const startY = this.startTask.y + this.startTask.height / 2;
    const endX = this.endTask.x;
    const endY = this.endTask.y - this.endTask.height / 2;

    // Draw
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }
}
