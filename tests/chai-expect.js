var expect = require('chai').expect;

module.exports = {
  'Demo Chai Expect': function (client) {
    client.resizeWindow(413, 800);

    client.url('http://www.mcgill.ca/wms');

    // nightwatch client.expect expect element to have some css property with a
    // given value. this guide is better explanation for how to use chai-style
    // expects.
    // TODO this seems to be the best way to test css stuff.
    client.expect.element('#container').to.have.css('width').which.contains('413');

    // chai expect. Doesn't seem to work...
    // https://github.com/nightwatchjs/nightwatch/issues/601
    // The following pass, but will not be seen to pass.
    // According to the issue above, only fails register...annoying.
    // expect(1).to.equal(1);
    // expect(2).to.equal(2);

    client.end();

  },
};
