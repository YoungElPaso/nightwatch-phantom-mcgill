var expect = require('chai').expect;

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

    // TODO: this should be a function or a tag should be added to tests that
    // require authentication, since by definition they can't be run in travis
    // build and so will always fail. travis should build and run w/ passing
    // tests. NB: these tests are excluded already via grunt and nightatch.json
    // but here's another check.
    if (!client.globals.authentication.userName ||
      !client.globals.authentication.pW) {
      console.log('no authentication creds, bailing, ending process!');
      client.end();
      process.exit();
    }

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
    var blockWidthThird;
    client.getCssProperty('div.block.third-width',
    'width', function(result) {
      blockWidthThird = result.value;
    });
    var blockWidthHalf;
    client.getCssProperty('div.block.half-width',
    'width', function(result) {
      blockWidthHalf = result.value;
    });

    // Perform allows us to run more complicated functions on the values we got.
    client.perform(function(client, done) {

      // Do some simple checks on the block values, validate they are strings.
      client.assert.equal(typeof blockWidthThird, 'string');
      // Assert the value of the width test.
      client.assert.equal(blockWidthThird, '400px');

      // Do some simple checks on the block values, validate they are strings.
      client.assert.equal(typeof blockWidthHalf, 'string');
      // Assert the value of the width test.
      client.assert.equal(blockWidthHalf, '400px');

      // Tell the client to end.
      done();
    });
  },

  'Desktop Block Width Test': function(client) {

    // For this test, we need to go to desktop resolution on the client.
    // This tests keeps the same session as the previous test, part same suite.
    client.resizeWindow(960, 800);

    // Go to the WMS page to see the blocks.
    client.url('https://qa.ccs.mcgill.ca/samples/blocks/block-layouts')
    .pause(300);

    // Get a block we want and get the (NB: *computed*) css value for
    // width.
    var blockWidthThird;
    client.getCssProperty('div.block.third-width',
    'width', function(result) {
      blockWidthThird = result.value;
    });
    var blockWidthHalf;
    client.getCssProperty('div.block.half-width',
    'width', function(result) {
      blockWidthHalf = result.value;
    });

    // Perform allows us to run more complicated functions on the values
    // we got.
    client.perform(function(client, done) {

      // Do some simple checks on the block values, validate they are
      // strings.
      // client.assert.equal(typeof blockWidthThird, 'string');
      // Expect the value of the width test to contain non decimal width.
      // TODO: this is a bit of a dogs breakfast, node assert, nightwatch
      // client.assert, chai expect (who is bringing assert and expect to
      // the party!?)
      expect(blockWidthThird).to.contain('245');

      // Do some simple checks on the block values, validate they are
      // strings.
      // client.assert.equal(typeof blockWidthHalf, 'string');
      // Expect the value of the width test to contain non decimal width.
      client.expect(blockWidthHalf).to.contain('372');

      // Tell the client to end.
      done();
    });
    //
  }
};
