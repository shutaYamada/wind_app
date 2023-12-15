class ChangeDatesToDatetimeInCalendarEvents < ActiveRecord::Migration[7.0]
  def up
    change_column :calendar_events, :start_date, :datetime
    change_column :calendar_events, :end_date, :datetime
  end

  def down
    change_column :calendar_events, :start_date, :date
    change_column :calendar_events, :end_date, :date
  end
end
