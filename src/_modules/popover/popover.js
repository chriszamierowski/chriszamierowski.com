'use strict';

var $ = require('jquery');

// Constructor
var popover = function() {
  var $popoverTriggers = $('.popover-trigger');

  $popoverTriggers.webuiPopover({
    trigger: 'click',
    placement: 'auto',
    content: function(){
      return $(this).next('.popover-content-seed').html();
    }
  });
};

module.exports = popover;