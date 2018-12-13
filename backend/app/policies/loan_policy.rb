class LoanPolicy
  attr_reader :user, :loan

  def initialize(user, loan)
    @user = user
    @loan = loan
  end

  def create?
    unless user && user.admin? && user.uid == loan.lent_by_id
      loan.errors.add(:lent_by, "authorization failed")
      return false
    end
    return true
  end
end
