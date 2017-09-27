// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

function scrollto(newclass) {
	document.body.className = newclass;
	return false;
}

var state = {
  meal: '',
  primaryIngr: '',
  secIngr: '',
	cuisine: ''
}

var currentRecipe = 0

window.onload = function () {

	var buttons = document.querySelectorAll('.btn')
	var cuisines = document.querySelectorAll('.cuisine')

	//function to get elements by ID
	function id(str) {
		return document.getElementById(str)
	}

	var primaryIngr = id('primaryIngr')
	var secIngr 		= id('secIngr')
	var cuisine 		= id('cuisine')
	var selCuisine  = id('selectCuisine')
	var endBtn 			= id('end_btn')

	// Event Listeners
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e){
      state = Object.assign({}, state, { meal: button.value.toLowerCase()});
			scrollto('two')
    })
  })

  primaryIngr.addEventListener('keypress', function(e){
		var key = e.which || e.keyCode;
		if (key === 13) {
			state = Object.assign({}, state, { primaryIngr:
				primaryIngr.value.toLowerCase()});
			scrollto('three')
		}

  })

	secIngr.addEventListener('keypress', function(e){
		var key = e.which || e.keyCode;
		if (key === 13) {
			state = Object.assign({}, state, { secIngr:
				secIngr.value.toLowerCase()});
			scrollto('four')
		}
  })

	cuisines.forEach(function(cuisine) {
    selCuisine.addEventListener('change', function(e){
      state = Object.assign({}, state, { cuisine: this.value.toLowerCase()});
    })
  })

	// cuisine.addEventListener('click', function(e){
	// 	state = Object.assign({}, state, { cuisine:
	// 		cuisine.value.toLowerCase()});
  // })

  endBtn.addEventListener('click', getRecipes)
}

function getRecipes(){
	var rTitle = document.getElementById('title')
	var rImg = document.getElementById('img')
	var ingList = document.getElementById('list')

  var combinedSearch = Object.keys(state).map(x => state[x]).join('+');
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
