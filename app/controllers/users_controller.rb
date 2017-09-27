class UsersController < ApplicationController
  def show
    @recipe = Recipe.find_by(params[:title])
    @user = User.find_by_id(params[:id])
    @recipes = current_user.recipes

  end


end
