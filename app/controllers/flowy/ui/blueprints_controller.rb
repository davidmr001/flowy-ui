#
# Blueprints controller
#
class Flowy::Ui::BlueprintsController < Flowy::Ui::ApplicationController
  protect_from_forgery with: :exception

  def index
    @blueprints = Flowy::Blueprint.all

    render :index
  end
end
