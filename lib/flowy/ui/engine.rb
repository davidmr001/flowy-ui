require 'slim'

#
# Workflow UI rails engine
#
class Flowy::Ui::Engine < ::Rails::Engine
  isolate_namespace Flowy::Ui

  # Testing framework
  config.generators do |g|
    g.test_framework :rspec
  end
end
