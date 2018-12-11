class ApplicationController < ActionController::Base
  include ReverseProxy::Controller
  include Pundit

  def current_user
    User.where(email: request.env['omniauth.auth']['email']).first
  end

  if Rails.env.test?
    def show
      render file: "public/app.html"
    end
  else
    def show
      reverse_proxy "http://localhost:8080"
    end
  end
end
