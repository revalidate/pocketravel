class CreateUserPlaces < ActiveRecord::Migration
  def change
    create_table :user_places do |t|

      t.timestamps null: false

      t.references :user
      t.references :place
    end
  end
end
