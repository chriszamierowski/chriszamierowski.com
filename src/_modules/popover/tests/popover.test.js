'use strict';

var Popover = require('../popover');

describe('Popover View', function() {

  beforeEach(function() {
    this.popover = new Popover();
  });

  it('Should run a few assertions', function() {
    expect(this.popover).toBeDefined();
  });

});
