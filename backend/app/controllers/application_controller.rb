# ROOT CONTROLLER, IMPORTING PUNDIT AND INSTANTIATES IT

class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery

  # Used as standard rescue method for method within Pundit that return false 

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # This method sets the current user based on sessions user id or if the environment is test
  # Sets the current user to the first of the instance users

  def current_user
    return User.first if Rails.env.test?
    @_current_user ||= session[:current_user_id] &&
    User.find_by(uid: session[:current_user_id])
  end

  # Show basically renders the standard app html file

  def show
    render file: "public/app.html"
  end

  # Standard method for users that try to access routes and resources that they are not
  # granted access too 
  
  private

  def user_not_authorized(exception)
    render json: exception.record.errors, status: :unauthorized
  end
end
