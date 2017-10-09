Rails.application.routes.draw do

  resources :recipes
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/users/:id', to: "users#show", as: "user"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
end
