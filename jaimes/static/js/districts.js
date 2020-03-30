// Creating map object
var map = L.map("map", {
  center: [32.8, -117.1],
  zoom: 10
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(map);

// Uncomment this link local geojson for when data.beta.nyc is down
var link = "http://seshat.datasd.org/sde/council/council_districts_datasd.geojson";

// Our style object
function chooseColor(borough) {
  switch (borough) {
  case 1:
    return "dodgerblue";
  case 2:
    return "dodgerblue";
  case 3:
    return "dodgerblue";
  case 4:
    return "dodgerblue";
  case 5:
    return "gray";
  case 6:
    return "red";
  case 7:
    return "red";
  case 8:
    return "dodgerblue";
  case 9:
    return "dodgerblue";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: chooseColor(feature.properties.district),
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.district),
        fillOpacity: 0.2,
        weight: 1
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.2
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h2>District " + feature.properties.district + "<br/>Council Member<h2><hr/><h1>" + feature.properties.name + "</h1> <hr> <h2>" + feature.properties.phone + "</h2>");

    }
  }).addTo(map);
});
