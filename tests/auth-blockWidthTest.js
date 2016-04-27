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

    // Using expect BDD assertion, much cleaner.  Only need client.perform()
    // to do stuff with DOM queries outside of assertion, like compare values.
    // half-width.
    client.expect.element('div.block.half-width').to.have.css('width')
    .which.contains('400');

    // third-width.
    client.expect.element('div.block.third-width').to.have.css('width')
    .which.contains('400');

    client.end();
  },

  'Desktop Block Width Test': function(client) {

    // For this test, we need to go to desktop resolution on the client.
    client.resizeWindow(960, 800);

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

    // half-width.
    client.expect.element('div.block.half-width').to.have.css('width')
    .which.contains('372');

    // third-width.
    client.expect.element('div.block.third-width').to.have.css('width')
    .which.contains('245');

    client.end();
  }
};
