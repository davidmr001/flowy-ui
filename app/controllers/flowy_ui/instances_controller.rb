#
# Instances controller
#
class FlowyUi::InstancesController < FlowyUi::ApplicationController
  protect_from_forgery with: :exception

  before_action :sanitize_pagination_params, only: [:index]

  def index
    @instances = Flowy::Instance.all.page(params[:page]).per(params[:per_page])
  end

  def show
    @instance = Flowy::Instance.find(params[:id])
  end
end
