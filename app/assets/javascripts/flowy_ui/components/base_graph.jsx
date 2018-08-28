class BaseGraph extends CanvasRenderer {
  constructor(props) {
    super(props);
  }

  draw() {
    object = this.props.object;
    const { context, mousePosition } = this.state;

    tasks = {}
    for (var tier in object.tiered_tasks) {
      height = (parseInt(tier) + 1) * 200;
      base_width = 1400 / (object.tiered_tasks[tier].length + 1);
      width = base_width
      for(var task_index in object.tiered_tasks[tier]) {
        task = object.tiered_tasks[tier][task_index];
        tasks[task.id] = new this.taskClass(width, height, 150, 70, task, 14);
        width = width + base_width;
      }
    }

    links = {}
    for (var link in object.links) {
      link = object.links[link]
      links[link.id] = new this.linkClass(tasks[link.source_task_id], tasks[link.target_task_id])
    }

    for (var task in tasks) {
      tasks[task].draw(context, mousePosition.x, mousePosition.y);
    }

    for (var link in links) {
      links[link].draw(context);
    }
  }
}
