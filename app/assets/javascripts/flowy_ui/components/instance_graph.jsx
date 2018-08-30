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
        buttonTextSize: 12,
        buttonBackgroundColor: THEME.highlightColor,
        panelWidth: 200,
        panelHeight: 260,
        panelBackgroundColor: THEME.panelBackgroundColor
      })
      , "ui"
    )
  }
}
