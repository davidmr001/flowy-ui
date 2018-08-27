class BlueprintTask extends TextBox {
  constructor(x, y, width, height, task) {
    super(width, height, task.key + " (" + task.id + ")", 14);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // TODO: Augment with more task specific data
  }

  draw(ctx) {
    super.draw(ctx, this.x, this.y, "black", "black", "white", true);
  }
}
