require 'test_helper'

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @review = reviews(:review_1)
  end

  test "should get index" do
    get api_v1_reviews_url, as: :json
    assert_response :success
  end

  test "should create review" do
    assert_difference('Review.count') do
       post api_v1_reviews_url,
            params: { review: { score: @review.score, review: @review.review, title_id: @review.title_id,
                                user_id: @review.user_id } }, as: :json
    end

    assert_response 200
  end

  test "should show review" do
    get api_v1_review_url(@review), as: :json
    assert_response :success
  end

  test "should update review" do
    patch api_v1_review_url(@review),
          params: { review: { score: @review.score, review: @review.review, title_id: @review.title_id,
                              user_id: @review.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy review" do
    assert_difference('Review.count', -1) do
      delete api_v1_review_url(@review), as: :json
    end

    assert_response 204
  end
end
