class RemoveDateFromDepartures < ActiveRecord::Migration[7.0]
  def change
    remove_column :departures, :date, :date
  end
end
