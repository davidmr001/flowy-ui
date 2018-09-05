class InstanceGraph extends BaseGraph {
  constructor(props) {
    super(props)

    this.taskClass = InstanceTask
    this.linkClass = TaskLink
  }

  setupScene() {
    super.setupScene()
    this.setupLegendPanel()
    this.setupActionCable()
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

  setupActionCable() {
    const comp = this
    App.cable.subscriptions.create(
      {
        channel: "Flowy::InstanceTaskChannel",
        // Specify which instance to subscribe to (i.e. tasks for this instance)
        instance_id: comp.props.object.id
      },
      {
        connected: function() {
          // Called when the subscription is ready for use on the server
          console.log("Connected")
        },
        disconnected: function() {
          // Called when the subscription has been terminated by the server
          console.log("Disconnected")
        },
        received: function(data) {
          // Called when there's incoming data on the websocket for this channel
          // console.log("task update received")
          // console.log(data)

          // Look and update the task
          for (const i in comp.tasks) {
            var taskDrawable = comp.tasks[i]
            if (taskDrawable.task.id === data.task.id) {
              taskDrawable.task = data.task
              taskDrawable.updateColors()
              break
            }
          }
        }
      }
    )
  }
}
