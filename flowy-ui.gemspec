$LOAD_PATH.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "flowy/ui/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "flowy-ui"
  s.version     = Flowy::Ui::VERSION
  s.authors     = ["António Leonardo", "Pedro Assuncao"]
  s.email       = ["antonio@joindrover.com", "pedro@joindrover.com"]
  s.homepage    = "https://joindrover.com"
  s.summary     = "A generic, all-purpose Rails workflow engine (React UI)"
  s.description = "A generic, all-purpose Rails workflow engine (React UI)"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.2.1"

  s.add_development_dependency "sqlite3"
end
