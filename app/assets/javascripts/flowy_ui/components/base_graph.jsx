class BaseGraph extends CanvasRenderer {
  setupScene() {
    const object = this.props.object;
    const { context, mousePosition } = this.state;

    tasks = {}
    for (var tier in object.tiered_tasks) {
      y = (parseInt(tier) + 1) * 200;
      base_width = 1400 / (object.tiered_tasks[tier].length + 1);
      x = base_width
      for(var task_index in object.tiered_tasks[tier]) {
        task = object.tiered_tasks[tier][task_index];
        tasks[task.id] = new this.taskClass({
          x: x,
          y: y,
          width: 150,
          height: 70,
          task: task,
          textSize: 14
        });
        x = x + base_width;
      }
    }

    links = {}
    for (const i in object.links) {
      const link = object.links[i]
      links[link.id] = new this.linkClass({
        startTask: tasks[link.source_task_id],
        endTask: tasks[link.target_task_id]
      })
    }

    for (const i in tasks) {
      const task = tasks[i]
      this.addToRenderBuffer("tasks", task)
    }

    for (const i in links) {
      const link = links[i]
      this.addToRenderBuffer("links", link)
    }
  }
}
