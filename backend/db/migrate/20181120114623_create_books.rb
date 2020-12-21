class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.references :title, foreign_key: true
      t.text :barcode, null: false
      t.text :status
      t.timestamps
    end
    remove_column :books, :id
    add_index :books, :barcode, unique: true
  end
end
