Rails.application.routes.draw do
  root to: 'welcome#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :geocode, only: [:index]
    end
  end

  get '*path', to: 'welcome#home', via: :all
end
