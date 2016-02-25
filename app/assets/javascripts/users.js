$(document).on("page:update", function(){
  var $places = $(".place");

  $(".city-picker li").click(function(e){
    var $el = $(this),
        city_id = $el.attr("data-city-id");

    $places.show();
    $(".place").filter(".city" + city_id).hide();
  });

});
