require 'test_helper'

class CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card = cards(:one)
  end

  test "should get index" do
    get api_v1_cards_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_new_card_url
    assert_response :success
  end

  test "should create card" do
    assert_difference('Card.count') do
      post api_v1_cards_url, params: { card: { expiration_data: @card.expiration_data, status: @card.status, uid: @card.uid, user_id: @card.user_id } }
    end

    assert_redirected_to api_v1_card_url(Card.last)
  end

  test "should show card" do
    get api_v1_card_url(@card)
    assert_response :success
  end

  test "should get edit" do
    get api_v1_edit_card_url(@card)
    assert_response :success
  end

  test "should update card" do
    patch api_v1_card_url(@card), params: { card: { expiration_data: @card.expiration_data, status: @card.status, uid: @card.uid, user_id: @card.user_id } }
    assert_redirected_to api_v1_card_url(@card)
  end

  test "should destroy card" do
    assert_difference('Card.count', -1) do
      delete api_v1_card_url(@card)
    end

    assert_redirected_to cards_url
  end
end
