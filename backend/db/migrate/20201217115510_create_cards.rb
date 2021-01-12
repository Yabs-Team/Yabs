class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.text :uid
      t.text :user_uid
      t.datetime :expiration_data
      t.text :status

      t.timestamps
    end
  end
end
