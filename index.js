// create a drzzl class
const DrzzlWeather = require('DrzzlWeather');

// create an express class
const express = require('express');
const cors    = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/weather', function (req, res) {
	//res.send('Hello From Drzzl');

	if ( req.query.location ) {
		let d = new DrzzlWeather(req.query.location);
	
		d.on('loaded', function() {
			// precip requires a date
			let offset = new Date().getTimezoneOffset();
			let date = new Date((new Date).getTime() - (offset*60*1000));
			let dateString = date.toISOString().split('T')[0];
			let output = {};
			output.temp = d.temp();
			output.precip = d.precip(dateString);
			output.skytext = d.skytext();
			output.city = d.city();
	
			res.json(output);
		});
	} else {
		res.json({'error': 'You must provide a location query parameter' });
	}
		

	//res.json({ 'success': 'true', 'drzzl': '1.0' });
	// webserver will listen for requests and return JSON data of weather
});

app.listen(3000);
