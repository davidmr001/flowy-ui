#
# Base controller for the ui
#
class FlowyUi::ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def sanitize_pagination_params
    params[:page] ||= 1
    params[:per_page] ||= 3
  end
end
