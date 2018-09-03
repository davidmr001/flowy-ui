class TaskRestart extends React.Component {
  static propTypes = {}

  state = {
    hidden: true,
    confirm: false,
    confirmMessage: null,
    restartFunction: null
  }

  componentDidMount() {
    const comp = this
    PubSub.subscribe('TASK_RESTART', function(message, data) {
      if (data === "show") {
        comp.setState({ hidden: false })
      } else {
        cancelRestart()
        comp.setState({ hidden: true })
      }
    })
  }

  // TODO: Fix this

  confirmRestart(message, restartFunction) {
    this.setState({ confirm: true, confirmMessage: message, restartFunction: restartFunction })
  }

  cancelRestart() {
    this.setState({ confirm: false, confirmMessage: null, restartFunction: null })
  }

  restartTaskOnly() {
    this.confirmRestart("Are you sure you want to restart this task only?", function() {
      // Called if the user confirms restarting this task only
      console.log("Restart task only")
    })
  }

  restartInstanceFromHere() {
    this.confirmRestart("Are you sure you want to restart the whole instance, starting from this task?", function() {
      // Called if the user confirms restarting the whole instance
      console.log("Restart instance")
    })
  }

  render() {
    if (this.state.hidden) {
      return (<div />)
    }

    if (this.state.confirm) {
      return (
        <div>
          <p className="content">{this.state.confirmMessage}</p>
          <button onClick={this.state.restartFunction.bind(this)}>Yes</button>
          &nbsp;or&nbsp;
          <button onClick={this.cancelRestart.bind(this)}>Cancel</button>
        </div>
      )
    }

    return (
      <div>
        <p className="content">There are two ways to restart this task:</p>
        <p className="content">
          <button onClick={this.restartTaskOnly.bind(this)}>Restart this task only</button>
          &nbsp;or&nbsp;
          <button onClick={this.restartInstanceFromHere.bind(this)}>Restart the whole instance from here</button>
        </p>
        <p className="content">Press the appropriate button to continue, or cancel by closing this window.</p>
      </div>
    )
  }
}
