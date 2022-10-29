const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const admin = require('firebase-admin');
const serviceAccount = require('./firestorekey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// app.get('*', (req, res) => res.send('Hello World!'));
app.use(cors({
	origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/volunteer/', async (req, res) => {
	console.log(req.body);
	let doc = db.collection('resources').doc();
	await doc.set(req.body);
	res.send('success');
});

app.get('/opportunities/', async (req, res) => {
	let latitude = req.query.latitude;
	let longitude = req.query.longitude;
	if(!(parseInt(latitude) && parseInt(longitude))) return res.send('Invalid latitude or longitude');

	
	let opportunities = [];
	let snapshot = await db.collection('resources').get();
	snapshot.forEach(doc => {
		opportunities.push(doc.data());
	});

	opportunities = opportunities.map(opportunity => {
		let distance = getDistanceFromLatLonInKm(latitude, longitude, opportunity.Latitude, opportunity.Longitude);
		return {
			...opportunity,
			distance
		}
	});
	
	opportunities = opportunities.filter(opportunity => !isNaN(opportunity.distance));

	// Sort by distance
	opportunities.sort((a, b) => a.distance - b.distance);
	

	res.send(opportunities);
})

// a little flawed but whooo cares
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));