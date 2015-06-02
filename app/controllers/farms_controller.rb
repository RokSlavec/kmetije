class FarmsController < ApplicationController
  #before_filter :authenticate, only: [:create, :destroy]
  
  def show
	@farms = Farm.all
  end
  
  def new
	@farm = Farm.new
  end
  
  def create
    @user = current_user
	@farm = Farm.new(params[:farm])
	if @farm.save
	  flash[:success] = "Kmetija ustvarjena!"
	  redirect_to :action => :show
	else
	  render 'users/:id'
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
