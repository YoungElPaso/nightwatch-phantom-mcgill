// A test to check that block widths are what they are supposed to be, i.e. half width, full width, and third widths of their containers.
module.exports = {
  'Block Width Test': function(client) {

    // For this test, we need to go to mobile resolution on the client.
    client.resizeWindow(400, 800);
  
    // TODO: this should be conditioned, and a tag should be added to tests that
    // require authentication, since by definition they can't be run in travis
    // build and so will always fail. travis should build and run w/ passing
    // tests.

    // Go to a WMS page and login. TODO: add url to command-line options.
    client.url('https://qa.ccs.mcgill.ca/samples/user/login')
    .pause(300)
    .setValue('#edit-name--2', client.globals.authentication.userName)
    .setValue('#edit-pass--2', client.globals.authentication.pW)
    .click('#edit-submit--2')
    .pause(100);

    // Go to the WMS page to see the blocks.
    client.url('https://qa.ccs.mcgill.ca/samples/blocks/block-layouts')
    .pause(300);

    // Get a block we want and get the (NB: *computed*) css value for width.
    var blockWidth;
    client.getCssProperty('div.block.third-width',
    'width', function(result) {
      blockWidth = result.value;
    });

    // Perform allows us to run more complicated functions on the values we got.
    client.perform(function(client, done) {

      // Do some simple checks on the block values, validate they are strings.
      client.assert.equal(typeof blockWidth, 'string');
      // Assert the value of the width test.
      client.assert.equal(blockWidth, '400px');

      // Tell the client to end.
      done();
    });
  }
};
