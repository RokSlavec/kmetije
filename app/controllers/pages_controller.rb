class PagesController < ApplicationController
  def home
	@title = "Slovenske kmetije"
  end

  def manage
	@title = "Slovenske kmetije/mange"
  end
  
  def info
	@title = "Slovenske kmetije/info"
  end
end
