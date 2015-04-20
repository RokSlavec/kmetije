class SessionsController < ApplicationController
  
  def new
  end
  
  def create
	user = User.authenticate(params[:sessions][:name],
							 params[:sessions][:password])
	
	if user.nil?
	  flash.now[:error] = "Invalid name or password!"
	  render 'new'
	else
	  sign_in user
	  redirect_to user
	end
  end
  
  def destroy
	sign_out
	redirect_to root_path
  end

end