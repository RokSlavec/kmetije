class Farm < ActiveRecord::Base
  attr_accessible :name, :region, :north, :east, :description, :categories, :products
  
  belongs_to :user
  
  validates :name, :presence => true
  validates :region, :presence => true
  validates :north, :presence => true
  validates :east, :presence => true
  validates :description, :presence => true
  validates :categories, :presence => true
  validates :products, :presence => true
  validates :user_id, :presence => true
  
  default_scope :order => 'farms.region DESC'
end
