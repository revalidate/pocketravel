console.log("this is working");

var markers = [];
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initAutocomplete() {

      var cityLocation = fetchCityCoordinates();

      window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: cityLocation.lat, lng: cityLocation.lng},
        zoom: 13,
        scrollwheel: false
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


          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            title: place.name,
            label: labels[labelIndex++ % labels.length],
            position: place.geometry.location
          }));


          markers.forEach(function(marker) {
            marker.addListener('click', function() {
              map.setZoom(13);
              map.setCenter(marker.getPosition());
            });
            attachInfoWindowContent(marker,contentString);
          });

          searchList(place);
          // console.log(place);

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



function searchList(place, map) {
  // console.log(searchResults);
  var li = document.createElement("li");

    var placeId = place.place_id;
    li.setAttribute("id", placeId);

  var text = document.createTextNode(place.name);
  li.appendChild(text);
  document.getElementById("search-results").appendChild(li);

  $(li).click(function(){
    $("#one-result").empty();

    //make a request to google place details with place id
    placeDetailsByPlaceId(place);


  });
}


function placeDetailsByPlaceId(place) {
  // Create and send the request to obtain details for a specific place,
  // using its Place ID.
  var placeId = place.place_id;
  console.log(placeId);

  var request = {
    placeId: place.place_id
  };

  service = new google.maps.places.PlacesService(window.map);
  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var oneResultText = '<h1>' + place.name + '</h1>' +
                            '<p>' + place.formatted_address +
                            '</p><p><b>Rating:</b> ' + place.rating + '</p>' +
                            '</p><p><b>Price: </b>' + place.price_level + '</p>' +
                            '</p><p><b>Website: </b><a href="' + place.website + '">' + place.website +  '</a></p>' +
                            '<p><b>Open Hours: </b><br>' +
                            '<p>' + place.opening_hours.weekday_text[0] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[1] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[2] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[3] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[4] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[5] + '</p>' +
                            '<p>' + place.opening_hours.weekday_text[6] + '</p>' +
                            '<button type="button" class="btn btn-primary savePlace">Save</button>';
      $("#one-result").append(oneResultText);
      //rails server needs to know that this is coming from a rails app and the csrf token authenticates that
      var authToken = $('meta[name=csrf-token]').attr('content');

      //posting place to profile
      $(".savePlace").click(function(){
        var formUrl = $("#hiddenSave").attr("data-url");
        var placeData = {
          name: place.name,
          address: place.formatted_address,
          rating: place.rating,
          price_level: place.price_level,
          open_hours: place.opening_hours.weekday_text,
          website: place.website,
          place_id: place.place_id
        };

        $.ajax({
          url: formUrl,
          type: "POST",
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', authToken)},
          data: { placedata: placeData },
          success: function (data, textStatus, jqXHR) {
            console.log("success!");
          },
          error: function(jqXHR, textStatus, errorThrown){
            console.log("error");
          }
        });
      });

    }
  });
}

// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachInfoWindowContent(marker, infoWindowContent) {
  var infowindow = new google.maps.InfoWindow({
    content: infoWindowContent
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

function fetchCityCoordinates() {
  // write javascript to fetch data-lat and data-lng and stick it below with variables
  var cityLat = $("#map").attr("data-lat");
  var cityLng = $("#map").attr("data-lng");
  var location = {lat: parseFloat(cityLat), lng: parseFloat(cityLng)};
  console.log(cityLat,cityLng);
  return location;
}

$(document).on("page:change", initAutocomplete);
