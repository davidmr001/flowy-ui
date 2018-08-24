# To render React components in production, precompile the server rendering manifest:
Rails.application.config.assets.precompile += ['flowy_ui/server_rendering.js']
