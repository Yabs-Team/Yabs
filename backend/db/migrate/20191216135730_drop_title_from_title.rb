class DropTitleFromTitle < ActiveRecord::Migration[6.0]
  def change
    remove_column :titles, :title
  end
end
