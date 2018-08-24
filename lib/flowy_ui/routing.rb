#
# Flowy route extensions
#
# rubocop:disable Style/ClassAndModuleChildren
module FlowyUi
  module Routing
    #
    # Rails route mapping extensions
    #
    module MapperExtensions
      def flowy_ui
        namespace "flowy_ui", path: "/flowy_ui" do
          resources :blueprints, only: %w[index show]
          resources :instances, only: %w[index show]

          root to: "blueprints#index"
        end
      end
    end
  end
end
# rubocop:enable Style/ClassAndModuleChildren

ActionDispatch::Routing::Mapper.send :include, FlowyUi::Routing::MapperExtensions
