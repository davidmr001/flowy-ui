class BaseGraph extends Canvas {
  deselectEverything() {
    for (const i in this.tasks) {
      this.tasks[i].setSelected(false)
    }
    for (const i in this.links) {
      this.links[i].setSelected(false)
    }
  }

  selectTask(task) {
    this.deselectEverything()
    task.setSelected(true)
  }

  selectLink(link) {
    this.deselectEverything()
    link.setSelected(true)
  }

  setupScene() {
    // Setup drawables
    const object = this.props.object;

    // Make sure the links buffer is added before the tasks (so links appear under tasks)
    this.createBuffer("taskLinks")

    this.tasks = this.setupTaskDrawables(object)
    this.links = this.setupLinkDrawables(object)
  }

  setupTaskDrawables(object) {
    var tasks = []

    for (var tier in object.tiered_tasks) {
      y = (parseInt(tier) + 1) * 200;
      base_width = this.state.width / (object.tiered_tasks[tier].length + 1);
      x = base_width
      for(var task_index in object.tiered_tasks[tier]) {
        task = object.tiered_tasks[tier][task_index];
        tasks[task.id] = new this.taskClass(this, {
          x: x,
          y: y,
          width: 150,
          height: 70,
          task: task,
          textSize: 14,
          selected: this.selectedTaskId === task.id,
          backgroundColor: "#ffffff"
        });
        x = x + base_width;
      }
    }

    for (const i in tasks) {
      const task = tasks[i]
      this.addToBuffer(task, "tasks")
    }

    return tasks
  }

  setupLinkDrawables(object) {
    var links = []

    for (const i in object.links) {
      const link = object.links[i]

      const sourceTaskComponent = this.tasks[link.source_task.id]
      const targetTaskComponent = this.tasks[link.target_task.id]
      const attributes = {
        link: link,
        x: sourceTaskComponent.x,
        y: sourceTaskComponent.y + sourceTaskComponent.height / 2,
        endX: targetTaskComponent.x,
        endY: targetTaskComponent.y - sourceTaskComponent.height / 2,
      }

      links[link.id] = new this.linkClass(this, attributes)
    }

    for (const i in links) {
      const link = links[i]
      this.addToBuffer(link, "taskLinks")
    }

    return links
  }
}
