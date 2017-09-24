window.onload = function() {
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e){
      search.push(button.innerHTML.toLowerCase())
      e.target.disabled = 'true'
    })
  })
  inputs.forEach(function(input) {
    input.addEventListener('change', function(e){
      search.push(input.value.toLowerCase())
      e.target.disabled = 'true'
    })
  })
  endBtn.addEventListener('click', getRecipes)
}

var buttons = document.querySelectorAll('.btn')
var inputs = document.querySelectorAll('.input')

var search = []
var currentRecipe = 0

//function to get HTML elements
function id(str) {
  return document.getElementById(str)
}

var endBtn = id('end_btn')
var rTitle = id('title')
var rImg = id('img')
var ingList = id('list')

function getRecipes(){
  var combinedSearch = search.join('+')
  $.ajax({
  	type: 'GET',
  	url: "https://api.edamam.com/search",
  	data: {
      app_id: '8bac53f2',
      app_key: '037df44d2ef2ca7ac55d21497803f295',
  		q: combinedSearch
  	},
    success: function(response){

      recipes = response.hits;

      var recipe = recipes[currentRecipe].recipe;
      var title = recipe.label;
      var image_url = recipe.image;
      var ingredients = recipe.ingredients;

      for(var j = 0; j < ingredients.length; j++){
        var ingredient = ingredients[j].text;
        var list = "<li>" + ingredient + "</li>"
        ingList.innerHTML += list;
      }

      rTitle.innerHTML = title;
      rImg.src = image_url;
    }
  })
}
