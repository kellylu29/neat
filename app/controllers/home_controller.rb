class HomeController < ApplicationController
  def index
    if current_user
      @recipe = current_user.recipes.build
    else
      @recipe = Recipe.connection

    end

  end

end
