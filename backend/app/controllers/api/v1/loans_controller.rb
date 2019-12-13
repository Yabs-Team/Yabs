class Api::V1::LoansController < ApplicationController
  before_action :set_loan, only: [:show, :update, :destroy]

  # this is the index method to render the index page and is also linked to the resolve method
  # in the auth policy in order to scope the user based on their priviliges

  def index
    render json: policy_scope(Loan.all)
  end

  # this is the show metod simply outputting the instance of the json object @user and has
  # authorization through the authorize method built in pundit
  def show
    authorize @loan
    render json: @loan
  end

  # this is the show metod simply outputting the instance of the json object @loan based
  # on if the loan is able to save or not and has
  # authorization through the authorize method built in pundit

  def create
    @loan = Loan.new(loan_params)
    authorize @loan
    if @loan.save
      render json: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  # this is the show metod simply outputting the instance of the json object @loan based
  # on if the loan is able to update or not and has
  # authorization through the authorize method built in pundit

  def update
    authorize @loan
    if @loan.update(loan_params)
      render json: @loan
    else
      render json: @loan.errors, status: :unprocessable_entity
    end
  end

  # this is the destroy method to render the instance of the json object @loan
  # if the user is an admin or not and is also linked to the resolve method
  # in the auth policy in order to scope the user based on their priviliges

  def destroy
    authorize @loan
    @loan.destroy
    render json: @loan
  end

  # this is the private set loan method to find the current loan based on the given params
  # when creating a loan

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
