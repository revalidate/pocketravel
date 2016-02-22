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

end
