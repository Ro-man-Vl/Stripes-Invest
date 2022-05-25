$(function () {

  // ----- Slick slider -----

  $('.individuality__gallery-wrapper').slick({
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 401,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  // ----- On scroll transformation -----

  var prevScrollPos = window.scrollY;

  $(window).on('scroll', function () {

    let currentScrollPos = window.scrollY;

    // ----- Top menu bar -----

    if (currentScrollPos >= 24 && prevScrollPos < 24) {
      $('.header').addClass('header--fixed');
      $('.header__menu-list').addClass('header__menu-list--fade');
    } else {
      if (currentScrollPos < 24 && prevScrollPos >= 24) {
        $('.header').removeClass('header--fixed');
        $('.header__menu-list').removeClass('header__menu-list--fade');
      }
    };

    // ----- Move-up button -----

    if (currentScrollPos >= 100 && prevScrollPos < 100) {
      $('.move-up__wrapper').fadeToggle();
    } else {
      if (currentScrollPos < 100 && prevScrollPos >= 100) {
        $('.move-up__wrapper').fadeToggle();
      }
    };

    // ----- Background image parallax effect -----

    let individualityBgPositionY = currentScrollPos * -0.19 + "px";
    let roadmapBgPositionY = (currentScrollPos - 3290) * -0.17 + "px";
    console.log('Offset: ' + roadmapBgPositionY);
    $('.individuality').css('background-position-y', individualityBgPositionY);
    $('.roadmap').css('background-position-y', roadmapBgPositionY);

    prevScrollPos = currentScrollPos;

  });

  // ----- Search field switch -----

  $('.header__links-search').on('click', function () {
    $('.header__search-form').css('display', 'flex')
  });
  $('.search-form__submit').on('click', function () {
    $('.header__search-form').css('display', 'none')
  });

  // ----- Burger menu transformation -----

  $('.burger-menu-btn').on('click', () => {

    $('.header__menu-list').toggleClass('header__menu-list--active');
    $('.header__links-wrapper').toggleClass('header__links-wrapper--active');
    $('.burger-menu-btn').toggleClass('burger-menu-btn--active');
    $('body').toggleClass('lock');
  });

  $('.header__menu-link, .header__links-social, .header__links-button, .search-form__submit').on('click', () => {

    $('.burger-menu-btn').removeClass('burger-menu-btn--active');
    $('.header__menu-list').removeClass('header__menu-list--active');
    $('.header__links-wrapper').removeClass('header__links-wrapper--active');
    $('body').removeClass('lock');
  });

});