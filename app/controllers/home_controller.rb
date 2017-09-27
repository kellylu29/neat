class HomeController < ApplicationController
  def index
    @recipe = current_user.recipes.build
  end
end
