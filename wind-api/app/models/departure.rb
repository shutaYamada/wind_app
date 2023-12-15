class Departure < ApplicationRecord
    belongs_to :user, dependent: :destroy
end
