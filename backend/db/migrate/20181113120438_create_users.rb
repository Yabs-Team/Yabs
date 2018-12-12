class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :uid
      t.string :name
      t.string :email
      t.string :klass
      t.string :role
      t.string :google_token
      t.string :photo_path

      t.timestamps
      
    end
  end
end
