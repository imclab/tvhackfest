var clientMode = 0; // 0 - phone, 1 - tv, 2 - smarttv


//  var toggleContent = function (comment) {
//    $('.content').removeClass('active');
//    if (comment) {
//      $('#comment').addClass('active');
//      $('#commentMsg').focus();
//    } else {
//      $('#clap').addClass('active');
//    }
//  }
  
$(document).on('ready', function () {
  if (navigator.userAgent.indexOf('GoogleTV')>0 || location.search.indexOf('tv')>0) {
    clientMode = 1;
   
   
  }
  
  
  
  if (clientMode == 1) {
    $('body').addClass('tv');
//  } else if (clientMode == 1) {
//    $('body').addClass('tv');
  }
  
  var changeMode = function () {
    
    if (clientMode) {
      var content = $('.content');
      var comment = $('#comment.content');
      var tv = $('#tv.content');
      
      content.removeClass('active');
      tv.addClass('active');
      
      $('.tvmode').click(function (e) {
        $('.tvoption').hide();
        
        var iframe = $('iframe');
        
        if ($(this).attr('href') == 'legacy') {
          clientMode = 1;
        } else {
          clientMode = 2;
          
          iframe.detach().prependTo(comment);
          content.removeClass('active');
          comment.addClass('active');
          comment.find('form').hide();
        }
        
        iframe.attr('src', 'http://www.youtube.com/embed/MiBkjXOdWYY').css({
          width: '853',
          height: '480'
        }).show();
        
        console.log('iframe', iframe);
        
        e.preventDefault();
      });
      
      
//      if (clientMode == 1) {
//        $('canvas').hide();
//        $('h1').hide();
//        $('#comment').hide();
//      }
    }
  }
  
  var setsize = function() {
    var height = $(window).height();
    $('.content').css('height', height-200);
    
//    <iframe width="560" height="315" src="http://www.youtube.com/embed/MiBkjXOdWYY" frameborder="0" allowfullscreen></iframe>

    
  };
  
//  $('.content').swipe( {
//    swipe:function(event, direction, distance, duration, fingerCount) {
////      console.log('direction', direction);
//      if (direction == 'up') {
//        toggleContent(true);
//      } else {
//        toggleContent(false);
//      }
//    },
//    threshold:0
//  });
  
  setsize();
  changeMode();
//  $(window).resize(setsize);
});