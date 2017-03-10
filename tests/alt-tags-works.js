module.exports = {
  'Find alt-text in image tags': function (client) {
    // Go to a page that has such templates and images:
    client.url('https://en.wikipedia.org/wiki/Wikipedia:Alternative_text_for_images');
    // See that the alt text contains a word.
    client.expect.element('.thumbinner img').to.have.attribute('alt').matches(/\b/);
    client.end();
  },
};
