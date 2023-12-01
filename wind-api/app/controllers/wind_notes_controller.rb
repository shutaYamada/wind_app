class WindNotesController < ApplicationController
    before_action :authenticate_user!
    def index
        wind_notes = WindNote.includes(:user).all
        render json: wind_notes, include: :user
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
        wind_note = WindNote.update!(wind_note_params)
        render json: wind_note
    end

    def destroy
        wind_note = WindNote.find(params[:id])
        wind_note.destroy
        render json: wind_note
    end


    private

    def wind_note_params
        params.require(:wind_note).permit(:title, :description, :date)
    end
end
