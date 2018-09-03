module FlowyUi
  class BlueprintTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_blueprint_id, :all_previous_tasks_required,
               :is_blueprint, :class_source, :type

    def is_blueprint
      object.blueprint?
    end

    def class_source
      return nil unless object.class_name
      "Flowy::Tasks::#{object.class_name}".constantize.instance_method(:execute).source
    end

    def type
      "BlueprintTask"
    end
  end
end
