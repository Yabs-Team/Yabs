class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :uid
      t.string :user_uid
      t.datetime :expiration_data
      t.string :status

      t.timestamps
    end
  end
end
