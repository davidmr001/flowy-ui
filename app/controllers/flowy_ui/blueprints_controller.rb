#
# Blueprints controller
#
class FlowyUi::BlueprintsController < FlowyUi::ApplicationController
  protect_from_forgery with: :exception

  before_action :sanitize_pagination_params, only: [:index]

  def index
    @blueprints = Flowy::Blueprint.all.page(params[:page]).per(params[:per_page])
  end

  def show
    @blueprint = Flowy::Blueprint.find(params[:id])
  end
end
