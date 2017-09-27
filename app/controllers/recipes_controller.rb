class RecipesController < ApplicationController
  def index
  end

  private

  def recipe_params
  params.require(:user).permit(:avatar)
end
end
