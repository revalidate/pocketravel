Rails.application.routes.draw do
  resources :users
  root to: "home#index"

  # Routes for Users
  resources :users

  #sessions helper for logging in
  get "/login", to: "sessions#new", as: "login"
  get "/logout", to: "sessions#destroy", as: "logout"
  post "/sessions", to: "sessions#create"

  get "/cities", to: "cities#index", as: "city_index"
  get "/cities/:id", to: "cities#show", as: "city_show"

  get "/cities/:id/places", to: "places#index", as: "place_index"
  get "/cities/:id/places/:id", to: "places#show", as: "place_show"
  post "/cities/:id/places", to: "places#create", as: "places"
  delete "/cities/:id/places/:id", to: "places#destroy", as: "place_delete"

end
