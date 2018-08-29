class TaskLink extends Line {
  constructor(attributes) {
    super({
      ...attributes,
      x: attributes.startTask.x,
      y: attributes.startTask.y + attributes.startTask.height / 2,
      endX: attributes.endTask.x,
      endY: attributes.endTask.y - attributes.startTask.height / 2
    })

    this.startTask = attributes.startTask
    this.endTask = attributes.endTask
  }
}
