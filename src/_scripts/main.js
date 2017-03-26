'use strict';

var $ = require('jquery');
var _ = require('lodash');

require('webui-popover');

var Link = require('../_modules/link/link');
var Popover = require('../_modules/popover/popover');

// Bitters
(function (jQuery) {
  jQuery.mark = {
    jump: function (options) {
      var defaults = {
        selector: 'a.scroll-on-page-link'
      };
      if (typeof options == 'string') {
        defaults.selector = options;
      }

      options = jQuery.extend(defaults, options);
      return jQuery(options.selector).click(function (e) {
        var jumpobj = jQuery(this);
        var target = jumpobj.attr('href');
        var thespeed = 1000;
        if(target[0] === '/') {
          target = target.slice(1);
        }
        var offset = jQuery(target).offset().top;
        jQuery('html,body').animate({
          scrollTop: offset
        }, thespeed, 'swing');
        e.preventDefault();
      });
    }
  };
})(jQuery);

$(function() {
  var $window = $(window),
      $body = $('body'),
      menuToggle = $('#menu-toggle'),
      $mainMenu = $('header .main-menu'),
      $mobileMenu = $('header .mobile-menu'),
      scrollDownDelay = 10000,
      $thingsIAm = $('.homepage .things-i-am');

  new Link(); // Activate Link modules logic
  new Popover(); // Activate Popover modules logic

  $.mark.jump('.homepage .header-link, .homepage .scroll-down a'); // Run Bitters code for scrolling smoothly on homepage

  menuToggle.on('click', function(e) {
    e.preventDefault();

    toggleMenu();
  });

  function toggleMenu() {
    $mainMenu.slideToggle();
  }

  // hide menu on mobile once you click
  $mainMenu.find('a').on('click', function(){
    if($mobileMenu.is(':visible')) {
      toggleMenu();
    }
  });

  $('#resume-print').on('click', function(e) {
    e.preventDefault();
    window.print();
  });

  var scrollElements = $('.scroll-dependent');

  $(window).scroll(function() {
    $.each(scrollElements, function() {
      var $el = $(this),
          elementTopToPageTop = $el.offset().top,
          windowTopToPageTop = $window.scrollTop(),
          windowInnerHeight = window.innerHeight,
          elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop,
          elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop,
          scrollWindowTop = $el.data('scroll-window-top'),
          distanceFromBottomToAppear = $el.data('distance-from-bottom');

      if(scrollWindowTop && (+scrollWindowTop < windowTopToPageTop)) {
        $el.addClass('scroll-window-top');
      } else {
        $el.removeClass('scroll-window-top');
      }

      if(distanceFromBottomToAppear && (elementTopToWindowBottom > +distanceFromBottomToAppear)) {
        $el.addClass('scroll-window-bottom');
      } else {
        $el.removeClass('scroll-window-bottom');
      }
    });
  });

  if($body.hasClass('homepage')) {
    // don't show scroll down button right away
    setTimeout(function(){
      $('.homepage .scroll-down').addClass('fade-in');
    }, scrollDownDelay);

    // refresh the .rotating class on the homepage so resizing the window doesn't break it
    $window.resize(_.debounce(function(){
      $thingsIAm.removeClass('rotating');

      setTimeout(function(){
        $thingsIAm.addClass('rotating');
      }, 0);
    }, 100));
  }

  $body.find('.intro-image-wrap').on('click', function(){
    $(this).toggleClass('expand');
  });
});
