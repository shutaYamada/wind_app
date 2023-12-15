class FavoritesController < ApplicationController
    def create
        wind_note = WindNote.find(params[:wind_note_id])
        if wind_note.like?(current_user)
            render json: { error: 'Already liked' }, status: :unprocessable_entity
            return
        end

        wind_note.like(current_user)
        wind_note.reload
        favorite = wind_note.likes.find_by(user_id: current_user.id)
        render json: { wind_note: wind_note, favorite: favorite }        
    end
  
    def destroy
        wind_note = WindNote.find(params[:wind_note_id])
        unless wind_note.like?(current_user)
            render json: { error: 'Not liked yet' }, status: :unprocessable_entity
            return
        end

        wind_note.unlike(current_user)
        wind_note.reload
        render json: wind_note
    end
end