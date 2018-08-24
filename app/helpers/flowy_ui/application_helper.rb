#
# Main application helper
#
module FlowyUi::ApplicationHelper
  def navbar_item_active?(model_name)
    params[:controller] == "flowy_ui/#{model_name}"
  end
end
