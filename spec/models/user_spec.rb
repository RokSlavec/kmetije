require 'spec_helper'

describe User do
  before(:each) do
	@attr = {
	  :name => "Rok Slavec",
	  :password => "password",
	  :password_confirmation => "password"
	}
  end
  
  it "should create a new instance" do
	User.create!(@attr)
  end
  
  describe "farms associations" do
	before(:each) do
	  @user = User.create(@attr)
	end
	
	it "should have a farm attribute" do
	  @user.should respond_to(:farms)
	end
  end
end
