class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :uid
      t.text :name
      t.text :email
      t.text :klass
      t.text :role
      t.text :google_token
      t.text :photo_path

      t.timestamps
      
    end
  end
end
