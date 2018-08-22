require 'simplecov-json'

SimpleCov.start 'rails' do
  use_merging true
  merge_timeout 20 * 60
  coverage_dir 'coverage'
  # minimum_coverage 90

  add_filter '/spec/'
  add_filter '/vendor/'
  add_filter '/config/'
  add_filter '/app/jobs/flowy/application_job.rb'
  add_filter '/app/mailers/flowy/application_mailer.rb'
  add_filter '/app/controllers/flowy/application_controller.rb'
  add_filter '/app/services/flowy/logging_service.rb'
  add_filter '/lib/flowy/engine.rb'
  add_filter '/app/helpers/flowy/application_helper.rb'

  add_group 'Libraries',   'lib'
  add_group 'Extensions',  'extensions'
  add_group 'Controllers', 'app/controllers'
  add_group 'Models',      'app/models'
  add_group 'Helpers',     'app/helpers'
  add_group 'Services',    'app/services'
  add_group 'Mailers',     'app/mailers'
  add_group 'Views',       'app/views'
  add_group 'Workers',     'app/workers'

  formatter SimpleCov::Formatter::MultiFormatter.new([
    SimpleCov::Formatter::HTMLFormatter,
    SimpleCov::Formatter::JSONFormatter
  ])
end
