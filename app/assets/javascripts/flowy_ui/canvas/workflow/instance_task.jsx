class InstanceTask extends Task {
  constructor(attributes) {
    super(attributes)

    if (INSTANCE_TASK_STATES[this.task.state]) {
      this.label.color = INSTANCE_TASK_STATES[this.task.state]["color"]
      this.square.backgroundColor = INSTANCE_TASK_STATES[this.task.state]["backgroundColor"]
    } else {
      this.label.color = INSTANCE_TASK_STATES["NULL"]["color"]
      this.square.backgroundColor = INSTANCE_TASK_STATES["NULL"]["backgroundColor"]
    }
  }
}
