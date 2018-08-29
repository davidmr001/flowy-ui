class InstanceTask extends Task {
  constructor(attributes) {
    super(attributes)

    if (INSTANCE_TASK_STATES[this.task.state]) {
      this.text.strokeColor = INSTANCE_TASK_STATES[this.task.state]["strokeColor"]
      this.square.fillColor = INSTANCE_TASK_STATES[this.task.state]["fillColor"]
    }
  }
}
