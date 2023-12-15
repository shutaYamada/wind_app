# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :wind_note
  mount_uploader :image, ImageUploader
  has_many :favorites, dependent: :destroy
  has_many :departure, dependent: :destroy
  has_many :calendar_event, dependent: :destroy

  def like(user)
    likes.create(user_id: user.id)
  end

  def unlike(user)
    likes.find_by(user_id: user.id).destroy
  end

  def like?(user)
    likes.where(user_id: user.id).exists?
  end

end
