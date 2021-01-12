require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:user_2054282603)
    @users = users()
  end

  test "should show user" do
    get api_v1_user_url(@user), as: :json
    assert_response :success
  end
  
  test "should render all users" do
    get api_v1_users_url(@users), as: :json
    assert_response :success
  end
end
