module FlowyUi
  class BlueprintLinkSerializer < ActiveModel::Serializer
    attributes :id, :source_task_id, :target_task_id
  end
end
