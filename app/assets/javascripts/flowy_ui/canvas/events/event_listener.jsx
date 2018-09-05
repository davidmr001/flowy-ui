class EventListener {
  constructor(subscriber, domElement) {
    this.subscriber = subscriber
    this.setup(domElement)
  }

  setup(domElement) {
    const subscriber = this.subscriber
    this.setupMouseMove(domElement, subscriber)
    this.setupMouseDown(domElement, subscriber)
    this.setupMouseUp(domElement, subscriber)
    this.setupMouseEnterAndLeave(domElement, subscriber)
    this.setupMouseClick(domElement, subscriber)
    this.setupScroll(domElement, subscriber)
  }

  setupScroll(domElement, subscriber) {
    domElement.addEventListener('wheel', function(evt) {
      subscriber.onZoom(evt.wheelDelta > 0 ? 0.05 : -0.05)
      evt.preventDefault() // Dont scroll the window
    }, false)
  }

  setupMouseClick(domElement, subscriber) {
    domElement.addEventListener('click', function(evt) {
      const diffX = Math.abs(subscriber.state.mouseDragStartPosition.x - evt.clientX)
      const diffY = Math.abs(subscriber.state.mouseDragStartPosition.y - evt.clientY)

      if (diffX > 3 || diffY > 3) {
        evt.preventDefault()
        return // Means we dragged, so no clicky
      }
      const rect = domElement.getBoundingClientRect()
      subscriber.onClick(evt.clientX - rect.left, evt.clientY - rect.top)
    }, false)
  }

  setupMouseEnterAndLeave(domElement, subscriber) {
    domElement.addEventListener('mouseenter', function(evt) {
      subscriber.setState({ mouseDragging: false })
    }, false)

    domElement.addEventListener('mouseleave', function(evt) {
      subscriber.setState({ mouseDragging: false })
    }, false)
  }

  setupMouseUp(domElement, subscriber) {
    domElement.addEventListener('mouseup', function(evt) {
      const rect = domElement.getBoundingClientRect()
      subscriber.setState({ mouseDragging: false }, function() {
        subscriber.onMouseUp(evt.clientX - rect.left, evt.clientY - rect.top)
      })
    }, false)
  }

  setupMouseDown(domElement, subscriber) {
    domElement.addEventListener('mousedown', function(evt) {
      const rect = domElement.getBoundingClientRect()
      subscriber.setState({
        mouseDragging: true,
        mouseDragPosition: { x: evt.clientX, y: evt.clientY },
        mouseDragStartPosition: { x: evt.clientX, y: evt.clientY }
      }, function() {
        subscriber.onMouseDown(evt.clientX - rect.left, evt.clientY - rect.top)
      })
    }, false)
  }

  setupMouseMove(domElement, subscriber) {
    domElement.addEventListener('mousemove', function(evt) {
      const rect = domElement.getBoundingClientRect()
      var state = {
        mousePosition: {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        },
        panPosition: subscriber.state.panPosition
      }
      if (subscriber.state.mouseDragging) {
        state.panPosition.x += evt.clientX - subscriber.state.mouseDragPosition.x
        state.panPosition.y += evt.clientY - subscriber.state.mouseDragPosition.y

        state.mouseDragPosition = { x: evt.clientX, y: evt.clientY }
      }
      subscriber.setState(state)
    }, false)
  }
}
