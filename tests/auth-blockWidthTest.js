// A test to check that block widths are what they are supposed to be, i.e. half width, full width, and third widths of their containers.
module.exports = {

  // TODO: this setup / teardown should be in a global...
  // A message for start up.
  before: function(client) {
    console.log('Revving the engines and lighting the torch etc...');
  },

  // Shut down the muther after ending! Shouldn't include in steps cause if they
  // fail, or there's an error and client bails, end() may never be called and
  // phantomjs or other browser may still be running, eating all your RAM.
  after: function(client) {
    console.log('Turning off the lights when I leave.');
    client.end();
  },

  'Mobile Block Width Test': function(client) {
    // For this test, we need to go to mobile resolution on the client.
    client.resizeWindow(400, 800);

    // Do login procedure. Function defined in globals.
    client.globals.doLogin(client);

    // Go to the WMS page to see the blocks.
    client.url('https://qa.ccs.mcgill.ca/samples/blocks/block-layouts')
    .pause(100);

    // Get a block we want and get the (NB: *computed*) css value for width.
    // Get half-width block. Using contains means we can have 'fuzzy' matching
    // which is good because sometimes the value may contain many decimals.
    client.expect.element('div.block.half-width').to.have.css('width')
    .which.contains('400');

    // Get third-width block.
    client.expect.element('div.block.third-width').to.have.css('width')
    .which.contains('400');

    client.end();
  },

  'Desktop Block Width Test': function(client) {

    // For this test, we need to go to desktop resolution on the client.
    client.resizeWindow(960, 800);

    // Do login procedure. Function defined in globals.
    client.globals.doLogin(client);

    // Go to the WMS page to see the blocks.
    client.url('https://qa.ccs.mcgill.ca/samples/blocks/block-layouts')
    .pause(100);

    // Get half-width block.
    client.expect.element('div.block.half-width').to.have.css('width')
    .which.contains('372');

    // Get third-width block.
    client.expect.element('div.block.third-width').to.have.css('width')
    .which.contains('245');

    client.end();
  }
};
