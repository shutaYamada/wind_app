Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }

  namespace :auth do
    resources :sessions, only: %i[index]
  end

  resources :wind_notes do
    resource :favorite, only: [:create, :destroy]
  end
  resources :users
  resources :departures
  resources :calendar_events

end