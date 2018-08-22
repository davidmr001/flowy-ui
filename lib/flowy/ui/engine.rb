module Flowy
  module Ui
    class Engine < ::Rails::Engine
      isolate_namespace Flowy::Ui
    end
  end
end
