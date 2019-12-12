class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_user
    @_current_user ||= (Rails.env.test? ? User.first : session[:current_user_id]) &&
    User.find_by(uid: session[:current_user_id])
  end

  def show
    render file: "public/app.html"
  end

  if Rails.env.test?

    def mockAdmin
      @_current_user = User.first.id
    end

    def mockStudent
      @_current_user = User.first.id
    end

  end

  private

  def user_not_authorized(exception)
    render json: exception.record.errors, status: :unprocessable_entity
  end
end
