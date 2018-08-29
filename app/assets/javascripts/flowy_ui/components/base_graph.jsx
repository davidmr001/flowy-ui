class BaseGraph extends Canvas {
  constructor(props) {
    super(props)

    this.tasks = []
    this.selectedTaskId = null

    // TODO: Detect canvas click events to select a particular task
  }

  onClick(x, y) {
    const drawableClicked = super.onClick(x, y)

    if (drawableClicked && drawableClicked.constructor.name === "Task") {
      this.selectedTaskId = drawableClicked.task.id
    } else {
      this.selectedTaskId = null
    }
  }

  setupScene() {
    const object = this.props.object;
    const { context, mousePosition } = this.state;

    for (var tier in object.tiered_tasks) {
      y = (parseInt(tier) + 1) * 200;
      base_width = 1400 / (object.tiered_tasks[tier].length + 1);
      x = base_width
      for(var task_index in object.tiered_tasks[tier]) {
        task = object.tiered_tasks[tier][task_index];
        this.tasks[task.id] = new this.taskClass({
          x: x,
          y: y,
          width: 150,
          height: 70,
          task: task,
          textSize: 14,
          selected: this.selectedTaskId === task.id
        });
        x = x + base_width;
      }
    }

    links = {}
    for (const i in object.links) {
      const link = object.links[i]
      links[link.id] = new this.linkClass({
        startTask: this.tasks[link.source_task_id],
        endTask: this.tasks[link.target_task_id]
      })
    }

    for (const i in this.tasks) {
      const task = this.tasks[i]
      this.addToBuffer(task)
    }

    for (const i in links) {
      const link = links[i]
      this.addToBuffer(link)
    }
  }
}
