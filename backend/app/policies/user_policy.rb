class UserPolicy < ApplicationPolicy
    attr_reader :user
    class Scope < Scope

        # Defines the scope of the policy, admins are granted access to everything and 
        # Other People are only entitled to objects that they have created based on loaned_ny
      def resolve
        if user&.admin?
          scope.all
        else
          scope.where(uid: user&.uid)
        end
      end
    end
  
    # This is the policy for showing all different users, you either have to be an admin or the 
    # person who created the user in order to see the information about it

    def show?
      user&.admin? || record&.uid == user&.uid
    end


    # This is the policy for creating loans, you either have to be logged in or be a admin in 
    # orde to create a loan

    def create?
      user&.admin?
    end

    # This is the policy for updating users, you either have to be an admin or the person who
    # orignally created the loan in order to update it

    def update?
      user&.admin?
    end

    # This is the destroy method for deleting users from the database and is only available 
    # to admins

    def destroy?
      user&.admin?
    end
  end