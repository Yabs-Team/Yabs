class RenameDepreciatedToAvailabilityInBooks < ActiveRecord::Migration[6.0]
  def change
    rename_column :books, :depreciated, :availability
  end
end
