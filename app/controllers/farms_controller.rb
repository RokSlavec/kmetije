class FarmsController < ApplicationController
  before_filter :authenticate
  before_filter :authorized_user, :only => :destroy
  
  def create
	@farm = current_user.farms.build(params[:farm])
	if @farm.save
	  flash[:success] = "Farm created!"
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
  
	def authorized_user
	  @farm = Farm.find(params[:id])
	  redirect_to root_path unless current_user?(@farm.user)
	end
  
end
