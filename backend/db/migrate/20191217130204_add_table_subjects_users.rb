class AddTableSubjectsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :subjects_users do |t|
      t.belongs_to :user
      t.belongs_to :subject

      t.timestamps
    end
  end
end
