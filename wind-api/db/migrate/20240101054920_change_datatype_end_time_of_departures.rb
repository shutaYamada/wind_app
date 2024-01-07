class ChangeDatatypeEndTimeOfDepartures < ActiveRecord::Migration[7.0]
  def change
    change_column :departures, :end_time, :datetime
  end
end
