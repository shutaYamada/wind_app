class WindNotesController < ApplicationController
    def index
        wind_notes = WindNote.includes(:user).all
    
        # ユーザーがログインしている場合のみお気に入り情報を追加
        if user_signed_in?
          wind_notes = wind_notes.as_json(include: :user).map do |wind_note|
            wind_note.merge({"is_favorite" => current_user.favorites.exists?(wind_note_id: wind_note["id"])})
          end
        else
          wind_notes = wind_notes.as_json(include: :user)
        end
    
        render json: wind_notes
    end

    def create
        wind_note = WindNote.new(wind_note_params)
        wind_note.user_id = current_user.id
        wind_note.save!
        render json: wind_note
    end

    def show
        wind_note = WindNote.find(params[:id])
        render json: wind_note
    end

    def edit 
        wind_note = WindNote.find(params[:id])
        render json: wind_note
    end

    def update
        wind_note = WindNote.find(params[:id])
        wind_note.update!(wind_note_params)
        render json: wind_note
    end

    def destroy
        wind_note = WindNote.find(params[:id])
        wind_note.destroy
        render json: wind_note
    end

    def is_favorited
        wind_note = WindNote.find(params[:id])
        if wind_note.favorited_by?(current_user)
            render json: { favorited: true }
        else
            render json: { favorited: false }
        end
    end
    private

    def wind_note_params
        params.require(:wind_note).permit(:title, :description, :date)
    end
end
