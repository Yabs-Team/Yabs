class User < ApplicationRecord
  self.primary_key = 'uid'
  has_one_attached :profile_image

  def admin?
    self[:role] == "Lärare" || self[:uid] == 1866996084
  end
end
