class InstanceTask extends Task {
  setColorsFromState() {
    this.text.strokeColor = "#000000"
    this.square.fillColor = "#ffffff"

    if (INSTANCE_TASK_STATES[this.task.state]){
      this.text.strokeColor = INSTANCE_TASK_STATES[this.task.state]["strokeColor"]
      this.square.fillColor = INSTANCE_TASK_STATES[this.task.state]["fillColor"]
    }
  }
}
