#
# Blueprint link serializer
#
class FlowyUi::BlueprintSerializer < ActiveModel::Serializer
  attributes :id, :key, :name, :description, :tiered_tasks, :links

  def tiered_tasks
    Aux::TieredTasks.new(object, FlowyUi::BlueprintTaskSerializer).to_array
  end

  def links
    object.links.map { |l| BlueprintLinkSerializer.new(l) }
  end
end
