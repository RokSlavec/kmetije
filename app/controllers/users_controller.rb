class UsersController < ApplicationController
  before_filter :authenticate, :only => []
  
  def show
	@user = User.find(params[:id])
  end
  
  def new
	@user = User.new
  end
  
  private
  
	def authenticate
	  deny_access unless signed_in?
	end

end
