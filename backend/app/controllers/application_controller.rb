class ApplicationController < ActionController::Base
  include ReverseProxy::Controller
  include Pundit

  def current_user
    @_current_user ||= session[:current_user_id] &&
     User.find_by(uid: session[:current_user_id])
  end

  def store_user_session(user)
    session[:current_user_id] = user.id
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
