class BlueprintGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
  }

  draw() {
    blueprint = this.props.blueprint;
    const { context, mousePosition } = this.state;

    tasks = {}
    for (var tier in blueprint.tiered_tasks) {
      height = (parseInt(tier) + 1) * 200;
      width = 1400 / (blueprint.tiered_tasks[tier].length + 1);
      for(var task_index in blueprint.tiered_tasks[tier]) {
        task = blueprint.tiered_tasks[tier][task_index];
        tasks[task.id] = new BlueprintTask(width, height, 150, 70, task, 14);
        width = width*2;
      }
    }

    links = {}
    for (var link in blueprint.links) {
      link = blueprint.links[link]
      links[link.id] = new BlueprintTaskLink(tasks[link.source_task_id], tasks[link.target_task_id])
    }

    for (var task in tasks) {
      tasks[task].draw(context, mousePosition.x, mousePosition.y);
    }

    for (var link in links) {
      links[link].draw(context);
    }
  }
}
