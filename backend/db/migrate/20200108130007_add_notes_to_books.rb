class AddNotesToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :notes, :text
  end
end
