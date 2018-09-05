class InstanceTask extends Task {
  constructor(parent, attributes) {
    super(parent, attributes)
    this.updateColors()
  }

  updateColors() {
    if (INSTANCE_TASK_STATES[this.task.state]) {
      this.label.color = INSTANCE_TASK_STATES[this.task.state]["color"]
      this.square.backgroundColor = INSTANCE_TASK_STATES[this.task.state]["backgroundColor"]
    } else {
      this.label.color = INSTANCE_TASK_STATES["NULL"]["color"]
      this.square.backgroundColor = INSTANCE_TASK_STATES["NULL"]["backgroundColor"]
    }
  }
}
