module FlowyUi
  class BlueprintTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_blueprint_id, :all_previous_tasks_required,
               :is_blueprint

    def is_blueprint
      object.blueprint?
    end
  end
end
