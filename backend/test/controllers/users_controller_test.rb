require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:user_1904583927)
  end

  test "should show user" do
    get api_v1_user_url(@user), as: :json
    assert_response :success
  end
end
