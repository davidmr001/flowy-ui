#
# Flowy route extensions
#
# rubocop:disable Style/ClassAndModuleChildren
module Flowy
  module Ui
    module Routing
      #
      # Rails route mapping extensions
      #
      module MapperExtensions
        def flowy_ui
          namespace "flowy" do
            namespace "ui", path: "/ui" do
              root to: "blueprints#index"
            end
          end
        end
      end
    end
  end
end
# rubocop:enable Style/ClassAndModuleChildren

ActionDispatch::Routing::Mapper.send :include, Flowy::Ui::Routing::MapperExtensions
