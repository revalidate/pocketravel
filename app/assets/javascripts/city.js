console.log("this is working");

var markers = [];
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7833, lng: -122.4167},
        zoom: 13,
        scrollwheel: false
        // mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('searchInput');
      var searchBox = new google.maps.places.SearchBox(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });


      markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {

          // content for info window
          var contentString = '<div>'+
          '<h3>' + place.name + '</h3><p>' +
          place.formatted_address + '</p>'+
          '<p><b>Rating:</b> ' + place.rating + '</p>' +
          '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            title: place.name,
            label: labels[labelIndex++ % labels.length],
            position: place.geometry.location
          }));

          markers.forEach(function(marker) {
            marker.addListener('click', function() {
              infowindow.open(map, marker);
              map.setZoom(13);
              map.setCenter(marker.getPosition());
            });
          });

          searchList(place);
          console.log(place);

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }



function searchList(searchResults) {
  // console.log(searchResults);
  var li = document.createElement("li");

  // for (var place_id in searchResults) {
    var placeId = searchResults.place_id;
    // console.log(placeId);
    li.setAttribute("id", placeId);
  // }

  var text = document.createTextNode(searchResults.name);
  li.appendChild(text);
  document.getElementById("search-results").appendChild(li);

  $(li).click(function(){
    $("#one-result").empty();
    var oneResultText = '<h1>' + searchResults.name + '</h1>' +
                          '<p>' + searchResults.formatted_address +
                          '</p><p><b>Rating:</b> ' + searchResults.rating + '</p>' +
                          '</p><p><b>Price: </b>' + searchResults.price_level + '</p>' +
                          '<button type="button" class="btn btn-primary">Save</button>';
    $("#one-result").append(oneResultText);
  });
}

// var listItem = document.querySelector("li");
// listItem.addEventListener("click", functionName);

function functionName(event){
  console.log(event);
}

google.maps.event.addDomListener(window, 'load', initAutocomplete);
