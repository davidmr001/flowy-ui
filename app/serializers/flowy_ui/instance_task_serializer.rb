#
# Blueprint link serializer
#
class FlowyUi::InstanceTaskSerializer < ActiveModel::Serializer
  attributes :id, :key, :name, :class_name, :sub_instance_id, :all_previous_tasks_required, :payload,
             :state, :state_description, :is_instance, :class_source, :type

  # rubocop:disable Naming/PredicateName
  def is_instance
    object.instance?
  end
  # rubocop:enable Naming/PredicateName

  def state
    object.state&.key
  end

  def class_source
    return nil unless object.blueprint_task.class_name
    "Flowy::Tasks::#{object.blueprint_task.class_name}".constantize.instance_method(:execute).source
  end

  def type
    "InstanceTask"
  end
end
