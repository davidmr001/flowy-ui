module FlowyUi
  class BlueprintTaskSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :class_name, :sub_blueprint_id, :all_previous_tasks_required,
               :is_blueprint, :next_links

    def is_blueprint
      object.blueprint?
    end

    def next_links
      object.next_links.map { |l| BlueprintLinkSerializer.new(l) }
    end
  end
end
