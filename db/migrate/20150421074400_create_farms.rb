class CreateFarms < ActiveRecord::Migration
  def self.up
    create_table :farms do |t|
      t.string :name
      t.string :region
      t.float :north
      t.float :east
      t.text :description
      t.text :categories
      t.text :products
      t.integer :user_id

      t.timestamps
    end
    add_index :farms, :user_id
  end

  def self.down
    drop_table :farms
  end
end
