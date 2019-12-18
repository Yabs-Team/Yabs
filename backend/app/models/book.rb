class Book < ApplicationRecord
  self.primary_key = 'barcode'
  belongs_to :title
  belongs_to :subject
  has_many :loans, dependent: :destroy

  def as_json(options)
    super(:include => [:title])
  end
end
