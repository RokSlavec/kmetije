require 'spec_helper'

describe Farm do
  before(:each) do
	@user = Factory(:user)
	@attr = {
	  :name => "Kmetija Slavec",
	  :region => "Izola",
	  :north => "45.5017657",
	  :east => "13.6671009",
	  :description => "Vinarstvo in oljkarstvo Slavec",
	  :categories => "vino, olje",
	  :products => "malvazija, olje"
	}
  end
  
  it "should create a new instance" do
	@user.farms.create!(@attr)
  end
  
  describe "user associations" do
	before(:each) do
	  @farm = @user.farms.create(@attr)
	end
	
	it "should have a user attribute" do
	  @farm.should respond_to(:user)
	end
	
	it "should have the right associated user" do
	  @farm.user_id.should == @user.id
	  @farm.user.should == @user
	end
  end
  
  describe "validation" do
	it "should require a user id" do
	  Farm.new(@attr).should_not be_valid
	end
  end
end
