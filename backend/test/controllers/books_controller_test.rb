require 'test_helper'

class BooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:book_5000)
  end

  test "should get index" do
    get api_v1_books_url, as: :json
    assert_response :success
  end

  test "should create book" do
    assert_difference('Book.count') do
      post api_v1_books_url, params: { book: { barcode: 5001, status: @book.status, title_id: @book.title_id } }, as: :json
    end

    assert_response 200
  end

  test "should show book" do
    get api_v1_book_url(@book), as: :json
    assert_response :success
  end

  test "should update book" do
    patch api_v1_book_url(@book), params: { book: { barcode: @book.barcode, status: @book.status, title_id: @book.title_id } }, as: :json
    assert_response 200
  end

  test "should destroy book" do
    assert_difference('Book.count', -1) do
      delete api_v1_book_url(@book), as: :json
    end

    assert_response 204
  end
end
