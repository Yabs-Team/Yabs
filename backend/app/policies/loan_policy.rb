class LoanPolicy < ApplicationPolicy
  attr_reader :user, :loan
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where("loaned_by_id": user.id)
      end
    end
  end

  def create?
    unless user && user.admin? && user.uid == loan.lent_by_id
      loan.errors.add(:lent_by, "authorization failed")
      return false
    end
    return true
  end

  def update?
    unless user&.admin? && user.uid == loan.lent_by_id
      loan.errors.add(:lent_by, "authorization failed")
      return false
    end
    return true
  end

  def show?
    unless user && user&.admin? && user.uid == loan.lent_by_id
      loan.errors.add(:lent_by, "authorization failed")
      return false
    end
    return true
  end

  def delete?
    unless user&.admin? && user.uid == loan.lent_by_id
      loan.errors.add(:lent_by, "authorization failed")
      return false
    end
    return true
  end
end


