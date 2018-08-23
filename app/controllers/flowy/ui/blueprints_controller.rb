#
# Blueprints controller
#
class Flowy::Ui::BlueprintsController < ApplicationController
  protect_from_forgery with: :exception

  def index
    render :index
  end
end
