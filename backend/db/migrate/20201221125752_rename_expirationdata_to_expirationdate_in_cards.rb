class RenameExpirationdataToExpirationdateInCards < ActiveRecord::Migration[6.0]
  def change
    rename_column :cards, :expiration_data, :expiration_date
  end
end
