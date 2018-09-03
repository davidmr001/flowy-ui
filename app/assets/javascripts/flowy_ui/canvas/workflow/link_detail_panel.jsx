class LinkDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.link = attributes.link

    console.log(this.link)

    this.setupContent()
  }

  setupContent() {
    this.addChild(
      new Text({
        text: this.link.source_task.name + " -> " + this.link.target_task.name,
        size: 16,
        bold: true,
        center: false,
        offsetX: 20,
        offsetY: 40
      })
    )

    var contentY = 75

    if (this.link.class_source !== "true") {
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
    } else {
      this.addChild(
        new Text({
          text: "Nothing to see here...",
          size: 12,
          center: false,
          offsetX: 20,
          offsetY: contentY
        })
      )
    }
  }

  onViewSourceClicked() {
    modal.setTitle("Source code between " + this.link.source_task.name + " and " + this.link.target_task.name)
    modal.setContent("<pre>" + this.link.class_source + "</pre>")
    modal.open()
  }
}
