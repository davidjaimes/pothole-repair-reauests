function createMap(d1, d2, d3) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "New": d1,
    "In Process": d2,
    "Referred": d3
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [32.82, -117.1],
    zoomSnap: 0.25,
    zoom: 9.5,
    zoomDelta: 0.5,
    layers: [lightmap, d1, d2, d3]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Initialize an array to hold bike markers
  var newMarker = [];
  var referMarker = [];
  var processMarker = [];

  // Loop through the stations array
  for (var index = 0; index < 500; index++) {

    var obj = response[index];

    if (obj.Latitude / obj.Latitude == 1 || obj.Longitude / obj.Longitude == 1) {

      // For each station, create a marker and bind a popup with the station's name
      var bikeMarker = L.marker([obj.Latitude, obj.Longitude])
        .bindPopup("<h3>" + obj.Status + "</h3>");

      // Add the marker to the bikeMarkers array
      if (obj.Status == "New") {newMarker.push(bikeMarker)};
      if (obj.Status == "In Process") {processMarker.push(bikeMarker)};
      if (obj.Status == "Referred") {referMarker.push(bikeMarker)};
    };
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(newMarker), L.layerGroup(processMarker), L.layerGroup(referMarker));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("./static/js/data.json", createMarkers);
