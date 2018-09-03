module FlowyUi
  class BlueprintLinkSerializer < ActiveModel::Serializer
    attributes :id, :source_task, :target_task, :rule_class_name, :class_source

    def source_task
      FlowyUi::BlueprintTaskSerializer.new(object.source_task)
    end

    def target_task
      FlowyUi::BlueprintTaskSerializer.new(object.target_task)
    end

    def class_source
      return "true" unless object.rule_class_name
      "Flowy::LinkRules::#{object.rule_class_name}".constantize.instance_method(:execute).source
    end
  end
end
