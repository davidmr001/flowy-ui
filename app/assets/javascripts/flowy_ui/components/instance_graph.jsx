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
        y: this.state.height - 170,
        open: false,
        openDirection: "top",
        contentTextSize: 10,
        buttonWidth: 100,
        buttonHeight: 30,
        buttonText: "Legend",
        buttonTextSize: 14,
        buttonBackgroundColor: "#00ff00",
        panelWidth: 200,
        panelHeight: 260,
        panelBackgroundColor: "#ffffff"
      })
      , "ui"
    )
  }
}
