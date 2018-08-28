class InstanceGraph extends BaseGraph {
  constructor(props) {
    super(props);
    this.taskClass = Task
    this.linkClass = TaskLink
  }
}
