require 'test_helper'

class TitlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @title = titles(:title_1)
  end

  test "should get index" do
    get api_v1_titles_url, as: :json
    assert_response :success
  end

  test "should create title" do
    assert_difference('Title.count') do
      post api_v1_titles_url,
           params: { title: { cost: @title.cost, isbn: @title.isbn, name: @title.name, title_type: @title.title_type,
                              subject_id: @title.subject_id } }, as: :json
    end

    assert_response 200
  end

  test "should show title" do
    get api_v1_title_url(@title), as: :json
    assert_response :success
  end

  test "should update title" do
    patch api_v1_title_url(@title),
          params: { title: { cost: @title.cost, isbn: @title.isbn, name: @title.name, title_type: @title.title_type,
                             subject_id: @title.subject_id } }, as: :json
    assert_response 200
  end

  test "should destroy title" do
    assert_difference('Title.count', -1) do
      delete api_v1_title_url(@title), as: :json
    end

    assert_response 204
  end
end
