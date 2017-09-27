class AddAttachmentAvatarToRecipes < ActiveRecord::Migration[5.1]
  def self.up
    change_table :recipes do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :recipes, :avatar
  end
end
