$(document).on("page:change", function(){
 $(".button-collapse").sideNav();

 $('.parallax').parallax();

 var scroll_start = 0;
   var startchange = $('.nav');
   var offset = startchange.offset();
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $('.nav').css('background-color', '#0F2743');
          $('.navbar-default .nav > li > a').css('color', 'white');
          $('.navbar-default .navbar-header .navbar-brand').css('color', 'white');
       } else {
          $('.nav').css('background-color', 'transparent');
          $('.navbar-default .nav > li > a').css('color', 'black');
          $('.navbar-default .navbar-header .navbar-brand').css('color', 'black');
       }
   });
});
