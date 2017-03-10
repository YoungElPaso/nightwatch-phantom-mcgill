module.exports = {
  'Find alt-text in image tags': function (client) {
    // Go to a page that has such templates and images:
    client.url('http://www.mcgill.ca/law');
    // See that the alt text contains at least a word.
    client.expect.element('.bean-mcgill-banner picture img').to.have.attribute('alt').matches(/\b/);
    client.end();
  },
};
