class LinkDetailPanel extends Panel {
  constructor(attributes) {
    super(attributes)

    this.link = attributes.link

    this.setupContent()
  }

  setupContent() {
    this.addChild(
      new Text({
        text: "From: " + this.link.source_task.name,
        size: 14,
        bold: true,
        center: false,
        offsetX: 20,
        offsetY: 40
      })
    )

    this.addChild(
      new Text({
        text: "To: " + this.link.target_task.name,
        size: 14,
        bold: true,
        center: false,
        offsetX: 20,
        offsetY: 75
      })
    )

    var contentY = 110

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
    genericModal.setTitle("Source code between " + this.link.source_task.name + " and " + this.link.target_task.name)
    const content = "<pre><code className=\"ruby\">" + this.link.class_source + "</code></pre>"
    genericModal.setContent(content)
    genericModal.open()
  }
}
