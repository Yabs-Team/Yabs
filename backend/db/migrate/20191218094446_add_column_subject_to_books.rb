class AddColumnSubjectToBooks < ActiveRecord::Migration[6.0]
  def change
    add_reference :books, :subject, foreign_key: true
  end
end
