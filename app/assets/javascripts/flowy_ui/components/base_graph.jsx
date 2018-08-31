class BaseGraph extends Canvas {
  constructor(props) {
    super(props)

    this.tasks = []
  }

  selectTask(task) {
    for (const i in this.tasks) {
      this.tasks[i].setSelected(false)
    }
    task.setSelected(true)
  }

  setupScene() {
    const object = this.props.object;

    this.addToBuffer(new Button({
      x: 500,
      y: 500,
      width: 100,
      height: 50,
      text: "Restart",
      backgroundColor: "#00ff00",
      onClick: function() {
        console.log("Clicked")
      }
    }), "ui")

    for (var tier in object.tiered_tasks) {
      y = (parseInt(tier) + 1) * 200;
      base_width = 1400 / (object.tiered_tasks[tier].length + 1);
      x = base_width
      for(var task_index in object.tiered_tasks[tier]) {
        task = object.tiered_tasks[tier][task_index];
        this.tasks[task.id] = new this.taskClass(this, {
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
      this.addToBuffer(task, "tasks")
    }

    for (const i in links) {
      const link = links[i]
      this.addToBuffer(link, "taskLinks")
    }
  }
}
