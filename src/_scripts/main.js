// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');
var Link = require('../_modules/link/link');

$(function() {
  new Link(); // Activate Link modules logic

  var menuToggle = $('#menu-toggle');

  menuToggle.on('click', function(e) {
    e.preventDefault();
    menuToggle.toggleClass('show-menu').parent().next().slideToggle();
  });
});
