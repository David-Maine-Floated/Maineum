class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']
  
  def create
    @user = User.new(user_params)

    if @user.save 
      login!(@user)
      render '/api/session/show'
    else  

      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end 
  end


  def index
    @users = User.all 
    render '/api/users/index'
  end

  def show 

    @user = User.find_by(id: params[:id])
    if @user 
      render '/api/users/show'
    else  
      render json: {errors: @user.error.full_messages}, status: :unprocessable_entity
    end
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end


end
