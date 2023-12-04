class RenamePostNoteIdToWindNoteIdInFavorites < ActiveRecord::Migration[7.0]
  def up
    rename_column :favorites, :post_note_id, :wind_note_id
  end

end