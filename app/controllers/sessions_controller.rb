class SessionsController < ApplicationController

  def new
     @user = User.new
     render :new
  end

  def create
    user_params = params.require(:user).permit(:email, :password)
    @user = User.confirm(user_params)
    if @user
      login(@user)
      redirect_to @user
    else
      redirect_to login_path
    end
  end

  def destroy
    logout # this method lives in the SessionsHelper!
    redirect_to root_path
  end

end
