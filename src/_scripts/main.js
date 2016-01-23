// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');

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
  new Link(); // Activate Link modules logic
  new Popover(); // Activate Popover modules logic

  $.mark.jump('.homepage .main-nav li:not(.cz-logo) a'); // Run Bitters code for scrolling smoothly on homepage

  var menuToggle = $('#menu-toggle');

  menuToggle.on('click', function(e) {
    e.preventDefault();
    menuToggle.toggleClass('show-menu').parent().next().slideToggle();
  });

  $('#resume-print').on('click', function(e) {
    e.preventDefault();
    window.print();
  });
});
