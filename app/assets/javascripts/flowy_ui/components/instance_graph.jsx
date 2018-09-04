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
        x: this.state.width - 115,
        y: this.state.height - 200,
        open: false,
        openDirection: "top",
        contentTextSize: 10,
        buttonWidth: 100,
        buttonHeight: 30,
        buttonText: "Legend",
        buttonTextSize: 12,
        buttonBackgroundColor: THEME.highlightColor,
        panelWidth: 200,
        panelHeight: 300,
        panelBackgroundColor: THEME.panelBackgroundColor,
        spacing: 5,
        buttonPlacement: "bottomRight"
      })
      , "ui"
    )
  }
}
