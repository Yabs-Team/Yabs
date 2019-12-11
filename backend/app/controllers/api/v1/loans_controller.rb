class Api::V1::LoansController < ApplicationController
  before_action :set_loan, only: [:show, :update, :destroy]

  def index
    render json: policy_scope(Loan.all)
  end

  def show
    authorize @loan
    render json: policy_scope(@loan)
  end

  def create
    @loan = Loan.new(loan_params)
    authorize @loan
    if @loan.save
      render json: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @loan
    if @loan.update(loan_params)
      render json: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @loan
    @loan.destroy
    render json: @loan
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_loan
      @loan = Loan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def loan_params
      params.require(:loan).permit(:loaned_by_id, :lent_by_id, :book_id, :returned_at, :expiration_date)
    end
end
