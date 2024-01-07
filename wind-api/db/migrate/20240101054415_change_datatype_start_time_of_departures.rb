class ChangeDatatypeStartTimeOfDepartures < ActiveRecord::Migration[7.0]
  def change
    change_column :departures, :start_time, :datetime
  end
end
