Rails.application.routes.draw do
  root to: 'welcome#home'

  namespace :api, defaults: { format: :json }, constraints: Rails.env.development? ? { protocol: 'http://', host: 'localhost' } : { protocol: 'https://', host: 'quiet-sierra-92247.herokuapp.com' } do
    namespace :v1 do
      resources :geocode, only: [:index]
    end
  end

  get '*path', to: 'welcome#home', via: :all
end
