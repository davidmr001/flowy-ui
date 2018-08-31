class TaskDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.task = attributes.task

    this.setupContent()
  }

  setupContent() {
    this.addChild(new Text({ text: this.task.name, textSize: 14, center: false, offsetX: 10, offsetY: 25 }))
    this.addChild(new Text({ text: "State: " + this.task.state, textSize: 14, center: false, offsetX: 10, offsetY: 60 }))
  }
}
