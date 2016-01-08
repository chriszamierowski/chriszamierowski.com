// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');

require('webui-popover');

var Link = require('../_modules/link/link');
var Popover = require('../_modules/popover/popover');

$(function() {
  new Link(); // Activate Link modules logic
  new Popover(); // Activate Popover modules logic

  var menuToggle = $('#menu-toggle');

  menuToggle.on('click', function(e) {
    e.preventDefault();
    menuToggle.toggleClass('show-menu').parent().next().slideToggle();
  });
});
