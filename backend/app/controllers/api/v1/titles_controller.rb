class Api::V1::TitlesController < ApplicationController
  before_action :set_title, only: [:show, :update, :destroy]

  def index
    render json: Title.all
  end

  def show
    render json: @title
  end

  def create
    @title = Title.new(title_params)

    if @title.save
      render json: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  def update
    if @title.update(title_params)
      render json: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @title.destroy
    render json: @title
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_title
      @title = Title.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def title_params
      params.require(:title).permit(:name, :isbn, :cost, :title_type)
    end
end
