require 'slim'
require 'kaminari'
require 'react-rails'
require 'jquery-rails'
require 'active_model_serializers'

# rubocop:disable Style/ClassAndModuleChildren
module FlowyUi
  #
  # Workflow UI rails engine
  #
  class Engine < ::Rails::Engine
    isolate_namespace FlowyUi

    # Testing framework
    config.generators do |g|
      g.test_framework :rspec
    end
  end
end
# rubocop:enable Style/ClassAndModuleChildren
