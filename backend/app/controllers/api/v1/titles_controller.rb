class TitlesController < ApplicationController
  before_action :set_title, only: [:show, :update, :destroy]

  # GET /title
  # GET /title.json
  def index
    @title = Title.all
  end

  # GET /title/1
  # GET /title/1.json
  def show
  end

  # POST /title
  # POST /title.json
  def create
    @title = Title.new(title_params)

    if @title.save
      render :show, status: :created, location: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /title/1
  # PATCH/PUT /title/1.json
  def update
    if @title.update(title_params)
      render :show, status: :ok, location: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # DELETE /title/1
  # DELETE /title/1.json
  def destroy
    @title.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_title
      @title = Title.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def title_params
      params.require(:title).permit(:name, :isbn, :cost, :type)
    end
end