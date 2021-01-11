class CreateTitles < ActiveRecord::Migration[5.2]
  def change
    create_table :titles do |t|
      t.text :name
      t.text :isbn
      t.integer :cost
      t.text :type

      t.timestamps
    end
  end
end
