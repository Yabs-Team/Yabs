class ChangeUserColumnToReference < ActiveRecord::Migration[6.0]
  def up
    remove_column :cards, :user_uid
    add_reference :cards, :user, type: :text, :class_name => 'User', :primary_key => 'uid'

  end
  
end
