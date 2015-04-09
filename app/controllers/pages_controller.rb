class PagesController < ApplicationController
  def home
	@home = "Home"
  end
  
  def info
	@info = "Info"
  end
  
  def admin
	@admin = "Admin"
  end
end
