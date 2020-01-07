Rails.application.routes.draw do
  resources :participants
  root "interviews#index"
  resources :interviews
  
  # mount Sidekiq::Web => '/sidekiq'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
