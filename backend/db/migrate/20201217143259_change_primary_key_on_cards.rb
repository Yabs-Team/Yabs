class ChangePrimaryKeyOnCards < ActiveRecord::Migration[6.0]

  def up
    change_column :cards, :uid, :integer
    change_column_null :cards, :uid, :integer, false
    remove_column :cards, :id

    add_index :cards, :uid, unique: true
  end

  def down
    change_column :cards, :role, :string
  end
end
