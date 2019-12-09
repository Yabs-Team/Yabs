require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Yabs
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    #config.active_storage.routes_prefix = '/api/v1'
    config.action_controller.allow_forgery_protection = false
    config.debug_exception_response_format = :default
    #config.api_only = true
    config.eager_load_paths << Rails.root.join('app','lib')
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "localhost:#{Rails.env.test? ? 3000 : 8080}"
        resource '*',
          headers: :any,
          methods: :any,
          credentials: true
      end
    end

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end

