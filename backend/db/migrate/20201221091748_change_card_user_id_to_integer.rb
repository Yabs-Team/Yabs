class ChangeCardUserIdToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :cards, :user_id, :integer
  end
end
