# rubocop:disable Style/ClassAndModuleChildren
module FlowyUi
  #
  # Blueprint link serializer
  #
  class InstanceLinkSerializer < ActiveModel::Serializer
    attributes :id, :source_task, :target_task, :rule_class_name, :class_source

    def source_task
      FlowyUi::InstanceTaskSerializer.new(object.source_task)
    end

    def target_task
      FlowyUi::InstanceTaskSerializer.new(object.target_task)
    end

    def class_source
      return "true" unless object.rule_class_name
      "Flowy::LinkRules::#{object.rule_class_name}".constantize.method(:allow?).source
    end
  end
end
# rubocop:enable Style/ClassAndModuleChildren
