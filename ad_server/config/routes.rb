# frozen_string_literal: true

Rails.application.routes.draw do
  get 'contents', to: 'contents#show'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  devise_scope :user do
    root to: 'users/sessions#new'
    get 'sign_in', to: 'users/sessions#new'
    get '/users/sign_out', to: 'users/sessions#destroy'
  end

  namespace :api do
    defaults format: :json do
      #      resources :users, only: %i[index update]
      get '/users', to: 'users#index'
      put '/users/:id', to: 'users#update'

      get '/users/:id/histories', to: 'users#histories'
      get '/users/:id/statistics', to: 'users#statistics'
    end
  end
end
