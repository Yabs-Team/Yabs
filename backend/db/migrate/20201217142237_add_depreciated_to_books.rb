class AddDepreciatedToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :depreciated, :boolean
  end
end
