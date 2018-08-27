module FlowyUi
  class InstanceTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_instance_id, :all_previous_tasks_required, :payload,
               :state, :state_description, :is_instance, :next_links

    def is_instance
      object.instance?
    end

    def next_links
      object.next_links.map { |l| InstanceLinkSerializer.new(l) }
    end

    def state
      state&.key
    end
  end
end
