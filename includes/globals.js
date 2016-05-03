module.exports = {
  doLogin: function(client, url) {
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

    // Go to a WMS page and login.
    // Default url is a QA site...ideally this changes or is more stable.
    var newUrl = url || 'https://qa.ccs.mcgill.ca/samples';
    if (client.globals.baseUrl) {
      newUrl = client.globals.baseUrl;
    }
    newUrl = newUrl + '/user/login';
    console.log('Logging into...', newUrl);
    client.url(newUrl)
    .pause(200)
    .setValue('input[name="name"]', client.globals.authentication.userName)
    .setValue('input[name="pass"]', client.globals.authentication.pW)
    .click('input[value="Log in"]')
    .pause(100);
  }
};
