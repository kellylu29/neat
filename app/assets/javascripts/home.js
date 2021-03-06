// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

function scrollto(newclass) {
	document.body.className = newclass;
	return false;
}

function refreshPage(){
    window.location.reload();
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

	//Typing effect
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
	}
	// INJECT CSS for Typing Effect
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; margin: 10px;}";
	document.body.appendChild(css);

	// Event Listeners
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e){
      state = Object.assign({}, state, { meal: button.value.toLowerCase()});
			scrollto('two');
    })
  })

  primaryIngr.addEventListener('keypress', function(e){
		var key = e.which || e.keyCode;
		if (key === 13) {
			state = Object.assign({}, state, { primaryIngr:
				primaryIngr.value.toLowerCase()});
			scrollto('three');
		}

  })

	secIngr.addEventListener('keypress', function(e){
		var key = e.which || e.keyCode;
		if (key === 13) {
			state = Object.assign({}, state, { secIngr:
				secIngr.value.toLowerCase()});
			scrollto('four');
		}
  })

	cuisines.forEach(function(cuisine) {
    selCuisine.addEventListener('change', function(e){
      state = Object.assign({}, state, { cuisine: this.value.toLowerCase()});
    })
  })

  endBtn.addEventListener('click', getRecipes);

}

function getRecipes(){
	var rTitle = document.getElementById('title');
	var rImg = document.getElementById('img');
	var list = document.getElementById('ing_list');
	var startOverBtn = document.getElementById('start_over');
	var neatBtn = document.getElementById('neat_btn');

  var combinedSearch = Object.keys(state).map(function (x){
  	return state[x];
	}).join('+');

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
      var ingredients = recipe.ingredientLines;
			var url = recipe.url;
			var f = document.forms[1];

			rTitle.innerHTML = title;
			rImg.src = image_url;
			list.innerHTML = "<ul id='list'>"+ingredients.join("<br>")+"</ul>";
			startOverBtn.classList.remove("hidden");
			neatBtn.classList.remove("hidden");

			f['recipe[title]'].value = title;
			f['recipe[url]'].value = url;
			f['recipe[src]'].value = image_url;

    }
  })
	scrollto('five');
}

// var ingList = document.getElementById('ing_List');
// var recipeBtns = document.getElementById('recipe_btns')
// ingList.classList.remove("hidden");
// recipeBtns.classList.remove("hidden");
