class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :ingredients
      t.string :src
      t.string :url
      t.timestamps
    end
  end
end
