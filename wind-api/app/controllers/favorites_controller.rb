class FavoritesController < ApplicationController
    def create
      wind_note = WindNote.find(params[:wind_note_id])
      favorite = current_user.favorites.new(wind_note_id: wind_note.id)
  
      if favorite.save
        # お気に入りの作成に成功した場合、そのWindNoteとお気に入り状態をレスポンスに含める
        render json: wind_note.as_json.merge(is_favorite: true)
      else
        render json: favorite.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      wind_note = WindNote.find(params[:wind_note_id])
      favorite = current_user.favorites.find_by(wind_note_id: wind_note.id)
  
      if favorite&.destroy
        # お気に入りの削除に成功した場合、そのWindNoteとお気に入り状態をレスポンスに含める
        render json: wind_note.as_json.merge(is_favorite: false)
      else
        render json: { error: "Favorite not found." }, status: :not_found
      end
    end
end