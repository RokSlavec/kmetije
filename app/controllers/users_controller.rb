class UsersController < ApplicationController
  
  def show
	@user = User.find(params[:id])
	@farms = @user.farms.paginate(:page => params[:page])
  end
  
  def new
	@user = User.new
  end
  
end
