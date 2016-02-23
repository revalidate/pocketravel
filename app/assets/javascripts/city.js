
function initialize() {
    var mapOptions = {
      center: {lat: 37.7833, lng: -122.4167},
      zoom: 12,
      scrollwheel: false,
      radius: 40233
    };
    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

  // autocomplete on search input box
  var input = document.getElementById('searchInput');

  // Create the autocomplete helper, and associate it with
  // an HTML text input box.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    // Get the full place details when the user selects a place from the
    // list of suggestions.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.
      marker.setPlace(/** @type {!google.maps.Place} */ ({
        placeId: place.place_id,
        location: place.geometry.location
      }));
      marker.setVisible(true);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Rating: ' + place.rating + '<br>' +
          place.formatted_address + '</div>');
      infowindow.open(map, marker);

      $("#results").append('<div><strong><h3>' + place.name + '</h3></strong>' + place.formatted_address + '<br><br><strong>Rating</strong>: ' + place.rating + '<br><strong>Open Hours</strong>:<br>' + place.opening_hours.weekday_text + '</div>');
    });
  }

  // Run the initialize function when the window has finished loading.
  google.maps.event.addDomListener(window, 'load', initialize);
