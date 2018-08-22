$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "flowy/ui/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "flowy-ui"
  s.version     = Flowy::Ui::VERSION
  s.authors     = ["António Leonardo"]
  s.email       = ["antoniojoaoleonardo@gmail.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of Flowy::Ui."
  s.description = "TODO: Description of Flowy::Ui."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.2.1"

  s.add_development_dependency "sqlite3"
end
