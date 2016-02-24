class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.decimal :lat
      t.decimal :lng
      t.integer :radius

      t.timestamps null: false
    end
  end
end
