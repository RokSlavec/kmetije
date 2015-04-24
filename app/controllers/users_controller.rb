class UsersController < ApplicationController
  
  def show
	@user = User.find(params[:id])
	@farms = Farm.all
  end
  
  def new
	@user = User.new
  end
  
end
