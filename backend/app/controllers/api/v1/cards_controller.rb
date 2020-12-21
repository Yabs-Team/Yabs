class Api::V1::CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  # GET /cards
  # GET /cards.json
  def index
    render json: Card.all
  end

  # GET /cards/1
  # GET /cards/1.json
  def show
    render json: @card
  end

  # GET /cards/new
  def new
    @card = Card.new
  end

  # POST /cards
  # POST /cards.json
  def create
    @card = Card.new(card_params)

    if @card.save
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  # PATCH/PUT /cards/1.json
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  # DELETE /cards/1.json
  def destroy
    @card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(:uid, :user_id, :expiration_date, :status)
    end
end
