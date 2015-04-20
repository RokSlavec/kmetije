module SessionsHelper
  def sign_in(user)
	cookies.permanent.signed[:remember_token] = [user.id, user.salt]
	self.current_user = user
  end
  
  def current_user=(user)
	@current_user = user
  end
  
  def current_user
	# Runs only the first time, to define current_user
	@current_user ||= user_from_remember_token
  end
  
  def signed_in?
	# if current_user is not nil, he is signed in
	!current_user.nil?
  end
  
  def sign_out
	cookies.delete[:remember_token]
	self.current_user = nil
  end
  
  def deny_access
	flash[:notice] = "Please, sign in!"
	redirect_to signin_path
  end
  
  private
  
	def user_from_remember_token
	  User.authenticate_with_salt(*remember_token)
	end
	
	def remember_token
	  cookies.signed[:rememeber_token] || [nil, nil]
	end
end