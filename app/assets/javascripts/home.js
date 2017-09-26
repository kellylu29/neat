// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
//= require_scrollmagic ./scrollmagic.js

window.onload = function () {
	// init
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

		// get all slides
		var slides = document.querySelectorAll("section.panel");

		// create scene for every slide
		for (var i=0; i<slides.length; i++) {
			new ScrollMagic.Scene({
					triggerElement: slides[i]
				})
				.setPin(slides[i])
				.addTo(controller);
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

  buttons.forEach(function(button) {
    button.addEventListener('click', function(e){
      search.push(button.innerHTML.toLowerCase())
      e.target.disabled = 'true'
    })
  })
  inputs.forEach(function(input) {
    input.addEventListener('change', function(e){
      search.push(input.value.toLowerCase())
    })
  })
  endBtn.addEventListener('click', getRecipes)


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
}
