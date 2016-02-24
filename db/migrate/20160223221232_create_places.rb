class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :address
      t.integer :rating
      t.integer :price_level
      t.string :open_hours
      t.string :website
      t.string :photos
      t.integer :place_id
      t.integer :city_id

      t.timestamps null: false
    end
  end
end
