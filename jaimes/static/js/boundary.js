// Creating map object
var boundaryMap = L.map("boundary-id", {
  center: [32.82, -117.1],
  zoomSnap: 0.25,
  zoom: 9.5,
  zoomDelta: 0.5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(boundaryMap);
L.control.scale().addTo(boundaryMap);

// If data.beta.nyc is down comment out this link
var boundaryLink = "http://seshat.datasd.org/sde/city_boundary/san_diego_boundary_datasd.geojson";

// Our style object
var mapStyle = {
  color: "lightgreen",
  fillColor: "lightgreen",
  fillOpacity: 0.1,
  weight: 1
};

// Grabbing our GeoJSON data..
d3.json(boundaryLink, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Passing in our style object
    style: mapStyle
  }).addTo(boundaryMap);
});
