console.log('Drzzl starting... load our data');

// fetch our current lat/lng
let coords;

 navigator.geolocation.getCurrentPosition(function(geolocation) {
	coords = geolocation.coords.latitude + ', ' + geolocation.coords.longitude;
	console.log(coords);

	if ( window.location.search ) {
		// use the location provided instead of the geocoords
		coords = window.location.search.split('=')[1];
	}

	// write one big XHR to update all our info
	let xhr = new XMLHttpRequest();
	xhr.onload = function() {
		let weatherData = JSON.parse(this.responseText);
		console.log(weatherData);
		document.getElementById('city').innerText = weatherData.city;
		document.getElementById('temp').innerText = weatherData.temp + '°';
		document.getElementById('skytext').innerText = weatherData.skytext;
		if ( weatherData.precip ) {
			document.getElementById('precip').innerText = weatherData.precip;
		} else {
			document.getElementById('precip').innerText = '0';
		}
	};
	xhr.open('GET', 'http://localhost:3000/weather?location=' + coords);
	xhr.send();

});



