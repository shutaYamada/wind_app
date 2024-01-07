class DeparturesController < ApplicationController
    def index
        departures = Departure.all
        render json: departures, include: :user
    
    end

    def create
        departure = Departure.new(departure_params)
        departure.user_id = current_user.id
        departure.save
        render json: departure
    end

    private

    def departure_params
        params.require(:departure).permit(:user_id, :start_time, :end_time, :comment)
    end
end
