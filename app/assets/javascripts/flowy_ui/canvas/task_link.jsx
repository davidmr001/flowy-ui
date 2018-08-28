class TaskLink extends Line {
  constructor(attributes) {
    super({
      ...attributes,
      x: attributes.startTask.x + attributes.startTask.width / 2,
      y: attributes.startTask.y + attributes.startTask.height,
      endX: attributes.endTask.x + attributes.startTask.width / 2,
      endY: attributes.endTask.y
    })

    this.startTask = attributes.startTask
    this.endTask = attributes.endTask
  }
}
