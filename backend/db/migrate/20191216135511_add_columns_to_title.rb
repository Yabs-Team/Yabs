class AddColumnsToTitle < ActiveRecord::Migration[6.0]
  def change
    add_column :titles, :title, :string
    add_column :titles, :description, :string
    add_column :titles, :authors, :string
    add_column :titles, :cover, :string
    add_column :titles, :page_count, :number
    add_column :titles, :published_date, :string
  end
end
