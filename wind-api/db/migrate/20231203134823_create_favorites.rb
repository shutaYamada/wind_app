class CreateFavorites < ActiveRecord::Migration[7.0]
  def up
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :post_note_id

      t.timestamps
    end
  end

  def down
    drop_table :favorites
  end
end