class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
    console.log(this.props.blueprint)
  }

  draw() {
    blueprint = this.props.blueprint;
    const { context, mousePosition } = this.state;

    tasks = []
    for (var tier in blueprint.tiered_structure) {
      height = (parseInt(tier) + 1) * 200;
      width = 700 / blueprint.tiered_structure[tier].length;
      for(var task_index in blueprint.tiered_structure[tier]) {
        task = blueprint.tiered_structure[tier][task_index];
        tasks.push(new BlueprintTask(width, height, 150, 70, { id: task.id, key: task.key }, 14));
        width = width*2;
      }
    }

    for (var task in tasks) {
      tasks[task].draw(context, mousePosition.x, mousePosition.y);
    }
  }
}
