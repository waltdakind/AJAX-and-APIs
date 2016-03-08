//==================================================
//variables=========================================

	var animals = [];
	var gKey = "&api_key=dc6zaTOxFJmzC"
	var gLimit = '&limit=10';
	var giphyURL = "https://api.giphy.com/v1/gifs/search?q=";
	var newanimal;
	

//==================================================
//functions=========================================	

//add buttons
$('#addanimal').on('click', function(){

		var newanimal = $('#animal-input').val().trim();
		

		// Creating a button and putting into a variable
		var a = $('<button>')

		// Giving attributes to the button created
	    a.addClass('animal btn btn-primary');
	    a.attr('data-name', newanimal);
	    a.attr('id', 'animalbutton');
	    a.text(newanimal);

	    // Changing the html adding the button	 

	    $('#animalsView').append(a);
	    		//------ 
		 //$('#animal-input').val('');  
		return false; 
});


// do ajax call and add images

var displayGifs = function(){
	var giphyanimal = $(this).attr('data-name');
	var giphySearch = giphyURL + giphyanimal + gKey + gLimit;
	console.log(giphyanimal);
	$.get( giphySearch, function( response ) { 
  		
  		var arrayOfTenImages = response.data;
  		

		for(var i = 0; i<arrayOfTenImages.length; i++) {
  		var stillImageURL = arrayOfTenImages[i].images.fixed_height_still.url;
  		var movingImageURL = arrayOfTenImages[i].images.fixed_height_downsampled.url;

  		var rating = arrayOfTenImages[i].rating;

  		var imageHTML = "<div class = \"container\"> <img src = \"" + stillImageURL +  "\" data-animate = \"" + movingImageURL + "\" data-still = \"" + stillImageURL + "\" data-state =\"still\" > </div>";

		console.log(imageHTML);
  
   $('#searchResult').prepend(' Rating:' +  rating + imageHTML );
   			}
		})

	};

	//clicking on images toggles between animation and still image
	var toggleAnimation = function(){ 
	        var state = $(this).attr('data-state'); 

            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
     };



//==================================================
//main process=========================================
$(document).on('click', 'img', toggleAnimation);
$(document).on('click', '#animalbutton', displayGifs);