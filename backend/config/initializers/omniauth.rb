Rails.application.config.middleware.use OmniAuth::Builder do
  use Rack::Session::Cookie, secret: ENV['RACK_COOKIE_SECRET']

  provider :google_oauth2, "959028814295-m3lldg1saq9l6tliujprr7rir6jmohqb.apps.googleusercontent.com", "1Oe_YJr3fheHAAOAZOJvY7gM",
    {
      hd: %w(ga.ntig.se elev.ga.ntig.se)
    }
end
