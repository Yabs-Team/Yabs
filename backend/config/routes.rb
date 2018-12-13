Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :loans
      resources :books
      resources :titles

      resources :auth, only: [:index, :create, :destroy]
    end
  end
  root 'application#show'
  match '/*path', to:'application#show', via: :all, :constraints => lambda{|req| req.path !~ /(\/rails\/active_storage\/).*/ }
end
