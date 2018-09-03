class EventListener {
  constructor(subscriber, domElement) {
    this.subscriber = subscriber
    this.setup(domElement)
  }

  setup(domElement) {
    const comp = this.subscriber

    domElement.addEventListener('mousemove', function(evt) {
      const rect = domElement.getBoundingClientRect()
      var state = {
        mousePosition: {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        },
        panPosition: comp.state.panPosition
      }
      if (comp.state.mouseDragging) {
        state.panPosition.x += evt.clientX - comp.state.mouseDragPosition.x
        state.panPosition.y += evt.clientY - comp.state.mouseDragPosition.y

        state.mouseDragPosition = { x: evt.clientX, y: evt.clientY }
      }
      comp.setState(state)
    }, false)

    domElement.addEventListener('mousedown', function(evt) {
      const rect = domElement.getBoundingClientRect()
      comp.setState({
        mouseDragging: true,
        mouseDragPosition: { x: evt.clientX, y: evt.clientY },
        mouseDragStartPosition: { x: evt.clientX, y: evt.clientY }
      }, function() {
        comp.onMouseDown(evt.clientX - rect.left, evt.clientY - rect.top)
      })
    }, false)

    domElement.addEventListener('mouseup', function(evt) {
      const rect = domElement.getBoundingClientRect()
      comp.setState({ mouseDragging: false }, function() {
        comp.onMouseUp(evt.clientX - rect.left, evt.clientY - rect.top)
      })
    }, false)

    domElement.addEventListener('mouseenter', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)

    domElement.addEventListener('mouseleave', function(evt) {
      comp.setState({ mouseDragging: false })
    }, false)

    domElement.addEventListener('click', function(evt) {
      const diffX = Math.abs(comp.state.mouseDragStartPosition.x - evt.clientX)
      const diffY = Math.abs(comp.state.mouseDragStartPosition.y - evt.clientY)

      if (diffX > 3 || diffY > 3) {
        evt.preventDefault()
        return // Means we dragged, so no clicky
      }
      const rect = domElement.getBoundingClientRect()
      comp.onClick(evt.clientX - rect.left, evt.clientY - rect.top)
    }, false)

    domElement.addEventListener('wheel', function(evt) {
      comp.onZoom(evt.wheelDelta > 0 ? 0.05 : -0.05)
      evt.preventDefault() // Dont scroll the window
    }, false)
  }
}
