module FlowyUi
  class InstanceTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_instance_id, :all_previous_tasks_required, :payload, :state,
               :is_instance, :next_links

    def is_instance
      object.instance?
    end

    def next_links
      object.next_links.map { |l| InstanceLinkSerializer.new(l) }
    end
  end
end
