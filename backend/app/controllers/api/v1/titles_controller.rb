# THIS CONTROLLER IS NOT BEING AUTHORISED WITH PUNDIT

require 'google_books'
class Api::V1::TitlesController < ApplicationController
  before_action :set_title, only: [:show, :update, :destroy]

  # This is the index method to render a JSON object with all titles 
  # which shows all titles available.
  # This specific controller is not being authorized

  def index
    render json: Title.all
  end

  # This is the show method which generates the JSON object of instance of the class
  # title

  def show
    render json: @title
  end

  # Create method which instantiates the title class with the right parameters,
  # saves it to the db and then renders all JSON object of the instance title

  def create
    begin
      book_data = GoogleBooks::API.search("isbn:#{title_params['isbn']}").first
      new_data = {
        name: book_data.title,
        description: book_data.description,
        authors: book_data.authors.to_s,
        cover: book_data.covers[:large],
        page_count: book_data.page_count,
        published_date: book_data.published_date
      }
      updated_params = title_params.merge(new_data)
    rescue # In case a API result was not found create the title any way
      updated_params = title_params
    ensure
      @title = Title.new(updated_params)
    end

    if @title.save
      render json: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # Update method for the titles and updates with specific params then renders JSON object
  # of the updated instance of class title

  def update
    if @title.update(title_params)
      render json: @title
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # Destroy, destroys the single target instance and then renders the 
  # rest instances of title

  def destroy
    @title.destroy
    render json: @title, status: :no_content
  end

  # Get active loans on books connected to a title.

  def get_loans
    @loans = Loan.joins(:book => :title).where('titles.id = ? AND loans.returned_at IS NULL', params[:id])
    render json: @loans
  end
  # Set title method, find the current title and sets the title to that instance in order
  # to execute given method on correct title

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_title
      @title = if params[:ISBN] && params[:ISBN] != 'false'
                 Title.where(isbn: params[:id]).first
               else
                 Title.find(params[:id])
               end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def title_params
      params.require(:title).permit(:name, :isbn, :cost, :title_type, :description, :authors, :cover, :page_count, 
                                    :published_date, :subject_id)
    end
end
