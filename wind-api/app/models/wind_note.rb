class WindNote < ApplicationRecord
    belongs_to :user
    has_many :favorites, dependent: :destroy

    def is_favorite_by?(user)
        favorites.where(user: user).exists?
    end
end
