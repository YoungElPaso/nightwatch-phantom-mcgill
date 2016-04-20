// Loads the contrast package.
var contrast = require('get-contrast');

// Loads the rgb package.
var rgb = require('rgb');

// A simple test for contrasting colors from two elements in the DOM.
module.exports = {
  'Simple Contrast Test': function(client) {

    // For this test, we need to go to mobile resolution on the client.
    client.resizeWindow(400, 800);

    // Go to a WMS page and wait 300 ms.
    client.url('https://www.mcgill.ca/wms').pause(300);

    // Get the colors we want to check (the menu and its parent).
    var colorA;
    var colorB;
    client.getCssProperty('div.sf-accordion-toggle a#superfish-1-toggle',
    'color', function(result) {
      colorA = result.value;
    });
    // client.getCssProperty('.block-superfish', 'background-color',
    client.getCssProperty('#mcgill-logo', 'background-color',
    function(result) {
      colorB = result.value;
    });

    // TODO this should be extended into a step or assertion for nightwatch.
    client.perform(function(client, done) {

      // Do some simple checks on the colors, i.e. validate they are strings.
      client.assert.equal(typeof colorA, 'string');
      client.assert.equal(typeof colorB, 'string');

      // Double check we are not contrasting transparent colors.
      colorA = isNotTransparent(colorA);
      colorB = isNotTransparent(colorB);

      // Do the contrast test.
      var test = contrast.isAccessible(colorA, colorB);

      // Assert the value of the contrast test.
      client.assert.equal(test, true);

      // Tell the client to end.
      done();
    });
  }
};

// NB: there's a pull request to add this directly to get-contrast soon.
function isNotTransparent(color) {

  // Convert to RGB.
  color = rgb(color);

  // Check if the rgb returned color is rgba and if the 'a' value is 0.
  var cArray = color.match(/\((.*)\)/)[1].split(',');
  if (cArray.length == 4 && cArray[3] == '0') {
    throw new TypeError('get-contrast cannot contrast transparent colors');
  } else {
    return color;
  }
}
