class AddTableSubjectsBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :subjects_books do |t|
      t.belongs_to :book
      t.belongs_to :subject

      t.timestamps
    end
  end
end
