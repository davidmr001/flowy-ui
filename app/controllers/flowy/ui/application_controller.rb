#
# Base controller for the ui
#
class Flowy::Ui::ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
