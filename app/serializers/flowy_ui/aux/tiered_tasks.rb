#
# Tiered tasks structure for easy handling in the ui
#
class FlowyUi::Aux::TieredTasks
  def initialize(object, task_serializer)
    @tiered_tasks = Hash.new { |h, k| h[k] = [] }
    @task_serializer = task_serializer
    start(object)
  end

  def start(object)
    tier = 0
    initial_task = object.initial_task
    add_task(tier, initial_task)
    next_tasks(tier, initial_task)
  end

  def add_task(tier, task)
    @tiered_tasks[tier] << @task_serializer.new(task)
    @tiered_tasks[tier] = @tiered_tasks[tier].uniq { |t| t.object.key }
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

    @tiered_tasks.each do |_tier, tasks|
      output << tasks
    end

    output
  end
end
