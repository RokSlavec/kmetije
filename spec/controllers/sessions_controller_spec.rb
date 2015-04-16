require 'spec_helper'

describe SessionsController do
  render_views

  describe "GET 'new'" do
    it "should be successful" do
      get :new
      response.should be_success
    end
  end
  
  describe "POST 'create'" do
	
	describe "invalid signin" do
	  before(:each) do
		@attr = { :name => "invalid", :password => "invalid"}
	  end
	  
	  it "should re-render the new page" do
		post :create, :sessions => @attr
		response.should render_template('new')
	  end
	  
	  it "should have a flash.now message" do
		post :create, :sessions => @attr
		flash.now[:error].should =~ /invalid/i
	  end
	end
	
	describe "with valid signin" do
	  before(:each) do
		@user = Factory(:user)
		@attr = { :name => @user.name, :password => @user.password }
	  end
	  
	  it "should sign the user in" do
		post :create, :sessions => @attr
		controller.current_user.should == @user
		controller.should be_signed_in
	  end
	  
	  it "should redirect to admin page" do
		post :create, :sessions => @attr
		response.should redirect_to(user_path(@user))
	  end
	end
  end
  
  describe "DELETE 'destroy'" do
	
  end
end
