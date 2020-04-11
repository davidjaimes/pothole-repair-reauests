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
    "Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "New (Red)": d1,
    "In Process (Green)": d2,
    "Referred (Blue)": d3
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [32.82, -117.1],
    zoomSnap: 0.25,
    zoom: 9.5,
    zoomDelta: 0.5,
    layers: [lightmap, d2, d3, d1]
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
  for (var index = 0; index < response.length; index++) {

    var obj = response[index];

    if (obj.Latitude / obj.Latitude == 1 || obj.Longitude / obj.Longitude == 1) {

      if (obj.Status == "New") {
        var bikeMarker = L.circleMarker([obj.Latitude, obj.Longitude], {radius: 3, color: 'red'})
          .bindPopup("<h3>" + obj.Status + "</h3>");
        newMarker.push(bikeMarker)
      };
      if (obj.Status == "In Process") {
        var bikeMarker = L.circleMarker([obj.Latitude, obj.Longitude], {radius: 3, color: 'green'})
          .bindPopup("<h3>" + obj.Status + "</h3>");
        processMarker.push(bikeMarker)
      };
      if (obj.Status == "Referred") {
        var bikeMarker = L.circleMarker([obj.Latitude, obj.Longitude], {radius: 3, color: 'blue'})
          .bindPopup("<h3>" + obj.Status + "</h3>");
        referMarker.push(bikeMarker)
      };
    };
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(newMarker), L.layerGroup(processMarker), L.layerGroup(referMarker));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("./static/js/data.json", createMarkers);
