Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resources :articles, only: [:create, :show, :index, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :claps, only: [:create, :index, :destroy, :update]
    resources :comments, only: [:create, :destroy, :show, :update]
    get 'comments/for_article/:article_id', to: 'comments#for_article', as: 'comments_for_article'
    get 'claps/for_article/:article_id', to: 'claps#for_article', as: 'claps_for_article'
  end

  # get '/api/articles/by_author/:author_id', to: 'articles#by_author', as: 'articles_by_author'
  get '*path', to: 'static_pages#frontend_index'

end

