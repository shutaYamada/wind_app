class ChangeStartDateAndEndDateInCalendarEvents < ActiveRecord::Migration[7.0]
  def change
    change_column :calendar_events, :start_date, :date
    change_column :calendar_events, :end_date, :date
  end
end
