class DeparturesController < ApplicationController
    def index
        
        departures = Departure.where(date: start_date..end_date).group_by(&:date)
        render json: departures, include: :user
        # #今週の 未出艇者を出す
        # this_week = Time.current.all_week
        # this_week_depper = User.joins(:departure).where(departure: { date: this_week })
        # @non_depper = User.where.not(id: this_week_depper.pluck(:id))
    end

    def create
        departure = Departure.new(departure_params)
        departure.user_id = current_user.id
        departure.save
        render json: departure
    end

    private

    def departure_params
        params.require(:departure).permit(:user_id, :start_time, :end_time, :date, :comment)
    end
end
