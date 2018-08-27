module FlowyUi
  class BlueprintSerializer < ActiveModel::Serializer
    attributes :id, :tiered_structure

    def tiered_structure
      Aux::TieredStructure.new(object, FlowyUi::BlueprintTaskSerializer).to_array
    end
  end
end
