class ApplicationController < ActionController::Base
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_user
    return User.first if Rails.env.test?
    @_current_user ||= session[:current_user_id] &&
     User.find_by(uid: session[:current_user_id])
  end

  def show
    render file: "public/app.html"
  end

  private

  def user_not_authorized(exception)
    render json: exception.record.errors, status: :unprocessable_entity
  end
end
