class FavoritesController < ApplicationController
    def create
        wind_note = WindNote.find(params[:wind_note_id])
        favorite = current_user.favorites.new(wind_note_id: wind_note.id)
        if favorite.save
            render json: { status: 'success', data: favorite }
        else
            render json: { status: 'error', data: favorite.errors }
        end
    end
  
    def destroy
        wind_note = WindNote.find(params[:wind_note_id])
        favorite = current_user.favorites.find_by(wind_note_id: wind_note.id)
        if favorite.destroy
            render json: { status: 'success' }
        else
            render json: { status: 'error', data: favorite.errors }
        end
    end

    def index
        wind_notes = WindNote.all
        wind_notes = wind_notes.map do |wind_note|
          {
            id: wind_note.id,
            title: wind_note.title,
            description: wind_note.description,
            date: wind_note.date,
            isFavorited: current_user.favorites.exists?(wind_note_id: wind_note.id)
          }
        end
        render json: { status: 'success', data: wind_notes }
    end
end