class ApplicationController < ActionController::Base
  include ReverseProxy::Controller
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_user
    @_current_user ||= session[:current_user_id] &&
     User.find_by(uid: session[:current_user_id])
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

  private

  def user_not_authorized(exception)
    render json: exception.record.errors, status: :unprocessable_entity
  end
end
