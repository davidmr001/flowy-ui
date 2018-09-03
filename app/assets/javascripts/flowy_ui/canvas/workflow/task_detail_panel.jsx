class TaskDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.task = attributes.task

    this.setupContent()
  }

  setupContent() {
    this.addChild(new Text({ text: this.task.name, textSize: 14, center: false, offsetX: 10, offsetY: 25 }))
    this.addChild(new Text({ text: "State: " + this.task.state, textSize: 14, center: false, offsetX: 10, offsetY: 60 }))
    this.addChild(
      new Button({
        text: "View Source",
        textColor: THEME.panelBackgroundColor,
        textSize: 10,
        width: 100,
        height: 30,
        backgroundColor: "#30C5FF",
        center: false,
        offsetX: 10,
        offsetY: 95,
        onClick: this.onViewSourceClicked.bind(this)
      })
    )
  }

  onViewSourceClicked() {
    modal.setTitle("Source Code for Task " + this.task.name)
    modal.setContent(this.task.class_source)
    modal.open()
  }
}
