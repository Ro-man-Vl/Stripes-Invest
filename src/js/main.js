$(function() {
    
  // ----- Slick slider

  $('.individuality__gallery-wrapper').slick({
     dots: true,
     arrows: false,
     slidesToShow: 4,
     slidesToScroll: 4,
     autoplay: true,
  });

  // ----- On scroll transformation

  var prevScrollPos = window.scrollY;
  
  $(window).on('scroll', function () {
  
      let currentScrollPos = window.scrollY;

      // ----- Top menu bar

      if (currentScrollPos >= 24 && prevScrollPos < 24) {
        $('.header').addClass('header--fixed');
        $('.header__menu-list').addClass('header__menu-list--fade');
      } else {
        if (currentScrollPos < 24 && prevScrollPos >= 24) {
          $('.header').removeClass('header--fixed');
          $('.header__menu-list').removeClass('header__menu-list--fade');
        }
      };

      // ----- Move-up button

      if (currentScrollPos >= 100 && prevScrollPos < 100) {
        $('.move-up__wrapper').fadeToggle();
      } else {
        if (currentScrollPos < 100 && prevScrollPos >= 100) {
          $('.move-up__wrapper').fadeToggle();
        }
      };

      // ----- Background image parallax effect

      let individualityBgPositionY = currentScrollPos * -0.19 + "px";
      let roadmapBgPositionY = (currentScrollPos - 3290) * -0.17 + "px";
      console.log('Offset: ' + roadmapBgPositionY);
      $('.individuality').css('background-position-y', individualityBgPositionY);
      $('.roadmap').css('background-position-y', roadmapBgPositionY);
    
      prevScrollPos = currentScrollPos;

  });

});