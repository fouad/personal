$(window).load(function() {
  var $bg = $(".bg-media");

  if ($bg) {
    var src = $bg.css('background-image').replace(/(^url\()|(\)$|[\"\'])/g, '');

    var $img = $('<img>').attr('src', src).on('load', function() {
      setTimeout(function() {
        $bg.animate({ opacity: 1 }, 'slow');
      }, 100);
    });
  }
});