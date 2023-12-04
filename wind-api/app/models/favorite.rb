class Favorite < ApplicationRecord
    belongs_to :user
    belongs_to :wind_note

    validates :user_id, uniqueness: {scope: :wind_note_id}
end
