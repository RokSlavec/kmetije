require 'spec_helper'

describe PagesController do
  render_views

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end
  end

  describe "GET 'manage'" do
    it "should be successful" do
      get 'manage'
      response.should be_success
    end
  end

  describe "GET 'info'" do
    it "should be successful" do
      get 'info'
      response.should be_success
    end
  end
end
