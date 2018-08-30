class Payload extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    submitUrl: PropTypes.string
  }

  state = {
    payload: this.props.task.payload,
    edit: false,
    feedback: {message: null, className: null}
  }

  constructor(props) {
    super(props)
  }

  handleEdit(){
    this.clearFeedback()
    this.toggleEdit()
  }

  toggleEdit(){
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

  clearFeedback(){
    this.setState({feedback: {message: null, className: null}})
  }

  setFeedback(message, error = true){
    className = "has-text-success"

    if (error){
      className = "has-text-danger"
    }

    this.setState({feedback: {message: message, className: className}})
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
          if (response.result == "success"){
            comp.setFeedback(response.message, false)
            comp.setState({payload: response.payload})
            comp.toggleEdit()
          } else {
            comp.setFeedback(response.message)
          }
        },
        error: function(response) {
          comp.setFeedback(response.responseText)
        }
      })
    }
  }

  updatePayload(){
    try {
      return JSON.parse($("#payload-textarea").val())
    } catch(error) {
      this.setFeedback("Invalid JSON payload")
      return false
    }
  }

  renderPayload(){
    if (this.state.edit){
      return <textarea
               id="payload-textarea"
               className="textarea"
               rows="20"
               defaultValue={JSON.stringify(this.state.payload, null, 2)}>
             </textarea>
    } else {
      return <span><pre>{JSON.stringify(this.state.payload, null, 2)}</pre></span>
    }
  }

  syntaxHighlight(json) {
      if (typeof json != 'string') {
           json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          return '<span className="' + cls + '">' + match + '</span>';
      });
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

  renderFeedback(){
    feedback = this.state.feedback
    return <span className={feedback.className} id="feedback">{feedback.message}</span>
  }

  render(){
    return <section id="payload" className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <span>Payload</span>
            <span><a className={this.editButtonClass()} onClick={this.handleEdit.bind(this)}>Edit</a></span>
          </h1>
          <h2 className="subtitle">
            {this.renderFeedback()}
            {this.renderPayload()}
            {this.renderSubmitButton()}
          </h2>

        </div>
      </div>
    </section>
  }
}
