class InstanceGraph extends BaseGraph {
  constructor(props) {
    super(props);
    this.taskClass = InstanceTask
    this.linkClass = InstanceTaskLink
  }
}
