class LinkDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.link = attributes.link

    this.setupContent()
  }

  setupContent() {
    this.addChild(new Text({ text: "Bigus Linkus", textSize: 14, center: false, offsetX: 10, offsetY: 25 }))
    // this.addChild(new Text({ text: "State: " + this.task.state, textSize: 14, center: false, offsetX: 10, offsetY: 60 }))
  }
}
