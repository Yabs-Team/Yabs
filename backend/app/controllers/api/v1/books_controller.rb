# THIS CONTROLLER IS NOT BEING AUTHORISED WITH PUNDIT

class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  # Index method, gets all instances of book and renders it

  def index
    render json: Book.all
  end

  # Show method, gets specific instance of book and renders it
  
  def show
    render json: @book
  end

  # This is the create method simply outputting the instance of the json object @book based
  # on if the loan is able to save or not, else outputting the error message

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # This is the update method simply outputting the instance of the json object @book based
  # on if the book is able to update or not, else outputting the error message

  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # Destroy method, destroys the single target instance of book and then renders the
  # page with remaining instances

  def destroy
    @book.destroy
  end

  # This is the private set book method to find the current instance of 
  # book based on the given id

  private

    # Use callbacks to share common setup or constraints between actions.

    def set_book
      @book = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.

    def book_params
      params.require(:book).permit(:title_id, :barcode, :condition, :notes, :availability)
    end
end
