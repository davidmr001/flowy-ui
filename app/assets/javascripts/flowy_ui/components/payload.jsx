class Payload extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    submitUrl: PropTypes.string
  }

  state = {
    payload: this.props.task.payload,
    edit: false,
    error: null
  }

  constructor(props) {
    super(props)
  }

  toggleEdit(){
    this.clearError()
    this.setState({edit: !this.state.edit})
  }

  editButtonClass(){
    var className = "button"
    if (this.state.edit){
      return className + " is-light"
    } else {
      return className
    }
  }

  clearError(){
    this.setState({error: null})
  }

  setError(error){
    this.setState({error: error})
  }

  submit(){
    payload = this.updatePayload()
    if (payload){
      //ajax
      var comp = this
      $.ajax({
        url: this.props.submitUrl,
        method: "patch",
        data: {
          instance_task: {
            payload: payload,
            cenas: 'cenas'
          }
        },
        success: function(response) {
          comp.setState({payload: response.payload})
          comp.toggleEdit()
        },
        error: function(response) {
          comp.setError(response.responseText)
        }
      })
    }
  }

  updatePayload(){
    try {
      payload = JSON.parse($("#payload-textarea").val())
      return payload
    } catch(error) {
      this.setState({error: "Invalid JSON payload set"})
      return false
    }
  }

  renderPayload(){
    if (this.state.edit){
      return <textarea
               id="payload-textarea"
               className="textarea"
               rows="20"
               defaultValue={JSON.stringify(this.state.payload)}>
             </textarea>
    } else {
      return JSON.stringify(this.state.payload, null, 2)
    }
  }

  renderSubmitButton(){
    if (this.state.edit){
      return <span>
        <a className="button" onClick={this.submit.bind(this)}>Save Changes</a>
      </span>
    } else {
      return <span/>
    }
  }

  render(){
    return <section id="payload" className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <span>Payload</span>
            <span><a className={this.editButtonClass()} onClick={this.toggleEdit.bind(this)}>Edit</a></span>
          </h1>
          <h2 className="subtitle">
            {this.renderPayload()}
            {this.renderSubmitButton()}
          </h2>
          <span className="has-text-danger" id="error">{this.state.error}</span>
        </div>
      </div>
    </section>
  }
}
