module FlowyUi
  class InstanceTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_instance_id, :all_previous_tasks_required, :payload, :state,
               :is_instance

    def is_instance
      object.instance?
    end
  end
end
