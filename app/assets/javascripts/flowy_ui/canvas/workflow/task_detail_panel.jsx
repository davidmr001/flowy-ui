class TaskDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.task = attributes.task

    this.setupContent()
  }

  setupContent() {
    this.addChild(
      new Text({
        text: this.task.name,
        size: 16,
        bold: true,
        center: false,
        offsetX: 20,
        offsetY: 40
      })
    )

    var contentY = 75

    var stateColor = INSTANCE_TASK_STATES[this.task.state]
    stateColor = stateColor ? stateColor["backgroundColor"] : THEME.textColor
    this.addChild(
      new Text({
        text: "State: " + (this.task.state || "N/A"),
        size: 12,
        color: stateColor,
        center: false,
        offsetX: 20,
        offsetY: 60
      })
    )
    contentY += 15

    if (this.task.type === "InstanceTask") {
      this.addChild(
        new Button({
          text: "View Payload",
          textColor: THEME.panelBackgroundColor,
          textSize: 10,
          width: 100,
          height: 30,
          backgroundColor: THEME.buttonSuccessBackground,
          center: false,
          offsetX: 20,
          offsetY: contentY,
          onClick: this.onViewPayloadClicked.bind(this)
        })
      )
      contentY += 60

      this.addChild(
        new Button({
          text: "Restart",
          textColor: THEME.panelBackgroundColor,
          textSize: 10,
          width: 100,
          height: 30,
          backgroundColor: THEME.buttonErrorBackground,
          center: false,
          offsetX: 20,
          offsetY: contentY,
          onClick: this.onViewRestartTaskClicked.bind(this)
        })
      )
      contentY += 60
    }

    this.addChild(
      new Button({
        text: "View Source",
        textSize: 10,
        width: 100,
        height: 30,
        center: false,
        offsetX: 20,
        offsetY: contentY,
        onClick: this.onViewSourceClicked.bind(this)
      })
    )
  }

  onViewSourceClicked() {
    modal.setTitle("Source code for task " + this.task.name)
    modal.setContent("<pre>" + this.task.class_source + "</pre>")
    modal.open()
  }

  onViewPayloadClicked() {
    modal.setTitle("Payload for task " + this.task.name)
    modal.setContent("<pre>" + JSON.stringify(this.task.payload, null, 2) + "</pre>")
    modal.open()
  }

  onViewRestartTaskClicked() {
    modal.setTitle("Restarting task " + this.task.name)
    // The react component inside the modal will show the appropriate information and actions
    PubSub.publish('TASK_RESTART', 'show');
    modal.open()
  }
}
