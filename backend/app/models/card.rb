class Card < ApplicationRecord
    self.primary_key = 'uid'
    belongs_to :user
end
