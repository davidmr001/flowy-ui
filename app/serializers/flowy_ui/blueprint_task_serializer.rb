#
# Blueprint task serializer
#
class FlowyUi::BlueprintTaskSerializer < ActiveModel::Serializer
  attributes :id, :key, :name, :class_name, :sub_blueprint_id, :all_previous_tasks_required,
             :blueprint?, :class_source, :type

  # rubocop:disable Naming/PredicateName
  def is_blueprint
    object.blueprint?
  end
  # rubocop:enable Naming/PredicateName

  def class_source
    return nil unless object.class_name
    "Flowy::Tasks::#{object.class_name}".constantize.instance_method(:execute).source
  end

  def type
    "BlueprintTask"
  end
end
