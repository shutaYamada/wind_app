class CreateWindNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :wind_notes do |t|
      t.string :title
      t.string :description
      t.string :date
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
