// Initialize Parse app
Parse.initialize("WYn3dGq5pYfeEUgyVk4yumOF7S8eyRZvgIQqFu7y", "O3mLktY0eUc872sb6TZ0Q5MsHMoRyQoyV184RQMW");

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend('Music');

// Create a new instance of your Music class 
// var song = new Music();

// // Set a property 'band' equal to a band name
// song.set("band","Taylor Swift");

// // Set a property 'website' equal to the band's website
// song.set("website","http://taylorswift.com/")
    
// Set a property 'song' equal to a song
//song.set("song","Red");

// Save your instance of your song -- and go see it on parse.com!
//song.save();

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	var userSong = new Music();

	// For each input element, set a property of your new instance equal to the input's value

	$(this).find('input').each(function() {
		music.set($(this).attr('id'), $(this).val());
	});

	// After setting each property, save your new instance back to your database
	userSong.save(null, function() {
		getData();
	});
	return false; //so that page doesn't refresh/reload!
});



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class.  Has ability to get info about Music.
	var query = new Parse.Query(Music);

	// Set a parameter for your query -- where the website property isn't missing
	query.exists('website'); 

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({ 
		success:buildList	
	});
}

// A function to build your list
var buildList = function(data) {
	console.log('buildList()', data);
	// Empty out your unordered list
	$('ol').empty();
	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d) {
		addItem(d);
	});
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
	var curWebsite = item.get('website');
	var curBand = item.get('band');
	var curSong = item.get('bestsong');

	var songInfo = $('<li> Check out ' + curBand + '.  They made the song ' + curSong + ' at their website' + curWebsite + '</li>');
	// Append li that includes text from the data item
	$('ol').append('songInfo');

	
	// Time pending, create a button that removes the data item on click
	var button = $("<button class='btn-xs btn-danger'> </button>");
	button.on('click',function() {
		item.destroy({
			success: getData
		})
	})

	songInfo.append(button);
	$('ol').append(songInfo);
}

// Call your getData function when the page loads
getData();

