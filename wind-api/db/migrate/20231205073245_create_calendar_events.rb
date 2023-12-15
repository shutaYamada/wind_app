class CreateCalendarEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :calendar_events do |t|
      t.string :title
      t.string :description
      t.boolean :is_absence
      t.string     :start_date
      t.string     :end_date
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
