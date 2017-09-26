// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
//= require_scrollmagic ./scrollmagic.js
function scrollto(newclass) {
	document.body.className = newclass;
	return false;
}

var search = []
var currentRecipe = 0

window.onload = function () {

	var buttons = document.querySelectorAll('.btn')
	var inputs = document.querySelectorAll('.input')

	//function to get HTML elements
	function id(str) {
		return document.getElementById(str)
	}

	var primaryIngr = id('primaryIngr')
	var secIngr = id('secIngr')
	var cuisine = id('cuisine')
	var endBtn = id('end_btn')

  buttons.forEach(function(button) {
    button.addEventListener('click', function(e){
      search.push(button.innerHTML.toLowerCase())
      e.target.disabled = 'true'
			scrollto('two')
    })
  })

  primaryIngr.addEventListener('blur', function(e){
    search.push(primaryIngr.value.toLowerCase())
		scrollto('three')
  })

	secIngr.addEventListener('blur', function(e){
    search.push(secIngr.value.toLowerCase())
		scrollto('four')
  })

	cuisine.addEventListener('blur', function(e){
    search.push(cuisine.value.toLowerCase())
  })

  endBtn.addEventListener('click', getRecipes)
}

function getRecipes(){
	var rTitle = document.getElementById('title')
	var rImg = document.getElementById('img')
	var ingList = document.getElementById('list')

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
	scrollto('five')
}
