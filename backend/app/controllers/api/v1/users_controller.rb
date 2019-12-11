class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  def index
    render json: policy_scope(User.all)
  end

  def show
    authorize @user
    render json: @user
  end

  def create
    authorize @user
    p @user
    
  end

  def update
    authorize @user
    if params[:image]
      @user.profile_image.attach(params[:image])
      @user.photo_path = rails_blob_path(@user.profile_image, disposition: "inline")
      @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end
