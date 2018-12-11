Rails.application.config.middleware.use OmniAuth::Builder do
  use Rack::Session::Cookie, secret: ENV['RACK_COOKIE_SECRET']

  provider :google_oauth2, "959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com", "p-6JsXg5nnEHADH-12pFJEmw",
    {
      hd: %w(ga.ntig.se elev.ga.ntig.se)
    }
end
