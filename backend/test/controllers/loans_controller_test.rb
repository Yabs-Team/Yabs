require 'test_helper'

class LoansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @loan = loans(:loan_1)
  end

  test "should get index" do
    get api_v1_loans_url, as: :json
    assert_response :success
  end

  test "should create loan" do
    assert_difference('Loan.count') do
       post api_v1_loans_url,
            params: { loan: { book_id: '5003', expiration_date: @loan.expiration_date, lent_by_id: @loan.lent_by_id,
                              loaned_by_id: @loan.loaned_by_id, returned_at: @loan.returned_at } }, as: :json
    end

    assert_response 200
  end

  test "should show loan" do
    get api_v1_loan_url(@loan), as: :json
    assert_response :success
  end

  test "should update loan" do
    patch api_v1_loan_url(@loan),
          params: { loan: { book_id: @loan.book_id, expiration_date: @loan.expiration_date, lent_by_id: @loan.lent_by_id,
                            loaned_by_id: @loan.loaned_by_id, returned_at: @loan.returned_at } }, as: :json
    assert_response 200
  end

  test "should destroy loan" do
    assert_difference('Loan.count', -1) do
      delete api_v1_loan_url(@loan), as: :json
    end

    assert_response 204
  end
end
