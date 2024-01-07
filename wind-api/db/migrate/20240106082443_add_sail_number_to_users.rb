class AddSailNumberToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :sail_number, :integer
  end
end
