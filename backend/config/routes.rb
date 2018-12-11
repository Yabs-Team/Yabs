Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :loans
      resources :books
      resources :titles
    end
  end
  root 'application#show'
  match '/*path', to:'application#show', via: :all, :constraints => lambda{|req| req.path !~ /(\/rails\/active_storage\/|\/auth\/google_oauth2\/).*/ }
end
