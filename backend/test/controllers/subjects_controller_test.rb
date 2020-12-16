require 'test_helper'

class SubjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @subject = subjects(:subject_1)
  end

  test "should get index" do
    get api_v1_subjects_url, as: :json
    assert_response :success
  end

  test "should create subject" do
    assert_difference('Subject.count') do
      post api_v1_subjects_url, params: { subject: { name: @subject.name } }, as: :json
    end

    assert_response 200
  end

  test "should show subject" do
    get api_v1_subject_url(@subject), as: :json
    assert_response :success
  end

  test "should update subject" do
    patch api_v1_subject_url(@subject), params: { subject: { name: @subject.name } }, as: :json
    assert_response 200
  end

  test "should destroy subject" do
    assert_difference('Subject.count', -1) do
      delete api_v1_subject_url(@subject), as: :json
    end

    assert_response 204
  end
end
