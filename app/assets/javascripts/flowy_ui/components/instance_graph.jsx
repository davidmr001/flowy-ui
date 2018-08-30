class InstanceGraph extends BaseGraph {
  constructor(props) {
    super(props)
    this.taskClass = InstanceTask
    this.linkClass = TaskLink
  }

  setupScene() {
    super.setupScene()

    this.setupLegendPanel()
  }

  setupLegendPanel() {
    this.addToBuffer(
      new TaskStateLegendPanel({
        x: this.state.width - 150,
        y: this.state.height - 160,
        open: false,
        openDirection: "top",
        contentTextSize: 10,
        button: {
          width: 100,
          height: 30,
          text: "Legend",
          textSize: 14,
          fillColor: "#00ff00"
        },
        panel: {
          width: 200,
          height: 260,
          fillColor: "#ffffff"
        }
      })
      , "ui"
    )
  }
}
