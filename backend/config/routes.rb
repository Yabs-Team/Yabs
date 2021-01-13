Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cards
      resources :users
      resources :loans
      resources :books
      get 'titles/get_loans/:id', :to => 'titles#get_loans'
      resources :titles
      resources :reviews
      resources :subjects

      resources :auth, only: [:index, :create, :destroy]
    end
  end
  root 'application#show'
  match '/*path', to:'application#show', via: :all, :constraints => ->(req) { req.path !~ /(\/rails\/active_storage\/).*/ }
end
