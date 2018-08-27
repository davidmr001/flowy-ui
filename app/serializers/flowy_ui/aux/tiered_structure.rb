class FlowyUi::Aux::TieredStructure
  def initialize(structure, task_serializer)
    @tiered_structure = Hash.new { |h, k| h[k] = [] }
    @task_serializer = task_serializer
    start(structure)
  end

  def start(structure)
    tier = 0
    initial_task = structure.initial_task
    add_task(tier, initial_task)
    next_tasks(tier, initial_task)
  end

  def add_task(tier, task)
    @tiered_structure[tier] << @task_serializer.new(task)
    @tiered_structure[tier].uniq!
  end

  def next_tasks(tier, task)
    next_tier = tier + 1
    task.next_tasks.each do |t|
      add_task(next_tier, t)
      next_tasks(next_tier, t)
    end
  end

  def to_array
    output = []

    @tiered_structure.each do |_tier, tasks|
      output << tasks
    end

    output
  end
end
