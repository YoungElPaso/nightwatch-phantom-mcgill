module.exports = {
  doLogin: function(client) {
    console.log('Doing login dance!');
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
    .pause(200)
    .setValue('#edit-name--2', client.globals.authentication.userName)
    .setValue('#edit-pass--2', client.globals.authentication.pW)
    .click('#edit-submit--2')
    .pause(100);
  }
};
