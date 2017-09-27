class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :ingredients
      t.string :src
      t.timestamps
    end
  end
end
