class LoansPolicy < ApplicationPolicy
  attr_reader :user, :loan

  def initialize(user, loan)
    @user = user
    @loan = loan
  end

  def create?
    user.admin? && user.uid == loan.lent_by
  end
end
