class BlueprintGraph extends BaseGraph {
  constructor(props) {
    super(props);
    this.taskClass = BlueprintTask
    this.linkClass = BlueprintTaskLink
  }
}
