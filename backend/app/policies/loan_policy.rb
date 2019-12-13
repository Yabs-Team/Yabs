class LoanPolicy < ApplicationPolicy
  attr_reader :user, :loan

  # Defines the scope of the policy, admins are granted access to everything and 
  # Other People are only entitled to objects that they have created based on loaned_ny
  class Scope < Scope
    def resolve
      if user&.admin?
        scope.all
      else
        scope.where("loaned_by_id": user&.uid)
      end
    end
  end

  # This is the policy for creating loans, you either have to be logged in or be a admin in 
  # orde to create a loan

  def create?
    user
  end

  # This is the policy for updating loans, you either have to be an admin or the person who
  # orignally created the loan in order to update it

  def update?
    user&.admin? || user&.uid == record&.lent_by_id
  end

  # This is the policy for showing all different loans, you either have to be an admin or the 
  # person who created the loan in order to see the information about it

  def show?
    user&.admin? || user&.uid == record&.lent_by_id
  end
    
  # This is the policy for deleting loans, only available for admins that have originally
  # created the loan (Maybe change this to only be avaiable to the admin)

  def destroy?
    user&.admin? || user&.uid == record&.lent_by_id
  end
end


