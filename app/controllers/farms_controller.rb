class FarmsController < ApplicationController
  before_filter :authorized_user, :only => :destroy
  
  def new
	@farm = current_user.farms.build
  end
  
  def create
    @user = current_user
	@farm = Farm.new(params[:farm])
	if @farm.save
	  flash[:success] = "Kmetije ustvarjena!"
	  redirect_to 'users/show'
	else
	  render 'users/show'
	end
  end
  
  def destroy
	@farm.destroy
	redirect_back_or root_path
  end
  
  private

	def authenticate
	  deny_access unless signed_in?
	end
  
	def authorized_user
	  @farm = Farm.find(params[:id])
	  redirect_to root_path unless current_user?(@farm.user)
	end
  
end
