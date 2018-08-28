module FlowyUi
  class InstanceSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :state, :description, :tiered_tasks, :links

    def tiered_tasks
      Aux::TieredTasks.new(object, FlowyUi::InstanceTaskSerializer).to_array
    end

    def links
      object.links.map { |l| InstanceLinkSerializer.new(l) }
    end
  end
end
