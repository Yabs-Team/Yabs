class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]


  # This is the controller for the index page and also rendering all the users if the current
  # user is an admin
  
  def index
    render json: policy_scope(User.all)
  end

  # controller for showing the user and also authorises in the same method, returns the
  # json object instance @user

  def show
    authorize @user
    render json: @user
  end

  # this is the update controller for users which basically takes the image parameters and 
  # sets to the current user profile picture

  def update
    authorize @user
    if params[:image]
      p params[:image]
      @user.profile_image.attach(params[:image])
      @user.photo_path = rails_blob_path(@user.profile_image, disposition: "inline")
      @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # this is the private set user method to find the current user based on the given params
  # when logging in
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end
