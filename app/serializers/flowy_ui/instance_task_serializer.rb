module FlowyUi
  class InstanceTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_instance_id, :all_previous_tasks_required, :payload,
               :state, :state_description, :is_instance

    def is_instance
      object.instance?
    end

    def state
      state&.key
    end
  end
end
