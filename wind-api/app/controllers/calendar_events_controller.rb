class CalendarEventsController < ApplicationController
    before_action :authenticate_user!

    def index
        calendar_events = CalendarEvent.all
        render json: calendar_events
    end

    def create
        calendar_event = CalendarEvent.new(calendar_event_params)
        calendar_event.user_id = current_user.id
        calendar_event.save!
        render json: calendar_event
    end

    def show 
        calendar_event = CalendarEvent.find(params[:id])
        render json: calendar_event
    end

    def update
        calendar_event = CalendarEvent.find(params[:id])
        calendar_event = calendar_event.update!(calendar_event_params)
        render json: calendar_event
    end

    def destroy 
        calendar_event = CalendarEvent.find(params[:id])
        calendar_event.destroy
        render json: calendar_event
    end
      
    private
      
    def calendar_event_params
        params.require(:calendar_event).permit(:title, :description, :start_date, :end_date, :is_absence)
    end  
end
