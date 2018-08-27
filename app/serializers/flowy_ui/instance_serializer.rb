module FlowyUi
  class InstanceSerializer < ActiveModel::Serializer
    attributes :id, :key, :name, :description, :tiered_structure

    def tiered_structure
      Aux::TieredStructure.new(object, FlowyUi::InstanceTaskSerializer).to_array
    end
  end
end
