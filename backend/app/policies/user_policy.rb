class UserPolicy < ApplicationPolicy
    attr_reader :user
    class Scope < Scope
      def resolve
        if user&.admin?
          scope.all
        else
          scope.where(uid: 'user&.uid')
        end
      end
    end
  
    def show?
      user&.admin? || record&.uid == user&.uid
    end

    def create?
      unless user && user.admin?
        user.errors.add(:user, "Authorization failed")
         false
      end
       true
    end

    def update?
        user&.admin?
    end
  end