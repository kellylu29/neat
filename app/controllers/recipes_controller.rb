class RecipesController < ApplicationController
  def index
  end

  def create
    recipe = Recipe.find_or_create_by(recipe_params)
    # if the above doesn't work, Recipe.new(recipe_params)
    if recipe.save!
      flash[:notice] = "Recipe was successfully saved."
      redirect_to current_user
    else
      flash[:notice] = "Failed"
      redirect_to root_path
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:user_id, :title, :ingredients, :src)
  end
end
