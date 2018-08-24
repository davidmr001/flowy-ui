require 'slim'
require 'kaminari'

#
# Workflow UI rails engine
#
class FlowyUi::Engine < ::Rails::Engine
  isolate_namespace FlowyUi

  # Testing framework
  config.generators do |g|
    g.test_framework :rspec
  end
end
