# rubocop:disable Style/ClassAndModuleChildren
module Kaminari
  module Helpers
    #
    # Override the way page urls are generated to support engines
    #
    class Tag
      def page_url_for(page)
        params = params_for(page)
        params[:only_path] = true
        (@options[:routes_proxy] || @template).url_for params
      end
    end
  end
end
# rubocop:enable Style/ClassAndModuleChildren
